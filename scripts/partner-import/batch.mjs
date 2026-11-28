// One portfolio per invocation. Keep all captures outside version control.
import { mkdir, mkdtemp, readFile, writeFile } from 'node:fs/promises'
import { spawn } from 'node:child_process'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { housingAnywhereManifest } from './adapters/housing-anywhere.mjs'
import { main } from './cli.mjs'
import { capturePortfolio } from './scraye-portfolio.mjs'

const directory = dirname(fileURLToPath(import.meta.url))
const [mode, partner, baseline, output, resultsUrl, expected] = process.argv.slice(2)
if (!['dry-run', 'stage'].includes(mode) || !['scraye', 'campus-living-villages', 'housing-anywhere'].includes(partner) || !baseline || !output)
  throw new Error('Usage: batch.mjs dry-run|stage PARTNER BASELINE PRIVATE_DIRECTORY [RESULTS_URL EXPECTED_COUNT | OUTBOUND_JSON APPROVED_MAPPING_JSON]')
const root = resolve(output)
await mkdir(root, { recursive: true, mode: 0o700 })
const run = await mkdtemp(join(root, partner + '-'))
let manifest = join(run, 'manifest.json')
if (partner === 'campus-living-villages') {
  await new Promise((accept, reject) => {
    const child = spawn('python3', [join(directory, 'adapters/clv.py'), '--out', manifest], { stdio: 'inherit' })
    child.on('error', reject)
    child.on('exit', code => code === 0 ? accept() : reject(new Error('Village extraction failed')))
  })
} else if (partner === 'housing-anywhere') {
  if (!resultsUrl || !expected) throw new Error('Supply the delivered outbound JSON file and its approved field mapping')
  const [feed, mapping] = await Promise.all([resultsUrl, expected].map(async path => JSON.parse(await readFile(path, 'utf8'))))
  await writeFile(manifest, JSON.stringify(housingAnywhereManifest(feed, mapping)), { mode: 0o600 })
} else {
  if (new URL(resultsUrl).origin !== 'https://agents.scraye.com') throw new Error('Expected a Scraye portal URL')
  const { chromium } = await import(process.env.HEARTHAWAY_PLAYWRIGHT_MODULE || 'playwright')
  const browser = await chromium.launch({ headless: false })
  try {
    const page = await browser.newPage()
    await page.goto(resultsUrl)
    console.log('Sign in and select the first England results page in the browser.')
    await page.getByText(/^1–[\d,]+ of [\d,]+$/).waitFor({ timeout: 300000 })
    manifest = await capturePortfolio(page, Number(expected), root)
  } finally { await browser.close() }
}
const config = join(directory, 'configs', partner + '.json')
await readFile(baseline)
const options = ['--config', config, '--baseline', baseline, '--input', manifest]
const report = join(run, 'review.json')
process.exitCode = await main(['dry-run', ...options, '--out', report])
if (mode === 'stage' && process.exitCode === 0)
  process.exitCode = await main(['stage', ...options, '--out', join(run, 'stage.json')])
