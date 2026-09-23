import type { Catalogue } from './en.ts'

export const fr = {
  'app.tagline': 'intérêts composés, mois après mois',
  'app.currency': 'Devise',
  'app.language': 'Langue',
  'app.theme': 'Thème',

  'theme.light': 'Clair',
  'theme.auto': 'Auto',
  'theme.dark': 'Sombre',

  'currency.RUB': 'Rouble',
  'currency.USD': 'Dollar',
  'currency.EUR': 'Euro',

  'summary.after': { one: 'Au bout de {count} an', other: 'Au bout de {count} ans' },
  'summary.caption': 'solde, chaque gain réinvesti',
  'summary.paidIn': 'Versé',
  'summary.earned': 'Gagné',
  'summary.dividends': 'Dividendes, par mois',
  'summary.readout':
    'En versant {deposit} par mois et en gagnant {rate} du solde chaque mois — environ {daily} par jour — vous avez gagné {income} et mis de côté {balance} au deuxième mois. À {dividend} par an, le solde final verserait {payout} par mois en dividendes.',

  'controls.title': 'Votre plan',
  'controls.reset': 'Réinitialiser',
  'controls.deposit': 'Versement mensuel',
  'controls.income': 'Rendement',
  'controls.incomeHint': '≈ {daily} par jour sur {days} jours',
  'controls.incomeHintPeriod': '= {monthly} par mois, ≈ {daily} par jour',
  'controls.perMonth': '% / mois',
  'controls.perQuarter': '% / trimestre',
  'controls.dividend': 'Dividendes',
  'controls.dividendHint': 'sur ce que vous détenez',
  'controls.perYear': '% / an',
  'controls.ratePeriod': 'Période du rendement',
  'controls.years': 'Durée de la projection',
  'controls.yearsUnit': 'ans',
  'controls.slider': 'curseur « {label} »',

  'chart.title': 'Croissance',
  'chart.scale': 'Échelle',
  'chart.linear': 'Linéaire',
  'chart.log': 'Log.',
  'chart.balance': 'Solde',
  'chart.paidIn': 'Versé',
  'chart.point': 'Année {year}, mois {month}',
  'chart.summary': 'Le solde atteint {final} en {years}, pour {invested} versés.',

  'table.title': 'Mois par mois',
  'table.month': 'M',
  'table.balance': 'Versé + réinvesti',
  'table.income': 'Gain du mois',
  'table.dividends': 'dividendes {amount}/mois',
  'table.year': { one: '{count} an', other: '{count} ans' },

  'converter.title': 'Dans d’autres devises',
  'converter.amount': 'Montant',
  'converter.amountHint': 'part du solde final',
  'converter.eurUsd': 'dollars pour un euro',
  'converter.usdRub': 'roubles pour un dollar',
  'converter.eurRub': 'roubles pour un euro',
  'converter.live': 'Taux d’open.er-api.com, {date}.',
  'converter.cached': 'Derniers taux récupérés le {date}.',
  'converter.manual': 'Taux modifiés à la main.',
  'converter.offline': 'Hors ligne — taux fournis avec l’application.',

  'support.title': 'Soutenir',
  'support.text':
    'InvestTable est gratuit, sans publicité et ne collecte rien. S’il vous est utile, vous pouvez le soutenir :',

  'projects.title': 'Autres projets de l’auteur',
  'projects.all': 'Tous les produits →',

  'footer.disclaimer':
    'Une projection, pas une prévision. Elle suppose que le rendement saisi tombe chaque mois sans faute et est réinvesti en totalité, et ne compte ni frais, ni impôts, ni écarts de cours, ni inflation. Les rendements réels varient et peuvent être négatifs. Rien ici ne constitue un conseil en investissement.',
  'footer.privacy':
    'Tout reste sur cet appareil — il n’y a ni compte ni serveur qui conserve vos chiffres. Seuls les taux de change sont récupérés, sur open.er-api.com, et l’application fonctionne sans eux.',
  'footer.origin': 'Porté depuis le tableur « Revenue Chart » · build {build}',
} satisfies Catalogue
