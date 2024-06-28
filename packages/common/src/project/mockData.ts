import { Project } from './types'

export const projects: Project[] = [
  {
    id: 0,
    title: 'Réduction des emballages',
    nameTag: 'tag-emballage',
    shortDescription: 'Diminuer vos emballages plastiques  et favoriser des solutions de réemploi.',
    image: 'images/TEE_energie_verte.png',
    longDescription: `*“L’emballage le plus respectueux de l’environnement reste celui que l’on ne produit pas”*.
Moins de matières premières extraites, transportées et transformées, donc moins de déchets d’emballages à gérer après usage.

La loi AGEC fixe des objectifs ambitieux sur la réduction des emballages à usage unique et notamment la fin de la mise sur le marché d'emballages en plastique à usage unique d'ici à 2040. Les entreprises sont encouragées à mettre en oeuvre des actions pour la réduction, la réutilisation, le réemploi et le recyclage des emballages en plastique à usage unique.`,
    moreDescription: `"- [**Site - L’observatoire du réemploi et de la réutilisation**](https://filieres-rep.ademe.fr/observatoire-reemploi-reutilisation/presentation)**.** Cet observatoire a pour ambition d’être une structure d’expertise et d’aide à la décision sur les questions de réemploi et de réutilisation des produits et emballages soumis au principe de REP (responsabilité élargie des producteurs).
- **Comment diminuer vos déchets plastiques?** Réduire collectivement nos déchets plastiques est une priorité et ce, même si les solutions de recyclage sont en plein développement. Tour d’horizon et conseils pour changer la donne"`,
    themes: ['ecoconception'],
    mainTheme: 'ecoconception',
    programs: ['accelerateur-decarbonation', 'act-pas-a-pas'],
    linkedProjects: [1, 2]
  },
  {
    id: 1,
    title: 'Chauffe-eau solaire',
    nameTag: 'tag-cheauffe-eau',
    shortDescription: "Les panneaux solaires thermiques sont destinés à produire de l'eau chaude sanitaire.",
    image: 'images/TEE_energie_verte.png',
    longDescription: `*“L’emballage le plus respectueux de l’environnement reste celui que l’on ne produit pas”*.
Moins de matières premières extraites, transportées et transformées, donc moins de déchets d’emballages à gérer après usage.

La loi AGEC fixe des objectifs ambitieux sur la réduction des emballages à usage unique et notamment la fin de la mise sur le marché d'emballages en plastique à usage unique d'ici à 2040. Les entreprises sont encouragées à mettre en oeuvre des actions pour la réduction, la réutilisation, le réemploi et le recyclage des emballages en plastique à usage unique.`,
    moreDescription: `"- [**Site - L’observatoire du réemploi et de la réutilisation**](https://filieres-rep.ademe.fr/observatoire-reemploi-reutilisation/presentation)**.** Cet observatoire a pour ambition d’être une structure d’expertise et d’aide à la décision sur les questions de réemploi et de réutilisation des produits et emballages soumis au principe de REP (responsabilité élargie des producteurs).
- **Comment diminuer vos déchets plastiques?** Réduire collectivement nos déchets plastiques est une priorité et ce, même si les solutions de recyclage sont en plein développement. Tour d’horizon et conseils pour changer la donne"`,
    themes: ['eau'],
    mainTheme: 'eau',
    programs: ['accelerateur-decarbonation', 'act-pas-a-pas'],
    linkedProjects: []
  },
  {
    id: 2,
    title: 'Panneaux solaires',
    nameTag: 'tag-manneaux-solaire',
    shortDescription: 'L’énergie solaire photovoltaïque transforme le rayonnement solaire en électricité.',
    image: 'images/TEE_energie_verte.png',
    longDescription: `*“L’emballage le plus respectueux de l’environnement reste celui que l’on ne produit pas”*.
Moins de matières premières extraites, transportées et transformées, donc moins de déchets d’emballages à gérer après usage.

La loi AGEC fixe des objectifs ambitieux sur la réduction des emballages à usage unique et notamment la fin de la mise sur le marché d'emballages en plastique à usage unique d'ici à 2040. Les entreprises sont encouragées à mettre en oeuvre des actions pour la réduction, la réutilisation, le réemploi et le recyclage des emballages en plastique à usage unique.`,
    moreDescription: `"- [**Site - L’observatoire du réemploi et de la réutilisation**](https://filieres-rep.ademe.fr/observatoire-reemploi-reutilisation/presentation)**.** Cet observatoire a pour ambition d’être une structure d’expertise et d’aide à la décision sur les questions de réemploi et de réutilisation des produits et emballages soumis au principe de REP (responsabilité élargie des producteurs).
- **Comment diminuer vos déchets plastiques?** Réduire collectivement nos déchets plastiques est une priorité et ce, même si les solutions de recyclage sont en plein développement. Tour d’horizon et conseils pour changer la donne"`,
    themes: ['energie'],
    mainTheme: 'energie',
    programs: ['accelerateur-decarbonation', 'act-pas-a-pas'],
    linkedProjects: [5, 6, 7]
  },
  {
    id: 3,
    title: 'Eclairage LED',
    nameTag: '💡 LED',
    shortDescription: 'Les ampoules LED sont extrêmement économes en énergie par rapport aux ampoules traditionnelles.',
    image: 'images/TEE_energie_verte.png',
    longDescription: `*“L’emballage le plus respectueux de l’environnement reste celui que l’on ne produit pas”*.
Moins de matières premières extraites, transportées et transformées, donc moins de déchets d’emballages à gérer après usage.

La loi AGEC fixe des objectifs ambitieux sur la réduction des emballages à usage unique et notamment la fin de la mise sur le marché d'emballages en plastique à usage unique d'ici à 2040. Les entreprises sont encouragées à mettre en oeuvre des actions pour la réduction, la réutilisation, le réemploi et le recyclage des emballages en plastique à usage unique.`,
    moreDescription: `"- [**Site - L’observatoire du réemploi et de la réutilisation**](https://filieres-rep.ademe.fr/observatoire-reemploi-reutilisation/presentation)**.** Cet observatoire a pour ambition d’être une structure d’expertise et d’aide à la décision sur les questions de réemploi et de réutilisation des produits et emballages soumis au principe de REP (responsabilité élargie des producteurs).
- **Comment diminuer vos déchets plastiques?** Réduire collectivement nos déchets plastiques est une priorité et ce, même si les solutions de recyclage sont en plein développement. Tour d’horizon et conseils pour changer la donne"`,
    themes: ['batiment'],
    mainTheme: 'batiment',
    programs: ['accelerateur-decarbonation', 'act-pas-a-pas'],
    linkedProjects: [2, 4]
  },
  {
    id: 4,
    title: 'Chauffage au bois',
    nameTag: 'chauffage-bois',
    shortDescription: 'Une chaufferie biomasse est un système de chaufferie alimenté par des matières végétales, principalement du bois.',
    image: 'images/TEE_energie_verte.png',
    longDescription: `*“L’emballage le plus respectueux de l’environnement reste celui que l’on ne produit pas”*.
Moins de matières premières extraites, transportées et transformées, donc moins de déchets d’emballages à gérer après usage.

La loi AGEC fixe des objectifs ambitieux sur la réduction des emballages à usage unique et notamment la fin de la mise sur le marché d'emballages en plastique à usage unique d'ici à 2040. Les entreprises sont encouragées à mettre en oeuvre des actions pour la réduction, la réutilisation, le réemploi et le recyclage des emballages en plastique à usage unique.`,
    moreDescription: `"- [**Site - L’observatoire du réemploi et de la réutilisation**](https://filieres-rep.ademe.fr/observatoire-reemploi-reutilisation/presentation)**.** Cet observatoire a pour ambition d’être une structure d’expertise et d’aide à la décision sur les questions de réemploi et de réutilisation des produits et emballages soumis au principe de REP (responsabilité élargie des producteurs).
- **Comment diminuer vos déchets plastiques?** Réduire collectivement nos déchets plastiques est une priorité et ce, même si les solutions de recyclage sont en plein développement. Tour d’horizon et conseils pour changer la donne"`,
    themes: ['energie'],
    mainTheme: 'energie',
    programs: ['accelerateur-decarbonation', 'act-pas-a-pas'],
    linkedProjects: [2, 3]
  },
  {
    id: 5,
    title: 'test RH',
    nameTag: 'tag-projet-rh',
    shortDescription: 'Ceci est un projet de la catégorie RH.',
    image: 'images/TEE_energie_verte.png',
    longDescription: `*“L’emballage le plus respectueux de l’environnement reste celui que l’on ne produit pas”*.
Moins de matières premières extraites, transportées et transformées, donc moins de déchets d’emballages à gérer après usage.

La loi AGEC fixe des objectifs ambitieux sur la réduction des emballages à usage unique et notamment la fin de la mise sur le marché d'emballages en plastique à usage unique d'ici à 2040. Les entreprises sont encouragées à mettre en oeuvre des actions pour la réduction, la réutilisation, le réemploi et le recyclage des emballages en plastique à usage unique.`,
    moreDescription: `"- [**Site - L’observatoire du réemploi et de la réutilisation**](https://filieres-rep.ademe.fr/observatoire-reemploi-reutilisation/presentation)**.** Cet observatoire a pour ambition d’être une structure d’expertise et d’aide à la décision sur les questions de réemploi et de réutilisation des produits et emballages soumis au principe de REP (responsabilité élargie des producteurs).
- **Comment diminuer vos déchets plastiques?** Réduire collectivement nos déchets plastiques est une priorité et ce, même si les solutions de recyclage sont en plein développement. Tour d’horizon et conseils pour changer la donne"`,
    themes: ['rh'],
    mainTheme: 'rh',
    programs: ['accelerateur-decarbonation', 'act-pas-a-pas'],
    linkedProjects: []
  },
  {
    id: 6,
    title: 'Renovation de quelquechose',
    nameTag: 'tag renov test',
    shortDescription: 'Test en renov.',
    image: 'images/TEE_energie_verte.png',
    longDescription: `*“L’emballage le plus respectueux de l’environnement reste celui que l’on ne produit pas”*.
Moins de matières premières extraites, transportées et transformées, donc moins de déchets d’emballages à gérer après usage.

La loi AGEC fixe des objectifs ambitieux sur la réduction des emballages à usage unique et notamment la fin de la mise sur le marché d'emballages en plastique à usage unique d'ici à 2040. Les entreprises sont encouragées à mettre en oeuvre des actions pour la réduction, la réutilisation, le réemploi et le recyclage des emballages en plastique à usage unique.`,
    moreDescription: `"- [**Site - L’observatoire du réemploi et de la réutilisation**](https://filieres-rep.ademe.fr/observatoire-reemploi-reutilisation/presentation)**.** Cet observatoire a pour ambition d’être une structure d’expertise et d’aide à la décision sur les questions de réemploi et de réutilisation des produits et emballages soumis au principe de REP (responsabilité élargie des producteurs).
- **Comment diminuer vos déchets plastiques?** Réduire collectivement nos déchets plastiques est une priorité et ce, même si les solutions de recyclage sont en plein développement. Tour d’horizon et conseils pour changer la donne"`,
    themes: ['renovation'],
    mainTheme: 'renovation',
    programs: ['accelerateur-decarbonation', 'act-pas-a-pas'],
    linkedProjects: []
  },
  {
    id: 7,
    title: 'Mobiblité douce',
    nameTag: 'Tous à vélo!',
    shortDescription: 'Ceci est une description courte pour test des cartes !',
    image: 'images/TEE_energie_verte.png',
    longDescription: `*“L’emballage le plus respectueux de l’environnement reste celui que l’on ne produit pas”*.
Moins de matières premières extraites, transportées et transformées, donc moins de déchets d’emballages à gérer après usage.

La loi AGEC fixe des objectifs ambitieux sur la réduction des emballages à usage unique et notamment la fin de la mise sur le marché d'emballages en plastique à usage unique d'ici à 2040. Les entreprises sont encouragées à mettre en oeuvre des actions pour la réduction, la réutilisation, le réemploi et le recyclage des emballages en plastique à usage unique.`,
    moreDescription: `"- [**Site - L’observatoire du réemploi et de la réutilisation**](https://filieres-rep.ademe.fr/observatoire-reemploi-reutilisation/presentation)**.** Cet observatoire a pour ambition d’être une structure d’expertise et d’aide à la décision sur les questions de réemploi et de réutilisation des produits et emballages soumis au principe de REP (responsabilité élargie des producteurs).
- **Comment diminuer vos déchets plastiques?** Réduire collectivement nos déchets plastiques est une priorité et ce, même si les solutions de recyclage sont en plein développement. Tour d’horizon et conseils pour changer la donne"`,
    themes: ['mobilite'],
    mainTheme: 'mobilite',
    programs: ['accelerateur-decarbonation', 'act-pas-a-pas'],
    linkedProjects: [2]
  },
  {
    id: 8,
    title: 'test court',
    nameTag: 'test court',
    shortDescription: 'Vraiment très courte défintion. Trop courte ?',
    image: 'images/TEE_energie_verte.png',
    longDescription: `Ceci est une description longue bien courte. Peut être même trop courte ?`,
    moreDescription: `Rien d'autre à dire!`,
    themes: ['mobilite'],
    mainTheme: 'mobilite',
    programs: ['act-pas-a-pas'],
    linkedProjects: []
  },
  {
    id: 9,
    title: 'Beaucoup peu de tout !',
    nameTag: 'test surcharge',
    shortDescription:
      "Ceci est le plus long pour l'instant : La géothermie permet de produire différents types d'énergie en fonction de la température de la chaleur puisée dans le sous-sol.",
    image: 'images/TEE_energie_verte.png',
    longDescription: `*“L’emballage le plus respectueux de l’environnement reste celui que l’on ne produit pas”*.
Moins de matières premières extraites, transportées et transformées, donc moins de déchets d’emballages à gérer après usage.

La loi AGEC fixe des objectifs ambitieux sur la réduction des emballages à usage unique et notamment la fin de la mise sur le marché d'emballages en plastique à usage unique d'ici à 2040. Les entreprises sont encouragées à mettre en oeuvre des actions pour la réduction, la réutilisation, le réemploi et le recyclage des emballages en plastique à usage unique.L’emballage le plus respectueux de l’environnement reste celui que l’on ne produit pas”*.
Moins de matières premières extraites, transportées et transformées, donc moins de déchets d’emballages à gérer après usage.

La loi AGEC fixe des objectifs ambitieux sur la réduction des emballages à usage unique et notamment la fin de la mise sur le marché d'emballages en plastique à usage unique d'ici à 2040. Les entreprises sont encouragées à mettre en oeuvre des actions pour la réduction, la réutilisation, le réemploi et le recyclage des emballages en plastique à usage unique.`,
    moreDescription: `"- [**Site - L’observatoire du réemploi et de la réutilisation**](https://filieres-rep.ademe.fr/observatoire-reemploi-reutilisation/presentation)**.** Cet observatoire a pour ambition d’être une structure d’expertise et d’aide à la décision sur les questions de réemploi et de réutilisation des produits et emballages soumis au principe de REP (responsabilité élargie des producteurs).
- **Comment diminuer vos déchets plastiques?** Réduire collectivement nos déchets plastiques est une priorité et ce, même si les solutions de recyclage sont en plein développement. Tour d’horizon et conseils pour changer la donne
- [**Site - L’observatoire du réemploi et de la réutilisation**](https://filieres-rep.ademe.fr/observatoire-reemploi-reutilisation/presentation)**.** Cet observatoire a pour ambition d’être une structure d’expertise et d’aide à la décision sur les questions de réemploi et de réutilisation des produits et emballages soumis au principe de REP (responsabilité élargie des producteurs).
- **Comment diminuer vos déchets plastiques?** Réduire collectivement nos déchets plastiques est une priorité et ce, même si les solutions de recyclage sont en plein développement. Tour d’horizon et conseils pour changer la donne"`,
    themes: ['analyse', 'mobilite', 'energie', 'eau', 'batiment', 'renovation', 'ecoconception', 'rh'],
    mainTheme: 'energie',
    programs: [
      'accelerateur-decarbonation',
      'act-pas-a-pas',
      'aides-au-reemploi-des-emballages',
      'audit-energetique-en-industrie',
      'baisse-les-watts',
      'diag-decarbon-action',
      'diagnostic-transition-ecologique',
      'eco-defis-des-artisans-et-des-commercants',
      'etude-alimentation-durable',
      'etude-chaufferie-biomasse',
      'etude-faisabilite-hydrogene',
      'etude-geothermie-de-surface-et-d-aerothermie',
      'imprim-vert',
      'investissement-chaleur-bois',
      'investissement-ecoconception'
    ],
    linkedProjects: [0, 1, 2, 3, 4, 5, 6, 7, 8]
  }
]
