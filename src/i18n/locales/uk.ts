import type { Catalogue } from './en.ts'

export const uk = {
  'app.tagline': 'складний відсоток, місяць за місяцем',
  'app.currency': 'Валюта',
  'app.language': 'Мова',
  'app.theme': 'Тема',

  'theme.light': 'Світла',
  'theme.auto': 'Авто',
  'theme.dark': 'Темна',

  'currency.RUB': 'Рубль',
  'currency.USD': 'Долар',
  'currency.EUR': 'Євро',

  'summary.after': {
    one: 'Через {count} рік',
    few: 'Через {count} роки',
    many: 'Через {count} років',
    other: 'Через {count} року',
  },
  'summary.caption': 'баланс, увесь дохід реінвестовано',
  'summary.paidIn': 'Внесено',
  'summary.earned': 'Зароблено',
  'summary.dividends': 'Дивіденди, на місяць',
  'summary.readout':
    'Вносячи {deposit} на місяць і заробляючи {rate} від балансу щомісяця — близько {daily} на день — до другого місяця ви заробите {income} і відкладете {balance}. За {dividend} на рік підсумковий баланс давав би {payout} на місяць дивідендами.',

  'controls.title': 'Ваш план',
  'controls.reset': 'Скинути',
  'controls.deposit': 'Внесок щомісяця',
  'controls.income': 'Дохідність',
  'controls.incomeHint': '≈ {daily} на день за {days} днів',
  'controls.incomeHintPeriod': '= {monthly} на місяць, ≈ {daily} на день',
  'controls.perMonth': '% / місяць',
  'controls.perQuarter': '% / квартал',
  'controls.dividend': 'Дивіденди',
  'controls.dividendHint': 'на те, чим ви володієте',
  'controls.perYear': '% / рік',
  'controls.ratePeriod': 'Період ставки',
  'controls.years': 'Горизонт прогнозу',
  'controls.yearsUnit': 'років',
  'controls.slider': 'повзунок «{label}»',

  'chart.title': 'Зростання',
  'chart.scale': 'Шкала графіка',
  'chart.linear': 'Лінійна',
  'chart.log': 'Лог.',
  'chart.balance': 'Баланс',
  'chart.paidIn': 'Внесено',
  'chart.point': '{year}-й рік, {month}-й місяць',
  'chart.summary': 'Баланс зростає до {final} за {years} проти {invested} внесених.',

  'table.title': 'Помісячно',
  'table.month': 'М',
  'table.balance': 'Внесено + реінвестовано',
  'table.income': 'Дохід за місяць',
  'table.dividends': 'дивіденди {amount}/міс',
  'table.year': {
    one: '{count} рік',
    few: '{count} роки',
    many: '{count} років',
    other: '{count} року',
  },

  'converter.title': 'В інших валютах',
  'converter.amount': 'Сума',
  'converter.amountHint': 'за замовчуванням — підсумковий баланс',
  'converter.eurUsd': 'доларів за одне євро',
  'converter.usdRub': 'рублів за один долар',
  'converter.eurRub': 'рублів за одне євро',
  'converter.live': 'Курси з open.er-api.com, {date}.',
  'converter.cached': 'Курси завантажено {date}.',
  'converter.manual': 'Курси змінено вручну.',
  'converter.offline': 'Офлайн — показано курси, вбудовані в застосунок.',

  'support.title': 'Підтримати',
  'support.text':
    'InvestTable безкоштовний, без реклами і нічого не збирає. Якщо він вам корисний, його можна підтримати:',

  'projects.title': 'Інші проєкти автора',
  'projects.all': 'Усі продукти →',

  'footer.disclaimer':
    'Це розрахунок, а не прогноз. Він припускає, що вказана дохідність приходить щомісяця без збоїв і повністю реінвестується, і не враховує комісії, податки, спреди та інфляцію. Реальна дохідність змінюється і може бути від’ємною. Ніщо тут не є інвестиційною рекомендацією.',
  'footer.privacy':
    'Усе залишається на цьому пристрої — немає ні акаунта, ні сервера, який зберігав би ваші цифри. З мережі завантажуються лише курси валют, з open.er-api.com, і без них застосунок працює.',
  'footer.origin': 'Портовано з таблиці «Revenue Chart» · збірка {build}',
} satisfies Catalogue
