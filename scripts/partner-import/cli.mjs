#!/usr/bin/env node
import { readFile, mkdir, writeFile, chmod } from 'node:fs/promises'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { randomUUID } from 'node:crypto'
import { auditManifest } from './core.mjs'
import { stageImages } from './media.mjs'

const directory = dirname(fileURLToPath(import.meta.url))
const MAX_JSON_BYTES = 32 * 1024 * 1024
const BUCKET = 'ha-import-staging'
const STALE_LEASE_MS = 30 * 60 * 1000
const PARTNERS = new Set(['scraye', 'campus-living-villages', 'housing-anywhere'])

export function parseArguments(argv) {
  const command = argv[0] ?? 'help'
  const options = {}
  const flags = new Set(['resume'])
  const valued = new Set(['input', 'config', 'baseline', 'out'])
  for (let i = 1; i < argv.length; i++) {
    const name = argv[i].replace(/^--/, '')
    if (!argv[i].startsWith('--') || (!flags.has(name) && !valued.has(name))) {
      throw new Error('Unknown argument; run help for supported options')
    }
    if (name in options) throw new Error(`Repeated option: --${name}`)
    if (flags.has(name)) options[name] = true
    else {
      if (!argv[i + 1] || argv[i + 1].startsWith('--')) throw new Error(`Missing value: --${name}`)
      options[name] = argv[++i]
    }
  }
  return { command, options }
}

async function jsonFile(path) {
  let bytes
  try { bytes = await readFile(path) } catch { throw new Error('Unable to read the requested JSON input file') }
  if (bytes.length > MAX_JSON_BYTES) throw new Error('JSON input exceeds 32 MiB')
  try { return JSON.parse(bytes.toString('utf8')) } catch { throw new Error('Input file contains invalid JSON') }
}

async function reportFile(path, value) {
  try {
    await mkdir(dirname(resolve(path)), { recursive: true })
    await writeFile(path, JSON.stringify(value, null, 2) + '\n', { mode: 0o600 })
    await chmod(path, 0o600)
  } catch { throw new Error('Unable to save the import report') }
}

function requireOption(options, key) {
  if (!options[key]) throw new Error(`Required option: --${key}`)
  return options[key]
}

export function supabaseSettings(env) {
  const raw = env.HEARTHAWAY_IMPORT_SUPABASE_URL
  const key = env.HEARTHAWAY_IMPORT_SERVER_KEY
  if (!raw || !key) throw new Error('Set HEARTHAWAY_IMPORT_SUPABASE_URL and HEARTHAWAY_IMPORT_SERVER_KEY in a server-only environment')
  let url
  try { url = new URL(raw) } catch { throw new Error('Invalid import Supabase URL') }
  if (url.protocol !== 'https:' || !/^[a-z0-9]{20}\.supabase\.co$/.test(url.hostname) ||
    url.username || url.password || url.port || url.pathname !== '/' || url.search || url.hash) {
    throw new Error('Use an HTTPS Supabase project origin without credentials, path or query')
  }
  if (env.HEARTHAWAY_IMPORT_PROJECT_REF !== url.hostname.split('.')[0]) {
    throw new Error('HEARTHAWAY_IMPORT_PROJECT_REF must match the configured catalogue project')
  }
  if (typeof key !== 'string' || key.length < 16 || /\s/.test(key)) throw new Error('A server-only Supabase secret or service-role key is required')
  if (!key.startsWith('sb_secret_')) {
    let payload
    try {
      const segments = key.split('.')
      if (segments.length === 3) payload = JSON.parse(Buffer.from(segments[1], 'base64url').toString('utf8'))
    } catch { /* Never include credential bytes in diagnostics. */ }
    if (payload?.role !== 'service_role') throw new Error('A server-only Supabase secret or service-role key is required')
    if (payload.ref && payload.ref !== env.HEARTHAWAY_IMPORT_PROJECT_REF) throw new Error('Server key belongs to a different Supabase project')
  }
  return { url: url.origin, key }
}

export function createRestClient(settings, fetcher = fetch) {
  return async function request(path, { method = 'GET', body, prefer } = {}) {
    if (!/^\/rest\/v1\/ha_import_(partners|runs|items|media_sources)(?:\?|$)/.test(path)
      && !/^\/storage\/v1\/bucket(?:\/ha-import-staging)?$/.test(path)) {
      throw new Error('Unsupported backend request')
    }
    // Project origin is validated before a secret is attached. Never follow redirects.
    let response
    try {
      response = await fetcher(settings.url + path, {
        method, redirect: 'error', signal: AbortSignal.timeout(30_000),
        headers: {
          apikey: settings.key,
          ...(settings.key.startsWith('eyJ') ? { Authorization: `Bearer ${settings.key}` } : {}),
          'Content-Type': 'application/json',
          ...(prefer ? { Prefer: prefer } : {}),
        },
        ...(body === undefined ? {} : { body: JSON.stringify(body) }),
      })
    } catch { throw new Error('Supabase request failed; check connectivity and server credentials') }
    if (!response.ok) {
      const error = new Error(`Supabase request rejected (${response.status}); inspect the backend logs`)
      error.status = response.status
      throw error
    }
    if (response.status === 204) return null
    const text = await response.text()
    if (text.length > MAX_JSON_BYTES) throw new Error('Backend response exceeds size limit')
    try { return text ? JSON.parse(text) : null } catch { throw new Error('Backend returned an invalid JSON response') }
  }
}

export function configFromRow(row) {
  return {
    slug: row.slug, name: row.name, listing_hosts: row.listing_hosts,
    image_hosts: row.image_hosts, active: row.active,
    permission: {
      reference: row.permission_ref, can_import: row.can_import,
      can_republish: row.can_republish, can_copy_images: row.can_copy_images,
    },
  }
}

export function requireStagingPermission(manifest, config) {
  if (manifest.synthetic === true) throw new Error('Synthetic fixtures cannot be uploaded or staged')
  if (manifest.partner !== config.slug) throw new Error('Manifest partner does not match configuration')
  if (config.active !== true || typeof config.permission?.reference !== 'string' || !config.permission.reference.trim() ||
    config.permission.can_import !== true || config.permission.can_copy_images !== true) {
    throw new Error('Partner import and image-copy permissions must be recorded before staging')
  }
  if (!Array.isArray(config.image_hosts) || !config.image_hosts.length) {
    throw new Error('Partner has no approved image hosts')
  }
}

function filter(value) { return encodeURIComponent(String(value)) }

export async function acquireRun(rest, partner, report, resume = false, now = new Date()) {
  const query = `partner_slug=eq.${filter(partner)}&manifest_hash=eq.${filter(report.manifest_hash)}`
  const prior = await rest(`/rest/v1/ha_import_runs?select=*&${query}`)
  if (!Array.isArray(prior)) throw new Error('Invalid import run response')
  if (prior.length > 1) throw new Error('Ambiguous run identity')
  if (prior.length && ['staged', 'approved', 'published'].includes(prior[0].status)) return { run: prior[0], completed: true }
  const active = await rest(`/rest/v1/ha_import_runs?select=id&partner_slug=eq.${filter(partner)}&status=eq.staging`)
  if (!Array.isArray(active) || active.some(row => row.id !== prior[0]?.id)) {
    throw new Error('Another portfolio run is staging for this partner; finish or resume that run first')
  }
  if (!prior.length) {
    const run = { id: randomUUID(), partner_slug: partner, manifest_hash: report.manifest_hash,
      status: 'staging', counts: report.counts, errors: [], warnings: report.warnings ?? [],
      updated_at: now.toISOString() }
    let rows
    try { rows = await rest('/rest/v1/ha_import_runs', { method: 'POST', body: run, prefer: 'return=representation' }) }
    catch (error) {
      if (error?.status === 409) throw new Error('Another worker acquired this partner; refresh the run status')
      throw error
    }
    if (!Array.isArray(rows) || rows.length !== 1) throw new Error('Import run creation was not confirmed; inspect the run ledger before retrying')
    return { run: rows[0], completed: false }
  }
  const existing = prior[0]
  if (existing.status === 'staging') {
    const updated = Date.parse(existing.updated_at)
    if (!resume || !Number.isFinite(updated) || now.getTime() - updated < STALE_LEASE_MS) {
      throw new Error('Run is already staging; use --resume only after its 30-minute lease has expired')
    }
  } else if (existing.status !== 'failed') throw new Error('Run status cannot be resumed')
  const rows = await rest(`/rest/v1/ha_import_runs?id=eq.${filter(existing.id)}&status=eq.${filter(existing.status)}&updated_at=eq.${filter(existing.updated_at)}`, {
    method: 'PATCH', body: { status: 'staging', updated_at: now.toISOString(), errors: [] }, prefer: 'return=representation',
  })
  if (rows.length !== 1) throw new Error('Another worker acquired this import run')
  return { run: rows[0], completed: false }
}

/** Heartbeats and metadata writes share one queue; lease loss cancels media work. */
export function createRunLease(rest, run, {
  clock = Date.now, heartbeatMs = 60_000, schedule = setInterval, unschedule = clearInterval,
} = {}) {
  if (!Number.isFinite(Date.parse(run.updated_at))) throw new Error('Run lease timestamp is invalid')
  if (!Number.isFinite(heartbeatMs) || heartbeatMs < 1 || heartbeatMs >= STALE_LEASE_MS / 2) throw new Error('Invalid heartbeat interval')
  let leaseVersion = run.updated_at
  let queue = Promise.resolve()
  let closed = false
  const controller = new AbortController()
  let timer
  const lose = () => {
    controller.abort()
    if (timer !== undefined) unschedule(timer)
  }
  const assertOwned = () => {
    if (closed || controller.signal.aborted) throw new Error('Import lease is no longer owned by this worker')
    if (clock() - Date.parse(leaseVersion) >= STALE_LEASE_MS) {
      lose()
      throw new Error('Import lease expired; resume the run in a new worker')
    }
  }
  const touch = async body => {
    assertOwned()
    const nextTime = new Date(Math.max(clock(), Date.parse(leaseVersion) + 1)).toISOString()
    const rows = await rest(`/rest/v1/ha_import_runs?id=eq.${filter(run.id)}&status=eq.staging&updated_at=eq.${filter(leaseVersion)}`, {
      method: 'PATCH', body: { ...body, updated_at: nextTime }, prefer: 'return=representation',
    })
    if (!Array.isArray(rows) || rows.length !== 1 || !Number.isFinite(Date.parse(rows[0].updated_at))) {
      lose()
      throw new Error('Import lease lost; stop this worker')
    }
    leaseVersion = rows[0].updated_at
    if (body.status && body.status !== 'staging') {
      closed = true
      if (timer !== undefined) unschedule(timer)
    }
  }
  const enqueue = operation => {
    const result = queue.then(operation)
    queue = result.catch(() => {})
    return result
  }
  const heartbeat = () => enqueue(() => touch({})).catch(() => { lose() })
  timer = schedule(heartbeat, heartbeatMs)
  timer?.unref?.()
  return {
    signal: controller.signal,
    heartbeat,
    write: operation => enqueue(async () => {
      try {
        await touch({})
        assertOwned()
        return await operation()
      } catch (error) { lose(); throw error }
    }),
    finish: body => enqueue(() => touch(body)),
    stop: async () => {
      if (timer !== undefined) unschedule(timer)
      controller.abort()
      await queue
    },
  }
}

async function upsert(rest, table, conflict, rows, lease) {
  if (!rows.length) return
  for (let start = 0; start < rows.length; start += 100) {
    const request = () => rest(`/rest/v1/${table}?on_conflict=${conflict}`, {
      method: 'POST', body: rows.slice(start, start + 100), prefer: 'resolution=merge-duplicates,return=minimal',
    })
    if (lease) await lease.write(request)
    else await request()
  }
}

function imageEntries(property) {
  return [
    ...property.images.map((image, ordinal) => ({ ...image, role: 'property', external_room_id: null, ordinal })),
    ...property.rooms.flatMap(room => room.images.map((image, ordinal) => ({
      ...image, role: 'room', external_room_id: room.external_id, ordinal,
    }))),
  ]
}

export async function stageManifest(manifest, baseline, localConfig, options, rest, settings, mediaWorker = stageImages, leaseOptions = {}) {
  if (manifest?.synthetic === true) throw new Error('Synthetic fixtures cannot be uploaded or staged')
  if (!PARTNERS.has(localConfig?.slug) || manifest?.partner !== localConfig.slug) throw new Error('Manifest partner must exactly match the selected supported partner configuration')
  if (!Array.isArray(baseline?.properties)) throw new Error('Staging requires a catalogue baseline export')
  const rows = await rest(`/rest/v1/ha_import_partners?select=*&slug=eq.${filter(localConfig.slug)}`)
  if (!Array.isArray(rows) || rows.length !== 1 || rows[0].slug !== localConfig.slug) throw new Error('Partner is not registered in import staging')
  const config = configFromRow(rows[0])
  requireStagingPermission(manifest, config)
  const report = auditManifest(manifest, { config, baseline })
  if (report.errors?.length || report.items.some(item => item.status !== 'ready')) {
    throw new Error('Batch validation failed; run dry-run and resolve the reported exceptions')
  }
  const acquired = await acquireRun(rest, config.slug, report, options.resume)
  if (acquired.completed) return { run_id: acquired.run.id, status: acquired.run.status, reused: true, counts: acquired.run.counts }
  const run = acquired.run
  const lease = createRunLease(rest, run, leaseOptions)
  const failures = []
  try {
    await upsert(rest, 'ha_import_items', 'run_id,external_id', report.items.map(item => ({
      run_id: run.id, external_id: item.external_id, payload: item.normalized,
      payload_hash: item.payload_hash, address_key: item.address_key,
      canonical_property_id: item.canonical_property_id ?? null,
      action: item.action, status: 'ready', errors: item.errors, warnings: item.warnings,
      gallery: [], updated_at: new Date().toISOString(),
    })), lease)
    for (const item of report.items) {
      if (lease.signal.aborted) throw new Error('Import lease lost; stop this worker')
      const entries = imageEntries(item.normalized)
      const media = await mediaWorker(entries, {
        partner: config.slug, allowedHosts: config.image_hosts,
        supabaseUrl: settings.url, serverKey: settings.key, bucket: BUCKET, concurrency: 4, signal: lease.signal,
        checkpoint: async asset => {
          await upsert(rest, 'ha_import_media_sources', 'partner_slug,source_url', [{
            partner_slug: config.slug, source_url: asset.sourceUrl, content_hash: asset.sha256,
            bucket: asset.bucket, object_path: asset.path, content_type: asset.contentType,
            size_bytes: asset.byteLength, status: 'uploaded', error: null,
            updated_at: new Date().toISOString(),
          }], lease)
        },
      })
      const gallery = media.assets.map(asset => ({
        ...asset, role: entries[asset.index].role,
        external_room_id: entries[asset.index].external_room_id, ordinal: entries[asset.index].ordinal,
        alt: entries[asset.index].alt ?? null,
      }))
      const itemErrors = media.failures.map(failure => ({ code: failure.code ?? 'image_failed', index: failure.index }))
      if (itemErrors.length) failures.push({ external_id: item.external_id, errors: itemErrors })
      await lease.write(() => rest(`/rest/v1/ha_import_items?run_id=eq.${filter(run.id)}&external_id=eq.${filter(item.external_id)}`, {
        method: 'PATCH', body: { status: itemErrors.length ? 'error' : 'staged', gallery,
          errors: itemErrors, updated_at: new Date().toISOString() }, prefer: 'return=minimal',
      }))
    }
    const status = failures.length ? 'failed' : 'staged'
    await lease.finish({ status, counts: report.counts, errors: failures })
    return { run_id: run.id, status, counts: report.counts, failed_items: failures.length, published: false }
  } catch {
    // Fail only the lease this process still owns. A lost lease cannot overwrite its successor.
    try { await lease.finish({ status: 'failed', errors: [{ code: 'worker_failed' }] }) } catch { /* Preserve newer worker state. */ }
    throw new Error(lease.signal.aborted ? 'Import lease lost or a checkpoint failed; this worker stopped' : 'Import staging failed; inspect the private run record and backend logs')
  } finally {
    await lease.stop()
  }
}

export async function registerPartner(config, rest) {
  if (!PARTNERS.has(config.slug)) throw new Error('Invalid partner slug')
  // New inactive configs only. Never silently overwrite permissions from an existing partner.
  const existing = await rest(`/rest/v1/ha_import_partners?select=slug&slug=eq.${filter(config.slug)}`)
  if (existing.length) return { partner: config.slug, registered: true, changed: false }
  await rest('/rest/v1/ha_import_partners', { method: 'POST', body: {
    slug: config.slug, name: config.name, listing_hosts: config.listing_hosts, image_hosts: config.image_hosts,
    permission_ref: null, active: false, can_import: false, can_copy_images: false, can_republish: false,
  } })
  return { partner: config.slug, registered: true, active: false }
}

export async function setupStorage(rest) {
  const buckets = await rest('/storage/v1/bucket')
  const existing = buckets.find(bucket => bucket.id === BUCKET)
  if (existing) {
    if (existing.public !== false) throw new Error('Import staging bucket must be private')
    return { bucket: BUCKET, created: false, private: true }
  }
  await rest('/storage/v1/bucket', { method: 'POST', body: {
    id: BUCKET, name: BUCKET, public: false, file_size_limit: 5 * 1024 * 1024,
    allowed_mime_types: ['image/jpeg', 'image/png', 'image/webp'],
  } })
  return { bucket: BUCKET, created: true, private: true }
}

export async function main(argv, env = process.env) {
  const { command, options } = parseArguments(argv)
  if (command === 'help' || command === '--help') {
    console.log(`HearthAway partner import\n\n` +
      `partners\n` +
      `dry-run --input manifest.json --config partner.json [--baseline catalogue.json] [--out report.json]\n` +
      `stage --input manifest.json --config partner.json --baseline catalogue.json [--resume] [--out report.json]\n` +
      `register --config partner.json\n` +
      `setup-storage\n\n` +
      `Dry runs are offline. Register creates inactive partner settings. Stage requires recorded backend permissions.\n` +
      `This tool never publishes into the live catalogue.`)
    return 0
  }
  if (command === 'partners') {
    const registry = await jsonFile(resolve(directory, 'partners.json'))
    console.log(JSON.stringify(registry, null, 2))
    return 0
  }
  if (!['dry-run', 'stage', 'register', 'setup-storage'].includes(command)) throw new Error('Unknown command; run help for supported commands')
  const config = command === 'setup-storage' ? null : await jsonFile(requireOption(options, 'config'))
  if (command === 'dry-run' || command === 'stage') {
    const manifest = await jsonFile(requireOption(options, 'input'))
    const baseline = options.baseline ? await jsonFile(options.baseline) : { properties: [] }
    if (command === 'dry-run') {
      const report = auditManifest(manifest, { config, baseline })
      if (!options.baseline) report.warnings.push('No catalogue baseline: existing-property duplicate checks are incomplete')
      const out = options.out ?? resolve(directory, 'work', `${config.slug}-report.json`)
      await reportFile(out, report)
      console.log(JSON.stringify({ partner: report.partner, counts: report.counts, errors: report.errors,
        warnings: report.warnings, report: out, database_writes: 0, image_downloads: 0 }, null, 2))
      return report.errors.length || report.items.some(item => item.status !== 'ready') ? 2 : 0
    }
    requireOption(options, 'baseline')
    const settings = supabaseSettings(env)
    const result = await stageManifest(manifest, baseline, config, options, createRestClient(settings), settings)
    if (options.out) await reportFile(options.out, result)
    console.log(JSON.stringify(result, null, 2))
    return result.status === 'failed' ? 2 : 0
  }
  const settings = supabaseSettings(env)
  const rest = createRestClient(settings)
  const result = command === 'register' ? await registerPartner(config, rest) : await setupStorage(rest)
  console.log(JSON.stringify(result, null, 2))
  return 0
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  main(process.argv.slice(2)).then(code => { process.exitCode = code }).catch(error => {
    console.error(error instanceof Error ? error.message : 'Import failed')
    process.exitCode = 1
  })
}
