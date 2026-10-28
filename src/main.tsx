import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { App } from './App.tsx'
import { resolveLanguage } from './i18n/index.ts'
import { initMetrics } from './lib/metrics.ts'
import { hideSplash, wireBackButton } from './native.ts'
import { DEFAULTS, useSettings } from './store/settings.ts'
import './styles.css'

const root = document.getElementById('root')
if (!root) throw new Error('#root is missing from index.html')

/*
 * Before the first render, so the screen view and anything clicked are counted against a
 * state that exists. A device whose saved inputs already differ from the defaults used the
 * app before metrics arrived, and is `legacy` rather than a new install. The theme, the
 * language and which years are open do not count: those are preferences, not a plan.
 */
initMetrics({
  hasUserData: () => {
    const s = useSettings.getState()
    return (
      s.deposit !== DEFAULTS.deposit ||
      s.incomeMonthlyPct !== DEFAULTS.incomeMonthlyPct ||
      s.dividendPct !== DEFAULTS.dividendPct ||
      s.years !== DEFAULTS.years
    )
  },
  lang: () => resolveLanguage(useSettings.getState().language).code,
})

createRoot(root).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

// After the first paint, not on a timer: the splash covers exactly the gap it should.
requestAnimationFrame(() => {
  void hideSplash()
})
void wireBackButton()
