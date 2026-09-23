import { useEffect, useMemo } from 'react'
import { Controls, CurrencyPicker, LanguagePicker } from './components/Controls.tsx'
import { Converter } from './components/Converter.tsx'
import { GrowthChart } from './components/GrowthChart.tsx'
import { MoreFromAuthor } from './components/MoreFromAuthor.tsx'
import { Summary } from './components/Summary.tsx'
import { Support } from './components/Support.tsx'
import { YearTable } from './components/YearTable.tsx'
import { CURRENCY_SYMBOLS } from './lib/format.ts'
import { project } from './lib/projection.ts'
import { useI18n } from './i18n/index.ts'
import { useSettings, type Theme } from './store/settings.ts'
import { applyStatusBar } from './native.ts'

declare const __BUILD_TIME__: string

const THEMES: { value: Theme; label: 'theme.light' | 'theme.auto' | 'theme.dark' }[] = [
  { value: 'light', label: 'theme.light' },
  { value: 'system', label: 'theme.auto' },
  { value: 'dark', label: 'theme.dark' },
]

export function App() {
  const { deposit, incomeMonthlyPct, dividendPct, years, currency, language, theme, set } =
    useSettings()
  const i18n = useI18n(language)
  const { t } = i18n

  const projection = useMemo(
    () => project({ deposit, incomePct: incomeMonthlyPct, dividendPct, years }),
    [deposit, incomeMonthlyPct, dividendPct, years],
  )

  useEffect(() => {
    const root = document.documentElement
    // 'system' leaves the attribute off entirely, which is what lets the bare
    // prefers-color-scheme rules in styles.css decide.
    if (theme === 'system') root.removeAttribute('data-theme')
    else root.setAttribute('data-theme', theme)

    const dark =
      theme === 'dark' ||
      (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches)

    document
      .querySelector('meta[name="theme-color"]')
      ?.setAttribute('content', dark ? '#0d0d0d' : '#f9f9f7')
    void applyStatusBar(dark)
  }, [theme])

  useEffect(() => {
    // `lang` is what the browser reads for hyphenation, spellcheck and screen-reader
    // voice; `dir` is what flips the whole layout for Arabic.
    document.documentElement.lang = i18n.language.code
    document.documentElement.dir = i18n.dir
  }, [i18n])

  const symbol = CURRENCY_SYMBOLS[currency]

  return (
    <div className="app">
      <header className="masthead">
        <h1>
          InvestTable
          <span className="sub">{t('app.tagline')}</span>
        </h1>
        <CurrencyPicker i18n={i18n} />
      </header>

      <main>
        <Summary projection={projection} symbol={symbol} i18n={i18n} />

        <div className="split">
          <Controls i18n={i18n} />
          <div>
            <GrowthChart projection={projection} symbol={symbol} i18n={i18n} />
            <YearTable projection={projection} symbol={symbol} i18n={i18n} />
            <Converter finalBalance={projection.finalBalance} i18n={i18n} />
          </div>
        </div>

        {/* Full width, below the split: these are about the author rather than the
            projection, and they read better as a footer than as a third column. */}
        <Support i18n={i18n} />
        <MoreFromAuthor i18n={i18n} />
      </main>

      <footer className="colophon">
        <div className="preferences">
          <div className="segmented" role="group" aria-label={t('app.theme')}>
            {THEMES.map((option) => (
              <button
                key={option.value}
                type="button"
                aria-pressed={theme === option.value}
                onClick={() => set('theme', option.value)}
              >
                {t(option.label)}
              </button>
            ))}
          </div>

          <LanguagePicker i18n={i18n} />
        </div>

        <p>{t('footer.disclaimer')}</p>
        <p>{t('footer.privacy')}</p>
        <p>{t('footer.origin', { build: __BUILD_TIME__ })}</p>
      </footer>
    </div>
  )
}
