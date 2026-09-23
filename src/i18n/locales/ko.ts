import type { Catalogue } from './en.ts'

export const ko = {
  'app.tagline': '복리 성장, 달마다',
  'app.currency': '통화',
  'app.language': '언어',
  'app.theme': '테마',

  'theme.light': '밝게',
  'theme.auto': '자동',
  'theme.dark': '어둡게',

  'currency.RUB': '루블',
  'currency.USD': '달러',
  'currency.EUR': '유로',

  'summary.after': { other: '{count}년 후' },
  'summary.caption': '잔액, 수익은 전액 재투자',
  'summary.paidIn': '납입액',
  'summary.earned': '수익',
  'summary.dividends': '배당, 월',
  'summary.readout':
    '매달 {deposit}을 넣고 잔액의 {rate}(하루 약 {daily})를 매달 번다면, 두 번째 달까지 {income}을 벌고 {balance}을 모으게 됩니다. 연 {dividend}이면 최종 잔액은 월 {payout}의 배당을 냅니다.',

  'controls.title': '나의 계획',
  'controls.reset': '초기화',
  'controls.deposit': '매달 납입액',
  'controls.income': '수익률',
  'controls.incomeHint': '≈ 하루 {daily}, {days}일 기준',
  'controls.incomeHintPeriod': '= 월 {monthly}, ≈ 하루 {daily}',
  'controls.perMonth': '% / 월',
  'controls.perQuarter': '% / 분기',
  'controls.dividend': '배당',
  'controls.dividendHint': '보유분 기준',
  'controls.perYear': '% / 년',
  'controls.ratePeriod': '수익률 기간',
  'controls.years': '예측 기간',
  'controls.yearsUnit': '년',
  'controls.slider': '‘{label}’ 슬라이더',

  'chart.title': '성장',
  'chart.scale': '축 눈금',
  'chart.linear': '선형',
  'chart.log': '로그',
  'chart.balance': '잔액',
  'chart.paidIn': '납입액',
  'chart.point': '{year}년 차 {month}개월',
  'chart.summary': '잔액은 {years} 동안 {final}까지 늘고, 납입액은 {invested}입니다.',

  'table.title': '월별 내역',
  'table.month': '월',
  'table.balance': '납입 + 재투자',
  'table.income': '월 수익',
  'table.dividends': '배당 {amount}/월',
  'table.year': { other: '{count}년 차' },

  'converter.title': '다른 통화로',
  'converter.amount': '금액',
  'converter.amountHint': '최종 잔액에서 시작',
  'converter.eurUsd': '1유로당 달러',
  'converter.usdRub': '1달러당 루블',
  'converter.eurRub': '1유로당 루블',
  'converter.live': '환율 출처 open.er-api.com, {date}.',
  'converter.cached': '환율 최종 수신 {date}.',
  'converter.manual': '환율을 직접 수정했습니다.',
  'converter.offline': '오프라인 — 앱에 포함된 환율을 표시합니다.',

  'support.title': '후원',
  'support.text':
    'InvestTable은 무료이고 광고가 없으며 아무것도 수집하지 않습니다. 도움이 되었다면 후원할 수 있습니다:',

  'projects.title': '만든 사람의 다른 작업',
  'projects.all': '모든 제품 →',

  'footer.disclaimer':
    '예측이 아니라 추정입니다. 입력한 수익률이 매달 빠짐없이 발생하고 전액 재투자된다고 가정하며, 수수료·세금·스프레드·물가상승은 반영하지 않습니다. 실제 수익률은 변동하며 마이너스가 될 수도 있습니다. 여기 있는 어떤 내용도 투자 자문이 아닙니다.',
  'footer.privacy':
    '모든 것이 이 기기에 남습니다 — 계정도, 숫자를 보관하는 서버도 없습니다. 네트워크로 받아오는 것은 환율(open.er-api.com)뿐이고, 없어도 앱은 동작합니다.',
  'footer.origin': '“Revenue Chart” 스프레드시트에서 이식 · 빌드 {build}',
} satisfies Catalogue
