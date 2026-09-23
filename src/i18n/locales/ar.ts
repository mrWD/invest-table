import type { Catalogue } from './en.ts'

/**
 * Arabic — the one right-to-left language in the set.
 *
 * All six CLDR plural categories are in use here: one and two do not repeat the numeral
 * the way the others do, three to ten take the broken plural, and eleven upwards return
 * to the singular after the number. `Intl.PluralRules` picks between them.
 */
export const ar = {
  'app.tagline': 'نموّ مركّب، شهرًا بعد شهر',
  'app.currency': 'العملة',
  'app.language': 'اللغة',
  'app.theme': 'المظهر',

  'theme.light': 'فاتح',
  'theme.auto': 'تلقائي',
  'theme.dark': 'داكن',

  'currency.RUB': 'روبل',
  'currency.USD': 'دولار',
  'currency.EUR': 'يورو',

  'summary.after': {
    zero: 'بعد {count} سنة',
    one: 'بعد سنة واحدة',
    two: 'بعد سنتين',
    few: 'بعد {count} سنوات',
    many: 'بعد {count} سنة',
    other: 'بعد {count} سنة',
  },
  'summary.caption': 'الرصيد، مع إعادة استثمار كل عائد',
  'summary.paidIn': 'المودَع',
  'summary.earned': 'المكتسَب',
  'summary.dividends': 'الأرباح الموزّعة، شهريًا',
  'summary.readout':
    'بإيداع {deposit} شهريًا وتحقيق {rate} من الرصيد كل شهر — أي نحو {daily} يوميًا — تكون قد كسبت {income} وادّخرت {balance} بحلول الشهر الثاني. وبنسبة {dividend} سنويًا، يدرّ الرصيد النهائي {payout} شهريًا من الأرباح الموزّعة.',

  'controls.title': 'خطتك',
  'controls.reset': 'إعادة تعيين',
  'controls.deposit': 'الإيداع كل شهر',
  'controls.income': 'العائد',
  'controls.incomeHint': '≈ {daily} يوميًا على مدى {days} يومًا',
  'controls.incomeHintPeriod': '= {monthly} شهريًا، ≈ {daily} يوميًا',
  'controls.perMonth': '٪ / شهر',
  'controls.perQuarter': '٪ / ربع سنة',
  'controls.dividend': 'الأرباح الموزّعة',
  'controls.dividendHint': 'على ما تملكه',
  'controls.perYear': '٪ / سنة',
  'controls.ratePeriod': 'فترة العائد',
  'controls.years': 'مدى التوقّع',
  'controls.yearsUnit': 'سنوات',
  'controls.slider': 'شريط «{label}»',

  'chart.title': 'النموّ',
  'chart.scale': 'مقياس الرسم',
  'chart.linear': 'خطّي',
  'chart.log': 'لوغاريتمي',
  'chart.balance': 'الرصيد',
  'chart.paidIn': 'المودَع',
  'chart.point': 'السنة {year}، الشهر {month}',
  'chart.summary': 'يرتفع الرصيد إلى {final} خلال {years}، مقابل {invested} مودَعة.',

  'table.title': 'شهرًا بشهر',
  'table.month': 'ش',
  'table.balance': 'المودَع + المُعاد استثماره',
  'table.income': 'دخل الشهر',
  'table.dividends': 'أرباح موزّعة {amount}/شهر',
  'table.year': {
    zero: '{count} سنة',
    one: 'سنة واحدة',
    two: 'سنتان',
    few: '{count} سنوات',
    many: '{count} سنة',
    other: '{count} سنة',
  },

  'converter.title': 'بعملات أخرى',
  'converter.amount': 'المبلغ',
  'converter.amountHint': 'يبدأ من الرصيد النهائي',
  'converter.eurUsd': 'دولارات مقابل يورو واحد',
  'converter.usdRub': 'روبلات مقابل دولار واحد',
  'converter.eurRub': 'روبلات مقابل يورو واحد',
  'converter.live': 'الأسعار من open.er-api.com، {date}.',
  'converter.cached': 'آخر جلب للأسعار في {date}.',
  'converter.manual': 'عُدِّلت الأسعار يدويًا.',
  'converter.offline': 'دون اتصال — تُعرض الأسعار المرفقة مع التطبيق.',

  'support.title': 'ادعم المشروع',
  'support.text':
    '‏InvestTable مجاني، بلا إعلانات، ولا يجمع أي بيانات. إن كان مفيدًا لك، يمكنك دعمه:',

  'projects.title': 'أعمال أخرى للمطوّر',
  'projects.all': 'كل المنتجات ←',

  'footer.disclaimer':
    'هذا تقدير لا تنبّؤ. يفترض أن العائد الذي تدخله يتحقّق كل شهر دون انقطاع ويُعاد استثماره بالكامل، ولا يحسب الرسوم ولا الضرائب ولا فروق الأسعار ولا التضخّم. العوائد الحقيقية متغيّرة وقد تكون سالبة. لا شيء هنا يُعدّ نصيحة استثمارية.',
  'footer.privacy':
    'كل شيء يبقى على هذا الجهاز — لا حساب ولا خادم يحتفظ بأرقامك. الشيء الوحيد الذي يُجلب من الشبكة هو أسعار الصرف، من open.er-api.com، والتطبيق يعمل بدونها.',
  'footer.origin': 'منقول عن جدول «Revenue Chart» · إصدار {build}',
} satisfies Catalogue
