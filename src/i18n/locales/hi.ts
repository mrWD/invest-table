import type { Catalogue } from './en.ts'

export const hi = {
  'app.tagline': 'चक्रवृद्धि बढ़त, महीने-दर-महीने',
  'app.currency': 'मुद्रा',
  'app.language': 'भाषा',
  'app.theme': 'थीम',

  'theme.light': 'हल्का',
  'theme.auto': 'ऑटो',
  'theme.dark': 'गहरा',

  'currency.RUB': 'रूबल',
  'currency.USD': 'डॉलर',
  'currency.EUR': 'यूरो',

  'summary.after': { one: '{count} साल बाद', other: '{count} साल बाद' },
  'summary.caption': 'बैलेंस, पूरा मुनाफ़ा दोबारा लगाया हुआ',
  'summary.paidIn': 'जमा किया',
  'summary.earned': 'कमाया',
  'summary.dividends': 'लाभांश, हर महीने',
  'summary.readout':
    'हर महीने {deposit} जमा करने और बैलेंस पर हर महीने {rate} कमाने पर — रोज़ लगभग {daily} — दूसरे महीने तक आपने {income} कमाए और {balance} जोड़ लिए। साल में {dividend} की दर से अंतिम बैलेंस हर महीने {payout} लाभांश देता।',

  'controls.title': 'आपकी योजना',
  'controls.reset': 'रीसेट',
  'controls.deposit': 'हर महीने जमा',
  'controls.income': 'रिटर्न',
  'controls.incomeHint': '≈ रोज़ {daily}, {days} दिनों पर',
  'controls.incomeHintPeriod': '= {monthly} महीना, ≈ {daily} रोज़',
  'controls.perMonth': '% / महीना',
  'controls.perQuarter': '% / तिमाही',
  'controls.dividend': 'लाभांश',
  'controls.dividendHint': 'जो आपके पास है उस पर',
  'controls.perYear': '% / साल',
  'controls.ratePeriod': 'रिटर्न की अवधि',
  'controls.years': 'अनुमान की अवधि',
  'controls.yearsUnit': 'साल',
  'controls.slider': '“{label}” स्लाइडर',

  'chart.title': 'बढ़त',
  'chart.scale': 'पैमाना',
  'chart.linear': 'रैखिक',
  'chart.log': 'लॉग',
  'chart.balance': 'बैलेंस',
  'chart.paidIn': 'जमा किया',
  'chart.point': 'साल {year}, महीना {month}',
  'chart.summary': 'बैलेंस {years} में {final} तक पहुँचता है, जमा {invested} के मुक़ाबले।',

  'table.title': 'महीने-दर-महीने',
  'table.month': 'मा',
  'table.balance': 'जमा + दोबारा लगाया',
  'table.income': 'महीने की कमाई',
  'table.dividends': 'लाभांश {amount}/माह',
  'table.year': { one: '{count} साल', other: '{count} साल' },

  'converter.title': 'दूसरी मुद्राओं में',
  'converter.amount': 'रकम',
  'converter.amountHint': 'अंतिम बैलेंस से शुरू',
  'converter.eurUsd': 'एक यूरो में कितने डॉलर',
  'converter.usdRub': 'एक डॉलर में कितने रूबल',
  'converter.eurRub': 'एक यूरो में कितने रूबल',
  'converter.live': 'दरें open.er-api.com से, {date}।',
  'converter.cached': 'दरें आख़िरी बार {date} को ली गईं।',
  'converter.manual': 'दरें हाथ से बदली गई हैं।',
  'converter.offline': 'ऑफ़लाइन — ऐप के साथ आई दरें दिखाई जा रही हैं।',

  'support.title': 'सहयोग',
  'support.text':
    'InvestTable मुफ़्त है, इसमें विज्ञापन नहीं हैं और यह कुछ भी इकट्ठा नहीं करता। अगर यह आपके काम आए, तो आप सहयोग कर सकते हैं:',

  'projects.title': 'लेखक के दूसरे काम',
  'projects.all': 'सभी उत्पाद →',

  'footer.disclaimer':
    'यह अनुमान है, भविष्यवाणी नहीं। यह मानकर चलता है कि आपका डाला हुआ रिटर्न हर महीने बिना चूके आता है और पूरा दोबारा लगाया जाता है, और इसमें शुल्क, कर, स्प्रेड या महँगाई नहीं गिने गए। असली रिटर्न बदलता रहता है और ऋणात्मक भी हो सकता है। यहाँ कुछ भी निवेश सलाह नहीं है।',
  'footer.privacy':
    'सब कुछ इसी डिवाइस पर रहता है — न कोई खाता है, न कोई सर्वर जो आपके आँकड़े रखे। नेटवर्क से सिर्फ़ विनिमय दरें आती हैं, open.er-api.com से, और उनके बिना भी ऐप चलता है।',
  'footer.origin': '“Revenue Chart” स्प्रेडशीट से बनाया गया · बिल्ड {build}',
} satisfies Catalogue
