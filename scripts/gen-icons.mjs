/**
 * Every raster the app ships, rendered from `public/favicon.svg` — the one source of the
 * mark. Also writes the `assets/` pair that `npx @capacitor/assets generate` expects, so
 * the Android and iOS icons come from the same drawing rather than a second one that
 * drifts.
 *
 * Run after any change to the SVG:  node scripts/gen-icons.mjs
 */
import { mkdir, readFile } from 'node:fs/promises'
import sharp from 'sharp'

const svg = await readFile(new URL('../public/favicon.svg', import.meta.url))
const icons = new URL('../public/icons/', import.meta.url)
const assets = new URL('../assets/', import.meta.url)
await mkdir(icons, { recursive: true })
await mkdir(assets, { recursive: true })

const render = (size) => sharp(svg, { density: 400 }).resize(size, size).png()
const at = (base, name) => new URL(name, base).pathname

/** The icon tile's own background — matches the `rect` in favicon.svg, not the app's surface. */
const INK = '#1f2430'

await render(192).toFile(at(icons, 'icon-192.png'))
await render(512).toFile(at(icons, 'icon-512.png'))
await render(180).flatten({ background: INK }).toFile(at(icons, 'apple-touch-icon.png'))

/*
 * Maskable and native icons get the art inset into the safe zone: Android crops icons to
 * whatever shape the launcher likes, and art drawn to the edge loses its corners.
 */
const inset = async (canvas, art, background) => {
  const inner = await sharp(svg, { density: 400 }).resize(art, art).png().toBuffer()
  const offset = Math.round((canvas - art) / 2)
  return sharp({ create: { width: canvas, height: canvas, channels: 4, background } })
    .composite([{ input: inner, top: offset, left: offset }])
    .png()
}

await (await inset(512, 400, INK)).toFile(at(icons, 'icon-maskable-512.png'))
await (await inset(1024, 800, INK)).toFile(at(assets, 'icon.png'))

/* Splash screens: the mark centred on the page plane of each theme. */
const splash = async (background, file) => {
  const inner = await sharp(svg, { density: 400 }).resize(480, 480).png().toBuffer()
  await sharp({ create: { width: 2732, height: 2732, channels: 4, background } })
    .composite([{ input: inner, top: 1126, left: 1126 }])
    .png()
    .toFile(at(assets, file))
}

await splash('#f9f9f7', 'splash.png')
await splash('#0d0d0d', 'splash-dark.png')

console.log('icons and splash screens generated')
