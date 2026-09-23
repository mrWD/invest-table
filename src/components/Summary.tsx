import { dailyEquivalent, type Projection } from '../lib/projection.ts'
import type { I18n } from '../i18n/index.ts'
import { useSettings } from '../store/settings.ts'

/**
 * The headline figures, and the sheet's own explanatory sentence underneath.
 *
 * That sentence was static text in the spreadsheet — it described the two-month position
 * for whatever was typed above it, and someone had to keep it in step by hand. Here it is
 * one translated string with six placeholders, filled from the same projection as the
 * table, so it cannot drift from the numbers or from the reader's language.
 */
export function Summary({
  projection,
  symbol,
  i18n,
}: {
  projection: Projection
  symbol: string
  i18n: I18n
}) {
  const { deposit, incomeMonthlyPct, dividendPct, years } = useSettings()
  const { t, fmt } = i18n
  const secondMonth = projection.months[1]
  // The sentence says "each month", and the stored rate already is monthly, whatever
  // period the field was showing when it was typed.
  const monthly = incomeMonthlyPct

  return (
    <section className="card" aria-labelledby="summary-heading">
      <h2 id="summary-heading">{t('summary.after', { count: years })}</h2>

      <div className="hero">
        <span className="value">{fmt.money(projection.finalBalance)}</span>
        <span className="currency">{symbol}</span>
      </div>
      <p className="hero-caption">{t('summary.caption')}</p>

      {/*
        Shortened, not spelled out. At the rates this sheet was built for the ten-year
        figure runs to eleven digits, which wraps a tile onto three lines and stops
        reading as a number at all. The exact value stays one hover away, and the table
        below never rounds.
      */}
      <div className="tiles">
        {[
          { label: t('summary.paidIn'), value: projection.totalInvested, className: 'tile' },
          { label: t('summary.earned'), value: projection.totalEarned, className: 'tile is-earned' },
          {
            label: t('summary.dividends'),
            value: projection.finalDividendPerMonth,
            className: 'tile',
          },
        ].map((tile) => (
          <div className={tile.className} key={tile.label}>
            <span className="label">{tile.label}</span>
            <span className="value" title={fmt.amount(tile.value, symbol)}>
              {fmt.compactPrecise(tile.value)}
              <span className="unit">{symbol}</span>
            </span>
          </div>
        ))}
      </div>

      {secondMonth ? (
        <p className="readout">
          {t('summary.readout', {
            deposit: fmt.amount(deposit, symbol),
            rate: fmt.percent(monthly),
            daily: fmt.percent(dailyEquivalent(monthly)),
            income: fmt.amount(secondMonth.income, symbol),
            balance: fmt.amount(secondMonth.balance, symbol),
            dividend: fmt.percent(dividendPct),
            payout: fmt.amount(projection.finalDividendPerMonth, symbol),
          })}
        </p>
      ) : null}
    </section>
  )
}
