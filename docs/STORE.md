# Store listings

What the App Store and Google Play ask for, and where each answer lives. The reasoning
behind the answers is in CLAUDE.md ("Store listings — what to answer"); this file is the
summary and the pointer.

## Identity

| | |
|---|---|
| App name | InvestTable |
| Bundle id / package | `com.mrwd.investtable` |
| Apple ID (ASC) | 6806642629, SKU `investtable` |
| Team | 742H5JJX37 |
| TestFlight | <https://testflight.apple.com/join/ThAa955N> |
| Support and marketing URL | <https://mrwd.github.io/products/invest-table/> |
| Privacy policy | <https://mrwd.github.io/legal/#app-stats> (the app has no policy page of its own) |
| Contact | lvigtor@gmail.com |

## The listing

It lives in `docs/store/`, in the format of `../store-release/SCHEMA.md`, and that is
what gets pushed and reviewed:

- `docs/store/app-store.json`: name, subtitle, promotional text, description, keywords,
  URLs, category, content rights, age rating, review notes and the App Privacy answers;
- `docs/store/google-play.json`: title, short and full description, category, contact,
  financial features, Data safety and the expected content rating;
- `docs/store/screenshots/`: iPhone 6.9" and Android, five each, and iPad 13", four,
  made by `node scripts/store-screenshots.mjs`, which also draws
  `docs/store/feature-graphic-1024x500.png`. The status bars come from
  `docs/store/frame/`.

`node ../store-release/asc-release.mjs . --check` validates the App Store half.

What the texts must keep saying, because each is true and a reviewer or a reader will
hold the app to it: a projection, not a forecast; not investment advice; returns can be
negative and the app models losses; the figures stay on the device; once a day the app
sends anonymous usage counts, and the switch at the bottom of the page turns that off.
No named funds, no "expected returns". The ExchangeRate-API credit ("Rates By Exchange
Rate API") belongs in the app, next to the rates, and is not repeated in the listing.

## The answers

- **Category**: App Store Finance; Google Play Finance.
- **Age rating**: the defaults, which is 4+. Nothing to override: no in-app browser, no
  user-generated content that anyone else sees, no gambling or contests, and a calculator
  is not medical or health content. The links (the rate credit, the author's site) open
  in the browser, which is not unrestricted web access.
- **Content rights**: uses third-party content. The exchange rates come from
  ExchangeRate-API's free endpoint and are shown under its terms, with the credit those
  terms require. Answering "no" would contradict the credit on screen.
- **Google Play financial features**: "My app doesn't provide any financial features".
  Not "financial advice" or "trading": those put the app under the Financial Services
  policy and need an organisation account. A calculator that names no product is neither.
- **App Store privacy label** (from build 3; builds 1 and 2 were Data Not Collected):
  Data Collected, Usage Data > Product Interaction and Diagnostics > Other Diagnostic
  Data, both not linked to the user, not used for tracking, purpose Analytics. Not Crash
  Data: only counts of error types are sent. Not settable through the API, so the owner
  enters it in App Store Connect.
- **Google Play Data safety**: collected, App activity > App interactions and App info
  and performance > Diagnostics; not shared; optional (the switch turns it off);
  encrypted in transit; nothing to delete on request, because nothing is linked to a
  user. Entered by hand in Play Console.
- **Review notes**: in `app-store.json`. They say what the app is, that there is no
  account, where everything is on the page, the two network calls (open.er-api.com and
  the daily ping to `mrwd-metrics.vercel.app`), and why guideline 5.1.1(ix) does not
  apply.
- **Content rating (IARC)**: expected Everyone.

## Android release

`android/app/build.gradle` signs release builds with the shared upload key when the four
`MRWD_UPLOAD_*` properties are in `~/.gradle/gradle.properties`, and builds them unsigned
with a Gradle warning otherwise, so the project still builds on any machine. Play App
Signing holds the real signing key; this is only the upload key.

```bash
npm run build:native && npx cap sync android
cd android && ./gradlew bundleRelease   # JAVA_HOME = the JDK 21 under ~/.gradle/jdks
jarsigner -verify app/build/outputs/bundle/release/app-release.aab
```

`versionCode` is 2. Every upload to Play needs a higher one.
