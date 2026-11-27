import test from 'node:test'
import assert from 'node:assert/strict'
import { mkdtemp, readFile, writeFile, stat, rm } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { spawnSync } from 'node:child_process'
import {
  acquireRun, createRestClient, createRunLease, parseArguments, registerPartner,
  requireStagingPermission, setupStorage, stageManifest, supabaseSettings,
} from './cli.mjs'
import { auditManifest } from './core.mjs'

const projectRef = 'abcdefghijklmnopqrst'
const settings = { url: `https://${projectRef}.supabase.co`, key: 'sb_secret_SYNTHETIC_TEST_ONLY' }
const config = {
  slug: 'scraye', name: 'Scraye', listing_hosts: ['www.scraye.com'], image_hosts: ['assets.scraye.com'],
  active: true, permission: { reference: 'synthetic-unit-test-record', can_import: true, can_republish: false, can_copy_images: true },
}
const partnerRow = () => ({
  slug: config.slug, name: config.name, listing_hosts: config.listing_hosts,
  image_hosts: config.image_hosts, active: config.active, permission_ref: config.permission.reference,
  can_import: true, can_republish: false, can_copy_images: true,
})

function manifest() {
  const observed = new Date(Date.now() - 60_000).toISOString()
  return {
    schema_version: 1, partner: 'scraye', complete: true, expected_count: 1, observed_at: observed,
    properties: [{
      external_id: 'TEST-P1', source_url: 'https://www.scraye.com/listings/test-1', name: 'Test only',
      address: 'Flat 1, 20 Example Street', postcode: 'AB1 2CD', city: 'London', country: 'GB',
      images: [{ url: 'https://assets.scraye.com/test-1.jpg', alt: 'Fixture' }],
      rooms: [{ external_id: 'TEST-R1', name: 'Test room', images: [], offers: [
        { external_id: 'TEST-O1', price_minor: 100000, currency: 'GBP', period: 'month', observed_at: observed },
      ] }],
    }],
  }
}

function backend({ partners = [partnerRow()], runs = [], buckets = [] } = {}) {
  const state = { partners: structuredClone(partners), runs: structuredClone(runs), items: [], media: [], buckets: structuredClone(buckets), calls: [] }
  const rest = async (path, options = {}) => {
    const method = options.method ?? 'GET'
    state.calls.push({ path, method, body: structuredClone(options.body) })
    const url = new URL(`https://backend.invalid${path}`)
    const filters = [...url.searchParams.entries()].filter(([, value]) => value.startsWith('eq.'))
    const matches = row => filters.every(([key, value]) => String(row[key]) === value.slice(3))
    let collection
    if (url.pathname === '/rest/v1/ha_import_partners') collection = state.partners
    else if (url.pathname === '/rest/v1/ha_import_runs') collection = state.runs
    else if (url.pathname === '/rest/v1/ha_import_items') collection = state.items
    else if (url.pathname === '/rest/v1/ha_import_media_sources') collection = state.media
    else if (url.pathname === '/storage/v1/bucket') collection = state.buckets
    else throw new Error('Unexpected test backend endpoint')
    if (method === 'GET') return structuredClone(collection.filter(matches))
    if (method === 'PATCH') {
      const rows = collection.filter(matches)
      for (const row of rows) Object.assign(row, structuredClone(options.body))
      return options.prefer === 'return=minimal' ? null : structuredClone(rows)
    }
    if (method === 'POST') {
      const values = Array.isArray(options.body) ? options.body : [options.body]
      const conflict = url.searchParams.get('on_conflict')?.split(',')
      for (const value of values) {
        if (collection === state.runs && state.runs.some(row => row.partner_slug === value.partner_slug
          && (row.manifest_hash === value.manifest_hash || row.status === 'staging'))) {
          const error = new Error('Synthetic unique constraint conflict')
          error.status = 409
          throw error
        }
        const existing = conflict && collection.find(row => conflict.every(key => row[key] === value[key]))
        if (existing) Object.assign(existing, structuredClone(value))
        else collection.push(structuredClone(value))
      }
      return options.prefer === 'return=representation' ? structuredClone(values) : null
    }
    throw new Error('Unexpected test method')
  }
  return { state, rest }
}

function noTimer() {
  let callback
  let cleared = false
  return {
    schedule: fn => { callback = fn; return { unref() {} } },
    unschedule: () => { cleared = true },
    tick: async () => { if (!cleared) await callback() },
  }
}

async function verifiedMedia(entries, options) {
  const assets = []
  for (const [index, image] of entries.entries()) {
    const asset = {
      index, sourceUrl: image.url, sha256: 'a'.repeat(64), contentType: 'image/jpeg', extension: 'jpg',
      byteLength: 1024, bucket: 'ha-import-staging', path: `scraye/${'a'.repeat(64)}.jpg`, status: 'uploaded',
    }
    await options.checkpoint(asset)
    assets.push(asset)
  }
  return { assets, failures: [] }
}

const emptyBaseline = { properties: [] }
const writes = state => state.calls.filter(call => call.method !== 'GET')
const report = hash => ({ manifest_hash: hash.repeat(64), counts: { create: 1 }, warnings: [] })

test('argument parsing rejects duplicates and never echoes unknown credential-like arguments', () => {
  assert.deepEqual(parseArguments(['stage', '--input', 'input.json', '--resume']), {
    command: 'stage', options: { input: 'input.json', resume: true },
  })
  assert.throws(() => parseArguments(['dry-run', '--input', 'one', '--input', 'two']), /Repeated option/)
  assert.throws(() => parseArguments(['dry-run', '--input']), /Missing value/)
  assert.throws(() => parseArguments(['stage', '--server-key=DO_NOT_ECHO']), error => !error.message.includes('DO_NOT_ECHO'))
})

test('project credentials require the intended Supabase origin and a server key', () => {
  const env = { HEARTHAWAY_IMPORT_SUPABASE_URL: settings.url, HEARTHAWAY_IMPORT_SERVER_KEY: settings.key, HEARTHAWAY_IMPORT_PROJECT_REF: projectRef }
  assert.deepEqual(supabaseSettings(env), settings)
  for (const url of ['https://evil.example', `${settings.url}/rest/v1`, `https://user:secret@${projectRef}.supabase.co`, `${settings.url}?secret=DO_NOT_ECHO`]) {
    assert.throws(() => supabaseSettings({ ...env, HEARTHAWAY_IMPORT_SUPABASE_URL: url }), error => !error.message.includes('DO_NOT_ECHO'))
  }
  assert.throws(() => supabaseSettings({ ...env, HEARTHAWAY_IMPORT_PROJECT_REF: 'wrong' }), /must match/)
  assert.throws(() => supabaseSettings({ ...env, HEARTHAWAY_IMPORT_SERVER_KEY: 'sb_publishable_DO_NOT_ECHO' }), /server-only/)
  const publicJwt = `eyJ0eXAiOiJKV1QifQ.${Buffer.from(JSON.stringify({ role: 'anon' })).toString('base64url')}.signature`
  assert.throws(() => supabaseSettings({ ...env, HEARTHAWAY_IMPORT_SERVER_KEY: publicJwt }), /server-only/)
})

test('REST client refuses live catalogue endpoints and does not echo backend error bodies', async () => {
  const calls = []
  const rest = createRestClient(settings, async (url, options) => {
    calls.push({ url, options })
    return new Response('DO_NOT_ECHO_SERVER_KEY_OR_URL', { status: 403 })
  })
  await assert.rejects(rest('/rest/v1/ha_catalogue_properties', { method: 'POST', body: {} }), /Unsupported/)
  assert.equal(calls.length, 0)
  await assert.rejects(rest('/rest/v1/ha_import_partners'), error => error.status === 403 && !error.message.includes('DO_NOT_ECHO'))
  assert.equal(calls[0].options.redirect, 'error')
  assert.equal(calls[0].options.headers.apikey, settings.key)
  assert.equal(calls[0].options.headers.Authorization, undefined)
  const malformed = createRestClient(settings, async () => new Response('invalid DO_NOT_ECHO', { status: 200 }))
  await assert.rejects(malformed('/rest/v1/ha_import_partners'), error => error.message === 'Backend returned an invalid JSON response')
})

test('synthetic and wrong-partner manifests are rejected before any backend access', async () => {
  for (const input of [{ ...manifest(), synthetic: true }, { ...manifest(), partner: 'housing-anywhere' }]) {
    const { state, rest } = backend()
    await assert.rejects(stageManifest(input, emptyBaseline, config, {}, rest, settings, verifiedMedia))
    assert.equal(state.calls.length, 0)
  }
})

test('backend permissions and partner identity override permissive local config', async () => {
  const disabled = backend({ partners: [{ ...partnerRow(), can_import: false }] })
  await assert.rejects(stageManifest(manifest(), emptyBaseline, config, {}, disabled.rest, settings, verifiedMedia), /permissions/)
  assert.equal(writes(disabled.state).length, 0)
  const wrong = backend({ partners: [{ ...partnerRow(), slug: 'housing-anywhere' }] })
  await assert.rejects(stageManifest(manifest(), emptyBaseline, config, {}, wrong.rest, settings, verifiedMedia), /registered/)
  assert.equal(writes(wrong.state).length, 0)
  assert.throws(() => requireStagingPermission(manifest(), { ...config, active: 'true' }), /permissions/)
  assert.throws(() => requireStagingPermission(manifest(), { ...config, permission: { ...config.permission, reference: ' ' } }), /permissions/)
})

test('backend host allowlist is authoritative and invalid batch never creates a run', async () => {
  const store = backend({ partners: [{ ...partnerRow(), image_hosts: ['approved.example.com'] }] })
  await assert.rejects(stageManifest(manifest(), emptyBaseline, config, {}, store.rest, settings, verifiedMedia), /Batch validation failed/)
  assert.equal(writes(store.state).length, 0)
  const partial = backend()
  await assert.rejects(stageManifest({ ...manifest(), complete: false }, emptyBaseline, config, {}, partial.rest, settings, verifiedMedia), /Batch validation failed/)
  assert.equal(writes(partial.state).length, 0)
})

test('private staging checkpoints media and metadata but never publishes or converts rent', async () => {
  const store = backend()
  const timers = noTimer()
  const result = await stageManifest(manifest(), emptyBaseline, config, {}, store.rest, settings, verifiedMedia, timers)
  assert.equal(result.status, 'staged')
  assert.equal(result.published, false)
  assert.equal(store.state.runs.length, 1)
  assert.equal(store.state.items.length, 1)
  assert.equal(store.state.media.length, 1)
  assert.equal(store.state.items[0].payload.rooms[0].offers[0].period, 'month')
  assert.equal(store.state.items[0].payload.rooms[0].offers[0].price_minor, 100000)
  assert.equal(store.state.items[0].gallery[0].ordinal, 0)
  assert.equal(store.state.items[0].gallery[0].role, 'property')
  assert.ok(writes(store.state).every(call => call.path.startsWith('/rest/v1/ha_import_')))
  assert.ok(writes(store.state).every(call => !['approved', 'published'].includes(call.body?.status)))
})

test('completed rerun reuses its run without image downloads or writes', async () => {
  const input = manifest()
  const store = backend()
  await stageManifest(input, emptyBaseline, config, {}, store.rest, settings, verifiedMedia, noTimer())
  store.state.calls.length = 0
  let mediaCalls = 0
  const result = await stageManifest(input, emptyBaseline, config, {}, store.rest, settings, async () => { mediaCalls++; throw new Error('Must not run') }, noTimer())
  assert.equal(result.reused, true)
  assert.equal(result.status, 'staged')
  assert.equal(mediaCalls, 0)
  assert.equal(writes(store.state).length, 0)
})

test('media failures retain staged successes and record a failed run without raw source URLs', async () => {
  const store = backend()
  const result = await stageManifest(manifest(), emptyBaseline, config, {}, store.rest, settings, async () => ({
    assets: [], failures: [{ index: 0, code: 'IMAGE_HTTP_ERROR', sourceUrl: 'https://secret.example/?token=DO_NOT_ECHO', message: 'DO_NOT_ECHO' }],
  }), noTimer())
  assert.equal(result.status, 'failed')
  assert.equal(result.failed_items, 1)
  assert.equal(store.state.items[0].status, 'error')
  assert.equal(store.state.runs[0].status, 'failed')
  assert.equal(JSON.stringify(store.state.runs[0].errors).includes('DO_NOT_ECHO'), false)
})

test('active lease blocks overlapping same-manifest and different-manifest workers', async () => {
  const now = new Date()
  const active = { id: 'run-1', partner_slug: 'scraye', manifest_hash: 'a'.repeat(64), status: 'staging', updated_at: now.toISOString() }
  const same = backend({ runs: [active] })
  await assert.rejects(acquireRun(same.rest, 'scraye', report('a'), true, now), /lease has expired/)
  assert.equal(writes(same.state).length, 0)
  const other = backend({ runs: [active] })
  await assert.rejects(acquireRun(other.rest, 'scraye', report('b'), true, now), /Another portfolio run/)
  assert.equal(writes(other.state).length, 0)
})

test('stale same-run acquisition is optimistic and exactly one competing worker wins', async () => {
  const now = new Date()
  const store = backend({ runs: [{ id: 'run-1', partner_slug: 'scraye', manifest_hash: 'a'.repeat(64), status: 'staging', updated_at: new Date(now.getTime() - 31 * 60_000).toISOString() }] })
  const results = await Promise.allSettled([
    acquireRun(store.rest, 'scraye', report('a'), true, now),
    acquireRun(store.rest, 'scraye', report('a'), true, now),
  ])
  assert.equal(results.filter(result => result.status === 'fulfilled').length, 1)
  assert.equal(results.filter(result => result.status === 'rejected').length, 1)
})

test('database partial uniqueness closes the race between two new partner manifests', async () => {
  const store = backend()
  const results = await Promise.allSettled([
    acquireRun(store.rest, 'scraye', report('a')),
    acquireRun(store.rest, 'scraye', report('b')),
  ])
  assert.equal(results.filter(result => result.status === 'fulfilled').length, 1)
  assert.equal(results.filter(result => result.status === 'rejected').length, 1)
  assert.equal(store.state.runs.length, 1)
})

test('lease refreshes serialize and a lost lease aborts subsequent metadata writes', async () => {
  const now = Date.now()
  const run = { id: 'run-1', partner_slug: 'scraye', status: 'staging', updated_at: new Date(now).toISOString() }
  const store = backend({ runs: [run] })
  const timers = noTimer()
  const lease = createRunLease(store.rest, run, { ...timers, clock: () => now + 1000 })
  let writesCount = 0
  await Promise.all([lease.write(async () => { writesCount++ }), lease.write(async () => { writesCount++ })])
  assert.equal(writesCount, 2)
  store.state.runs[0].updated_at = new Date(now + 60_000).toISOString()
  await timers.tick()
  assert.equal(lease.signal.aborted, true)
  await assert.rejects(lease.write(async () => { writesCount++ }), /no longer owned/)
  assert.equal(writesCount, 2)
  await lease.stop()
})

test('a paused worker refuses to refresh an already-expired lease', async () => {
  const now = Date.now()
  const run = { id: 'run-1', status: 'staging', updated_at: new Date(now).toISOString() }
  const store = backend({ runs: [run] })
  const lease = createRunLease(store.rest, run, { ...noTimer(), clock: () => now + 31 * 60_000 })
  await assert.rejects(lease.write(async () => assert.fail('No write allowed')), /expired/)
  assert.equal(writes(store.state).length, 0)
  assert.equal(lease.signal.aborted, true)
  await lease.stop()
})

test('heartbeat keeps a property taking over 30 minutes alive and media sees cancellation', async () => {
  let now = Date.now()
  const store = backend()
  const timers = noTimer()
  const result = await stageManifest(manifest(), emptyBaseline, config, {}, store.rest, settings, async (entries, options) => {
    for (let minute = 0; minute < 40; minute++) {
      now += 60_000
      await timers.tick()
      assert.equal(options.signal.aborted, false)
    }
    return verifiedMedia(entries, options)
  }, { ...timers, clock: () => now })
  assert.equal(result.status, 'staged')
  assert.ok(store.state.calls.filter(call => call.method === 'PATCH' && call.path.startsWith('/rest/v1/ha_import_runs')).length >= 40)
})

test('lease loss during media staging aborts worker without changing its successor', async () => {
  const store = backend()
  const timers = noTimer()
  await assert.rejects(stageManifest(manifest(), emptyBaseline, config, {}, store.rest, settings, async (_entries, options) => {
    store.state.runs[0].updated_at = new Date(Date.now() + 60_000).toISOString()
    await timers.tick()
    assert.equal(options.signal.aborted, true)
    await options.checkpoint({ sourceUrl: 'https://assets.scraye.com/test-1.jpg' })
    assert.fail('Checkpoint should stop')
  }, timers), /worker stopped/)
  assert.equal(store.state.runs[0].status, 'staging')
  assert.equal(store.state.media.length, 0)
})

test('registration never promotes local permissions or overwrites an existing partner', async () => {
  const fresh = backend({ partners: [] })
  const result = await registerPartner(config, fresh.rest)
  assert.equal(result.active, false)
  assert.equal(fresh.state.partners[0].can_import, false)
  assert.equal(fresh.state.partners[0].can_copy_images, false)
  assert.equal(fresh.state.partners[0].can_republish, false)
  assert.equal(fresh.state.partners[0].permission_ref, null)
  fresh.state.calls.length = 0
  await registerPartner(config, fresh.rest)
  assert.equal(writes(fresh.state).length, 0)
})

test('storage setup creates only a private dedicated bucket and rejects a public one', async () => {
  const fresh = backend()
  await setupStorage(fresh.rest)
  assert.equal(fresh.state.buckets[0].id, 'ha-import-staging')
  assert.equal(fresh.state.buckets[0].public, false)
  const publicStore = backend({ buckets: [{ id: 'ha-import-staging', public: true }] })
  await assert.rejects(setupStorage(publicStore.rest), /must be private/)
  assert.equal(writes(publicStore.state).length, 0)
})

test('offline synthetic audit succeeds, saves a private report, and publish command does not exist', async () => {
  const folder = await mkdtemp(join(tmpdir(), 'ha-cli-test-'))
  try {
    const input = { ...manifest(), synthetic: true }
    const file = join(folder, 'input.json')
    const configPath = join(folder, 'config.json')
    const output = join(folder, 'report.json')
    await writeFile(file, JSON.stringify(input))
    await writeFile(configPath, JSON.stringify(config))
    await writeFile(output, '{}', { mode: 0o644 })
    const cli = fileURLToPath(new URL('./cli.mjs', import.meta.url))
    const result = spawnSync(process.execPath, [cli, 'dry-run', '--input', file, '--config', configPath, '--out', output], { encoding: 'utf8', env: { PATH: process.env.PATH } })
    assert.equal(result.status, 0, result.stderr)
    const log = JSON.parse(result.stdout)
    assert.equal(log.database_writes, 0)
    assert.equal(log.image_downloads, 0)
    const saved = JSON.parse(await readFile(output, 'utf8'))
    assert.equal(saved.items[0].status, 'ready')
    assert.ok(saved.warnings.some(warning => warning.includes('Synthetic fixture')))
    assert.equal((await stat(output)).mode & 0o777, 0o600)
    const publish = spawnSync(process.execPath, [cli, 'publish'], { encoding: 'utf8', env: { PATH: process.env.PATH } })
    assert.equal(publish.status, 1)
    assert.match(publish.stderr, /Unknown command/)
  } finally { await rm(folder, { recursive: true, force: true }) }
})

test('synthetic marker has a strict boolean type and cannot bypass the stage guard', () => {
  const input = { ...manifest(), synthetic: 'true' }
  const result = auditManifest(input, { config, baseline: emptyBaseline })
  assert.ok(result.errors.some(error => error.includes('manifest.synthetic')))
  assert.throws(() => requireStagingPermission({ ...input, synthetic: true }, config), /Synthetic/)
})

test('exact retry preserves completed property receipts and transfers only failed properties', async () => {
  const store = backend()
  const input = manifest()
  const second = structuredClone(input.properties[0])
  second.external_id += '-second'
  second.source_url += '-second'
  second.address = '42 Second Street'
  input.properties.push(second)
  input.expected_count = 2
  let calls = 0
  const first = await stageManifest(input, emptyBaseline, config, {}, store.rest, settings, async (entries, options) => {
    calls++
    if (calls === 2) return { assets: [], failures: [{ index: 0, code: 'IMAGE_HTTP_ERROR' }] }
    return verifiedMedia(entries, options)
  }, noTimer())
  assert.equal(first.status, 'failed')
  const firstReceipt = structuredClone(store.state.items[0])
  calls = 0
  const retried = await stageManifest(input, emptyBaseline, config, {}, store.rest, settings, async (entries, options) => {
    calls++
    return verifiedMedia(entries, options)
  }, noTimer())
  assert.equal(retried.status, 'staged')
  assert.equal(calls, 1)
  assert.deepEqual(store.state.items[0], firstReceipt)
})
