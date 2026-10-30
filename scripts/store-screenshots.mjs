/**
 * The store screenshots: docs/store/screenshots/ios-6.9 (1320×2868, light) and android
 * (1080×2400, dark), five screens each, and ipad-13 (2064×2752, light), four; and Google
 * Play's docs/store/feature-graphic-1024x500.png.
 *
 *   npm i --no-save playwright && npx playwright install chromium
 *   node scripts/store-screenshots.mjs
 *
 * or, with a Playwright that is already on the machine:
 *
 *   PLAYWRIGHT=/path/to/node_modules/playwright node scripts/store-screenshots.mjs
 *
 * It starts its own Vite dev server and opens the app in a fresh profile per set, so the
 * inputs are the defaults (DEFAULTS in src/store/settings.ts): 100 a month at 8 % a year,
 * 2 % dividends, ten years, in euros. Ordinary on purpose, for the same reason the app
 * opens on them: a store screenshot is a claim, and a big number reads as a promise. The
 * first shot keeps "a projection, not a forecast" in view under the figure. One shot
 * sets the return to -5 % a year through the store's own `setIncome`, the call the Return
 * field makes, to show that a loss is modelled too. The iPad, which fits the summary, the
 * inputs and the chart on one screen, adds the dark theme over twenty years and the log
 * scale over thirty instead of scrolling down the page.
 *
 * There is no shot of the converter. Its fields are `type="number"`, and Chromium on a Mac
 * draws those in the Mac's own region format whatever the page's language or the
 * context's locale: on a Mac set to a comma region the rates come out as "1,1162" in an
 * English listing, which no iPhone would show. Neither `--lang` nor `lang` attributes
 * change that.
 *
 * The clock is pinned; Global Privacy Control is on, so the metrics notice stays away;
 * `?from=app` hides the donation links the way the native build does. The usage ping is
 * blocked at the network as well, because the phones' last shot turns the switch on: that
 * is where a fresh install of the app starts. The exchange-rate request goes out as it does
 * in the app; nothing shown depends on it.
 *
 * The phone sets get the status bar (and on Android the gesture bar) lifted from the
 * simulators in docs/store/frame/. On the iPhone the web view runs under the status bar,
 * so the insets are emulated and the bar is laid over the sticky masthead's padding;
 * Android insets the web view and paints the bars itself (see applyStatusBar in
 * src/native.ts), so there they are strips of their own above and below the page. The
 * iPad set has no bars.
 */
import { spawn } from 'node:child_process'
import { mkdirSync, readFileSync } from 'node:fs'
import { createRequire } from 'node:module'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const require = createRequire(import.meta.url)
const { chromium } = require(process.env.PLAYWRIGHT ?? 'playwright')
const sharp = require('sharp')

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..')
const OUT = join(ROOT, 'docs/store/screenshots')
const FRAME = join(ROOT, 'docs/store/frame')
const PORT = Number(process.env.PORT ?? 5197)
const BASE = `http://localhost:${PORT}/?from=app`
const NOW = new Date('2026-10-29T10:00:00')

const section = (id) => `section[aria-labelledby="${id}-heading"]`
const LOSS = -5 // % a year
const SWITCH_ON = (page) => page.getByRole('switch').check()

/** On a phone the page is one long column, so each shot is a stop on the way down it. */
const PHONE_SHOTS = [
  // First, because it says what the app is: the projected figure, what was paid in, what
  // was earned, and the line that it is a projection.
  { name: '01-projection', at: 'top' },
  { name: '02-plan', at: section('controls') },
  { name: '03-chart', at: section('chart') },
  { name: '04-loss', at: 'top', income: LOSS },
  { name: '05-settings', at: 'bottom', act: SWITCH_ON },
]

/** The iPad holds the summary, the inputs and the chart on one screen. */
const IPAD_SHOTS = [
  { name: '01-projection', at: 'top' },
  { name: '02-loss', at: 'top', income: LOSS },
  { name: '03-dark', at: 'top', set: { theme: 'dark', years: 20 } },
  { name: '04-log', at: 'top', set: { years: 30, chartScale: 'log' } },
]

const SETS = [
  // 62/34pt are the iPhone 16 Pro Max insets; 440×956 at 3x is the 6.9" size.
  { dir: 'ios-6.9', width: 440, height: 956, scale: 3, scheme: 'light', insets: { top: 62, bottom: 34 }, status: 'ios-status.png', shots: PHONE_SHOTS },
  { dir: 'ipad-13', width: 1032, height: 1376, scale: 2, scheme: 'light', shots: IPAD_SHOTS },
  // Android insets the web view instead of drawing it under the bars, so the page gets
  // what is left of the 800pt and the bars are strips of their own in the page's colour.
  { dir: 'android', width: 360, height: 800, scale: 3, scheme: 'dark', strips: { top: 24, bottom: 24 }, status: 'android-status.png', nav: 'android-nav.png', shots: PHONE_SHOTS },
]

async function waitForServer(url, attempts = 120) {
  for (let i = 0; i < attempts; i++) {
    try {
      if ((await fetch(url)).ok) return
    } catch {
      // not up yet
    }
    await new Promise((r) => setTimeout(r, 500))
  }
  throw new Error(`dev server did not come up at ${url}`)
}

/**
 * Back to the defaults a shot may have changed, then the shot's own: the return through
 * `setIncome`, as the Return field commits it in the period it shows (% / year), and
 * anything else through the generic `set` the other controls use.
 */
async function applyState(page, { income = null, set = {} }) {
  await page.evaluate(
    async ({ income, set }) => {
      const { useSettings, DEFAULTS } = await import('/src/store/settings.ts')
      const { incomeMonthlyPct, years, theme, chartScale } = DEFAULTS
      useSettings.setState({ incomeMonthlyPct, years, theme, chartScale })
      if (income !== null) useSettings.getState().setIncome(income)
      for (const [key, value] of Object.entries(set)) useSettings.getState().set(key, value)
    },
    { income, set },
  )
}

/** Brings `at` to just under the sticky masthead, or to either end of the page. */
async function scrollTo(page, at) {
  await page.evaluate((at) => {
    if (at === 'top') return window.scrollTo(0, 0)
    if (at === 'bottom') return window.scrollTo(0, document.documentElement.scrollHeight)
    const masthead = document.querySelector('.masthead').getBoundingClientRect().height
    const top = document.querySelector(at).getBoundingClientRect().top + window.scrollY
    window.scrollTo(0, top - masthead - 12)
  }, at)
}

/** What the page paints behind everything, for the Android bars' strips. */
function pageColour(page) {
  return page.evaluate(() => {
    for (const el of [document.body, document.documentElement]) {
      const colour = getComputedStyle(el).backgroundColor
      if (colour !== 'rgba(0, 0, 0, 0)' && colour !== 'transparent') return colour
    }
    return '#000'
  })
}

async function save(set, file, shot, background) {
  const layers = []
  let base = sharp(shot)
  if (set.strips) {
    base = sharp({ create: { width: set.width * set.scale, height: set.height * set.scale, channels: 3, background } })
    layers.push({ input: shot, top: set.strips.top * set.scale, left: 0 })
  }
  if (set.status) {
    // The bars were lifted as dark glyphs; the dark theme wants them light.
    const bar = sharp(join(FRAME, set.status))
    layers.push({ input: await (set.scheme === 'dark' ? bar.negate({ alpha: false }) : bar).toBuffer(), top: 0, left: 0 })
  }
  if (set.nav) {
    const nav = sharp(join(FRAME, set.nav))
    const { height } = await nav.metadata()
    layers.push({
      input: await (set.scheme === 'dark' ? nav.negate({ alpha: false }) : nav).toBuffer(),
      top: set.height * set.scale - height,
      left: 0,
    })
  }
  // The stores refuse an alpha channel, so it is dropped whatever the layers carried.
  const composed = await base.composite(layers).png().toBuffer()
  await sharp(composed).removeAlpha().png().toFile(file)
  console.log(file)
}

/** The icon's tile colour behind the icon's bars and curve. */
const GRAPHIC = {
  name: 'InvestTable',
  tagline: 'Compound interest, month by month',
  background: '#1f2430',
  line: '#c3c2b7',
  art: 260,
}
const ICON_BACKGROUND = /<rect width="512" height="512"[^>]*\/>/

/**
 * Google Play's feature graphic, 1024×500 with no alpha: the icon's own artwork from
 * public/favicon.svg on the icon's colours, the name and one line. Nothing else: Play
 * crops and overlays it in places, so it says only what the app is.
 */
async function featureGraphic(browser) {
  const page = await browser.newPage({ viewport: { width: 1024, height: 500 }, deviceScaleFactor: 1 })
  const art = readFileSync(join(ROOT, 'public/favicon.svg'), 'utf8')
    .replace(/<!--[\s\S]*?-->/g, '')
    .replace(ICON_BACKGROUND, '')
  await page.setContent(`<!doctype html>
    <style>
      body { margin: 0; width: 1024px; height: 500px; display: flex; align-items: center;
        gap: 56px; padding: 0 80px; box-sizing: border-box; background: ${GRAPHIC.background};
        font-family: -apple-system, system-ui, sans-serif; color: #fff; }
      svg { width: ${GRAPHIC.art}px; height: ${GRAPHIC.art}px; flex: none; }
      h1 { margin: 0; font-size: 84px; font-weight: 700; letter-spacing: -0.02em; }
      p { margin: 18px 0 0; font-size: 32px; white-space: nowrap; color: ${GRAPHIC.line}; }
    </style>
    ${art}<div><h1>${GRAPHIC.name}</h1><p>${GRAPHIC.tagline}</p></div>`)
  const file = join(ROOT, 'docs/store/feature-graphic-1024x500.png')
  await sharp(await page.screenshot()).removeAlpha().png().toFile(file)
  console.log(file)
  await page.close()
}

const server = spawn('npx', ['vite', '--port', String(PORT), '--strictPort'], { cwd: ROOT, stdio: 'ignore' })
try {
  await waitForServer(`http://localhost:${PORT}/`)
  const browser = await chromium.launch()
  for (const set of SETS) {
    mkdirSync(join(OUT, set.dir), { recursive: true })
    const context = await browser.newContext({
      viewport: { width: set.width, height: set.height - (set.strips ? set.strips.top + set.strips.bottom : 0) },
      deviceScaleFactor: set.scale,
      isMobile: set.width < 900,
      hasTouch: true,
      colorScheme: set.scheme,
      // Number fields render in the browser's locale, not the page's: without this they
      // come out in whatever the Mac is set to.
      locale: 'en-US',
    })
    await context.addInitScript(() => {
      Object.defineProperty(Navigator.prototype, 'globalPrivacyControl', { get: () => true })
    })
    await context.route(/\/api\/ping/, (route) => route.abort())
    const page = await context.newPage()
    await page.clock.setFixedTime(NOW)
    if (set.insets) {
      const cdp = await context.newCDPSession(page)
      await cdp.send('Emulation.setSafeAreaInsetsOverride', { insets: { left: 0, right: 0, ...set.insets } })
    }
    await page.goto(BASE)
    await page.waitForLoadState('networkidle')

    for (const shot of set.shots) {
      await applyState(page, shot)
      await page.waitForTimeout(200)
      await scrollTo(page, shot.at)
      if (shot.act) await shot.act(page)
      await page.waitForTimeout(500)
      await save(set, join(OUT, set.dir, `${shot.name}.png`), await page.screenshot(), await pageColour(page))
    }
    await context.close()
  }
  await featureGraphic(browser)
  await browser.close()
} finally {
  server.kill()
}
