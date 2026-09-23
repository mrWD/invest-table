import { useState } from 'react'
import { CURRENCY_SYMBOLS, type CurrencyCode } from '../lib/format.ts'
import {
  convertRate,
  dailyEquivalent,
  TRADING_DAYS_PER_MONTH,
  type RatePeriod,
} from '../lib/projection.ts'
import { LANGUAGES } from '../i18n/index.ts'
import type { I18n } from '../i18n/index.ts'
import { INCOME_LIMITS, LIMITS, useSettings } from '../store/settings.ts'
import { NumberField } from './NumberField.tsx'

/** The sheet's three inputs, plus how far to run them. */
export function Controls({ i18n }: { i18n: I18n }) {
  const { deposit, incomeMonthlyPct, incomePeriod, dividendPct, years, currency, set, setIncome, reset } =
    useSettings()

  /*
   * The rate as the field shows it. Derived, not stored — the store keeps the monthly
   * figure at full precision, and this is only its reading in the chosen period, rounded
   * to four decimals so "213,8428 % a year" stays a number someone can retype.
   */
  const shownRate = convertRate(incomeMonthlyPct, 'month', incomePeriod)
  const { t, fmt } = i18n
  const symbol = CURRENCY_SYMBOLS[currency]

  /*
   * Bumped on reset, and used as the fields' key.
   *
   * Each field holds the half-typed text in its own state until it loses focus, which is
   * what makes a value retypable. Reset changes the store underneath that draft, and
   * without a remount the field goes on showing what was typed while every other figure
   * on screen has already gone back to the default. Remounting is the cheapest correct
   * answer: it discards exactly the state that is now stale, and only when it is.
   */
  const [generation, setGeneration] = useState(0)

  return (
    <section className="card" aria-labelledby="controls-heading">
      <div className="card-head">
        <h2 id="controls-heading">{t('controls.title')}</h2>
        <button
          type="button"
          className="ghost-button"
          onClick={() => {
            reset()
            setGeneration((n) => n + 1)
          }}
        >
          {t('controls.reset')}
        </button>
      </div>

      <NumberField
        key={`deposit-${generation}`}
        id="deposit"
        label={t('controls.deposit')}
        unit={symbol}
        value={deposit}
        scale="log"
        {...LIMITS.deposit}
        sliderLabel={t('controls.slider', { label: t('controls.deposit') })}
        onChange={(value) => set('deposit', value)}
      />

      <NumberField
        key={`income-${generation}`}
        id="income"
        label={t('controls.income')}
        /*
         * On months the hint is the sheet's own daily illustration. On quarters and years
         * it leads with the monthly equivalent, because that is the figure the model
         * actually compounds — 20 % a year is 1,53 % a month, not 1,67 %, and someone
         * should be able to see which of the two the app used.
         */
        hint={
          incomePeriod === 'month'
            ? t('controls.incomeHint', {
                daily: fmt.percent(dailyEquivalent(incomeMonthlyPct)),
                days: fmt.whole(TRADING_DAYS_PER_MONTH),
              })
            : t('controls.incomeHintPeriod', {
                monthly: fmt.percent(incomeMonthlyPct),
                daily: fmt.percent(dailyEquivalent(incomeMonthlyPct)),
              })
        }
        unit={<PeriodPicker i18n={i18n} />}
        value={shownRate}
        scale="log"
        {...INCOME_LIMITS[incomePeriod]}
        sliderLabel={t('controls.slider', { label: t('controls.income') })}
        onChange={setIncome}
      />

      <NumberField
        key={`dividend-${generation}`}
        id="dividend"
        label={t('controls.dividend')}
        hint={t('controls.dividendHint')}
        unit={t('controls.perYear')}
        value={dividendPct}
        {...LIMITS.dividendPct}
        sliderLabel={t('controls.slider', { label: t('controls.dividend') })}
        onChange={(value) => set('dividendPct', value)}
      />

      <NumberField
        key={`years-${generation}`}
        id="years"
        label={t('controls.years')}
        unit={t('controls.yearsUnit')}
        value={years}
        {...LIMITS.years}
        sliderLabel={t('controls.slider', { label: t('controls.years') })}
        onChange={(value) => set('years', value)}
      />
    </section>
  )
}

/**
 * The unit of the return, and the control that changes it.
 *
 * It sits where the plain "% / month" label used to, because that is exactly what it
 * states: what the number to its left means. A separate segmented control beside the
 * field would say the same thing twice and cost a row on a phone.
 */
const PERIOD_UNITS: Record<RatePeriod, 'controls.perMonth' | 'controls.perQuarter' | 'controls.perYear'> = {
  month: 'controls.perMonth',
  quarter: 'controls.perQuarter',
  year: 'controls.perYear',
}

function PeriodPicker({ i18n }: { i18n: I18n }) {
  const { incomePeriod, set } = useSettings()

  return (
    <label className="unit-picker">
      <span className="visually-hidden">{i18n.t('controls.ratePeriod')}</span>
      <select
        value={incomePeriod}
        onChange={(event) => set('incomePeriod', event.target.value as RatePeriod)}
      >
        {(Object.keys(PERIOD_UNITS) as RatePeriod[]).map((period) => (
          <option key={period} value={period}>
            {i18n.t(PERIOD_UNITS[period])}
          </option>
        ))}
      </select>
    </label>
  )
}

/** The currency this projection is counted in — a label, not a conversion. */
export function CurrencyPicker({ i18n }: { i18n: I18n }) {
  const { currency, set } = useSettings()

  return (
    <div className="segmented" role="group" aria-label={i18n.t('app.currency')}>
      {(Object.keys(CURRENCY_SYMBOLS) as CurrencyCode[]).map((code) => (
        <button
          key={code}
          type="button"
          aria-pressed={currency === code}
          aria-label={i18n.t(`currency.${code}` as 'currency.EUR')}
          onClick={() => set('currency', code)}
        >
          {CURRENCY_SYMBOLS[code]}
        </button>
      ))}
    </div>
  )
}

/**
 * Twenty options is past what a segmented control can hold, so this is a real `<select>` —
 * which also means the phone shows its own picker wheel rather than a list this app would
 * have to build and make accessible itself. Every option is written in its own language:
 * someone looking for their language is not reading the current one.
 */
export function LanguagePicker({ i18n }: { i18n: I18n }) {
  const { language, set } = useSettings()

  return (
    <label className="language-picker">
      <span className="visually-hidden">{i18n.t('app.language')}</span>
      <select value={language} onChange={(event) => set('language', event.target.value)}>
        {LANGUAGES.map((option) => (
          <option key={option.code} value={option.code} lang={option.code}>
            {option.name}
          </option>
        ))}
      </select>
    </label>
  )
}
