import { useEffect, useState } from 'react'
import { CURRENCY_SYMBOLS, type CurrencyCode } from '../lib/format.ts'
import { convert, loadRates, refreshRates, type RatesState } from '../lib/rates.ts'
import type { I18n } from '../i18n/index.ts'
import { useSettings } from '../store/settings.ts'

/**
 * The sheet's currency block, turned into something you can actually use.
 *
 * The spreadsheet showed three GOOGLEFINANCE rates and what 100 became at each. The
 * amount here starts at the projection's final balance instead, which is the number
 * someone actually wants converted, and every rate is editable — the free feed behind
 * this is a daily average, and anyone with a broker's real rate should be able to type
 * it in.
 */
const PAIRS = [
  { key: 'eurUsd', label: '€ → $', hint: 'converter.eurUsd' },
  { key: 'usdRub', label: '$ → ₽', hint: 'converter.usdRub' },
  { key: 'eurRub', label: '€ → ₽', hint: 'converter.eurRub' },
] as const

export function Converter({ finalBalance, i18n }: { finalBalance: number; i18n: I18n }) {
  const { currency } = useSettings()
  const { t, fmt } = i18n
  const [rates, setRates] = useState<RatesState>(loadRates)
  const [draft, setDraft] = useState<string | null>(null)

  useEffect(() => {
    let live = true
    // `loadRates()` rather than the `rates` state: it reads the same device cache the
    // state was initialised from, and depending on the state instead would re-fetch on
    // every keystroke in the rate fields below — fighting the person correcting them.
    void refreshRates(loadRates()).then((fresh) => {
      if (live && fresh) setRates(fresh)
    })
    return () => {
      live = false
    }
  }, [])

  const value = draft === null ? finalBalance : Number.parseFloat(draft) || 0

  return (
    <section className="card" aria-labelledby="converter-heading">
      <div className="card-head">
        <h2 id="converter-heading">{t('converter.title')}</h2>
      </div>

      <div className="field">
        <div className="field-head">
          <label htmlFor="convert-amount">{t('converter.amount')}</label>
          <span className="hint">{t('converter.amountHint')}</span>
        </div>
        <div className="field-input">
          <input
            id="convert-amount"
            type="number"
            inputMode="decimal"
            value={draft ?? String(finalBalance)}
            onChange={(event) => setDraft(event.target.value)}
            onFocus={(event) => event.target.select()}
          />
          <span className="unit">{CURRENCY_SYMBOLS[currency]}</span>
        </div>
      </div>

      <div className="converted">
        {(Object.keys(CURRENCY_SYMBOLS) as CurrencyCode[]).map((code) => {
          const converted = convert(value, currency, code, rates)
          return (
            <div className="tile" key={code}>
              <span className="label">{t(`currency.${code}` as 'currency.EUR')}</span>
              <span className="value" title={fmt.amount(converted, CURRENCY_SYMBOLS[code])}>
                {fmt.compactPrecise(converted)}
                <span className="unit">{CURRENCY_SYMBOLS[code]}</span>
              </span>
            </div>
          )
        })}
      </div>

      <div className="rates">
        {PAIRS.map((pair) => (
          <div className="rate-row" key={pair.key}>
            <span className="pair">{pair.label}</span>
            <input
              type="number"
              inputMode="decimal"
              aria-label={t(pair.hint)}
              value={rates[pair.key]}
              step="0.0001"
              min="0"
              onChange={(event) => {
                const next = Number.parseFloat(event.target.value)
                setRates((current) => ({
                  ...current,
                  [pair.key]: Number.isFinite(next) && next > 0 ? next : current[pair.key],
                  source: 'manual',
                }))
              }}
            />
          </div>
        ))}
      </div>

      <p className="rates-meta">
        <span>{describe(rates, i18n)}</span>
      </p>
    </section>
  )
}

function describe(rates: RatesState, { t, fmt }: I18n): string {
  if (rates.source === 'manual') return t('converter.manual')
  if (rates.source === 'fallback') return t('converter.offline')

  const date = rates.fetchedAt ? fmt.date(rates.fetchedAt) : ''
  return rates.source === 'live' ? t('converter.live', { date }) : t('converter.cached', { date })
}
