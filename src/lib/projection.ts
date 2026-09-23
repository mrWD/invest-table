/**
 * The model behind the original "Revenue Chart" spreadsheet, reproduced exactly.
 *
 * Three inputs drive everything:
 *   DEFAULT SUM   — the amount paid in at the start of every month
 *   INCOME %/month — what the balance earns each month, reinvested in full
 *   DIVIDENDS %/year — what the held position pays out on top
 *
 * The recurrence, read off the sheet's own numbers:
 *
 *   balance[1] = deposit                          (nothing has been earned yet)
 *   balance[n] = balance[n-1] * (1 + r) + deposit
 *   income[n]  = balance[n-1] * r                 (earned during month n, on last month's balance)
 *
 * ROUNDING. The sheet rounds every cell to cents and the next month compounds the
 * *rounded* figure, so its column drifts a cent above exact arithmetic — 2 138,44 at
 * month 12 where the unrounded chain gives 2 138,43. That is reproduced here rather than
 * corrected: it is what makes the app's table agree with the spreadsheet cell for cell,
 * and it is also what real money does, since nobody holds a fraction of a cent. All 30
 * values legible in the two reference screenshots match (`npm run check`).
 */

/**
 * Round to cents the way a spreadsheet's ROUND does — half away from zero.
 *
 * `x * 100` carries binary noise: the month that should land on exactly …,5 arrives as
 * 159374.50000000003, and the next one could as easily arrive a hair below and round the
 * other way. `toPrecision(15)` trims everything past the 15th significant digit, which is
 * where a double stops being trustworthy, so half-way cases land where the sheet puts them.
 */
export function roundCents(x: number): number {
  const scaled = Number((x * 100).toPrecision(15))
  return (Math.sign(scaled) * Math.round(Math.abs(scaled))) / 100
}

/** The period a return is quoted over. The sheet only ever spoke in months. */
export type RatePeriod = 'month' | 'quarter' | 'year'

export const MONTHS_PER_PERIOD: Record<RatePeriod, number> = { month: 1, quarter: 3, year: 12 }

/**
 * The monthly rate a return quoted over a longer period actually works out to.
 *
 * Compounded, not divided. Someone who types 20 % a year means their money is a fifth
 * larger after twelve months; dividing gives 1,667 % a month, which compounds to 21,9 %
 * over the year and quietly hands them a bigger number than they asked for. The twelfth
 * root gives 1,531 % a month, and twelve of those come to exactly 20 %.
 *
 * This is the effective-rate reading. Banks quote deposits the other way, nominally — an
 * "12 % APR" that means 1 % a month — so a rate copied from a deposit contract should be
 * entered as the monthly figure it really is, which is what the month setting is for.
 */
export function monthlyRate(pct: number, period: RatePeriod = 'month'): number {
  const months = MONTHS_PER_PERIOD[period]
  if (months === 1) return pct
  return ((1 + pct / 100) ** (1 / months) - 1) * 100
}

/**
 * Re-express the same return over a different period.
 *
 * Used when the period picker changes: choosing to say "a year" instead of "a month" is a
 * statement about units, not a new plan, so the projection must not move. 10 % a month
 * becomes 213,84 % a year, and switching back gives 10 % again.
 */
export function convertRate(pct: number, from: RatePeriod, to: RatePeriod): number {
  if (from === to) return pct
  const monthly = monthlyRate(pct, from) / 100
  const converted = ((1 + monthly) ** MONTHS_PER_PERIOD[to] - 1) * 100

  /*
   * Four decimals, not two. A yearly rate carries twelve months of compounding inside it,
   * so precision lost here is multiplied on the way back: rounding 213,842837 % to
   * 213,84 % shifts the monthly rate enough to move a ten-year balance by about 1 300 €
   * in 92 million. At four decimals the same round trip is under a cent for the first
   * year and a rounding error thereafter, and "213,8428" is still a number someone can
   * read and retype.
   */
  return Math.round(converted * 1e4) / 1e4
}

export interface Params {
  /** Paid in at the start of every month. */
  deposit: number
  /** Percent per `incomePeriod`, earned on the balance and reinvested. */
  incomePct: number
  /** Defaults to the month the spreadsheet assumed. */
  incomePeriod?: RatePeriod
  /** Percent per year the held position pays out in dividends. */
  dividendPct: number
  /** How far the projection runs. */
  years: number
}

export interface MonthRow {
  /** 1-based, counted from the first month of the projection. */
  index: number
  /** 1..12 — the sheet's `M` column. */
  monthOfYear: number
  /** 1-based year this month belongs to. */
  year: number
  /** "Monthly amount paid + reinvesting" — the balance after this month's deposit. */
  balance: number
  /** "Monthly income" — earned during this month, on the previous month's balance. */
  income: number
}

export interface YearBlock {
  /** 1-based. The sheet labels these "1 Year", "2 Years", … */
  year: number
  months: MonthRow[]
  /** Balance carried out of the year's last month. */
  endBalance: number
  /**
   * "Possible Dividend Income per month": last year's closing balance, paid out at the
   * annual dividend rate, spread over twelve months. Undefined for the first year, which
   * has no previous balance to pay on — the sheet leaves that cell empty too.
   */
  dividendPerMonth?: number
}

export interface Projection {
  months: MonthRow[]
  years: YearBlock[]
  /** Everything paid in out of pocket: deposit × months. */
  totalInvested: number
  /** Closing balance of the final month. */
  finalBalance: number
  /** Closing balance less what was paid in — the part that was earned. */
  totalEarned: number
  /** Dividend per month the final year's closing balance would support. */
  finalDividendPerMonth: number
}

/** The projection's every month, plus the yearly grouping the sheet lays it out in. */
export function project({
  deposit,
  incomePct,
  incomePeriod = 'month',
  dividendPct,
  years,
}: Params): Projection {
  const r = monthlyRate(incomePct, incomePeriod) / 100
  const totalMonths = Math.max(1, Math.round(years * 12))

  const months: MonthRow[] = []
  let previous = 0

  for (let index = 1; index <= totalMonths; index++) {
    const income = roundCents(previous * r)
    const balance = index === 1 ? roundCents(deposit) : roundCents(previous * (1 + r) + deposit)

    months.push({
      index,
      monthOfYear: ((index - 1) % 12) + 1,
      year: Math.floor((index - 1) / 12) + 1,
      balance,
      income,
    })
    previous = balance
  }

  const years_: YearBlock[] = []
  for (let year = 1; year * 12 - 11 <= totalMonths; year++) {
    const block = months.filter((m) => m.year === year)
    const previousEnd = year > 1 ? years_[year - 2].endBalance : undefined

    years_.push({
      year,
      months: block,
      endBalance: block[block.length - 1].balance,
      dividendPerMonth:
        previousEnd === undefined ? undefined : roundCents((previousEnd * dividendPct) / 100 / 12),
    })
  }

  const finalBalance = months[months.length - 1].balance
  const totalInvested = roundCents(deposit * totalMonths)

  return {
    months,
    years: years_,
    totalInvested,
    finalBalance,
    totalEarned: roundCents(finalBalance - totalInvested),
    finalDividendPerMonth: roundCents((finalBalance * dividendPct) / 100 / 12),
  }
}

/**
 * The sheet's own illustration of the monthly rate: "earn 10% of the sum (for example
 * 0,5% per day)" — and 5% became 0,25%. Both are the monthly figure over twenty, i.e.
 * spread across trading days rather than calendar ones. Kept as plain division, because
 * that is what the sheet says; it is an illustration, not a compounded equivalent.
 *
 * Takes the *monthly* figure, so a rate entered per quarter or per year has to be brought
 * back with `monthlyRate` first.
 */
export const TRADING_DAYS_PER_MONTH = 20
export const dailyEquivalent = (monthlyPct: number): number =>
  monthlyPct / TRADING_DAYS_PER_MONTH
