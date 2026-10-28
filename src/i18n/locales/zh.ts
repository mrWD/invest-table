import type { Catalogue } from './en.ts'

export const zh = {
  'app.tagline': '复利增长，逐月推演',
  'app.currency': '货币',
  'app.language': '语言',
  'app.theme': '主题',

  'theme.light': '浅色',
  'theme.auto': '自动',
  'theme.dark': '深色',

  'currency.RUB': '卢布',
  'currency.USD': '美元',
  'currency.EUR': '欧元',

  'summary.after': { other: '{count} 年后' },
  'summary.caption': '余额，收益全部再投入',
  'summary.note': '按固定收益率计算：这是估算，不是预测。',
  'summary.paidIn': '已投入',
  'summary.earned': '已赚取',
  'summary.lost': '亏损',
  'summary.dividends': '股息，每月',
  'summary.readout':
    '若每月投入 {deposit}，每月赚取余额的 {rate}（约每天 {daily}），到第二个月将赚取 {income}，累计 {balance}。按每年 {dividend} 计算，最终余额每月可产生 {payout} 股息。',
  'summary.readoutLoss':
    '若每月投入 {deposit}，每月亏损余额的 {rate}（约每天 {daily}），到第二个月将亏损 {income}，余额为 {balance}。按每年 {dividend} 计算，最终余额每月可产生 {payout} 股息。',

  'controls.title': '你的方案',
  'controls.reset': '重置',
  'controls.deposit': '每月投入',
  'controls.income': '收益率',
  'controls.incomeHint': '≈ 每天 {daily}，按 {days} 天计',
  'controls.incomeHintPeriod': '= 每月 {monthly}，≈ 每天 {daily}',
  'controls.perMonth': '% / 月',
  'controls.perQuarter': '% / 季度',
  'controls.dividend': '股息',
  'controls.dividendHint': '按持仓计算',
  'controls.perYear': '% / 年',
  'controls.ratePeriod': '收益率周期',
  'controls.years': '推演年限',
  'controls.yearsUnit': '年',
  'controls.slider': '“{label}”滑块',

  'chart.title': '增长',
  'chart.scale': '坐标轴',
  'chart.linear': '线性',
  'chart.log': '对数',
  'chart.balance': '余额',
  'chart.paidIn': '已投入',
  'chart.point': '第 {year} 年，第 {month} 个月',
  'chart.summary': '余额在 {years} 内增长到 {final}，实际投入 {invested}。',

  'table.title': '逐月明细',
  'table.month': '月',
  'table.balance': '投入 + 再投入',
  'table.income': '当月收益',
  'table.dividends': '股息 {amount}/月',
  'table.year': { other: '{count} 年' },

  'converter.title': '换算为其他货币',
  'converter.amount': '金额',
  'converter.amountHint': '默认取最终余额',
  'converter.eurUsd': '一欧元兑多少美元',
  'converter.usdRub': '一美元兑多少卢布',
  'converter.eurRub': '一欧元兑多少卢布',
  'converter.live': '汇率来自 open.er-api.com，{date}。',
  'converter.cached': '汇率最后获取于 {date}。',
  'converter.manual': '汇率已手动修改。',
  'converter.offline': '离线 — 显示应用内置的汇率。',

  'support.title': '支持',
  'support.text': 'InvestTable 免费、无广告。如果它对你有用，可以支持一下：',

  'projects.title': '作者的其他作品',
  'projects.all': '全部产品 →',

  'footer.disclaimer':
    '这是推算，不是预测。它假设你填入的收益率每月如期到账并全额再投入，且不计手续费、税费、点差和通胀。真实收益会波动，也可能为负。此处内容均不构成投资建议。',
  'footer.privacy':
    '你的数字留在这台设备上——没有账号，也没有服务器保存它们。汇率来自 open.er-api.com，没有它应用照常可用。应用每天发送一次匿名使用计数（不含 ID 和你的数字），上方的开关可以关闭。',
  'footer.origin': '移植自「Revenue Chart」表格 · 构建 {build}',
  'footer.licences': '开源许可',

  'usage.label': '分享匿名使用统计',
  'usage.explain': '每天一次：用过哪些功能、应用版本、平台和语言。不含任何 ID、你的数字或你输入的内容。',
  'usage.notice': 'InvestTable 每天发送一次匿名使用计数——不含 ID，也不含你输入的任何内容。可以在页面底部关闭。',
  'usage.dismiss': '确定',
} satisfies Catalogue
