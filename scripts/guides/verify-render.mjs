import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'

const origin = new URL(process.argv[2] ?? 'http://localhost:3000')
const baseline = JSON.parse(readFileSync(new URL('./production-baseline.json', import.meta.url), 'utf8'))
const guidePath = /^\/moving-abroad\/[a-z0-9-]+$/
const retiredPath = /\/(?:usa|canada|mexico)(?:[/?#"]|$)/i
const retiredText = /\b(?:United States|Canada|Mexico|North America|New York|Toronto|Vancouver)\b/i

async function request(path, options = {}) {
  return fetch(new URL(path, origin), { signal: AbortSignal.timeout(30000), ...options })
}

async function html(path) {
  const result = await request(path)
  assert.equal(result.status, 200, path)
  return (await result.text()).replace(/<script\b[^>]*>[\s\S]*?<\/script>/g, '')
}

function hrefs(markup) {
  return [...markup.matchAll(/<a\b[^>]*\bhref="([^"]+)"/g)].map(([, href]) => href.replaceAll('&amp;', '&'))
}

const sitemap = await request('/sitemap.xml')
assert.equal(sitemap.status, 200)
const sitemapPaths = [...(await sitemap.text()).matchAll(/<loc>([^<]+)<\/loc>/g)].map(([, location]) => new URL(location).pathname)
assert(sitemapPaths.includes('/moving-abroad'), 'Canonical library missing from sitemap')
assert(!sitemapPaths.some((path) => retiredPath.test(path)), 'Retired destination in sitemap')
const guidePaths = sitemapPaths.filter((path) => guidePath.test(path))
assert.equal(new Set(guidePaths).size, guidePaths.length, 'Duplicate canonical article URLs')
for (const slug of baseline.slugs) assert(guidePaths.includes('/moving-abroad/' + slug), 'Existing article missing: ' + slug)

for (const [alias, target] of Object.entries(baseline.aliases)) {
  const path = '/moving-abroad/' + alias
  const response = await request(path, { redirect: 'manual' })
  assert.equal(response.status, 308, path)
  assert.equal(new URL(response.headers.get('location'), origin).pathname, '/moving-abroad/' + target)
  assert(!guidePaths.includes(path), 'Alias should not be a canonical article')
}

for (const root of ['/moving-abroad', '/all-resources']) {
  const discovered = new Set()
  const pending = [root]
  const tested = new Set()
  while (pending.length) {
    const page = pending.shift()
    if (tested.has(page)) continue
    tested.add(page)
    const markup = await html(page)
    assert.match(markup, /<link rel="canonical" href="https:\/\/hearthaway\.com\/moving-abroad"/)
    const results = markup.match(/<section aria-labelledby="resource-results"[\s\S]+?<\/section>/)?.[0]
    assert(results, 'Library results missing on ' + page)
    for (const link of hrefs(results)) {
      if (guidePath.test(link)) discovered.add(link)
      if (link.startsWith(root + '?page=')) pending.push(link)
    }
  }

  assert.deepEqual([...discovered].sort(), [...guidePaths].sort(), root + ' index differs from sitemap')
  console.log(root + ' discovers all ' + discovered.size + ' guides through ' + tested.size + ' pages')
}

const actionPaths = new Set()
for (let index = 0; index < guidePaths.length; index += 5) {
  const batch = await Promise.all(guidePaths.slice(index, index + 5).map(async (path) => [path, await html(path)]))
  for (const [path, markup] of batch) {
    const article = markup.match(/<article\b[^>]*>[\s\S]+?<\/article>/)?.[0]
    assert(article, path + ' has no rendered content')
    assert(markup.includes('rel="canonical" href="https://hearthaway.com' + path + '"'), path + ' has wrong canonical')
    assert.match(markup, /<meta name="description" content="[^"]+"/)
    assert.match(markup, /<time dateTime="\d{4}-\d{2}-\d{2}">/i)
    assert(!retiredText.test(article) && !retiredPath.test(markup), path + ' mentions a retired destination')
    const idList = [...markup.matchAll(/\sid="([^"]+)"/g)].map(([, id]) => id)
    const ids = new Set(idList)
    for (const id of ['guide-contents-heading', 'guide-contents-mobile', 'checklist', 'frequently-asked-questions', 'sources', 'related-guides']) {
      assert(ids.has(id), path + ' missing ' + id)
    }
    for (const fragment of new Set(hrefs(markup).filter((link) => link.startsWith('#')))) {
      assert.equal(idList.filter((id) => id === fragment.slice(1)).length, 1, path + fragment + ' must have one target')
    }
    for (const link of hrefs(article).filter((href) => href.startsWith('/'))) {
      if (guidePath.test(link)) assert(guidePaths.includes(link), path + ' links to an unknown guide')
      actionPaths.add(link)
    }
    const action = markup.match(/<main[^>]*>\s*<header\b[\s\S]+?<\/header>/)?.[0]
    assert(action, path + ' is missing the banner action')
    for (const destination of hrefs(action)) actionPaths.add(destination)
  }
}

for (const path of actionPaths) {
  if (!guidePaths.includes(path)) await html(path)
}

const invalid = await request('/moving-abroad/this-guide-does-not-exist', { redirect: 'manual' })
assert.equal(invalid.status, 404)
console.log('Rendered ' + guidePaths.length + ' canonical guides. Metadata, fragments, internal links, CTA destinations and redirects passed.')
