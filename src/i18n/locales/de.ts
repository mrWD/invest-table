import type { Catalogue } from './en.ts'

export const de = {
  'app.tagline': 'Zinseszins, Monat für Monat',
  'app.currency': 'Währung',
  'app.language': 'Sprache',
  'app.theme': 'Design',

  'theme.light': 'Hell',
  'theme.auto': 'Auto',
  'theme.dark': 'Dunkel',

  'currency.RUB': 'Rubel',
  'currency.USD': 'Dollar',
  'currency.EUR': 'Euro',

  'summary.after': { one: 'Nach {count} Jahr', other: 'Nach {count} Jahren' },
  'summary.caption': 'Guthaben, jede Rendite wieder angelegt',
  'summary.paidIn': 'Eingezahlt',
  'summary.earned': 'Verdient',
  'summary.dividends': 'Dividenden, pro Monat',
  'summary.readout':
    'Bei {deposit} im Monat und {rate} Rendite auf das Guthaben pro Monat — etwa {daily} pro Tag — haben Sie bis zum zweiten Monat {income} verdient und {balance} zurückgelegt. Bei {dividend} im Jahr würde das Endguthaben {payout} pro Monat an Dividenden zahlen.',

  'controls.title': 'Ihr Plan',
  'controls.reset': 'Zurücksetzen',
  'controls.deposit': 'Monatliche Einzahlung',
  'controls.income': 'Rendite',
  'controls.incomeHint': '≈ {daily} pro Tag an {days} Tagen',
  'controls.incomeHintPeriod': '= {monthly} pro Monat, ≈ {daily} pro Tag',
  'controls.perMonth': '% / Monat',
  'controls.perQuarter': '% / Quartal',
  'controls.dividend': 'Dividenden',
  'controls.dividendHint': 'auf den gehaltenen Bestand',
  'controls.perYear': '% / Jahr',
  'controls.ratePeriod': 'Zeitraum der Rendite',
  'controls.years': 'Laufzeit',
  'controls.yearsUnit': 'Jahre',
  'controls.slider': 'Regler „{label}“',

  'chart.title': 'Wachstum',
  'chart.scale': 'Skala',
  'chart.linear': 'Linear',
  'chart.log': 'Log.',
  'chart.balance': 'Guthaben',
  'chart.paidIn': 'Eingezahlt',
  'chart.point': 'Jahr {year}, Monat {month}',
  'chart.summary': 'Das Guthaben wächst in {years} auf {final}, bei {invested} Einzahlungen.',

  'table.title': 'Monat für Monat',
  'table.month': 'M',
  'table.balance': 'Eingezahlt + wieder angelegt',
  'table.income': 'Monatlicher Ertrag',
  'table.dividends': 'Dividenden {amount}/Mon.',
  'table.year': { one: '{count} Jahr', other: '{count} Jahre' },

  'converter.title': 'In anderen Währungen',
  'converter.amount': 'Betrag',
  'converter.amountHint': 'beginnt beim Endguthaben',
  'converter.eurUsd': 'Dollar für einen Euro',
  'converter.usdRub': 'Rubel für einen Dollar',
  'converter.eurRub': 'Rubel für einen Euro',
  'converter.live': 'Kurse von open.er-api.com, {date}.',
  'converter.cached': 'Kurse zuletzt geladen am {date}.',
  'converter.manual': 'Kurse von Hand geändert.',
  'converter.offline': 'Offline — es gelten die mitgelieferten Kurse.',

  'support.title': 'Unterstützen',
  'support.text':
    'InvestTable ist kostenlos, ohne Werbung und sammelt nichts. Wenn es Ihnen nützt, können Sie es unterstützen:',

  'projects.title': 'Mehr vom Autor',
  'projects.all': 'Alle Produkte →',

  'footer.disclaimer':
    'Eine Hochrechnung, keine Prognose. Sie unterstellt, dass die eingegebene Rendite jeden Monat ausnahmslos anfällt und vollständig wieder angelegt wird, und berücksichtigt weder Gebühren noch Steuern, Spreads oder Inflation. Reale Renditen schwanken und können negativ sein. Nichts davon ist eine Anlageberatung.',
  'footer.privacy':
    'Alles bleibt auf diesem Gerät — es gibt kein Konto und keinen Server, der Ihre Zahlen speichert. Geladen werden allein die Wechselkurse, von open.er-api.com, und ohne sie funktioniert die App ebenfalls.',
  'footer.origin': 'Portiert aus der Tabelle „Revenue Chart“ · Build {build}',
} satisfies Catalogue
