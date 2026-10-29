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
  'summary.note': 'Bei konstanter Rendite: eine Hochrechnung, keine Prognose.',
  'summary.paidIn': 'Eingezahlt',
  'summary.earned': 'Verdient',
  'summary.lost': 'Verloren',
  'summary.dividends': 'Dividenden, pro Monat',
  'summary.readout':
    'Bei {deposit} im Monat und {rate} Rendite auf das Guthaben pro Monat — etwa {daily} pro Tag — hätten Sie bis zum zweiten Monat {income} verdient und {balance} zurückgelegt. Bei {dividend} im Jahr würde das Endguthaben {payout} pro Monat an Dividenden zahlen.',
  'summary.readoutLoss':
    'Bei {deposit} im Monat und {rate} Verlust auf das Guthaben pro Monat — etwa {daily} pro Tag — hätten Sie bis zum zweiten Monat {income} verloren, und {balance} wären übrig. Bei {dividend} im Jahr würde das Endguthaben {payout} pro Monat an Dividenden zahlen.',

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
    'InvestTable ist kostenlos und ohne Werbung. Wenn es Ihnen nützt, können Sie es unterstützen:',

  'projects.title': 'Mehr vom Autor',
  'projects.all': 'Alle Produkte →',

  'footer.disclaimer':
    'Eine Hochrechnung, keine Prognose. Sie unterstellt, dass die eingegebene Rendite jeden Monat ausnahmslos anfällt und vollständig wieder angelegt wird, und berücksichtigt weder Gebühren noch Steuern, Spreads oder Inflation. Reale Renditen schwanken und können negativ sein. Nichts davon ist eine Anlageberatung.',
  'footer.privacy':
    'Ihre Zahlen bleiben auf diesem Gerät — es gibt kein Konto und keinen Server, der sie speichert. Die Wechselkurse kommen von open.er-api.com, und ohne sie funktioniert die App ebenfalls. Einmal am Tag sendet sie anonyme Nutzungszahlen (keine IDs, keine Ihrer Zahlen); der Schalter oben stellt das ab.',
  'footer.origin': 'Portiert aus der Tabelle „Revenue Chart“ · Build {build}',
  'footer.licences': 'Open-Source-Lizenzen',

  'usage.label': 'Anonyme Nutzungsstatistik teilen',
  'usage.explain':
    'Einmal am Tag: welche Funktionen genutzt wurden, App-Version, Plattform, Sprache und Fehlerzahlen. Keine IDs, keine Ihrer Zahlen, nichts, was Sie eintippen.',
  'usage.notice':
    'InvestTable sendet einmal am Tag anonyme Nutzungszahlen — keine IDs, nichts, was Sie eintippen. Abschalten können Sie das unten auf der Seite.',
  'usage.dismiss': 'OK',
} satisfies Catalogue
