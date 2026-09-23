# InvestTable — project context

Read at the start of every session. It holds what the code cannot say for itself: why a
decision was made, and which traps have already been hit.

## What this is

A Google Sheet called "Revenue Chart", turned into an app. One codebase runs on the web,
installs to a desktop, and ships to Google Play and the App Store through Capacitor.

Owner and, for now, only target user: **mrWD** (Viktor, `lvigtor@gmail.com`). Sibling of
`film-table`, `games-table` and `books-table`, and built to the same shape on purpose —
React 19 + Vite + zustand, local-first, no backend for user data, `build:native` for the
store builds.

## Core principles (break only with the owner's explicit consent)

1. **The app must agree with the spreadsheet.** `src/lib/projection.ts` is a port, not an
   improvement. It rounds every month to cents and compounds the rounded figure, which is
   what the sheet does and why its column drifts a cent above exact arithmetic.
   `npm run check` asserts 107 values, 72 of them read off the two reference screenshots;
   it must keep passing. If a better model is wanted, that is a conversation, not a
   refactor.
2. **The stored return is monthly, always.** `incomeMonthlyPct` is the truth at full
   precision; `incomePeriod` only says how the field writes it. Never store the typed
   period's figure — the sheet's chain sits on exact half-cent boundaries at months 10, 11
   and 12, so a re-quoted rate tips them at *any* precision, and switching the unit would
   move the money. See DECISIONS.
3. **No backend for user data.** The inputs live in `localStorage` on the device. No
   accounts, no analytics, no collection. The single network call is the exchange-rate
   feed, and the app is fully usable when it fails.
4. **It must work offline.** Rates degrade live → device cache → the figures bundled from
   the sheet → whatever the owner types in by hand. None of those paths may be removed.
5. **Absurd inputs are allowed, but the app does not open on one.** The sheet's 10 % a
   month is reachable and exact; nothing caps anyone at a "sensible" return, and the
   display has to survive the consequences (see `HUGE` in `format.ts` — at the slider
   maxima the balance reaches 10⁶⁹). The *default* is 8 % a year, deliberately ordinary,
   because a public TestFlight link makes the first screen a claim. See DECISIONS.
6. **Twenty languages, and no hard-coded string in a component.** Every catalogue is
   checked against English with `satisfies Catalogue`, so a missing key fails the build.
   Formatting is never hand-rolled either — numbers, compact notation, percentages, dates
   and plurals all come from `Intl` for the active locale, which is the only way "2500万",
   the lakh grouping and Arabic's six plural forms come out right.

## How to run

```bash
npm install
npm run dev                       # :5173
npm run build && npm run preview  # :4173
npm run check                     # the model against the spreadsheet — run after any
                                  # change to projection.ts
npm run lint

# for the store builds — this, never plain `build`, before `npx cap sync`
npm run build:native
```

`node scripts/gen-icons.mjs` regenerates every raster from `public/favicon.svg`.

## How to verify

No test framework, and `npm run check` covers only the model. Everything else is manual,
through the browser panel, and is a required part of any noticeable change:

- both themes, and the **Auto** setting with the OS in each;
- **horizontal overflow** — `document.documentElement.scrollWidth` against `clientWidth`
  must be 0, at 375px and at 1280px. Check `clientWidth` is not 0 before believing the
  number: a collapsed browser pane reports the whole page as overflow, which has already
  once looked like a 293px regression that did not exist;
- **Arabic**, for the mirrored layout — and confirm the chart did *not* mirror with it;
- a language with a wide compact notation (Japanese, "7500万") for the chart's y-axis
  gutter, which is sized from the labels rather than fixed;
- the extremes: every slider at its maximum (the figures go scientific and the log axis
  thins its ticks), and a deposit of 0 (the log scale has to fall back to linear rather
  than produce `NaN` paths);
- Reset with half-typed text still in a field — this was a real bug: the fields hold the
  draft until blur, so `Controls` keys them off a generation counter to force a remount;
- a clean console.

## Working on the translations

Adding a language is three steps: copy `src/i18n/locales/en.ts`, translate it, add a row
to `LANGUAGES` in `src/i18n/index.ts`. Things that are easy to get wrong:

- **Plural categories are CLDR's, not intuition's.** Russian and Ukrainian need
  one/few/many, Polish and Czech the same three on different boundaries, Arabic all six,
  and Japanese, Korean, Chinese, Vietnamese and Indonesian only `other`. Anything a
  language does not use is left out; `other` is the fallback and the only required form.
- **Never spell a number into a catalogue string.** Numbers arrive already formatted for
  the reader, through `{placeholder}`s — a catalogue never contains a digit or a separator.
- **The `locale` is not always the bare code.** Portuguese is pinned to `pt-BR`, English to
  `en-US`, and Arabic asks for Latin digits with `ar-u-nu-latn`.
- **Project names stay in English.** They are proper nouns and are not catalogue keys.
  The "More from the author" list carries names only: its per-project links and taglines
  were removed on the owner's call, because both duplicated `products-page` and would
  drift from it. Do not put them back without asking.

## Traps already hit

- **`@capacitor/assets` writes web assets too.** It drops `public/manifest.webmanifest`
  and an `icons/` directory of webp at the repo root, with `../` paths and `image/png` on
  webp files. `vite-plugin-pwa` owns the web manifest — delete both after running it.
- **The service worker inside the native shell.** `build:native` sets `selfDestroying`, so
  the shell ships no worker and unregisters any already installed. Without it an installed
  update keeps serving the previous build. This cost the sibling apps two rounds of
  debugging; do not "simplify" it away.
- **Float noise in the rounding.** `roundCents` goes through `toPrecision(15)` before
  rounding, because `x * 100` lands on 159374.50000000003 and half-way cases would
  otherwise fall either way at random. Changing it breaks `npm run check`.
- **ECB-derived rate feeds are unusable here.** They dropped the ruble in 2022 and all
  three of the sheet's pairs involve it. Hence open.er-api.com.

## App Store Connect

The API key lives at `~/.appstoreconnect/private_keys/AuthKey_T4T7V43WY7.p8` with the
issuer beside it in `~/.appstoreconnect/issuer_id`; `scripts/asc.mjs` reads both and
signs the JWT. Two things that cost time to learn:

- **`POST /v1/apps` is refused** — "The resource 'apps' does not allow 'CREATE'". An app
  record can only be made in the web UI. `POST /v1/bundleIds` and `POST /v1/certificates`
  *are* allowed, which is how `com.mrwd.investtable` (`MQSMMTX6QX`) and the distribution
  certificate (`4PXPV8R99X`, valid to 2027-08-29) were created from here.
- **Apple's API host is slow to connect** — measured 7.7 s against undici's 10 s ceiling,
  so a lone `fetch` fails intermittently. `asc.mjs` retries; do not remove that.

The distribution certificate's private key exists **only in this Mac's login keychain**.
Export it from Keychain Access before wiping the machine, or the next release needs a new
one against a limit of three.

## TestFlight

Live in open testing as of 2026-08-29, **build 1.0 (1)**:

| | |
|---|---|
| App | InvestTable, `6806642629`, SKU `investtable` |
| Public link | <https://testflight.apple.com/join/ThAa955N> |
| Group | "Public Beta", external, no tester limit (Apple's 10 000 ceiling) |
| Review | `APPROVED` — submitted 2026-08-29, state confirmed through the API on 2026-09-21 |
| Expires | 2026-11-27 — upload a newer build before then, or the link has nothing to install |
| Product page | <https://mrwd.github.io/products/invest-table/>, in `products-page` (`937e49e`) |

The whole chain after the app record exists is scriptable through `asc.mjs`, and was:
`POST /v1/betaAppLocalizations` (description, feedback email, privacy URL) →
`PATCH /v1/betaAppReviewDetails/<app id>` (**`contactPhone` is required**, and the id is
the app's own id) → `POST /v1/betaGroups` with `publicLinkEnabled` →
`POST /v1/betaBuildLocalizations` (what-to-test, attached to the *build*, not the app) →
`POST /v1/betaGroups/<id>/relationships/builds` → `POST /v1/betaAppReviewSubmissions`.

Two things that only surface in the doing:

- **`betaAppReviewDetails` refuses CREATE**; Apple makes it with the app and it only takes
  UPDATE.
- **`altool` logs alarming `-1001 request timed out` errors mid-upload and still succeeds.**
  It is the same slow connect to Apple's host; read to the end for "UPLOAD SUCCEEDED"
  before believing a failure.

Uploading a new build: `npm run build:native && npx cap sync ios`, archive and export with
the plist in the scratchpad, bump `CURRENT_PROJECT_VERSION`, then
`xcrun altool --upload-app -f <ipa> -t ios --apiKey T4T7V43WY7 --apiIssuer $(cat ~/.appstoreconnect/issuer_id)`.

## Status (as of 2026-08-15)

First build. A git repository with everything staged and no commit yet; no store
listings — the only public surfaces are the TestFlight beta and the product page, both
above. `appId` is `com.mrwd.investtable`.

Verified running on all four targets, not merely compiling: the web build in the browser
panel at 375px and 1180px in both themes, the debug APK installed and launched on the
`Medium_Phone_API_35` emulator, and a signed device build installed and launched on the
owner's own iPhone 15 Pro over its paired connection — `DEVELOPMENT_TEAM` is 742H5JJX37,
taken from film-table. That device build signed with the *wildcard* profile ("iOS Team
Provisioning Profile: *") and registered no App ID of its own; the explicit bundle ID
`com.mrwd.investtable` was created later through the API (`MQSMMTX6QX`). On
Android the splash hides about a second after launch — a screenshot taken sooner than that
shows the icon on a blank page and looks like a hang. It is not one; check
`Capacitor/Console` in logcat for the `SplashScreen … hide` call before believing it.

Open, and the owner's call:

- whether "desktop" should stay an installable PWA (what the siblings do) or become a real
  Tauri/Electron binary with a `.dmg` and an `.exe`;
- whether the twenty catalogues should stay in the main bundle (31 kB gzip) or move to a
  dynamic import per language;
- store accounts, signing and screenshots — none of it started.

## Tone with the owner

He values verified facts over assumptions: before claiming anything about a rate, a build
or an API, run it and show the numbers. Do large changes in a branch and let him review
before merging.
