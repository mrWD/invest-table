import type { Catalogue } from './en.ts'

export const sv = {
  'app.tagline': 'ränta på ränta, månad för månad',
  'app.currency': 'Valuta',
  'app.language': 'Språk',
  'app.theme': 'Tema',

  'theme.light': 'Ljust',
  'theme.auto': 'Auto',
  'theme.dark': 'Mörkt',

  'currency.RUB': 'Rubel',
  'currency.USD': 'Dollar',
  'currency.EUR': 'Euro',

  'summary.after': { one: 'Efter {count} år', other: 'Efter {count} år' },
  'summary.caption': 'saldo, med all avkastning återinvesterad',
  'summary.paidIn': 'Insatt',
  'summary.earned': 'Intjänat',
  'summary.dividends': 'Utdelning, per månad',
  'summary.readout':
    'Med {deposit} i månaden och {rate} avkastning på saldot varje månad — ungefär {daily} per dag — har du till andra månaden tjänat {income} och lagt undan {balance}. Vid {dividend} per år skulle slutsaldot ge {payout} i månaden i utdelning.',

  'controls.title': 'Din plan',
  'controls.reset': 'Återställ',
  'controls.deposit': 'Insättning varje månad',
  'controls.income': 'Avkastning',
  'controls.incomeHint': '≈ {daily} per dag på {days} dagar',
  'controls.incomeHintPeriod': '= {monthly} per månad, ≈ {daily} per dag',
  'controls.perMonth': '% / månad',
  'controls.perQuarter': '% / kvartal',
  'controls.dividend': 'Utdelning',
  'controls.dividendHint': 'på det du äger',
  'controls.perYear': '% / år',
  'controls.ratePeriod': 'Avkastningens period',
  'controls.years': 'Prognosens längd',
  'controls.yearsUnit': 'år',
  'controls.slider': 'reglaget ”{label}”',

  'chart.title': 'Tillväxt',
  'chart.scale': 'Skala',
  'chart.linear': 'Linjär',
  'chart.log': 'Log.',
  'chart.balance': 'Saldo',
  'chart.paidIn': 'Insatt',
  'chart.point': 'År {year}, månad {month}',
  'chart.summary': 'Saldot växer till {final} på {years}, mot {invested} insatta.',

  'table.title': 'Månad för månad',
  'table.month': 'M',
  'table.balance': 'Insatt + återinvesterat',
  'table.income': 'Månadens avkastning',
  'table.dividends': 'utdelning {amount}/mån',
  'table.year': { one: '{count} år', other: '{count} år' },

  'converter.title': 'I andra valutor',
  'converter.amount': 'Belopp',
  'converter.amountHint': 'utgår från slutsaldot',
  'converter.eurUsd': 'dollar för en euro',
  'converter.usdRub': 'rubel för en dollar',
  'converter.eurRub': 'rubel för en euro',
  'converter.live': 'Kurser från open.er-api.com, {date}.',
  'converter.cached': 'Kurser hämtades senast {date}.',
  'converter.manual': 'Kurser ändrade för hand.',
  'converter.offline': 'Offline — visar kurserna som följde med appen.',

  'support.title': 'Stöd',
  'support.text':
    'InvestTable är gratis, har inga annonser och samlar inte in något. Om du har nytta av det kan du stödja det:',

  'projects.title': 'Mer från utvecklaren',
  'projects.all': 'Alla produkter →',

  'footer.disclaimer':
    'En projektion, inte en prognos. Den utgår från att avkastningen du skriver in kommer varje månad utan undantag och återinvesteras i sin helhet, och räknar varken avgifter, skatt, spreadar eller inflation. Verklig avkastning varierar och kan vara negativ. Inget här är investeringsrådgivning.',
  'footer.privacy':
    'Allt stannar på den här enheten — det finns inget konto och ingen server som sparar dina siffror. Det enda som hämtas är växelkurserna, från open.er-api.com, och appen fungerar utan dem.',
  'footer.origin': 'Portad från kalkylbladet ”Revenue Chart” · build {build}',
} satisfies Catalogue
