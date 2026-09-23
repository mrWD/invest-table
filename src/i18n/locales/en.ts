import type { Plural } from '../types.ts'

/**
 * English — the source catalogue. Every other language is checked against this shape.
 *
 * Placeholders are `{name}`. Where a string ends up inside a sentence with numbers in it,
 * the numbers arrive already formatted for the reader's locale, so a catalogue never
 * spells out a digit or a separator itself.
 */
export const en = {
  'app.tagline': 'compound growth, month by month',
  'app.currency': 'Currency',
  'app.language': 'Language',
  'app.theme': 'Theme',

  'theme.light': 'Light',
  'theme.auto': 'Auto',
  'theme.dark': 'Dark',

  'currency.RUB': 'Ruble',
  'currency.USD': 'Dollar',
  'currency.EUR': 'Euro',

  'summary.after': { one: 'After {count} year', other: 'After {count} years' } as Plural,
  'summary.caption': 'balance, with every return reinvested',
  'summary.paidIn': 'Paid in',
  'summary.earned': 'Earned',
  'summary.dividends': 'Dividends, per month',
  'summary.readout':
    'Paying in {deposit} a month and earning {rate} of the balance each month — about {daily} a day — you have earned {income} and put aside {balance} by the second month. At {dividend} a year, the final balance would pay {payout} a month in dividends.',

  'controls.title': 'Your plan',
  'controls.reset': 'Reset',
  'controls.deposit': 'Paid in every month',
  'controls.income': 'Return',
  'controls.incomeHint': '≈ {daily} a day over {days} days',
  'controls.incomeHintPeriod': '= {monthly} a month, ≈ {daily} a day',
  'controls.perMonth': '% / month',
  'controls.perQuarter': '% / quarter',
  'controls.dividend': 'Dividends',
  'controls.dividendHint': 'paid on what you hold',
  'controls.perYear': '% / year',
  'controls.ratePeriod': 'Rate period',
  'controls.years': 'Projection length',
  'controls.yearsUnit': 'years',
  'controls.slider': '{label} slider',

  'chart.title': 'Growth',
  'chart.scale': 'Chart scale',
  'chart.linear': 'Linear',
  'chart.log': 'Log',
  'chart.balance': 'Balance',
  'chart.paidIn': 'Paid in',
  'chart.point': 'Year {year}, month {month}',
  'chart.summary': 'Balance grows to {final} over {years}, against {invested} paid in.',

  'table.title': 'Month by month',
  'table.month': 'M',
  'table.balance': 'Paid in + reinvested',
  'table.income': 'Monthly income',
  'table.dividends': 'dividends {amount}/mo',
  'table.year': { one: '{count} Year', other: '{count} Years' } as Plural,

  'converter.title': 'In other currencies',
  'converter.amount': 'Amount',
  'converter.amountHint': 'starts at the final balance',
  'converter.eurUsd': 'dollars for one euro',
  'converter.usdRub': 'rubles for one dollar',
  'converter.eurRub': 'rubles for one euro',
  'converter.live': 'Rates from open.er-api.com, {date}.',
  'converter.cached': 'Last rates fetched {date}.',
  'converter.manual': 'Rates edited by hand.',
  'converter.offline': 'Offline — showing the rates this app shipped with.',

  'support.title': 'Support',
  'support.text':
    'InvestTable is free, has no ads and collects nothing. If it is useful to you, you can support it:',

  'projects.title': 'More from the author',
  'projects.all': 'All products →',

  'footer.disclaimer':
    'A projection, not a forecast. It assumes the return you type in arrives every month without fail and is reinvested in full, and it counts no fees, taxes, spreads or inflation. Real returns vary and can be negative. Nothing here is investment advice.',
  'footer.privacy':
    'Everything stays on this device — there is no account and no server holding your figures. Exchange rates are the one thing fetched, from open.er-api.com, and the app works without them.',
  'footer.origin': 'Ported from the “Revenue Chart” spreadsheet · build {build}',
}

export type Catalogue = typeof en
