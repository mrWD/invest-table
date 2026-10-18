import { readdirSync, readFileSync } from 'node:fs'
import { join } from 'node:path'
import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

/*
 * The open-source notices, as `licenses.txt` next to the bundle.
 *
 * MIT and the like ask for their notice to travel with the software, and a minified bundle
 * carries none. The list is read off what the bundle actually contains — every module from
 * node_modules that Rollup put into a chunk — rather than off package.json, which would
 * miss what plugins inject (workbox-window) and include what never ships (the Capacitor
 * CLI). Two things are added by name because they never pass through the bundler: the
 * native runtimes, which ship inside the iOS and Android apps, and the Workbox runtime that
 * vite-plugin-pwa writes next to the service worker on the web.
 */
function openSourceLicences(native: string[]): Plugin {
  return {
    name: 'open-source-licences',
    apply: 'build',
    generateBundle(_, bundle) {
      const dirs = new Set<string>()
      for (const output of Object.values(bundle)) {
        if (output.type !== 'chunk') continue
        for (const id of Object.keys(output.modules)) {
          const match = /^.*\/node_modules\/(?:@[^/]+\/)?[^/]+(?=\/)/.exec(id.replaceAll('\\', '/'))
          if (match) dirs.add(match[0])
        }
      }
      for (const name of native) dirs.add(join(process.cwd(), 'node_modules', name))

      const seen = new Set<string>()
      const sections: string[] = []
      for (const dir of dirs) {
        const pkg = JSON.parse(readFileSync(join(dir, 'package.json'), 'utf8')) as {
          name: string
          version: string
          license?: string
        }
        const key = `${pkg.name}@${pkg.version}`
        if (seen.has(key)) continue
        seen.add(key)
        const file = readdirSync(dir).find((f) => /^(licen[cs]e|copying)/i.test(f))
        const text = file
          ? readFileSync(join(dir, file), 'utf8').trim()
          : `${pkg.license ?? 'Licence not stated'} (the package ships no licence file)`
        sections.push(`${key}\n${'-'.repeat(key.length)}\n${text}`)
      }
      sections.sort((a, b) => a.localeCompare(b))

      this.emitFile({
        type: 'asset',
        fileName: 'licenses.txt',
        source: `InvestTable is built with these open-source packages.\n\n${sections.join('\n\n\n')}\n`,
      })
    },
  }
}

// GitHub Pages serves the app from /<repo>/, other hosts from the root.
// BASE_PATH is set by the deploy workflow; local dev and preview stay at '/'.

/*
 * The store build, which Capacitor wraps around this same output.
 *
 * On the web the service worker earns its place — it is what makes the app open with no
 * network, and this app has nothing else to fetch. Inside the native shell it has nothing
 * to add, because every file it would cache already ships in the app bundle, and it takes
 * something away: a build installed over another keeps serving the previous one. This is
 * the same trap already written up in the sibling table apps, so it is avoided from day one
 * rather than discovered on a device.
 */
const NATIVE_SHELL = process.env.NATIVE_SHELL === '1'

export default defineConfig({
  base: process.env.BASE_PATH ?? '/',
  define: {
    __BUILD_TIME__: JSON.stringify(new Date().toISOString().slice(0, 16).replace('T', ' ')),
  },
  plugins: [
    react(),
    openSourceLicences(['@capacitor/ios', '@capacitor/android', 'workbox-core']),
    VitePWA({
      registerType: 'autoUpdate',
      // Emits a worker whose only job is to unregister itself and empty its caches, so
      // devices that already have one are cured on the next launch too.
      selfDestroying: NATIVE_SHELL,
      includeAssets: ['favicon.svg', 'icons/*.png'],
      manifest: {
        name: 'InvestTable — compound growth',
        short_name: 'InvestTable',
        description:
          'Monthly deposits, reinvested returns and dividends, projected month by month.',
        start_url: './',
        scope: './',
        display: 'standalone',
        // Deliberately unlocked: the same build is the desktop app, where the window is
        // landscape and the layout goes to two columns.
        background_color: '#f9f9f7',
        theme_color: '#f9f9f7',
        categories: ['finance', 'productivity', 'utilities'],
        icons: [
          { src: 'icons/icon-192.png', sizes: '192x192', type: 'image/png' },
          { src: 'icons/icon-512.png', sizes: '512x512', type: 'image/png' },
          { src: 'icons/icon-maskable-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
        ],
      },
      workbox: {
        navigateFallback: 'index.html',
        // The default set plus licenses.txt, so the notices open offline like everything else.
        globPatterns: ['**/*.{js,css,html,txt}'],
        // The exchange rates are the only network call the app makes, and it works
        // without them. Cached so an offline launch shows the last known rates
        // instead of the bundled fallback.
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/open\.er-api\.com\/.*/,
            handler: 'NetworkFirst',
            options: {
              cacheName: 'fx-rates',
              networkTimeoutSeconds: 5,
              expiration: { maxEntries: 4, maxAgeSeconds: 60 * 60 * 24 * 7 },
              cacheableResponse: { statuses: [0, 200] },
            },
          },
        ],
      },
    }),
  ],
  server: { host: true },
  preview: { host: true },
})
