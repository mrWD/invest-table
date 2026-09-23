import type { Catalogue } from './en.ts'

export const pl = {
  'app.tagline': 'procent składany, miesiąc po miesiącu',
  'app.currency': 'Waluta',
  'app.language': 'Język',
  'app.theme': 'Motyw',

  'theme.light': 'Jasny',
  'theme.auto': 'Auto',
  'theme.dark': 'Ciemny',

  'currency.RUB': 'Rubel',
  'currency.USD': 'Dolar',
  'currency.EUR': 'Euro',

  'summary.after': {
    one: 'Po {count} roku',
    few: 'Po {count} latach',
    many: 'Po {count} latach',
    other: 'Po {count} latach',
  },
  'summary.caption': 'saldo, cały zysk reinwestowany',
  'summary.paidIn': 'Wpłacono',
  'summary.earned': 'Zarobiono',
  'summary.dividends': 'Dywidendy, miesięcznie',
  'summary.readout':
    'Wpłacając {deposit} miesięcznie i zarabiając {rate} salda co miesiąc — około {daily} dziennie — do drugiego miesiąca zarobisz {income} i odłożysz {balance}. Przy {dividend} rocznie końcowe saldo dawałoby {payout} miesięcznie w dywidendach.',

  'controls.title': 'Twój plan',
  'controls.reset': 'Resetuj',
  'controls.deposit': 'Wpłata co miesiąc',
  'controls.income': 'Stopa zwrotu',
  'controls.incomeHint': '≈ {daily} dziennie przez {days} dni',
  'controls.incomeHintPeriod': '= {monthly} miesięcznie, ≈ {daily} dziennie',
  'controls.perMonth': '% / miesiąc',
  'controls.perQuarter': '% / kwartał',
  'controls.dividend': 'Dywidendy',
  'controls.dividendHint': 'od tego, co posiadasz',
  'controls.perYear': '% / rok',
  'controls.ratePeriod': 'Okres stopy zwrotu',
  'controls.years': 'Horyzont prognozy',
  'controls.yearsUnit': 'lat',
  'controls.slider': 'suwak „{label}”',

  'chart.title': 'Wzrost',
  'chart.scale': 'Skala',
  'chart.linear': 'Liniowa',
  'chart.log': 'Log.',
  'chart.balance': 'Saldo',
  'chart.paidIn': 'Wpłacono',
  'chart.point': 'Rok {year}, miesiąc {month}',
  'chart.summary': 'Saldo rośnie do {final} w ciągu {years} przy {invested} wpłat.',

  'table.title': 'Miesiąc po miesiącu',
  'table.month': 'M',
  'table.balance': 'Wpłacone + reinwestowane',
  'table.income': 'Zysk miesięczny',
  'table.dividends': 'dywidendy {amount}/mies.',
  'table.year': {
    one: '{count} rok',
    few: '{count} lata',
    many: '{count} lat',
    other: '{count} lat',
  },

  'converter.title': 'W innych walutach',
  'converter.amount': 'Kwota',
  'converter.amountHint': 'zaczyna od salda końcowego',
  'converter.eurUsd': 'dolarów za jedno euro',
  'converter.usdRub': 'rubli za jednego dolara',
  'converter.eurRub': 'rubli za jedno euro',
  'converter.live': 'Kursy z open.er-api.com, {date}.',
  'converter.cached': 'Kursy pobrane {date}.',
  'converter.manual': 'Kursy zmienione ręcznie.',
  'converter.offline': 'Offline — pokazano kursy dołączone do aplikacji.',

  'support.title': 'Wesprzyj',
  'support.text':
    'InvestTable jest darmowy, nie ma reklam i niczego nie zbiera. Jeśli jest dla Ciebie przydatny, możesz go wesprzeć:',

  'projects.title': 'Więcej od autora',
  'projects.all': 'Wszystkie produkty →',

  'footer.disclaimer':
    'To projekcja, nie prognoza. Zakłada, że wpisany zwrot pojawia się co miesiąc bez wyjątku i jest w całości reinwestowany, i nie uwzględnia prowizji, podatków, spreadów ani inflacji. Rzeczywiste zwroty się wahają i mogą być ujemne. Nic tutaj nie jest poradą inwestycyjną.',
  'footer.privacy':
    'Wszystko zostaje na tym urządzeniu — nie ma konta ani serwera przechowującego Twoje liczby. Pobierane są wyłącznie kursy walut, z open.er-api.com, a aplikacja działa również bez nich.',
  'footer.origin': 'Przeniesione z arkusza „Revenue Chart” · build {build}',
} satisfies Catalogue
