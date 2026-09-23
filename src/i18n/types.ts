/**
 * The shape every catalogue has to satisfy.
 *
 * English is the source: `Catalogue` is derived from it in `locales/en.ts`, and every
 * other file is written `satisfies Catalogue`, so a missing or misspelled key is a build
 * error rather than a string that silently falls back at runtime. With twenty languages
 * that check is the only thing that makes the set maintainable by hand.
 */

/**
 * A string that changes with a count.
 *
 * The categories are CLDR's, resolved by `Intl.PluralRules` for the active language —
 * Russian and Ukrainian need one/few/many, Polish and Czech the same three with different
 * boundaries, Arabic all six, and Japanese, Korean, Chinese, Vietnamese and Indonesian
 * only `other`. Anything the language does not use is simply left out; `other` is the
 * fallback and the only required form.
 */
export interface Plural {
  zero?: string
  one?: string
  two?: string
  few?: string
  many?: string
  other: string
}

/** Placeholders are `{name}` and are replaced from a plain object. */
export type Params = Record<string, string | number>
