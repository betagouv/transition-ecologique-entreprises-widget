import { QuestionnaireRoute } from '../../../../common/src/questionnaire/types'

export { type Program } from '@tee/data/src/type/program'
export { type Operators } from '@tee/data/src/generated/program'


export interface QuestionnaireData extends QuestionnaireDataSpecificGoal {
  questionnaire_route?: QuestionnaireRoute
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any
}

type OuiNon = 'oui' | 'non'

interface QuestionnaireDataSpecificGoal {
  siret: string
  codeNaf?: string 
  codeNAF1?: string
  ville: string
  codePostal: string
  region: string
  structure_sizes: string // enum ?
  denomination: string
  secteur: string
  'entreprise . effectif': number
  'questionnaire . objectif prioritaire . est mon impact environnemental': OuiNon
  'questionnaire . objectif prioritaire . est ma performance énergétique': OuiNon
  "questionnaire . objectif prioritaire . est diminuer ma consommation d'eau": OuiNon
  'questionnaire . objectif prioritaire . est rénover mon bâtiment': OuiNon
  'questionnaire . objectif prioritaire . est la mobilité durable': OuiNon
  'questionnaire . objectif prioritaire . est la gestion des déchets': OuiNon
  "questionnaire . objectif prioritaire . est l'écoconception": OuiNon
  'questionnaire . objectif prioritaire . est former ou recruter': OuiNon
  'questionnaire . objectif prioritaire . est faire des économies': OuiNon
  'questionnaire . objectif prioritaire . est investir durable': OuiNon
  'questionnaire . objectif prioritaire . est je ne sais pas encore': OuiNon
}

// 'entreprise . code NAF niveau 1 . est A': OuiNon
// 'entreprise . code NAF niveau 1 . est B': OuiNon
// 'entreprise . code NAF niveau 1 . est C': OuiNon
// 'entreprise . code NAF niveau 1 . est D': OuiNon
// 'entreprise . code NAF niveau 1 . est E': OuiNon
// 'entreprise . code NAF niveau 1 . est F': OuiNon
// 'entreprise . code NAF niveau 1 . est G': OuiNon
// 'entreprise . code NAF niveau 1 . est H': OuiNon
// 'entreprise . code NAF niveau 1 . est I': OuiNon
// 'entreprise . code NAF niveau 1 . est J': OuiNon
// 'entreprise . code NAF niveau 1 . est K': OuiNon
// 'entreprise . code NAF niveau 1 . est L': OuiNon
// 'entreprise . code NAF niveau 1 . est M': OuiNon
// 'entreprise . code NAF niveau 1 . est N': OuiNon
// 'entreprise . code NAF niveau 1 . est O': OuiNon
// 'entreprise . code NAF niveau 1 . est P': OuiNon
// 'entreprise . code NAF niveau 1 . est Q': OuiNon
// 'entreprise . code NAF niveau 1 . est R': OuiNon
// 'entreprise . code NAF niveau 1 . est S': OuiNon
// 'entreprise . code NAF niveau 1 . est T': OuiNon
// 'entreprise . code NAF niveau 1 . est U': OuiNon
