import type { Projection } from '../lib/projection.ts'
import type { I18n } from '../i18n/index.ts'
import { useSettings } from '../store/settings.ts'
import { tapped } from '../native.ts'

/**
 * The spreadsheet's own table, one block per year.
 *
 * The sheet showed all 120 rows at once because a spreadsheet can afford to; on a phone
 * that is a very long scroll to reach year nine. The blocks collapse instead, and each
 * closed one still carries the two figures worth seeing from the outside: what the year
 * closed at, and the dividend the *previous* year's close would pay every month — the
 * sheet's "Possible Dividend Income per month" column, which is why the first year has
 * none.
 */
export function YearTable({
  projection,
  symbol,
  i18n,
}: {
  projection: Projection
  symbol: string
  i18n: I18n
}) {
  const { openYears, toggleYear } = useSettings()
  const { t, fmt } = i18n

  return (
    <section className="card" aria-labelledby="table-heading">
      <div className="card-head">
        <h2 id="table-heading">{t('table.title')}</h2>
      </div>

      {projection.years.map((block) => {
        const open = openYears.includes(block.year)

        return (
          <div className="year" key={block.year}>
            <button
              type="button"
              className="year-head"
              aria-expanded={open}
              aria-controls={`year-${block.year}`}
              onClick={() => {
                toggleYear(block.year)
                tapped()
              }}
            >
              <span className="chevron" aria-hidden="true">
                ▶
              </span>
              <span className="name">{t('table.year', { count: block.year })}</span>
              <span className="end">
                {fmt.amount(block.endBalance, symbol)}
                {block.dividendPerMonth === undefined ? null : (
                  <span className="dividend">
                    {t('table.dividends', { amount: fmt.amount(block.dividendPerMonth, symbol) })}
                  </span>
                )}
              </span>
            </button>

            {open ? (
              <table className="months selectable" id={`year-${block.year}`}>
                <thead>
                  <tr>
                    <th scope="col">{t('table.month')}</th>
                    <th scope="col">{t('table.balance')}</th>
                    <th scope="col">{t('table.income')}</th>
                  </tr>
                </thead>
                <tbody>
                  {block.months.map((row) => (
                    <tr key={row.index}>
                      <td>{fmt.whole(row.monthOfYear)}</td>
                      <td className="balance">{fmt.money(row.balance)}</td>
                      <td className="income">{fmt.money(row.income)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : null}
          </div>
        )
      })}
    </section>
  )
}
