/* Generate static image variants at build time. Original files remain untouched. */
import fs from 'node:fs/promises'
import path from 'node:path'
import { createRequire } from 'node:module'
import { fileURLToPath } from 'node:url'

// Next.js already depends on sharp; resolve it through Next's package so pnpm's
// isolated dependency layout works without adding a separate dependency.
const resolveFromHere = createRequire(import.meta.url)
const requireFromNext = createRequire(resolveFromHere.resolve('next/package.json'))
const sharp = requireFromNext('sharp')
sharp.concurrency(1)

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const publicDir = path.join(root, 'public')
const directories = ['accommodation', 'iglu', 'neonwood', 'stacey', 'studyinn', 'tannhaus']
const variants = [{ name: 'card', width: 768 }, { name: 'detail', width: 1440 }]

async function walk(directory) {
  const entries = await fs.readdir(directory, { withFileTypes: true })
  const files = await Promise.all(entries.map((entry) => {
    const file = path.join(directory, entry.name)
    if (entry.isDirectory()) return walk(file)
    return entry.isFile() && /\.(?:jpe?g|png|webp)$/i.test(entry.name) ? [file] : []
  }))
  return files.flat()
}

async function makePhoto(file) {
  const relative = path.relative(publicDir, file)
  const sourceStat = await fs.stat(file)
  for (const variant of variants) {
    const target = path.join(publicDir, 'catalogue-media', variant.name, `${relative}.webp`)
    const existing = await fs.stat(target).catch((error) => {
      if (error.code === 'ENOENT') return null
      throw error
    })
    if (existing && existing.mtimeMs >= sourceStat.mtimeMs) continue
    await fs.mkdir(path.dirname(target), { recursive: true })
    const temporary = `${target}.tmp`
    await sharp(file).rotate().resize({ width: variant.width, withoutEnlargement: true })
      .webp({ quality: 75, effort: 3 }).toFile(temporary)
    await fs.rename(temporary, target)
  }
}

async function main() {
  const files = (await Promise.all(directories.map((name) => walk(path.join(publicDir, name))))).flat()
  let next = 0
  // Two workers keep memory use bounded on the Vercel Hobby build machine.
  await Promise.all(Array.from({ length: 2 }, async () => {
    while (next < files.length) await makePhoto(files[next++])
  }))

  const brandDir = path.join(publicDir, 'brand-optimized')
  await fs.mkdir(brandDir, { recursive: true })
  for (const [source, target, width] of [
    ['  hearthaway_icon_light.png', 'icon-light.png', 256],
    ['  hearthaway-icon-dark.png', 'icon-dark.png', 256],
    ['hearthaway_branding.png', 'wordmark.png', 720],
  ]) {
    await sharp(path.join(publicDir, 'brand', source)).resize({ width, withoutEnlargement: true })
      .png({ compressionLevel: 9 }).toFile(path.join(brandDir, target))
  }
  console.log(`Generated static image variants for ${files.length} catalogue files and three brand assets.`)
}

main().catch((error) => { console.error('Image preparation failed:', error); process.exitCode = 1 })
