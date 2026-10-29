import type { Catalogue } from './en.ts'

export const es = {
  'app.tagline': 'interés compuesto, mes a mes',
  'app.currency': 'Moneda',
  'app.language': 'Idioma',
  'app.theme': 'Tema',

  'theme.light': 'Claro',
  'theme.auto': 'Auto',
  'theme.dark': 'Oscuro',

  'currency.RUB': 'Rublo',
  'currency.USD': 'Dólar',
  'currency.EUR': 'Euro',

  'summary.after': { one: 'Al cabo de {count} año', other: 'Al cabo de {count} años' },
  'summary.caption': 'saldo, con todo el rendimiento reinvertido',
  'summary.note': 'A tasa constante: una proyección, no un pronóstico.',
  'summary.paidIn': 'Aportado',
  'summary.earned': 'Ganado',
  'summary.lost': 'Perdido',
  'summary.dividends': 'Dividendos, al mes',
  'summary.readout':
    'Aportando {deposit} al mes y ganando {rate} del saldo cada mes — cerca de {daily} al día — al segundo mes habrías ganado {income} y apartado {balance}. Con {dividend} al año, el saldo final pagaría {payout} al mes en dividendos.',
  'summary.readoutLoss':
    'Aportando {deposit} al mes y perdiendo {rate} del saldo cada mes — cerca de {daily} al día — al segundo mes habrías perdido {income} y te quedarían {balance}. Con {dividend} al año, el saldo final pagaría {payout} al mes en dividendos.',

  'controls.title': 'Tu plan',
  'controls.reset': 'Restablecer',
  'controls.deposit': 'Aportación mensual',
  'controls.income': 'Rendimiento',
  'controls.incomeHint': '≈ {daily} al día en {days} días',
  'controls.incomeHintPeriod': '= {monthly} al mes, ≈ {daily} al día',
  'controls.perMonth': '% / mes',
  'controls.perQuarter': '% / trimestre',
  'controls.dividend': 'Dividendos',
  'controls.dividendHint': 'sobre lo que mantienes',
  'controls.perYear': '% / año',
  'controls.ratePeriod': 'Periodo del rendimiento',
  'controls.years': 'Horizonte de la proyección',
  'controls.yearsUnit': 'años',
  'controls.slider': 'control deslizante «{label}»',

  'chart.title': 'Crecimiento',
  'chart.scale': 'Escala',
  'chart.linear': 'Lineal',
  'chart.log': 'Log.',
  'chart.balance': 'Saldo',
  'chart.paidIn': 'Aportado',
  'chart.point': 'Año {year}, mes {month}',
  'chart.summary': 'El saldo crece hasta {final} en {years}, frente a {invested} aportados.',

  'table.title': 'Mes a mes',
  'table.month': 'M',
  'table.balance': 'Aportado + reinvertido',
  'table.income': 'Ganancia del mes',
  'table.dividends': 'dividendos {amount}/mes',
  'table.year': { one: '{count} año', other: '{count} años' },

  'converter.title': 'En otras monedas',
  'converter.amount': 'Importe',
  'converter.amountHint': 'parte del saldo final',
  'converter.eurUsd': 'dólares por un euro',
  'converter.usdRub': 'rublos por un dólar',
  'converter.eurRub': 'rublos por un euro',
  'converter.live': 'Tipos de open.er-api.com, {date}.',
  'converter.cached': 'Últimos tipos obtenidos el {date}.',
  'converter.manual': 'Tipos editados a mano.',
  'converter.offline': 'Sin conexión: se muestran los tipos incluidos en la app.',

  'support.title': 'Apoyar',
  'support.text': 'InvestTable es gratis y no tiene anuncios. Si te resulta útil, puedes apoyarlo:',

  'projects.title': 'Más del autor',
  'projects.all': 'Todos los productos →',

  'footer.disclaimer':
    'Es una proyección, no un pronóstico. Da por hecho que el rendimiento que introduces llega todos los meses sin fallar y se reinvierte por completo, y no cuenta comisiones, impuestos, diferenciales ni inflación. Los rendimientos reales varían y pueden ser negativos. Nada de esto es asesoramiento de inversión.',
  'footer.privacy':
    'Tus cifras se quedan en este dispositivo: no hay cuenta ni servidor que las guarde. Los tipos de cambio se descargan de open.er-api.com, y la app funciona sin ellos. Una vez al día envía recuentos de uso anónimos (sin identificadores ni tus cifras); el interruptor de arriba lo desactiva.',
  'footer.origin': 'Portado de la hoja de cálculo «Revenue Chart» · build {build}',
  'footer.licences': 'Licencias de código abierto',

  'usage.label': 'Compartir estadísticas de uso anónimas',
  'usage.explain':
    'Una vez al día: qué funciones se usaron, versión de la app, plataforma, idioma y número de errores. Sin identificadores, sin tus cifras ni nada de lo que escribes.',
  'usage.notice':
    'InvestTable envía recuentos de uso anónimos una vez al día, sin identificadores ni nada de lo que escribes. Puedes desactivarlo al final de la página.',
  'usage.dismiss': 'OK',
} satisfies Catalogue
