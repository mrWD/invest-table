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
  'summary.paidIn': 'Aportado',
  'summary.earned': 'Ganado',
  'summary.dividends': 'Dividendos, al mes',
  'summary.readout':
    'Aportando {deposit} al mes y ganando {rate} del saldo cada mes — cerca de {daily} al día — al segundo mes habrás ganado {income} y apartado {balance}. Con {dividend} al año, el saldo final pagaría {payout} al mes en dividendos.',

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
  'support.text':
    'InvestTable es gratis, no tiene anuncios y no recoge nada. Si te resulta útil, puedes apoyarlo:',

  'projects.title': 'Más del autor',
  'projects.all': 'Todos los productos →',

  'footer.disclaimer':
    'Es una proyección, no un pronóstico. Da por hecho que el rendimiento que introduces llega todos los meses sin fallar y se reinvierte por completo, y no cuenta comisiones, impuestos, diferenciales ni inflación. Los rendimientos reales varían y pueden ser negativos. Nada de esto es asesoramiento de inversión.',
  'footer.privacy':
    'Todo se queda en este dispositivo: no hay cuenta ni servidor que guarde tus cifras. Lo único que se descarga son los tipos de cambio, de open.er-api.com, y la app funciona sin ellos.',
  'footer.origin': 'Portado de la hoja de cálculo «Revenue Chart» · build {build}',
} satisfies Catalogue
