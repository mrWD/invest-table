import type { Catalogue } from './en.ts'

export const nl = {
  'app.tagline': 'samengestelde groei, maand na maand',
  'app.currency': 'Valuta',
  'app.language': 'Taal',
  'app.theme': 'Thema',

  'theme.light': 'Licht',
  'theme.auto': 'Auto',
  'theme.dark': 'Donker',

  'currency.RUB': 'Roebel',
  'currency.USD': 'Dollar',
  'currency.EUR': 'Euro',

  'summary.after': { one: 'Na {count} jaar', other: 'Na {count} jaar' },
  'summary.caption': 'saldo, met elk rendement herbelegd',
  'summary.note': 'Bij een constant rendement: een projectie, geen voorspelling.',
  'summary.paidIn': 'Ingelegd',
  'summary.earned': 'Verdiend',
  'summary.lost': 'Verloren',
  'summary.dividends': 'Dividend, per maand',
  'summary.readout':
    'Met {deposit} per maand en {rate} rendement op het saldo per maand — ongeveer {daily} per dag — zou je in de tweede maand {income} hebben verdiend en {balance} opzij hebben gezet. Bij {dividend} per jaar zou het eindsaldo {payout} per maand aan dividend uitkeren.',
  'summary.readoutLoss':
    'Met {deposit} per maand en {rate} verlies op het saldo per maand — ongeveer {daily} per dag — zou je in de tweede maand {income} hebben verloren en {balance} overhouden. Bij {dividend} per jaar zou het eindsaldo {payout} per maand aan dividend uitkeren.',

  'controls.title': 'Jouw plan',
  'controls.reset': 'Herstellen',
  'controls.deposit': 'Maandelijkse inleg',
  'controls.income': 'Rendement',
  'controls.incomeHint': '≈ {daily} per dag over {days} dagen',
  'controls.incomeHintPeriod': '= {monthly} per maand, ≈ {daily} per dag',
  'controls.perMonth': '% / maand',
  'controls.perQuarter': '% / kwartaal',
  'controls.dividend': 'Dividend',
  'controls.dividendHint': 'over wat je aanhoudt',
  'controls.perYear': '% / jaar',
  'controls.ratePeriod': 'Periode van het rendement',
  'controls.years': 'Looptijd',
  'controls.yearsUnit': 'jaar',
  'controls.slider': 'schuifregelaar ‘{label}’',

  'chart.title': 'Groei',
  'chart.scale': 'Schaal',
  'chart.linear': 'Lineair',
  'chart.log': 'Log.',
  'chart.balance': 'Saldo',
  'chart.paidIn': 'Ingelegd',
  'chart.point': 'Jaar {year}, maand {month}',
  'chart.summary': 'Het saldo groeit in {years} tot {final}, tegenover {invested} inleg.',

  'table.title': 'Maand voor maand',
  'table.month': 'M',
  'table.balance': 'Ingelegd + herbelegd',
  'table.income': 'Maandopbrengst',
  'table.dividends': 'dividend {amount}/mnd',
  'table.year': { one: '{count} jaar', other: '{count} jaar' },

  'converter.title': 'In andere valuta',
  'converter.amount': 'Bedrag',
  'converter.amountHint': 'begint bij het eindsaldo',
  'converter.eurUsd': 'dollar voor één euro',
  'converter.usdRub': 'roebel voor één dollar',
  'converter.eurRub': 'roebel voor één euro',
  'converter.live': 'Koersen van open.er-api.com, {date}.',
  'converter.cached': 'Koersen voor het laatst opgehaald op {date}.',
  'converter.manual': 'Koersen met de hand aangepast.',
  'converter.offline': 'Offline — de meegeleverde koersen worden getoond.',

  'support.title': 'Steunen',
  'support.text':
    'InvestTable is gratis en heeft geen advertenties. Als je er wat aan hebt, kun je het steunen:',

  'projects.title': 'Meer van de maker',
  'projects.all': 'Alle producten →',

  'footer.disclaimer':
    'Een projectie, geen voorspelling. Ze gaat ervan uit dat het ingevoerde rendement elke maand zonder mankeren binnenkomt en volledig wordt herbelegd, en rekent geen kosten, belastingen, spreads of inflatie mee. Werkelijke rendementen wisselen en kunnen negatief zijn. Niets hiervan is beleggingsadvies.',
  'footer.privacy':
    'Je cijfers blijven op dit apparaat — er is geen account en geen server die ze bewaart. De wisselkoersen komen van open.er-api.com, en zonder die koersen werkt de app ook. Eén keer per dag stuurt de app anonieme gebruikstellingen (geen ID’s, geen cijfers van jou); met de schakelaar hierboven zet je dat uit.',
  'footer.origin': 'Overgezet uit het spreadsheet ‘Revenue Chart’ · build {build}',
  'footer.licences': 'Opensourcelicenties',

  'usage.label': 'Anonieme gebruiksstatistieken delen',
  'usage.explain':
    'Eén keer per dag: welke functies zijn gebruikt, app-versie, platform, taal en aantallen fouten. Geen ID’s, geen cijfers van jou en niets wat je typt.',
  'usage.notice':
    'InvestTable stuurt één keer per dag anonieme gebruikstellingen — geen ID’s, niets wat je typt. Je kunt dit onderaan de pagina uitzetten.',
  'usage.dismiss': 'OK',
} satisfies Catalogue
