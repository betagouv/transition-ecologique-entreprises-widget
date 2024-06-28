import programFrDict from '@/translations/fr/program'
import projectFrDict from '@/translations/fr/project'

export const frDict = {
  next: 'Suivant',
  previous: 'Précédent',
  close: 'Fermer',
  send: 'Envoyer',
  modify: 'modifier',
  or: 'Ou',
  footer: {
    thisApplicationAndIts: 'Cette application et son',
    sourceCode: 'code source',
    areUnderlicence: 'sont sous licence'
  },
  selection: {
    mySelection: 'Ma sélection',
    selected: 'Sélectionné'
  },
  form: {
    mandatory: 'Champs obligatoires',
    sent: 'Votre message a bien été envoyé !',
    sorryError: 'Nous sommes désolés, une erreur est survenue.',
    notSent: 'Votre message n’a pas pu être envoyé',
    contactHelp: 'Merci de nous contacter à',
    nowWhat: 'Et maintenant ?',
    advisors: 'Nous allons identifier le bon conseiller près de chez vous',
    phoneContact:
      'Un conseiller {operator} vous contactera prochainement par mail ou par téléphone pour échanger sur votre besoin et répondre à vos questions',
    errorMsg: 'Vous avez la possibilité de nous transmettre votre demande par mail à <a target="_blank" href="{mailto}">{email}</a>.',
    errorEmail: {
      subject: "[france-transition] Demande d'informations concernant le dispositif {program}"
    }
  },
  select: {
    selectOption: 'Sélectionnez une option'
  },
  input: {
    research: 'Recherche',
    search: 'Rechercher'
  },
  results: {
    results: 'résultats',
    result: 'résultat',
    backToResults: 'Retour aux résultats',
    // showForm: "Candidatez pour le dispositif {title}",
    knowMore: 'En savoir plus',
    showForm: 'En savoir plus sur {title}',
    alertTitle: 'Merci, voici vos résultats',
    alertTitleNoResults: 'Pas de résultats',
    alertNoResults: "Désolé, nous n'avons pas trouvé de dispositif adapté à votre situation et vos demandes",
    alertDescription: 'Vous pouvez également nous envoyer un mail via le formulaire ci-après pour être mis en contact avec des conseillers',
    yourResults: 'Vos résultats',
    fittingPrograms: 'Les aides correspondant à vos choix',
    filterSelect: 'Filtrer par {fieldLabel}',
    resetSelect: '(réinitialiser)'
  },
  errors: {
    error: 'Erreur'
  },
  programCosts: {
    cost: 'Coût restant à charge',
    costPrefix: 'Coût',
    aid: 'Montant du financement',
    aidPrefix: "Montant de l'aide",
    loan: 'Montant du prêt',
    loanRate: 'Taux du prêt',
    taxAdvantage: 'Avantage fiscal'
  },
  programResults: {
    resume: 'Voilà une liste de projets pertinents pour votre {effectif} du secteur {secteur} en Région {region}.'
  },
  enterprise: {
    select: 'Sélectionnez votre entreprise',
    noStructureFound: "Aucune structure n'a été trouvée.",
    apiError:
      'Une erreur est survenue lors de la recherche. Veuillez essayer de nouveau en renseignant les 14 chiffres de votre numéro SIRET.',
    searchTooShort: '3 caractères minimums.',
    structureSize: {
      EI: 'Entreprise individuelle',
      TPE: 'TPE',
      PE: 'PME',
      ME: 'PME',
      ETI_GE: 'ETI ou Grande Entreprise'
    }
  },
  categories: {
    start: '🏁 Questionnaire',
    myNeeds: 'Mes besoins',
    ourHelp: '🧭 Comment vous aider',
    myEntreprise: '👋 Mon entreprise',
    myBuildings: '🏢 Bâtiment',
    myMobility: '🚲 Mobilité',
    myWater: '💧 Eau',
    myWastes: '🗑 Déchets',
    myEnergy: '⚡️ Energie',
    myStrategy: '🎲️ Stratégie',
    results: '✅ Résultats'
  },
  articles: {
    accompagnement: {
      the: "l'",
      this: 'cet',
      of: "de l'"
    },
    financement: {
      the: 'le',
      this: 'ce',
      of: 'du'
    },
    prêt: {
      the: 'le',
      this: 'ce',
      of: 'du'
    },
    'avantage fiscal': {
      the: "l'",
      this: 'cet',
      of: "de l'"
    },
    formation: {
      the: 'la',
      this: 'cette',
      of: 'de la'
    }
  },
  ...programFrDict,
  ...projectFrDict
}
