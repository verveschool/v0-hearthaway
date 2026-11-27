import { randomUUID } from 'node:crypto'
import { mkdir, readFile, rename, writeFile } from 'node:fs/promises'
import { join } from 'node:path'
import { canonicalHash } from './core.mjs'
import { readScrayeListing, readScrayeGallery } from './adapters/scraye.mjs'

export function acceptPage({ start, end, total, urls }, expected, seen) {
  if (expected !== total || start !== seen.size + 1 || end > total || !urls.length || end - start + 1 !== urls.length)
    throw new Error('Portfolio count or page range changed. Restart discovery.')
  const ids = urls.map(url => {
    const parsed = new URL(url)
    if (parsed.origin !== 'https://agents.scraye.com' || !/^\/listings\/[a-z0-9]+$/.test(parsed.pathname))
      throw new Error('Unexpected listing link')
    return parsed.pathname.split('/').at(-1)
  })
  if (new Set(ids).size !== ids.length || ids.some(id => seen.has(id)))
    throw new Error('Duplicate listing across portfolio pages. Restart discovery.')
  ids.forEach((id, index) => seen.set(id, urls[index]))
}

async function discover(page, expected) {
  const seen = new Map()
  while (seen.size < expected) {
    const start = seen.size + 1
    const range = page.getByText(new RegExp('^' + start + '–[\\d,]+ of [\\d,]+$'))
    const [first, last, total] = (await range.innerText()).replaceAll(',', '').match(/\d+/g).map(Number)
    const urls = await page.getByRole('link', { name: /Listing photos Listing reference/ }).evaluateAll(nodes => nodes.map(node => node.href))
    acceptPage({ start: first, end: last, total, urls }, expected, seen)
    if (seen.size < expected) await page.getByRole('button', { name: 'Next page', exact: true }).click()
  }
  return seen
}

async function atomicJson(file, value) {
  const temporary = file + '.' + randomUUID() + '.tmp'
  await writeFile(temporary, JSON.stringify(value), { mode: 0o600 })
  await rename(temporary, file)
}

// The caller owns the signed-in browser context. Never read its session storage.
export async function capturePortfolio(page, expected, directory) {
  if (!Number.isSafeInteger(expected) || expected < 1) throw new Error('Expected a positive portfolio count')
  const startUrl = page.url()
  const inventory = await discover(page, expected)
  const checkpoint = join(directory, canonicalHash([...inventory].sort()))
  await mkdir(checkpoint, { recursive: true, mode: 0o700 })
  const detail = await page.context().newPage()
  const properties = []
  try {
    for (const [id, url] of inventory) {
      const file = join(checkpoint, id + '.json')
      let record
      try { record = JSON.parse(await readFile(file, 'utf8')) } catch (error) {
        if (error.code !== 'ENOENT') throw error
      }
      const age = Date.now() - Date.parse(record?.rooms?.[0]?.offers?.[0]?.observed_at)
      if (record?.external_id !== id || record.source_url !== url || !(age >= 0 && age < 3600000)) {
        await detail.goto(url)
        await detail.getByRole('region', { name: 'Property actions' }).waitFor()
        record = await detail.evaluate(readScrayeListing)
        if (record.external_id !== id) throw new Error('Unexpected detail page')
        const photos = detail.getByRole('link', { name: /^(View all \d+ photos|Listing photo 1)$/ }).first()
        const photoUrl = new URL(await photos.getAttribute('href'), url)
        if (photoUrl.origin !== 'https://agents.scraye.com' || photoUrl.pathname !== '/listings/' + id + '/photos')
          throw new Error('Missing full gallery link')
        await detail.goto(photoUrl.href)
        await detail.getByRole('link', { name: 'Back to listing' }).waitFor()
        record.images = await detail.evaluate(readScrayeGallery)
        await atomicJson(file, record)
      }
      properties.push(record)
    }
    await page.goto(startUrl)
    const final = await discover(page, expected)
    if ([...inventory].some(([id, url]) => final.get(id) !== url)) throw new Error('Portfolio membership changed during capture')
    const manifest = { schema_version: 1, partner: 'scraye', expected_count: expected, complete: true,
      observed_at: new Date().toISOString(), properties }
    const path = join(checkpoint, 'manifest.json')
    await atomicJson(path, manifest)
    return path
  } finally { await detail.close() }
}

