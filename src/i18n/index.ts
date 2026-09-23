/**
 * Twenty languages, one small runtime.
 *
 * No i18n library: what this app needs is lookup, `{placeholder}` interpolation and
 * correct plurals, and `Intl.PluralRules` already knows every language's rules better
 * than a hand-written table would. The catalogues are ordinary objects checked against
 * the English one at build time, so a missing key cannot ship.
 *
 * All twenty are bundled rather than fetched. Together they are a few tens of kilobytes,
 * and the alternative — a dynamic import per language — would mean either a flash of
 * English on first paint or an async boot, in an app whose first principle is that it
 * works with no network at all.
 */
import { useMemo } from 'react'
import { createFormatters, type Formatters } from '../lib/format.ts'
import type { Params, Plural } from './types.ts'
import { en, type Catalogue } from './locales/en.ts'
import { ar } from './locales/ar.ts'
import { cs } from './locales/cs.ts'
import { de } from './locales/de.ts'
import { es } from './locales/es.ts'
import { fr } from './locales/fr.ts'
import { hi } from './locales/hi.ts'
import { id } from './locales/id.ts'
import { it } from './locales/it.ts'
import { ja } from './locales/ja.ts'
import { ko } from './locales/ko.ts'
import { nl } from './locales/nl.ts'
import { pl } from './locales/pl.ts'
import { pt } from './locales/pt.ts'
import { ru } from './locales/ru.ts'
import { sv } from './locales/sv.ts'
import { tr } from './locales/tr.ts'
import { uk } from './locales/uk.ts'
import { vi } from './locales/vi.ts'
import { zh } from './locales/zh.ts'

export interface Language {
  code: string
  /** What the language calls itself — the only sensible label in a language picker. */
  name: string
  /** BCP-47 tag handed to Intl for numbers, plurals and dates. */
  locale: string
  dir?: 'rtl'
  catalogue: Catalogue
}

/**
 * Ordered by the language's own name: Latin scripts alphabetically, then the rest.
 *
 * The `locale` is not always the bare code. Portuguese is pinned to Brazil and English to
 * the US because those are the number formats their readers expect, and Arabic asks for
 * Latin digits (`-u-nu-latn`) rather than the Arabic-Indic ones Intl would otherwise
 * choose — financial interfaces across the Arabic-speaking world overwhelmingly use
 * Latin digits, and the figures here sit beside Latin currency symbols.
 */
export const LANGUAGES: Language[] = [
  { code: 'id', name: 'Bahasa Indonesia', locale: 'id-ID', catalogue: id },
  { code: 'cs', name: 'Čeština', locale: 'cs-CZ', catalogue: cs },
  { code: 'de', name: 'Deutsch', locale: 'de-DE', catalogue: de },
  { code: 'en', name: 'English', locale: 'en-US', catalogue: en },
  { code: 'es', name: 'Español', locale: 'es-ES', catalogue: es },
  { code: 'fr', name: 'Français', locale: 'fr-FR', catalogue: fr },
  { code: 'it', name: 'Italiano', locale: 'it-IT', catalogue: it },
  { code: 'nl', name: 'Nederlands', locale: 'nl-NL', catalogue: nl },
  { code: 'pl', name: 'Polski', locale: 'pl-PL', catalogue: pl },
  { code: 'pt', name: 'Português', locale: 'pt-BR', catalogue: pt },
  { code: 'sv', name: 'Svenska', locale: 'sv-SE', catalogue: sv },
  { code: 'vi', name: 'Tiếng Việt', locale: 'vi-VN', catalogue: vi },
  { code: 'tr', name: 'Türkçe', locale: 'tr-TR', catalogue: tr },
  { code: 'ru', name: 'Русский', locale: 'ru-RU', catalogue: ru },
  { code: 'uk', name: 'Українська', locale: 'uk-UA', catalogue: uk },
  { code: 'ar', name: 'العربية', locale: 'ar-u-nu-latn', dir: 'rtl', catalogue: ar },
  { code: 'hi', name: 'हिन्दी', locale: 'hi-IN', catalogue: hi },
  { code: 'zh', name: '中文', locale: 'zh-CN', catalogue: zh },
  { code: 'ja', name: '日本語', locale: 'ja-JP', catalogue: ja },
  { code: 'ko', name: '한국어', locale: 'ko-KR', catalogue: ko },
]

export const DEFAULT_LANGUAGE = 'en'

const byCode = new Map(LANGUAGES.map((language) => [language.code, language]))

export const resolveLanguage = (code: string): Language =>
  byCode.get(code) ?? byCode.get(DEFAULT_LANGUAGE)!

/**
 * The device's preference, matched on the base tag: `pt-BR`, `pt-PT` and `pt` all land on
 * Portuguese, `zh-Hans` and `zh-TW` both on Chinese. Regional variants are not separate
 * catalogues here, so the base tag is as fine as the matching gets.
 */
export function detectLanguage(): string {
  const preferences = typeof navigator === 'undefined' ? [] : (navigator.languages ?? [navigator.language])
  for (const tag of preferences) {
    if (!tag) continue
    const base = tag.toLowerCase().split('-')[0]
    if (byCode.has(base)) return base
  }
  return DEFAULT_LANGUAGE
}

const isPlural = (value: Catalogue[keyof Catalogue]): value is Plural =>
  typeof value === 'object' && value !== null

const interpolate = (template: string, params?: Params): string =>
  params === undefined
    ? template
    : template.replace(/\{(\w+)\}/g, (whole, name: string) =>
        name in params ? String(params[name]) : whole,
      )

export interface I18n {
  t: (key: keyof Catalogue, params?: Params) => string
  language: Language
  fmt: Formatters
  dir: 'ltr' | 'rtl'
}

/** One instance per language, kept so Intl objects are built once rather than per render. */
const cache = new Map<string, I18n>()

export function getI18n(code: string): I18n {
  const cached = cache.get(code)
  if (cached) return cached

  const language = resolveLanguage(code)
  const plurals = new Intl.PluralRules(language.locale)

  const instance: I18n = {
    language,
    dir: language.dir ?? 'ltr',
    fmt: createFormatters(language.locale),
    t(key, params) {
      const entry = language.catalogue[key] ?? en[key]
      if (!isPlural(entry)) return interpolate(entry, params)

      // A plural key without a count is a programming error, not a user-facing one;
      // falling back to `other` keeps the screen readable while it is fixed.
      const count = Number(params?.count ?? 0)
      const form = plurals.select(count)
      return interpolate(entry[form] ?? entry.other, params)
    },
  }

  cache.set(code, instance)
  return instance
}

export function useI18n(code: string): I18n {
  return useMemo(() => getI18n(code), [code])
}
