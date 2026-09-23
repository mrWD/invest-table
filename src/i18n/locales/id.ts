import type { Catalogue } from './en.ts'

export const id = {
  'app.tagline': 'bunga berbunga, bulan demi bulan',
  'app.currency': 'Mata uang',
  'app.language': 'Bahasa',
  'app.theme': 'Tema',

  'theme.light': 'Terang',
  'theme.auto': 'Otomatis',
  'theme.dark': 'Gelap',

  'currency.RUB': 'Rubel',
  'currency.USD': 'Dolar',
  'currency.EUR': 'Euro',

  'summary.after': { other: 'Setelah {count} tahun' },
  'summary.caption': 'saldo, seluruh imbal hasil ditanam kembali',
  'summary.paidIn': 'Disetor',
  'summary.earned': 'Diperoleh',
  'summary.dividends': 'Dividen, per bulan',
  'summary.readout':
    'Dengan setoran {deposit} per bulan dan imbal hasil {rate} dari saldo tiap bulan — sekitar {daily} per hari — pada bulan kedua Anda memperoleh {income} dan menyisihkan {balance}. Pada {dividend} per tahun, saldo akhir akan membayar {payout} per bulan sebagai dividen.',

  'controls.title': 'Rencana Anda',
  'controls.reset': 'Setel ulang',
  'controls.deposit': 'Setoran tiap bulan',
  'controls.income': 'Imbal hasil',
  'controls.incomeHint': '≈ {daily} per hari selama {days} hari',
  'controls.incomeHintPeriod': '= {monthly} per bulan, ≈ {daily} per hari',
  'controls.perMonth': '% / bulan',
  'controls.perQuarter': '% / kuartal',
  'controls.dividend': 'Dividen',
  'controls.dividendHint': 'atas yang Anda pegang',
  'controls.perYear': '% / tahun',
  'controls.ratePeriod': 'Periode imbal hasil',
  'controls.years': 'Rentang proyeksi',
  'controls.yearsUnit': 'tahun',
  'controls.slider': 'penggeser “{label}”',

  'chart.title': 'Pertumbuhan',
  'chart.scale': 'Skala',
  'chart.linear': 'Linier',
  'chart.log': 'Log.',
  'chart.balance': 'Saldo',
  'chart.paidIn': 'Disetor',
  'chart.point': 'Tahun {year}, bulan {month}',
  'chart.summary': 'Saldo tumbuh menjadi {final} dalam {years}, dari setoran {invested}.',

  'table.title': 'Bulan demi bulan',
  'table.month': 'B',
  'table.balance': 'Disetor + ditanam kembali',
  'table.income': 'Hasil bulan ini',
  'table.dividends': 'dividen {amount}/bln',
  'table.year': { other: '{count} Tahun' },

  'converter.title': 'Dalam mata uang lain',
  'converter.amount': 'Jumlah',
  'converter.amountHint': 'mulai dari saldo akhir',
  'converter.eurUsd': 'dolar per satu euro',
  'converter.usdRub': 'rubel per satu dolar',
  'converter.eurRub': 'rubel per satu euro',
  'converter.live': 'Kurs dari open.er-api.com, {date}.',
  'converter.cached': 'Kurs terakhir diambil {date}.',
  'converter.manual': 'Kurs diubah manual.',
  'converter.offline': 'Luring — menampilkan kurs bawaan aplikasi.',

  'support.title': 'Dukung',
  'support.text':
    'InvestTable gratis, tanpa iklan, dan tidak mengumpulkan apa pun. Jika berguna bagi Anda, Anda bisa mendukungnya:',

  'projects.title': 'Karya lain dari pembuatnya',
  'projects.all': 'Semua produk →',

  'footer.disclaimer':
    'Ini proyeksi, bukan ramalan. Diasumsikan imbal hasil yang Anda isi datang tiap bulan tanpa gagal dan ditanam kembali seluruhnya, serta tidak menghitung biaya, pajak, spread, maupun inflasi. Imbal hasil nyata berubah-ubah dan bisa negatif. Tidak ada di sini yang merupakan saran investasi.',
  'footer.privacy':
    'Semuanya tetap di perangkat ini — tidak ada akun dan tidak ada server yang menyimpan angka Anda. Yang diambil dari jaringan hanya kurs mata uang, dari open.er-api.com, dan aplikasi tetap jalan tanpanya.',
  'footer.origin': 'Dialihkan dari lembar kerja “Revenue Chart” · build {build}',
} satisfies Catalogue
