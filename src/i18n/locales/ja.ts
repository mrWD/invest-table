import type { Catalogue } from './en.ts'

export const ja = {
  'app.tagline': '複利の伸びを、月ごとに',
  'app.currency': '通貨',
  'app.language': '言語',
  'app.theme': 'テーマ',

  'theme.light': 'ライト',
  'theme.auto': '自動',
  'theme.dark': 'ダーク',

  'currency.RUB': 'ルーブル',
  'currency.USD': 'ドル',
  'currency.EUR': 'ユーロ',

  'summary.after': { other: '{count}年後' },
  'summary.caption': '残高（利益はすべて再投資）',
  'summary.note': '利回り一定の場合の試算で、予測ではありません。',
  'summary.paidIn': '入金額',
  'summary.earned': '利益',
  'summary.lost': '損失',
  'summary.dividends': '配当（月あたり）',
  'summary.readout':
    '毎月 {deposit} を入れ、残高に対して月 {rate}（1日あたり約 {daily}）の利益が出たとすると、2か月目までに {income} の利益が出て、{balance} が貯まる計算です。年 {dividend} なら、最終残高は月 {payout} の配当を生む計算です。',
  'summary.readoutLoss':
    '毎月 {deposit} を入れ、残高に対して月 {rate}（1日あたり約 {daily}）の損失が出たとすると、2か月目までに {income} を失い、残高は {balance} になる計算です。年 {dividend} なら、最終残高は月 {payout} の配当を生む計算です。',

  'controls.title': 'あなたのプラン',
  'controls.reset': 'リセット',
  'controls.deposit': '毎月の入金額',
  'controls.income': '利回り',
  'controls.incomeHint': '≈ 1日 {daily}（{days}日換算）',
  'controls.incomeHintPeriod': '= 月 {monthly}、≈ 1日 {daily}',
  'controls.perMonth': '% / 月',
  'controls.perQuarter': '% / 四半期',
  'controls.dividend': '配当',
  'controls.dividendHint': '保有分に対して',
  'controls.perYear': '% / 年',
  'controls.ratePeriod': '利回りの期間',
  'controls.years': '試算する期間',
  'controls.yearsUnit': '年',
  'controls.slider': '「{label}」スライダー',

  'chart.title': '推移',
  'chart.scale': '軸の目盛り',
  'chart.linear': '線形',
  'chart.log': '対数',
  'chart.balance': '残高',
  'chart.paidIn': '入金額',
  'chart.point': '{year}年目 {month}か月目',
  'chart.summary': '残高は {years} で {final} まで増え、入金額は {invested} です。',

  'table.title': '月ごとの推移',
  'table.month': '月',
  'table.balance': '入金＋再投資',
  'table.income': 'その月の利益',
  'table.dividends': '配当 {amount}/月',
  'table.year': { other: '{count}年目' },

  'converter.title': 'ほかの通貨で',
  'converter.amount': '金額',
  'converter.amountHint': '初期値は最終残高',
  'converter.eurUsd': '1ユーロあたりのドル',
  'converter.usdRub': '1ドルあたりのルーブル',
  'converter.eurRub': '1ユーロあたりのルーブル',
  'converter.live': 'レートは open.er-api.com より（{date}）。',
  'converter.cached': 'レートの最終取得は {date}。',
  'converter.manual': 'レートは手動で変更済み。',
  'converter.offline': 'オフライン — アプリに同梱のレートを表示しています。',

  'support.title': '支援する',
  'support.text': 'InvestTable は無料で、広告もありません。役に立ったら支援していただけます:',

  'projects.title': '作者のほかの作品',
  'projects.all': 'すべての製品 →',

  'footer.disclaimer':
    'これは試算であって予測ではありません。入力した利回りが毎月欠かさず得られ、全額再投資されることを前提とし、手数料・税金・スプレッド・インフレは考慮していません。実際の利回りは変動し、マイナスになることもあります。ここにある内容は投資助言ではありません。',
  'footer.privacy':
    '数値はこの端末に残ります — アカウントも、数値を預かるサーバーもありません。為替レートは open.er-api.com から取得し、それなしでもアプリは動きます。一日一回、匿名の利用回数（IDや数値は含みません）を送信します。上のスイッチでオフにできます。',
  'footer.origin': 'スプレッドシート「Revenue Chart」から移植 · ビルド {build}',
  'footer.licences': 'オープンソースライセンス',

  'usage.label': '匿名の利用統計を共有',
  'usage.explain': '一日一回：使われた機能、アプリのバージョン、プラットフォーム、言語、エラーの件数。ID、入力した数値や内容は含みません。',
  'usage.notice': 'InvestTable は一日一回、匿名の利用回数を送信します。IDや入力した内容は含みません。ページの一番下でオフにできます。',
  'usage.dismiss': 'OK',
} satisfies Catalogue
