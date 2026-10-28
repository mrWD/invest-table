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
  'summary.note': '수익률이 일정하다고 가정한 추정이며, 예측이 아닙니다.',
  'summary.paidIn': '납입액',
  'summary.earned': '수익',
  'summary.lost': '손실',
  'summary.dividends': '배당, 월',
  'summary.readout':
    '매달 {deposit}을 넣고 잔액의 {rate}(하루 약 {daily})를 매달 번다면, 두 번째 달까지 {income}을 벌고 {balance}을 모으게 되는 셈입니다. 연 {dividend}이면 최종 잔액은 월 {payout}의 배당을 내는 셈입니다.',
  'summary.readoutLoss':
    '매달 {deposit}을 넣고 잔액의 {rate}(하루 약 {daily})를 매달 잃는다면, 두 번째 달까지 {income}을 잃고 {balance}이 남는 셈입니다. 연 {dividend}이면 최종 잔액은 월 {payout}의 배당을 내는 셈입니다.',

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
  'support.text': 'InvestTable은 무료이고 광고가 없습니다. 도움이 되었다면 후원할 수 있습니다:',

  'projects.title': '만든 사람의 다른 작업',
  'projects.all': '모든 제품 →',

  'footer.disclaimer':
    '예측이 아니라 추정입니다. 입력한 수익률이 매달 빠짐없이 발생하고 전액 재투자된다고 가정하며, 수수료·세금·스프레드·물가상승은 반영하지 않습니다. 실제 수익률은 변동하며 마이너스가 될 수도 있습니다. 여기 있는 어떤 내용도 투자 자문이 아닙니다.',
  'footer.privacy':
    '숫자는 이 기기에 남습니다 — 계정도, 숫자를 보관하는 서버도 없습니다. 환율은 open.er-api.com에서 받아오며, 없어도 앱은 동작합니다. 하루 한 번 익명 사용 횟수(ID나 숫자는 포함되지 않음)를 보내며, 위의 스위치로 끌 수 있습니다.',
  'footer.origin': '“Revenue Chart” 스프레드시트에서 이식 · 빌드 {build}',
  'footer.licences': '오픈 소스 라이선스',

  'usage.label': '익명 사용 통계 공유',
  'usage.explain': '하루 한 번: 사용한 기능, 앱 버전, 플랫폼, 언어. ID, 입력한 숫자나 내용은 포함되지 않습니다.',
  'usage.notice': 'InvestTable은 하루 한 번 익명 사용 횟수를 보냅니다. ID나 입력한 내용은 포함되지 않습니다. 페이지 맨 아래에서 끌 수 있습니다.',
  'usage.dismiss': '확인',
} satisfies Catalogue
