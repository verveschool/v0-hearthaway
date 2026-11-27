import assert from 'node:assert/strict'
import { existsSync, readFileSync } from 'node:fs'
import { registerHooks } from 'node:module'

const root = new URL('../../', import.meta.url)
registerHooks({
  resolve(specifier, context, nextResolve) {
    const url = specifier.startsWith('@/')
      ? new URL(specifier.slice(2), root)
      : specifier.startsWith('.') && context.parentURL?.startsWith('file:')
        ? new URL(specifier, context.parentURL)
        : null
    if (url && existsSync(new URL(url.href + '.ts'))) return nextResolve(url.href + '.ts', context)
    return nextResolve(specifier, context)
  },
})

const {
  baselineGuideSlugs,
  getCountryMovingAbroadLinks,
  getMovingAbroadCategoryGroups,
  getMovingAbroadHref,
  getRelatedGuides,
  movingAbroadArticles,
} = await import('../../lib/moving-abroad-data.ts')
const { countries } = await import('../../lib/country-data.ts')
const { guideTopics, guideWordCount, paragraphs } = await import('../../content/student-guides/model.ts')
const { reviewedGuides } = await import('../../content/student-guides/index.ts')
const baseline = JSON.parse(readFileSync(new URL('./production-baseline.json', import.meta.url), 'utf8'))

const reviewedSlots = new Set(reviewedGuides.map(({ slug }) => slug))
const baselineSet = new Set(baseline.slugs)
const activeCountries = new Set(countries.map(({ slug }) => slug))
const slugs = new Set(movingAbroadArticles.map(({ slug }) => slug))
const titles = new Set(movingAbroadArticles.map(({ title }) => title.toLowerCase().trim()))
const categorySlugs = getMovingAbroadCategoryGroups().flatMap(({ articles }) => articles.map(({ slug }) => slug))
const articleBySlug = new Map(movingAbroadArticles.map((article) => [article.slug, article]))
const slugFormat = /^[a-z0-9]+(?:-[a-z0-9]+)*$/
const guard = /\b(?:usa|u\.s\.a\.|united states|canada|canadian|mexico|north america|puerto rico|greenland|bermuda|toronto|vancouver|new york|los angeles)\b/i
const bodySignatures = new Set()
const fixedAnchors = ['checklist', 'frequently-asked-questions', 'sources', 'related-guides', 'guide-destinations', 'guide-contents-heading', 'guide-contents-mobile']

assert.equal(slugs.size, movingAbroadArticles.length, 'Duplicate guide slug')
assert.equal(titles.size, movingAbroadArticles.length, 'Duplicate guide title')
assert.deepEqual(baselineGuideSlugs, baseline.slugs, 'Production baseline was modified')
assert.equal(new Set(categorySlugs).size, slugs.size, 'Guide missing from the category index')
assert.equal(reviewedSlots.size, reviewedGuides.length, 'Duplicate rewrite slug')

for (const slug of reviewedSlots) assert(baselineSet.has(slug), `Unknown rewrite slug ${slug}`)
for (const [alias, target] of Object.entries(baseline.aliases)) {
  assert(!slugs.has(alias), `Redirect alias counted as a canonical guide: ${alias}`)
  assert(slugs.has(target), `Missing alias target: ${target}`)
  const page = readFileSync(new URL(`app/moving-abroad/${alias}/page.tsx`, root), 'utf8')
  assert(page.includes(`permanentRedirect('/moving-abroad/${target}')`), `Changed preserved redirect: ${alias}`)
}

function checkSource(href, location) {
  if (href.startsWith('/') && !href.startsWith('//')) {
    const url = new URL(href, 'https://hearthaway.com')
    const match = url.pathname.match(/^\/moving-abroad\/([^/]+)$/)
    if (match) {
      const target = articleBySlug.get(match[1])
      assert(target, `${location}: missing internal guide ${href}`)
      if (url.hash) {
        const anchors = [...fixedAnchors, ...target.body.sections.map(({ id }) => id)]
        assert(anchors.includes(decodeURIComponent(url.hash.slice(1))), `${location}: missing heading ${href}`)
      }
    } else {
      assert(existsSync(new URL(`app${url.pathname}/page.tsx`, root)), `${location}: missing internal page ${href}`)
      assert(!url.hash, `${location}: verify non-guide fragment in the render test: ${href}`)
    }
  } else {
    assert.equal(new URL(href).protocol, 'https:', `${location}: insecure source URL`)
  }
}

for (const { slug, title, description, countries: destinations, topic, tags, wordCount, readTime, body, reviewedOn, related } of movingAbroadArticles) {
  const article = articleBySlug.get(slug)
  const canonical = getMovingAbroadHref(slug)
  assert(slugFormat.test(slug), `Invalid guide slug: ${slug}`)
  assert.equal(canonical, `/moving-abroad/${slug}`)
  assert(title.trim() && description.trim().length >= 45, `${slug}: missing metadata`)
  assert(guideTopics.includes(topic), `${slug}: invalid topic`)
  assert(tags.length && tags.every((tag) => tag.trim()), `${slug}: empty tags`)
  assert(destinations.length && destinations.every((country) => activeCountries.has(country)), `${slug}: invalid destination`)
  assert.equal(new Set(destinations).size, destinations.length, `${slug}: duplicate destination`)
  assert(!guard.test(JSON.stringify({ slug, title, description, destinations, tags, body })), `${slug}: retired destination in public guide`)
  assert.equal(readTime, `${Math.max(1, Math.ceil(wordCount / 220))} min read`, `${slug}: inconsistent read time`)
  for (const related of getRelatedGuides(article)) {
    assert(related.slug !== slug && slugs.has(related.slug), `${slug}: invalid related guide`)
  }
  const words = guideWordCount(body)
  assert.equal(wordCount, words)
  assert(words >= 600, `${slug}: only ${words} words`)
  assert(body.introduction.trim() && body.takeaways.length >= 3 && body.sections.length >= 3 &&
    body.checklist.length >= 4 && body.faq.length >= 3 && body.sources.length >= 1, `${slug}: incomplete guide structure`)
  assert(/^\d{4}-\d{2}-\d{2}$/.test(reviewedOn) && new Date(reviewedOn).toISOString().slice(0, 10) === reviewedOn &&
    new Date(reviewedOn) <= new Date(), `${slug}: invalid substantive review date`)
  assert(related.length >= 2 && new Set(related).size === related.length, `${slug}: insufficient or duplicate related links`)
  const anchorIds = [...fixedAnchors]
  const sourceIds = new Set(body.sources.map(({ id }) => id))
  const usedSources = new Set()

  function checkReferences(ids = []) {
    assert.equal(new Set(ids).size, ids.length, `${slug}: duplicate citation`)
    for (const id of ids) {
      assert(sourceIds.has(id), `${slug}: missing citation target ${id}`)
      usedSources.add(id)
    }
  }

  assert.equal(sourceIds.size, body.sources.length, `${slug}: duplicate source ID`)
  for (const { id, label, href } of body.sources) {
    assert(slugFormat.test(id) && label.trim(), `${slug}: invalid source`)
    checkSource(href, slug)
  }
  for (const { id, title, prose, table, sources } of body.sections) {
    assert(slugFormat.test(id) && title.trim() && paragraphs(prose).join(' ').split(/\s+/).length >= 35, `${slug}#${id}: missing section content`)
    assert(!/\b(?:TODO|TBD|lorem ipsum|coming soon)\b/i.test(prose), `${slug}#${id}: placeholder content`)
    anchorIds.push(id)
    if (table) {
      anchorIds.push(`${id}-table`)
      assert(table.caption.trim() && table.columns.length >= 2 && table.rows.length >= 2 &&
        table.rows.every((row) => row.length === table.columns.length && row.every((cell) => cell.trim())), `${slug}#${id}: malformed table`)
    }
    checkReferences(sources)
  }
  assert.equal(new Set(anchorIds).size, anchorIds.length, `${slug}: duplicate anchor`)
  for (const { question, answer, sources } of body.faq) {
    assert(question.trim() && answer.trim(), `${slug}: empty FAQ entry`)
    checkReferences(sources)
  }
  assert.equal(usedSources.size, sourceIds.size, `${slug}: list includes uncited sources`)
  const signature = body.sections.map(({ prose }) => prose).join('\n')
  assert(!bodySignatures.has(signature), `${slug}: duplicate article body`)
  bodySignatures.add(signature)
}

for (const country of countries) {
  for (const link of getCountryMovingAbroadLinks(country.slug)) {
    assert(slugs.has(link.slug) && link.countries.includes(country.slug), `${country.slug}: invalid guide card ${link.slug}`)
  }
}

const newCount = movingAbroadArticles.filter(({ slug }) => !baselineSet.has(slug)).length
assert(newCount <= 70, `At most 70 additions are in scope, found ${newCount}`)
if (process.argv.includes('--complete') && newCount !== 70) {
  console.error(`Full assignment incomplete: ${newCount}/70 additional guides, ${reviewedSlots.size}/${baseline.slugs.length} rewrites.`)
  process.exitCode = 1
} else if (!process.argv.includes('--matrix')) {
  console.log(`Guide checks passed. ${baseline.slugs.length} existing, ${reviewedSlots.size} substantive rewrites, ${newCount} additions.`)
}

if (process.argv.includes('--matrix')) {
  console.log('Canonical URL,Status,Topic,Destination scope,Words,Substantive review date,Source URLs,Content validation')
  const field = (value) => '"' + String(value).replaceAll('"', '""') + '"'
  for (const article of movingAbroadArticles) {
    const { slug, countries, wordCount, body, reviewedOn, topic } = article
    const sourceUrls = new Set(body.sources.map(({ href }) => href))
    const values = [
      `https://hearthaway.com${getMovingAbroadHref(slug)}`,
      baselineSet.has(slug) ? 'Existing, substantive rewrite' : 'New',
      topic,
      countries.join(' | '),
      wordCount,
      reviewedOn,
      [...sourceUrls].join(' | '),
      'Passed structural checks',
    ]
    console.log(values.map(field).join(','))
  }
}
