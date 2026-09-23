/**
 * Number formatting, bound to the reader's language.
 *
 * This used to be one fixed European format — "1 593,75", the spreadsheet's own — on the
 * argument that a row here should read exactly like the row it was ported from. Twenty
 * languages ended that argument: the same string an Italian reads as fifteen hundred, an
 * American reads as one and a half, and being faithful to the sheet's *punctuation* is
 * not worth handing someone the wrong number. Fidelity now lives where it belongs, in the
 * values (`npm run check` still pins all 72 of them), and the presentation follows the
 * locale. Russian, French, Czech and the other space-and-comma languages get the sheet's
 * format anyway, because it was theirs to begin with.
 *
 * Everything is built per locale and cached: `Intl` objects are expensive to construct
 * and these are used a few hundred times per render of the year table.
 */

export const CURRENCY_SYMBOLS = {
  RUB: '₽',
  USD: '$',
  EUR: '€',
} as const

export type CurrencyCode = keyof typeof CURRENCY_SYMBOLS

/**
 * Where grouped digits stop being a number anyone can read.
 *
 * The sliders reach 50 % a month over thirty years, and compounding at that rate arrives
 * at about 10⁶⁹ — seventy digits, which no cell can hold and no reader can parse. Absurd
 * inputs are allowed on purpose (the sheet's own default of 10 % a month is already
 * extraordinary), so the display has to survive them rather than the model refusing them.
 */
const HUGE = 1e15

const SUPERSCRIPT = ['⁰', '¹', '²', '³', '⁴', '⁵', '⁶', '⁷', '⁸', '⁹']

/** A no-break space keeps "154 513,75" from splitting across two lines mid-number. */
const NBSP = ' '

export interface Formatters {
  /** "1 593,75" — the full figure, as the year table shows it. */
  money: (x: number) => string
  /** "1 594" — where cents are noise. */
  whole: (x: number) => string
  /** "1 593,75 €" — figure and symbol bound together so they cannot land on separate lines. */
  amount: (x: number, symbol: string) => string
  /** "92,7 M" / "9270万" — chart axes: short, and in the reader's own abbreviations. */
  compact: (x: number) => string
  /** "92,70 M" — stat tiles, where the figure is the content and keeps a second digit. */
  compactPrecise: (x: number) => string
  /** "1,1569" — an exchange rate, to as many decimals as it needs. */
  rate: (x: number) => string
  /** "10 %" / "%10" / "10٪" — the sign's placement is the locale's business, not ours. */
  percent: (x: number) => string
  /** "15 Aug" — the day a rate was fetched. */
  date: (iso: string) => string
}

const cache = new Map<string, Formatters>()

export function createFormatters(locale: string): Formatters {
  const cached = cache.get(locale)
  if (cached) return cached

  const grouped = new Intl.NumberFormat(locale, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })
  const whole = new Intl.NumberFormat(locale, { maximumFractionDigits: 0 })
  const rate = new Intl.NumberFormat(locale, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 4,
  })
  const percent = new Intl.NumberFormat(locale, {
    style: 'percent',
    maximumFractionDigits: 3,
  })
  const date = new Intl.DateTimeFormat(locale, { day: 'numeric', month: 'short' })

  /*
   * Compact notation is Intl's rather than a hand-rolled k/M/B/T, and that is the whole
   * point of doing it here: German reads "25 Mio.", Russian "25 млн", and Japanese and
   * Chinese group by ten-thousands — "2500万" where English says "25M". A table of
   * English suffixes could not express any of that.
   */
  const compactShort = new Intl.NumberFormat(locale, {
    notation: 'compact',
    compactDisplay: 'short',
    maximumFractionDigits: 1,
  })
  const compactTwo = new Intl.NumberFormat(locale, {
    notation: 'compact',
    compactDisplay: 'short',
    maximumFractionDigits: 2,
  })

  const scientific = (x: number, digits: number): string => {
    const exponent = Math.floor(Math.log10(Math.abs(x)))
    const mantissa = x / 10 ** exponent
    const power = String(exponent)
      .split('')
      .map((digit) => SUPERSCRIPT[Number(digit)] ?? digit)
      .join('')
    return `${new Intl.NumberFormat(locale, { maximumFractionDigits: digits }).format(mantissa)}${NBSP}×${NBSP}10${power}`
  }

  const money = (x: number): string => {
    if (!Number.isFinite(x)) return '—'
    return Math.abs(x) >= HUGE ? scientific(x, 2) : grouped.format(x)
  }

  const formatters: Formatters = {
    money,
    whole: (x) => whole.format(x),
    amount: (x, symbol) => `${money(x)}${NBSP}${symbol}`,
    compact: (x) => {
      if (!Number.isFinite(x)) return '—'
      return Math.abs(x) >= HUGE ? scientific(x, 1) : compactShort.format(x)
    },
    compactPrecise: (x) => {
      if (!Number.isFinite(x)) return '—'
      return Math.abs(x) >= HUGE ? scientific(x, 2) : compactTwo.format(x)
    },
    rate: (x) => rate.format(x),
    // The values in this app are percentages already — 10 means ten percent — while Intl
    // expects the fraction, hence the division.
    percent: (x) => percent.format(x / 100),
    date: (iso) => date.format(new Date(iso)),
  }

  cache.set(locale, formatters)
  return formatters
}
