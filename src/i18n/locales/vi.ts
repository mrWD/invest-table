import type { Catalogue } from './en.ts'

export const vi = {
  'app.tagline': 'lãi kép, từng tháng một',
  'app.currency': 'Tiền tệ',
  'app.language': 'Ngôn ngữ',
  'app.theme': 'Giao diện',

  'theme.light': 'Sáng',
  'theme.auto': 'Tự động',
  'theme.dark': 'Tối',

  'currency.RUB': 'Rúp',
  'currency.USD': 'Đô la',
  'currency.EUR': 'Euro',

  'summary.after': { other: 'Sau {count} năm' },
  'summary.caption': 'số dư, toàn bộ lợi nhuận được tái đầu tư',
  'summary.paidIn': 'Đã nạp',
  'summary.earned': 'Đã kiếm',
  'summary.dividends': 'Cổ tức, mỗi tháng',
  'summary.readout':
    'Nạp {deposit} mỗi tháng và kiếm {rate} trên số dư mỗi tháng — khoảng {daily} mỗi ngày — đến tháng thứ hai bạn đã kiếm {income} và để dành được {balance}. Với {dividend} mỗi năm, số dư cuối cùng sẽ trả {payout} cổ tức mỗi tháng.',

  'controls.title': 'Kế hoạch của bạn',
  'controls.reset': 'Đặt lại',
  'controls.deposit': 'Nạp mỗi tháng',
  'controls.income': 'Lợi nhuận',
  'controls.incomeHint': '≈ {daily} mỗi ngày trong {days} ngày',
  'controls.incomeHintPeriod': '= {monthly} mỗi tháng, ≈ {daily} mỗi ngày',
  'controls.perMonth': '% / tháng',
  'controls.perQuarter': '% / quý',
  'controls.dividend': 'Cổ tức',
  'controls.dividendHint': 'trên phần bạn đang nắm giữ',
  'controls.perYear': '% / năm',
  'controls.ratePeriod': 'Kỳ tính lợi nhuận',
  'controls.years': 'Thời gian dự phóng',
  'controls.yearsUnit': 'năm',
  'controls.slider': 'thanh trượt “{label}”',

  'chart.title': 'Tăng trưởng',
  'chart.scale': 'Thang đo',
  'chart.linear': 'Tuyến tính',
  'chart.log': 'Log.',
  'chart.balance': 'Số dư',
  'chart.paidIn': 'Đã nạp',
  'chart.point': 'Năm {year}, tháng {month}',
  'chart.summary': 'Số dư tăng lên {final} sau {years}, so với {invested} đã nạp.',

  'table.title': 'Từng tháng',
  'table.month': 'T',
  'table.balance': 'Đã nạp + tái đầu tư',
  'table.income': 'Lợi nhuận trong tháng',
  'table.dividends': 'cổ tức {amount}/tháng',
  'table.year': { other: '{count} Năm' },

  'converter.title': 'Sang tiền tệ khác',
  'converter.amount': 'Số tiền',
  'converter.amountHint': 'bắt đầu từ số dư cuối',
  'converter.eurUsd': 'đô la cho một euro',
  'converter.usdRub': 'rúp cho một đô la',
  'converter.eurRub': 'rúp cho một euro',
  'converter.live': 'Tỷ giá từ open.er-api.com, {date}.',
  'converter.cached': 'Tỷ giá lấy lần cuối ngày {date}.',
  'converter.manual': 'Tỷ giá đã sửa thủ công.',
  'converter.offline': 'Ngoại tuyến — đang hiển thị tỷ giá đi kèm ứng dụng.',

  'support.title': 'Ủng hộ',
  'support.text':
    'InvestTable miễn phí, không quảng cáo và không thu thập gì. Nếu thấy hữu ích, bạn có thể ủng hộ:',

  'projects.title': 'Sản phẩm khác của tác giả',
  'projects.all': 'Tất cả sản phẩm →',

  'footer.disclaimer':
    'Đây là dự phóng, không phải dự báo. Nó giả định mức lợi nhuận bạn nhập về đều đặn hằng tháng và được tái đầu tư toàn bộ, đồng thời không tính phí, thuế, chênh lệch giá hay lạm phát. Lợi nhuận thực tế thay đổi và có thể âm. Không có nội dung nào ở đây là lời khuyên đầu tư.',
  'footer.privacy':
    'Mọi thứ nằm lại trên thiết bị này — không có tài khoản và không có máy chủ nào giữ các con số của bạn. Thứ duy nhất tải về là tỷ giá, từ open.er-api.com, và ứng dụng vẫn chạy khi không có nó.',
  'footer.origin': 'Chuyển từ bảng tính “Revenue Chart” · bản dựng {build}',
} satisfies Catalogue
