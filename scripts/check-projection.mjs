/**
 * The one automated check in the project: does `project()` still reproduce the
 * spreadsheet it was ported from?
 *
 * The expectations below are not derived — they are read off the two screenshots of the
 * original Google Sheet, in the sheet's own formatting. Two settings are covered, which
 * between them pin the deposit, both rates and the yearly dividend column:
 *
 *   100 / 10% per month / 2% per year
 *   1000 / 5% per month / 2% per year
 *
 * Run with `npm run check`. Needs no test framework — Node strips the types itself.
 */
import { convertRate, monthlyRate, project } from '../src/lib/projection.ts'

/** The sheet's format: space for thousands, comma for the decimal. */
const fmt = (x) =>
  x
    .toLocaleString('fr-FR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
    .replace(/[\s  ]/g, ' ')

const CASES = [
  {
    name: '100 / 10% per month / 2% per year',
    params: { deposit: 100, incomePct: 10, dividendPct: 2, years: 5 },
    // month: [balance, monthly income]
    months: {
      1: ['100,00', '0,00'],
      2: ['210,00', '10,00'],
      3: ['331,00', '21,00'],
      4: ['464,10', '33,10'],
      5: ['610,51', '46,41'],
      6: ['771,56', '61,05'],
      7: ['948,72', '77,16'],
      8: ['1 143,59', '94,87'],
      9: ['1 357,95', '114,36'],
      10: ['1 593,75', '135,80'],
      11: ['1 853,13', '159,38'],
      12: ['2 138,44', '185,31'],
      13: ['2 452,28', '213,84'],
      24: ['8 849,76', '795,43'],
      25: ['9 834,74', '884,98'],
      36: ['29 912,74', '2 710,25'],
      37: ['33 004,01', '2 991,27'],
      48: ['96 017,42', '8 719,77'],
      49: ['105 719,16', '9 601,74'],
      55: ['188 059,51', '17 087,23'],
    },
    // "Possible Dividend Income per month", years 2..5 — the sheet leaves year 1 empty.
    dividends: ['3,56', '14,75', '49,85', '160,03'],
  },
  {
    name: '1000 / 5% per month / 2% per year',
    params: { deposit: 1000, incomePct: 5, dividendPct: 2, years: 5 },
    months: {
      1: ['1 000,00', '0,00'],
      2: ['2 050,00', '50,00'],
      3: ['3 152,50', '102,50'],
      4: ['4 310,13', '157,63'],
      12: ['15 917,15', '710,34'],
      13: ['17 713,01', '795,86'],
      24: ['44 502,04', '2 071,53'],
      25: ['47 727,14', '2 225,10'],
      36: ['95 836,41', '4 516,02'],
      48: ['188 025,53', '8 905,98'],
      55: ['272 712,83', '12 938,71'],
    },
    dividends: ['26,53', '74,17', '159,73', '313,38'],
  },
]

let failures = 0
const check = (label, got, want) => {
  if (got === want) return
  failures++
  console.error(`  FAIL  ${label}: got ${got}, sheet says ${want}`)
}

for (const testCase of CASES) {
  console.log(testCase.name)
  const { months, years } = project(testCase.params)

  for (const [month, [balance, income]] of Object.entries(testCase.months)) {
    const row = months[Number(month) - 1]
    check(`month ${month} balance`, fmt(row.balance), balance)
    check(`month ${month} income`, fmt(row.income), income)
  }

  if (years[0].dividendPerMonth !== undefined) {
    failures++
    console.error('  FAIL  year 1 should have no dividend figure')
  }
  testCase.dividends.forEach((want, i) => {
    check(`year ${i + 2} dividend/month`, fmt(years[i + 1].dividendPerMonth), want)
  })
}

/*
 * The period picker: a return quoted per quarter or per year has to mean the same plan as
 * the monthly rate it stands for, or switching the unit would quietly move the money.
 * The conversion is compounded, not divided — 1,1³ = 1,331 and 1,1¹² = 3,1384284, so
 * 10 % a month is exactly 33,1 % a quarter and 213,8428 % a year.
 */
console.log('period conversion')
let periodChecks = 0
const near = (label, got, want, epsilon = 1e-9) => {
  periodChecks++
  if (Math.abs(got - want) <= epsilon) return
  failures++
  console.error(`  FAIL  ${label}: got ${got}, expected ${want}`)
}

near('a month is itself', monthlyRate(10, 'month'), 10)
near('33,1 % a quarter is 10 % a month', monthlyRate(33.1, 'quarter'), 10, 1e-12)
near('100 % a year compounds back', (1 + monthlyRate(100, 'year') / 100) ** 12 - 1, 1)
near('10 % a month → a quarter', convertRate(10, 'month', 'quarter'), 33.1)
near('10 % a month → a year', convertRate(10, 'month', 'year'), 213.8428)
near('a round trip returns', convertRate(convertRate(10, 'month', 'year'), 'year', 'month'), 10, 1e-4)
near('zero stays zero', convertRate(0, 'month', 'year'), 0)

/*
 * What the store does when the period picker changes — nothing to the rate, because it
 * holds the monthly figure and the period only relabels it. This asserts the property
 * that makes that safe: the field's reading round-trips, so what someone sees after
 * switching to years is a number that means exactly the rate they had.
 *
 * The reverse — feeding a *re-quoted* rate back into the model — cannot be exact, and the
 * app deliberately never does it. The sheet's own chain lands on exact half-cent
 * boundaries at months 10, 11 and 12, so a yearly rate written to any fixed number of
 * decimals tips them. That is why the monthly rate is the stored truth.
 */
for (const period of ['quarter', 'year']) {
  const shown = convertRate(10, 'month', period)
  near(`10 % a month reads back from a ${period}`, monthlyRate(shown, period), 10, 1e-5)
  near(`a typed 20 % a ${period} reads back as itself`, convertRate(monthlyRate(20, period), 'month', period), 20, 1e-9)
}

// The model still honours an explicitly period-quoted rate, to within the cent that
// re-quoting costs.
const monthly = project({ deposit: 100, incomePct: 10, dividendPct: 2, years: 1 })
for (const period of ['quarter', 'year']) {
  const viaPeriod = project({
    deposit: 100,
    incomePct: convertRate(10, 'month', period),
    incomePeriod: period,
    dividendPct: 2,
    years: 1,
  })
  monthly.months.forEach((row, i) => {
    periodChecks++
    const drift = Math.abs(row.balance - viaPeriod.months[i].balance)
    if (drift <= 0.05) return
    failures++
    console.error(`  FAIL  month ${row.index} via ${period} drifts by ${drift.toFixed(4)}`)
  })
}

const total =
  CASES.reduce((n, c) => n + Object.keys(c.months).length * 2 + c.dividends.length + 1, 0) +
  periodChecks
if (failures) {
  console.error(`\n${failures} of ${total} checks disagree with the spreadsheet.`)
  process.exit(1)
}
console.log(`\nAll ${total} checks match the spreadsheet.`)
