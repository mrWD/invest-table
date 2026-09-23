import type { Catalogue } from './en.ts'

export const cs = {
  'app.tagline': 'složené úročení, měsíc po měsíci',
  'app.currency': 'Měna',
  'app.language': 'Jazyk',
  'app.theme': 'Motiv',

  'theme.light': 'Světlý',
  'theme.auto': 'Auto',
  'theme.dark': 'Tmavý',

  'currency.RUB': 'Rubl',
  'currency.USD': 'Dolar',
  'currency.EUR': 'Euro',

  'summary.after': {
    one: 'Po {count} roce',
    few: 'Po {count} letech',
    many: 'Po {count} letech',
    other: 'Po {count} letech',
  },
  'summary.caption': 'zůstatek, veškerý výnos reinvestován',
  'summary.paidIn': 'Vloženo',
  'summary.earned': 'Vyděláno',
  'summary.dividends': 'Dividendy, měsíčně',
  'summary.readout':
    'Při vkladu {deposit} měsíčně a výnosu {rate} ze zůstatku každý měsíc — asi {daily} denně — do druhého měsíce vyděláte {income} a odložíte {balance}. Při {dividend} ročně by konečný zůstatek vyplácel {payout} měsíčně na dividendách.',

  'controls.title': 'Váš plán',
  'controls.reset': 'Obnovit',
  'controls.deposit': 'Vklad každý měsíc',
  'controls.income': 'Výnos',
  'controls.incomeHint': '≈ {daily} denně za {days} dní',
  'controls.incomeHintPeriod': '= {monthly} měsíčně, ≈ {daily} denně',
  'controls.perMonth': '% / měsíc',
  'controls.perQuarter': '% / čtvrtletí',
  'controls.dividend': 'Dividendy',
  'controls.dividendHint': 'z toho, co držíte',
  'controls.perYear': '% / rok',
  'controls.ratePeriod': 'Období výnosu',
  'controls.years': 'Horizont projekce',
  'controls.yearsUnit': 'let',
  'controls.slider': 'posuvník „{label}“',

  'chart.title': 'Růst',
  'chart.scale': 'Škála',
  'chart.linear': 'Lineární',
  'chart.log': 'Log.',
  'chart.balance': 'Zůstatek',
  'chart.paidIn': 'Vloženo',
  'chart.point': 'Rok {year}, měsíc {month}',
  'chart.summary': 'Zůstatek roste na {final} za {years} oproti {invested} vloženým.',

  'table.title': 'Měsíc po měsíci',
  'table.month': 'M',
  'table.balance': 'Vloženo + reinvestováno',
  'table.income': 'Měsíční výnos',
  'table.dividends': 'dividendy {amount}/měs.',
  'table.year': {
    one: '{count} rok',
    few: '{count} roky',
    many: '{count} let',
    other: '{count} let',
  },

  'converter.title': 'V jiných měnách',
  'converter.amount': 'Částka',
  'converter.amountHint': 'začíná na konečném zůstatku',
  'converter.eurUsd': 'dolarů za jedno euro',
  'converter.usdRub': 'rublů za jeden dolar',
  'converter.eurRub': 'rublů za jedno euro',
  'converter.live': 'Kurzy z open.er-api.com, {date}.',
  'converter.cached': 'Kurzy naposledy staženy {date}.',
  'converter.manual': 'Kurzy upraveny ručně.',
  'converter.offline': 'Offline — zobrazeny kurzy dodané s aplikací.',

  'support.title': 'Podpořit',
  'support.text':
    'InvestTable je zdarma, bez reklam a nic nesbírá. Pokud vám je užitečný, můžete ho podpořit:',

  'projects.title': 'Další od autora',
  'projects.all': 'Všechny produkty →',

  'footer.disclaimer':
    'Jde o projekci, ne o předpověď. Předpokládá, že zadaný výnos přijde každý měsíc bez výjimky a je celý reinvestován, a nepočítá poplatky, daně, spready ani inflaci. Skutečné výnosy kolísají a mohou být záporné. Nic z toho není investiční doporučení.',
  'footer.privacy':
    'Vše zůstává v tomto zařízení — není zde žádný účet ani server, který by vaše čísla uchovával. Stahují se jen kurzy měn, z open.er-api.com, a aplikace funguje i bez nich.',
  'footer.origin': 'Portováno z tabulky „Revenue Chart“ · build {build}',
} satisfies Catalogue
