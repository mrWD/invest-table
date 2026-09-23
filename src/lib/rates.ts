/**
 * Exchange rates for the converter the sheet built out of GOOGLEFINANCE.
 *
 * There is no key and no account behind this: open.er-api.com publishes a free daily
 * USD-based table, and it is the only network call the whole app makes. Everything
 * degrades in order — a live fetch, else the last fetch cached on the device, else the
 * figures the spreadsheet itself was showing. The rates are editable by hand as well, so
 * the converter still works on a plane with a stale cache and a rate the owner disagrees
 * with.
 *
 * ECB-derived feeds are not usable here: they dropped the ruble in 2022, and the sheet's
 * three pairs all involve it.
 */
import type { CurrencyCode } from './format.ts'

export interface Rates {
  /** US dollars for one euro. */
  eurUsd: number
  /** Rubles for one US dollar. */
  usdRub: number
  /** Rubles for one euro. */
  eurRub: number
}

export interface RatesState extends Rates {
  /** ISO date of the fetch these came from, or undefined for the bundled fallback. */
  fetchedAt?: string
  source: 'live' | 'cache' | 'fallback' | 'manual'
}

/** What the spreadsheet was showing when it was handed over — the floor everything falls to. */
export const FALLBACK_RATES: Rates = {
  eurUsd: 1.1569,
  usdRub: 84.183,
  eurRub: 97.18,
}

const CACHE_KEY = 'invest-table:rates'
const ENDPOINT = 'https://open.er-api.com/v6/latest/USD'

/** Rates older than this are refetched on launch; until one arrives the cache is shown. */
const MAX_AGE_MS = 12 * 60 * 60 * 1000

interface CachedRates extends Rates {
  fetchedAt: string
}

function readCache(): CachedRates | null {
  try {
    const raw = localStorage.getItem(CACHE_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw) as CachedRates
    const usable = [parsed.eurUsd, parsed.usdRub, parsed.eurRub].every(
      (n) => typeof n === 'number' && Number.isFinite(n) && n > 0,
    )
    return usable ? parsed : null
  } catch {
    return null
  }
}

function writeCache(rates: CachedRates): void {
  try {
    localStorage.setItem(CACHE_KEY, JSON.stringify(rates))
  } catch {
    // A full or blocked storage is not a reason to lose the rates already in memory.
  }
}

/** Whatever is on the device right now, without touching the network. */
export function loadRates(): RatesState {
  const cached = readCache()
  if (cached) return { ...cached, source: 'cache' }
  return { ...FALLBACK_RATES, source: 'fallback' }
}

const isFresh = (fetchedAt?: string): boolean =>
  fetchedAt !== undefined && Date.now() - Date.parse(fetchedAt) < MAX_AGE_MS

/**
 * Refresh from the network. Resolves to null when there is nothing better to offer than
 * what the caller already has — offline, rate-limited, or a cache that is still fresh.
 */
export async function refreshRates(current: RatesState): Promise<RatesState | null> {
  if (current.source === 'cache' && isFresh(current.fetchedAt)) return null

  try {
    const response = await fetch(ENDPOINT, { signal: AbortSignal.timeout(6000) })
    if (!response.ok) return null

    const body = (await response.json()) as { result?: string; rates?: Record<string, number> }
    const eur = body.rates?.EUR
    const rub = body.rates?.RUB
    if (body.result !== 'success' || !eur || !rub) return null

    // Four decimals: finer than any retail rate anyone will ever get, and it keeps the
    // editable fields from showing a number like 1,156581469020387.
    const to4 = (x: number) => Math.round(x * 1e4) / 1e4

    const fresh: CachedRates = {
      // The feed is USD-based: EUR is euros per dollar, so one euro costs 1/EUR dollars.
      eurUsd: to4(1 / eur),
      usdRub: to4(rub),
      eurRub: to4(rub / eur),
      fetchedAt: new Date().toISOString(),
    }
    writeCache(fresh)
    return { ...fresh, source: 'live' }
  } catch {
    // Offline, blocked, or slow. The caller keeps what it had.
    return null
  }
}

/**
 * Convert between the three currencies the sheet tracked.
 *
 * Each of the six directions uses the pair's own rate rather than routing through the
 * dollar, because all three are editable: someone who corrects €/₽ by hand expects that
 * correction to be the one applied, not a cross-rate rebuilt from the other two. The
 * fetched triple is internally consistent anyway, being three ratios of one USD table.
 */
export function convert(
  amount: number,
  from: CurrencyCode,
  to: CurrencyCode,
  rates: Rates,
): number {
  if (from === to) return amount
  if (from === 'EUR' && to === 'USD') return amount * rates.eurUsd
  if (from === 'USD' && to === 'EUR') return amount / rates.eurUsd
  if (from === 'USD' && to === 'RUB') return amount * rates.usdRub
  if (from === 'RUB' && to === 'USD') return amount / rates.usdRub
  if (from === 'EUR' && to === 'RUB') return amount * rates.eurRub
  return amount / rates.eurRub // RUB → EUR
}
