import type { Catalogue } from './en.ts'

export const it = {
  'app.tagline': 'interesse composto, mese dopo mese',
  'app.currency': 'Valuta',
  'app.language': 'Lingua',
  'app.theme': 'Tema',

  'theme.light': 'Chiaro',
  'theme.auto': 'Auto',
  'theme.dark': 'Scuro',

  'currency.RUB': 'Rublo',
  'currency.USD': 'Dollaro',
  'currency.EUR': 'Euro',

  'summary.after': { one: 'Dopo {count} anno', other: 'Dopo {count} anni' },
  'summary.caption': 'saldo, con ogni rendimento reinvestito',
  'summary.paidIn': 'Versato',
  'summary.earned': 'Guadagnato',
  'summary.dividends': 'Dividendi, al mese',
  'summary.readout':
    'Versando {deposit} al mese e guadagnando {rate} del saldo ogni mese — circa {daily} al giorno — al secondo mese hai guadagnato {income} e messo da parte {balance}. Con {dividend} all’anno, il saldo finale pagherebbe {payout} al mese in dividendi.',

  'controls.title': 'Il tuo piano',
  'controls.reset': 'Reimposta',
  'controls.deposit': 'Versamento mensile',
  'controls.income': 'Rendimento',
  'controls.incomeHint': '≈ {daily} al giorno su {days} giorni',
  'controls.incomeHintPeriod': '= {monthly} al mese, ≈ {daily} al giorno',
  'controls.perMonth': '% / mese',
  'controls.perQuarter': '% / trimestre',
  'controls.dividend': 'Dividendi',
  'controls.dividendHint': 'su ciò che detieni',
  'controls.perYear': '% / anno',
  'controls.ratePeriod': 'Periodo del rendimento',
  'controls.years': 'Orizzonte della proiezione',
  'controls.yearsUnit': 'anni',
  'controls.slider': 'cursore «{label}»',

  'chart.title': 'Crescita',
  'chart.scale': 'Scala',
  'chart.linear': 'Lineare',
  'chart.log': 'Log.',
  'chart.balance': 'Saldo',
  'chart.paidIn': 'Versato',
  'chart.point': 'Anno {year}, mese {month}',
  'chart.summary': 'Il saldo cresce fino a {final} in {years}, a fronte di {invested} versati.',

  'table.title': 'Mese per mese',
  'table.month': 'M',
  'table.balance': 'Versato + reinvestito',
  'table.income': 'Guadagno del mese',
  'table.dividends': 'dividendi {amount}/mese',
  'table.year': { one: '{count} anno', other: '{count} anni' },

  'converter.title': 'In altre valute',
  'converter.amount': 'Importo',
  'converter.amountHint': 'parte dal saldo finale',
  'converter.eurUsd': 'dollari per un euro',
  'converter.usdRub': 'rubli per un dollaro',
  'converter.eurRub': 'rubli per un euro',
  'converter.live': 'Cambi da open.er-api.com, {date}.',
  'converter.cached': 'Ultimi cambi scaricati il {date}.',
  'converter.manual': 'Cambi modificati a mano.',
  'converter.offline': 'Offline — sono mostrati i cambi inclusi nell’app.',

  'support.title': 'Sostieni',
  'support.text':
    'InvestTable è gratuito, senza pubblicità e non raccoglie nulla. Se ti è utile, puoi sostenerlo:',

  'projects.title': 'Altri progetti dell’autore',
  'projects.all': 'Tutti i prodotti →',

  'footer.disclaimer':
    'È una proiezione, non una previsione. Presuppone che il rendimento inserito arrivi ogni mese senza eccezioni e venga reinvestito per intero, e non considera commissioni, imposte, spread o inflazione. I rendimenti reali variano e possono essere negativi. Nulla di tutto questo è consulenza finanziaria.',
  'footer.privacy':
    'Tutto resta su questo dispositivo: non c’è alcun account né un server che conservi i tuoi numeri. L’unica cosa scaricata sono i tassi di cambio, da open.er-api.com, e l’app funziona anche senza.',
  'footer.origin': 'Portato dal foglio di calcolo «Revenue Chart» · build {build}',
} satisfies Catalogue
