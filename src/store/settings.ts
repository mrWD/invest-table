/**
 * Every input the app has, persisted to localStorage.
 *
 * Small, flat and local by design: the app has no accounts and no backend, so the whole
 * of "your data" is these few numbers. Rates live in their own module because they have a
 * network story; everything here is user-entered.
 */
import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { CurrencyCode } from '../lib/format.ts'
import { monthlyRate, type RatePeriod } from '../lib/projection.ts'
import { detectLanguage } from '../i18n/index.ts'

export type Theme = 'system' | 'light' | 'dark'
export type ChartScale = 'linear' | 'log'

export interface Settings {
  /** DEFAULT SUM — paid in every month. */
  deposit: number
  /**
   * INCOME, **always percent per month**, at full precision.
   *
   * The period below is a way of writing this number, not a second number. Keeping the
   * monthly rate as the one stored truth is what makes switching between month, quarter
   * and year exactly lossless: nothing is recomputed, only relabelled. Storing the rate
   * in whichever unit was last picked cannot do that — a year re-quoted to two or even
   * four decimals lands a hair off, and the sheet's own chain sits on exact half-cent
   * boundaries at months 10, 11 and 12, where a hair is enough to tip a cent.
   */
  incomeMonthlyPct: number
  /** How the rate is written in the field. Display only; never feeds the model. */
  incomePeriod: RatePeriod
  /** DIVIDENDS, percent per year. */
  dividendPct: number
  /** How far the projection runs. The sheet stopped at ten. */
  years: number
  currency: CurrencyCode
  /**
   * One of the twenty in `i18n/LANGUAGES`. Defaults to the device's preference, so most
   * people never open the picker; once they do, the choice is theirs and persists.
   */
  language: string
  theme: Theme
  chartScale: ChartScale
  /** Which year blocks are open in the table. */
  openYears: number[]
}

export interface SettingsActions {
  set: <K extends keyof Settings>(key: K, value: Settings[K]) => void
  /** Takes the rate as it was typed — in whatever period is selected — and stores it monthly. */
  setIncome: (pctInPeriod: number) => void
  toggleYear: (year: number) => void
  reset: () => void
}

/**
 * Where the app opens, in the device's own language.
 *
 * The spreadsheet started at 10 % a month, and that figure is still one tap away — the
 * model reproduces it exactly and `npm run check` holds it there. But a landing screen is
 * an assertion, and a compounding calculator whose first screen shows 92 million from
 * 12 000 paid in reads as a promise rather than a projection. With the app going to open
 * TestFlight, where anyone can install it, it opens on something ordinary instead: 8 % a
 * year, roughly a broad index fund's long-run average.
 *
 * Stored monthly, as always — 8 % a year is 0,643 % a month — with the period set to
 * `year` so the field shows the 8 the owner typed rather than its monthly equivalent.
 */
export const DEFAULTS: Settings = {
  deposit: 100,
  incomeMonthlyPct: monthlyRate(8, 'year'),
  incomePeriod: 'year',
  dividendPct: 2,
  years: 10,
  currency: 'EUR',
  language: detectLanguage(),
  theme: 'system',
  chartScale: 'linear',
  openYears: [1],
}

/**
 * Bounds for the inputs. The upper ends are generous rather than opinionated — 10 % a
 * month is already an extraordinary return and the sheet asked for it by default, so the
 * app is in no position to cap anyone at something "sensible".
 */
export const LIMITS = {
  deposit: { min: 0, max: 1_000_000, step: 10 },
  dividendPct: { min: 0, max: 50, step: 0.1 },
  years: { min: 1, max: 30, step: 1 },
} as const

/**
 * The return's ceiling, per period — all three describing the *same* set of plans.
 *
 * 50 % a month compounds to 237,5 % a quarter and 12 874 % a year, so the quarter and
 * year ceilings are those figures rounded up. Picking rounder, smaller numbers would mean
 * that switching the period silently clamped the rate, and switching how a return is
 * written must never change the projection.
 *
 * The slider is logarithmic, which is what keeps a 13 000 % ceiling from burying the 5–30 %
 * a year that people actually type.
 */
export const INCOME_LIMITS: Record<RatePeriod, { min: number; max: number; step: number }> = {
  month: { min: 0, max: 50, step: 0.1 },
  quarter: { min: 0, max: 240, step: 0.1 },
  year: { min: 0, max: 13_000, step: 0.1 },
}

const clamp = (value: number, { min, max }: { min: number; max: number }) =>
  Math.min(max, Math.max(min, value))

export const useSettings = create<Settings & SettingsActions>()(
  persist(
    (setState) => ({
      ...DEFAULTS,

      /*
       * Note what is *not* here: changing `incomePeriod` goes through this generic setter
       * and touches nothing else. The stored rate is already monthly, so re-labelling it
       * a quarter or a year is a pure display change and the projection cannot move.
       */
      set: (key, value) =>
        setState(() => {
          if (typeof value === 'number' && key in LIMITS) {
            const limit = LIMITS[key as keyof typeof LIMITS]
            // A half-typed number arrives as NaN; keeping the previous value would fight
            // the keyboard, so it falls back to the low bound and the field stays live.
            const safe = Number.isFinite(value) ? clamp(value, limit) : limit.min
            return { [key]: safe } as Partial<Settings>
          }
          return { [key]: value } as Partial<Settings>
        }),

      setIncome: (pctInPeriod) =>
        setState((state) => {
          const limit = INCOME_LIMITS[state.incomePeriod]
          const safe = Number.isFinite(pctInPeriod) ? clamp(pctInPeriod, limit) : limit.min
          // Converted once, on the way in. Full precision is kept: what the field shows is
          // rounded for reading, what the model runs on is not.
          return { incomeMonthlyPct: monthlyRate(safe, state.incomePeriod) }
        }),

      toggleYear: (year) =>
        setState((state) => ({
          openYears: state.openYears.includes(year)
            ? state.openYears.filter((y) => y !== year)
            : [...state.openYears, year],
        })),

      reset: () => setState(() => ({ ...DEFAULTS })),
    }),
    {
      name: 'invest-table:settings',
      version: 2,
      /**
       * v1 stored `incomePct`, which was monthly by definition because there was no other
       * option. It carries over unchanged — only the name says so now.
       */
      migrate: (persisted, version) => {
        const { incomePct, ...state } = (persisted ?? {}) as Partial<Settings> & {
          incomePct?: number
        }
        const carried =
          version < 2 && typeof incomePct === 'number' ? incomePct : state.incomeMonthlyPct
        return {
          ...DEFAULTS,
          ...state,
          incomeMonthlyPct: carried ?? DEFAULTS.incomeMonthlyPct,
        }
      },
      // Actions are recreated on every load; only the values are worth storing.
      partialize: ({
        set: _set,
        setIncome: _setIncome,
        toggleYear: _toggleYear,
        reset: _reset,
        ...values
      }) => values,
    },
  ),
)
