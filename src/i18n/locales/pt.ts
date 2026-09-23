import type { Catalogue } from './en.ts'

export const pt = {
  'app.tagline': 'juros compostos, mês a mês',
  'app.currency': 'Moeda',
  'app.language': 'Idioma',
  'app.theme': 'Tema',

  'theme.light': 'Claro',
  'theme.auto': 'Auto',
  'theme.dark': 'Escuro',

  'currency.RUB': 'Rublo',
  'currency.USD': 'Dólar',
  'currency.EUR': 'Euro',

  'summary.after': { one: 'Depois de {count} ano', other: 'Depois de {count} anos' },
  'summary.caption': 'saldo, com todo o rendimento reinvestido',
  'summary.paidIn': 'Aportado',
  'summary.earned': 'Ganho',
  'summary.dividends': 'Dividendos, por mês',
  'summary.readout':
    'Aportando {deposit} por mês e ganhando {rate} do saldo a cada mês — cerca de {daily} por dia — no segundo mês você terá ganho {income} e guardado {balance}. A {dividend} ao ano, o saldo final pagaria {payout} por mês em dividendos.',

  'controls.title': 'Seu plano',
  'controls.reset': 'Redefinir',
  'controls.deposit': 'Aporte mensal',
  'controls.income': 'Rendimento',
  'controls.incomeHint': '≈ {daily} por dia em {days} dias',
  'controls.incomeHintPeriod': '= {monthly} por mês, ≈ {daily} por dia',
  'controls.perMonth': '% / mês',
  'controls.perQuarter': '% / trimestre',
  'controls.dividend': 'Dividendos',
  'controls.dividendHint': 'sobre o que você mantém',
  'controls.perYear': '% / ano',
  'controls.ratePeriod': 'Período do rendimento',
  'controls.years': 'Horizonte da projeção',
  'controls.yearsUnit': 'anos',
  'controls.slider': 'controle deslizante “{label}”',

  'chart.title': 'Crescimento',
  'chart.scale': 'Escala',
  'chart.linear': 'Linear',
  'chart.log': 'Log.',
  'chart.balance': 'Saldo',
  'chart.paidIn': 'Aportado',
  'chart.point': 'Ano {year}, mês {month}',
  'chart.summary': 'O saldo cresce até {final} em {years}, contra {invested} aportados.',

  'table.title': 'Mês a mês',
  'table.month': 'M',
  'table.balance': 'Aportado + reinvestido',
  'table.income': 'Ganho do mês',
  'table.dividends': 'dividendos {amount}/mês',
  'table.year': { one: '{count} ano', other: '{count} anos' },

  'converter.title': 'Em outras moedas',
  'converter.amount': 'Valor',
  'converter.amountHint': 'começa no saldo final',
  'converter.eurUsd': 'dólares por um euro',
  'converter.usdRub': 'rublos por um dólar',
  'converter.eurRub': 'rublos por um euro',
  'converter.live': 'Taxas de open.er-api.com, {date}.',
  'converter.cached': 'Últimas taxas obtidas em {date}.',
  'converter.manual': 'Taxas editadas à mão.',
  'converter.offline': 'Offline — mostrando as taxas que vieram com o app.',

  'support.title': 'Apoiar',
  'support.text':
    'O InvestTable é gratuito, não tem anúncios e não coleta nada. Se ele for útil para você, pode apoiá-lo:',

  'projects.title': 'Mais do autor',
  'projects.all': 'Todos os produtos →',

  'footer.disclaimer':
    'É uma projeção, não uma previsão. Ela pressupõe que o rendimento informado chega todo mês sem falhar e é reinvestido por inteiro, e não conta taxas, impostos, spreads nem inflação. Rendimentos reais variam e podem ser negativos. Nada aqui é recomendação de investimento.',
  'footer.privacy':
    'Tudo fica neste dispositivo — não há conta nem servidor guardando seus números. A única coisa baixada são as taxas de câmbio, de open.er-api.com, e o app funciona sem elas.',
  'footer.origin': 'Portado da planilha “Revenue Chart” · build {build}',
} satisfies Catalogue
