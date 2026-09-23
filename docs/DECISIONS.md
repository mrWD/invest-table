# Decisions

Why the app is the way it is. Each entry is a choice that could reasonably have gone the
other way, with the reason it did not.

## The model reproduces the spreadsheet, including its rounding

The sheet rounds every cell to cents and compounds the rounded figure. Exact arithmetic
gives 2 138,43 at month twelve of the default settings; the sheet says 2 138,44, and so
does the app.

Two reasons to keep the drift rather than fix it. It is what makes the app's table agree
with the spreadsheet cell for cell, which is the point of the port — a table that is
"more correct" than the one it replaces is a table nobody can check. And it is the more
realistic of the two anyway: nobody holds a fraction of a cent.

The 72 assertions in `scripts/check-projection.mjs` are read off the two reference
screenshots of the original sheet, not generated from the code. They are the contract.

## Displayed values were derived from the sheet, not guessed

Everything the app computes was checked against the original before being written:

- the recurrence, from the first four months of both reference settings;
- the dividend column — last year's *closing* balance at the annual rate over twelve,
  which is why the first year has none, as in the sheet;
- the "0,5 % a day" illustration, which is the monthly rate over twenty (the sheet showed
  10 % → 0,5 % and 5 % → 0,25 %), so twenty trading days, not thirty calendar ones.

## Numbers follow the language, not the spreadsheet

This entry used to say the opposite: one fixed European format, "1 593,75", whichever
currency and whoever was reading, because a row here should read like the row it was
ported from.

Twenty languages ended that argument. The same string an Italian reads as fifteen hundred
an American reads as one and a half, and no amount of fidelity to the sheet's *punctuation*
is worth handing someone the wrong number. Fidelity lives in the values instead, where
`npm run check` still pins all 72 of them, and presentation follows the locale. Russian,
French, Czech and the other space-and-comma languages get the sheet's format anyway,
because it was theirs to begin with.

The group separator stays a no-break space wherever the locale uses a space. A plain one
let "154 513,75" break across lines on a phone, and the second line then read as a
different number.

Compact figures are `Intl`'s, not a hand-rolled k/M/B/T table: German reads "25 Mio.",
Russian "25 млн", and Japanese and Chinese group by ten-thousands — "2500万" where English
says "25M". Hindi gets lakh grouping ("9,27,08,252.33") for free from the same source. A
table of English suffixes could not have expressed any of it.

Arabic is pinned to Latin digits (`ar-u-nu-latn`). Financial interfaces across the
Arabic-speaking world overwhelmingly use them, and these figures sit beside Latin currency
symbols.

## Twenty languages, all bundled

No i18n library. What the app needs is lookup, `{placeholder}` interpolation and correct
plurals, and `Intl.PluralRules` already knows every language's rules — Russian's
one/few/many, Arabic's six categories, the single form Japanese and Korean use — better
than any hand-written table. The catalogues are plain objects checked against the English
one with `satisfies`, so a missing key is a build error rather than a runtime fallback.

All twenty ship in the main bundle: **101.9 kB gzip against 70.6 kB before**, so the
translations cost about 31 kB. The alternative, a dynamic import per language, would buy
that back at the price of either a flash of English on first paint or an async boot — in
an app whose first principle is that it works with no network at all. If the owner wants
the 31 kB back, lazy loading is the lever, and it is a real trade, not an oversight.

The RTL work is Arabic's alone. The stylesheet uses logical properties throughout
(`border-inline-start`, `text-align: start`) so the layout mirrors without a second
stylesheet — but the **chart stays left-to-right in every language**. Time reading forwards
to the right is the convention in RTL scripts too, and mirroring the plot would make the
curve say the opposite of what it means.

The language picker is a real `<select>`, in the footer beside the theme control. Twenty
options is past what a segmented control can hold, the native element brings the phone's
own picker wheel and type-ahead, and the footer is fine for a setting that is detected
from the device and therefore rarely opened.

## The chart gained a second series and a log toggle

The sheet plotted one line, Sum against Period, and at 10 % a month it is a flat line with
a cliff at the end: eight of ten years are indistinguishable from zero.

Two additions. A second series for the money actually paid in — the gap between the two is
the entire subject of the model and a single line cannot show it. And a log toggle, on
which a constant growth rate is a straight line, so the early years become readable and a
change of rate becomes a change of slope. Linear remains the default: it is the shape the
sheet showed, and it is honest about the magnitudes in a way log is not.

Colours are the validated two-slot categorical palette, checked in both themes against the
surfaces actually used (`validate_palette.js`, all six checks pass either way).

## The return can be quoted per month, quarter or year — and the monthly figure is the truth

The sheet only spoke in months. The picker adds the two periods people actually have rates
in: a fund's annual return, a bond's quarterly coupon.

**The conversion compounds, it does not divide.** Someone who types 20 % a year means their
money is a fifth larger after twelve months. Dividing by twelve gives 1,667 % a month,
which compounds to 21,9 % over the year and hands them a bigger number than they asked
for; the twelfth root gives 1,531 %, and twelve of those come to exactly 20 %. This is the
effective-rate reading. Bank deposits are quoted the other way, nominally — "12 % APR"
meaning 1 % a month — and a rate copied off a deposit contract should be entered as the
monthly figure it really is, which is what the month setting is for.

**The store keeps the monthly rate, not the typed one.** This was not the first design, and
the check script is what changed it: with the rate stored in whichever period was last
picked, switching month → year → month moved the ten-year balance, and moved the table's
months 10, 11 and 12 by a cent. The cause is not sloppiness that more decimals would fix —
the sheet's chain lands on *exact half-cent boundaries* at those months, so any re-quoting
error at all, at any precision, tips them. Storing the monthly rate at full precision and
treating the period as a label makes the switch lossless by construction: nothing is
recomputed, only relabelled. `convertRate` still exists, for what the field displays and
for reading a typed rate in, and it rounds to four decimals so "213,8428 % a year" stays a
number a person can retype.

**The picker is the unit, not a separate control.** It sits exactly where the static
"% / month" label used to, because that is what it states: what the number beside it means.
A segmented control next to the field would say the same thing twice and cost a row on a
phone. The slider went logarithmic for the same reason the deposit's did — the three
periods share one ceiling expressed three ways (50 % a month is 12 874 % a year), and a
linear track to 13 000 would bury the 5–30 % a year that people actually type.

## The app opens on 8 % a year, not the sheet's 10 % a month

The spreadsheet's own default is 10 % a month, and the model still reproduces it to the
cent — `npm run check` is built on it, and it is one tap away in the period picker. What
changed is only where the app *opens*.

A landing screen is an assertion. Opening on 10 % a month shows 92 708 252 € grown from
12 000 € paid in, and a compounding calculator that greets you with a 7 700-fold return
reads as a promise rather than a projection, however clear the disclaimer underneath. With
the app heading for open TestFlight — a public link anyone can install from — the first
screen now shows something ordinary: 100 € a month at 8 % a year, which comes to 18 012 €
against 12 000 € paid in.

This does not weaken principle 1. That principle is about the *model* agreeing with the
sheet, and it does, exactly. The default is a starting position, not arithmetic.

## Absurd inputs are allowed, and the display absorbs them

The sliders reach 50 % a month over thirty years. That compounds to about 10⁶⁹ — seventy
digits.

The alternative was to cap the inputs at something defensible, and it was rejected: the
sheet's own default of 10 % a month is already an extraordinary return, and an app ported
from it is in no position to tell its owner that his own figures are unreasonable. So the
inputs stay open and the *display* copes: past a quadrillion, figures go scientific
("4,94 × 10⁶⁹"), and the log axis thins its gridlines to six however many decades it spans.

## Rates: a free feed, four fallbacks deep, and editable

The sheet used GOOGLEFINANCE. The app uses open.er-api.com — no key, no account, one call.

ECB-derived feeds were ruled out on a fact rather than a preference: they stopped
publishing the ruble in 2022, and all three of the sheet's pairs involve it.

Every rate is editable by hand, and the chain degrades live → device cache → the figures
bundled from the sheet → whatever is typed in. The app is fully usable offline, which is
also why the six conversion directions each use their own pair's rate instead of routing
through the dollar: a correction typed into €/₽ should be the rate that gets applied.

## Desktop is an installable PWA, not a binary

Same as the sibling table apps: `npm run build` produces a PWA that installs from Chrome
or Edge into its own window with a dock icon and works offline. That is a real desktop
app, without a second toolchain, a second build pipeline or a signing story.

If a `.dmg` and an `.exe` are wanted — for a store listing, or because "install from the
browser" is a hard sell — Tauri wraps this same `dist/` and is the next step. It has not
been done, and it is the owner's call.

## Support and the project list are inline, with no floating button

FilmTable carries both a floating heart button and a section on the profile page, because
its profile page is three taps away and a donation link nobody finds is not a donation
link. InvestTable is one scrolling screen with the section at the foot of it, so the
floating button would cover the table to solve a problem the app does not have.

The three donation links are the same URLs as the other apps and the products page, and
the icons are FilmTable's, so the section reads as the same author's work. Nothing is
proxied or measured — they are plain outbound links.

The project list is a copy of `products-page/app.js`, deliberately reduced to an emoji, a
name, one line and one link. Linking each entry at the live app (rather than at its page
on the products site) costs a hop less for the reader; the entries with no live URL point
at the product page instead, and "All products" covers everything the list omits.

## No test framework

One check script, run by `npm run check`, covering the model. Everything else is verified
by hand in the browser panel, as in the sibling projects. The model is the part where a
silent regression would be invisible and expensive; the rest is a screen you can look at.
