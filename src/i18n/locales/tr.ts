import type { Catalogue } from './en.ts'

export const tr = {
  'app.tagline': 'bileşik getiri, ay ay',
  'app.currency': 'Para birimi',
  'app.language': 'Dil',
  'app.theme': 'Tema',

  'theme.light': 'Açık',
  'theme.auto': 'Oto',
  'theme.dark': 'Koyu',

  'currency.RUB': 'Ruble',
  'currency.USD': 'Dolar',
  'currency.EUR': 'Euro',

  'summary.after': { one: '{count} yıl sonra', other: '{count} yıl sonra' },
  'summary.caption': 'bakiye, tüm getiri yeniden yatırılmış',
  'summary.paidIn': 'Yatırılan',
  'summary.earned': 'Kazanılan',
  'summary.dividends': 'Temettü, aylık',
  'summary.readout':
    'Ayda {deposit} yatırıp bakiyenin her ay {rate} kadarını kazanınca — günde yaklaşık {daily} — ikinci ayın sonunda {income} kazanmış ve {balance} biriktirmiş olursunuz. Yılda {dividend} ile son bakiye ayda {payout} temettü öderdi.',

  'controls.title': 'Planınız',
  'controls.reset': 'Sıfırla',
  'controls.deposit': 'Her ay yatırılan',
  'controls.income': 'Getiri',
  'controls.incomeHint': '≈ günde {daily}, {days} gün üzerinden',
  'controls.incomeHintPeriod': '= ayda {monthly}, ≈ günde {daily}',
  'controls.perMonth': '% / ay',
  'controls.perQuarter': '% / çeyrek',
  'controls.dividend': 'Temettü',
  'controls.dividendHint': 'elinizde tuttuğunuz üzerinden',
  'controls.perYear': '% / yıl',
  'controls.ratePeriod': 'Getiri dönemi',
  'controls.years': 'Projeksiyon süresi',
  'controls.yearsUnit': 'yıl',
  'controls.slider': '“{label}” kaydırıcısı',

  'chart.title': 'Büyüme',
  'chart.scale': 'Ölçek',
  'chart.linear': 'Doğrusal',
  'chart.log': 'Log.',
  'chart.balance': 'Bakiye',
  'chart.paidIn': 'Yatırılan',
  'chart.point': '{year}. yıl, {month}. ay',
  'chart.summary': 'Bakiye {years} içinde {final} değerine çıkıyor; yatırılan {invested}.',

  'table.title': 'Ay ay',
  'table.month': 'A',
  'table.balance': 'Yatırılan + yeniden yatırılan',
  'table.income': 'Aylık gelir',
  'table.dividends': 'temettü {amount}/ay',
  'table.year': { one: '{count} Yıl', other: '{count} Yıl' },

  'converter.title': 'Diğer para birimlerinde',
  'converter.amount': 'Tutar',
  'converter.amountHint': 'son bakiyeden başlar',
  'converter.eurUsd': 'bir euro kaç dolar',
  'converter.usdRub': 'bir dolar kaç ruble',
  'converter.eurRub': 'bir euro kaç ruble',
  'converter.live': 'Kurlar open.er-api.com kaynaklı, {date}.',
  'converter.cached': 'Kurlar en son {date} tarihinde alındı.',
  'converter.manual': 'Kurlar elle değiştirildi.',
  'converter.offline': 'Çevrimdışı — uygulamayla gelen kurlar gösteriliyor.',

  'support.title': 'Destek ol',
  'support.text':
    'InvestTable ücretsizdir, reklam içermez ve hiçbir şey toplamaz. İşinize yarıyorsa destek olabilirsiniz:',

  'projects.title': 'Geliştiricinin diğer işleri',
  'projects.all': 'Tüm ürünler →',

  'footer.disclaimer':
    'Bu bir projeksiyondur, tahmin değil. Girdiğiniz getirinin her ay aksamadan geldiğini ve tamamının yeniden yatırıldığını varsayar; komisyon, vergi, makas ve enflasyonu hesaba katmaz. Gerçek getiriler değişir ve negatif olabilir. Buradaki hiçbir şey yatırım tavsiyesi değildir.',
  'footer.privacy':
    'Her şey bu cihazda kalır — rakamlarınızı tutan bir hesap ya da sunucu yoktur. İnternetten yalnızca döviz kurları alınır, open.er-api.com üzerinden, ve uygulama onlarsız da çalışır.',
  'footer.origin': '“Revenue Chart” hesap tablosundan aktarıldı · yapı {build}',
} satisfies Catalogue
