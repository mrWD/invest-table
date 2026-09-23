import type { Catalogue } from './en.ts'

export const ru = {
  'app.tagline': 'сложный процент, месяц за месяцем',
  'app.currency': 'Валюта',
  'app.language': 'Язык',
  'app.theme': 'Тема',

  'theme.light': 'Светлая',
  'theme.auto': 'Авто',
  'theme.dark': 'Тёмная',

  'currency.RUB': 'Рубль',
  'currency.USD': 'Доллар',
  'currency.EUR': 'Евро',

  'summary.after': {
    one: 'Через {count} год',
    few: 'Через {count} года',
    many: 'Через {count} лет',
    other: 'Через {count} года',
  },
  'summary.caption': 'баланс, весь доход реинвестирован',
  'summary.paidIn': 'Внесено',
  'summary.earned': 'Заработано',
  'summary.dividends': 'Дивиденды, в месяц',
  'summary.readout':
    'Внося {deposit} в месяц и зарабатывая {rate} от баланса каждый месяц — около {daily} в день — ко второму месяцу вы заработаете {income} и отложите {balance}. При {dividend} в год итоговый баланс приносил бы {payout} в месяц дивидендами.',

  'controls.title': 'Ваш план',
  'controls.reset': 'Сбросить',
  'controls.deposit': 'Взнос каждый месяц',
  'controls.income': 'Доходность',
  'controls.incomeHint': '≈ {daily} в день за {days} дней',
  'controls.incomeHintPeriod': '= {monthly} в месяц, ≈ {daily} в день',
  'controls.perMonth': '% / месяц',
  'controls.perQuarter': '% / квартал',
  'controls.dividend': 'Дивиденды',
  'controls.dividendHint': 'на то, чем вы владеете',
  'controls.perYear': '% / год',
  'controls.ratePeriod': 'Период ставки',
  'controls.years': 'Горизонт прогноза',
  'controls.yearsUnit': 'лет',
  'controls.slider': 'ползунок «{label}»',

  'chart.title': 'Рост',
  'chart.scale': 'Шкала графика',
  'chart.linear': 'Линейная',
  'chart.log': 'Лог.',
  'chart.balance': 'Баланс',
  'chart.paidIn': 'Внесено',
  'chart.point': '{year}-й год, {month}-й месяц',
  'chart.summary': 'Баланс растёт до {final} за {years} против {invested} внесённых.',

  'table.title': 'Помесячно',
  'table.month': 'М',
  'table.balance': 'Внесено + реинвестировано',
  'table.income': 'Доход за месяц',
  'table.dividends': 'дивиденды {amount}/мес',
  'table.year': {
    one: '{count} год',
    few: '{count} года',
    many: '{count} лет',
    other: '{count} года',
  },

  'converter.title': 'В других валютах',
  'converter.amount': 'Сумма',
  'converter.amountHint': 'по умолчанию — итоговый баланс',
  'converter.eurUsd': 'долларов за один евро',
  'converter.usdRub': 'рублей за один доллар',
  'converter.eurRub': 'рублей за один евро',
  'converter.live': 'Курсы с open.er-api.com, {date}.',
  'converter.cached': 'Курсы загружены {date}.',
  'converter.manual': 'Курсы изменены вручную.',
  'converter.offline': 'Офлайн — показаны курсы, встроенные в приложение.',

  'support.title': 'Поддержать',
  'support.text':
    'InvestTable бесплатен, без рекламы и ничего не собирает. Если он вам полезен, его можно поддержать:',

  'projects.title': 'Другие проекты автора',
  'projects.all': 'Все продукты →',

  'footer.disclaimer':
    'Это расчёт, а не прогноз. Он предполагает, что указанная доходность приходит каждый месяц без сбоев и целиком реинвестируется, и не учитывает комиссии, налоги, спреды и инфляцию. Реальная доходность меняется и может быть отрицательной. Ничто здесь не является инвестиционной рекомендацией.',
  'footer.privacy':
    'Всё остаётся на этом устройстве — нет ни аккаунта, ни сервера, который хранил бы ваши цифры. Из сети загружаются только курсы валют, с open.er-api.com, и без них приложение работает.',
  'footer.origin': 'Портировано из таблицы «Revenue Chart» · сборка {build}',
} satisfies Catalogue
