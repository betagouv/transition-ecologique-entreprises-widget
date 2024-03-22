import { QuestionnaireRoute, Sector, Objectives } from '../../../../common/src/questionnaire/types'

export { type Program } from '@tee/data/src/type/program'
export { type Operators } from '@tee/data/src/generated/program'

export interface QuestionnaireData {
  questionnaire_route?: QuestionnaireRoute
  siret: string
  codeNaf?: string
  codeNAF1?: string
  ville: string
  codePostal: string
  region: string
  structure_sizes: string
  denomination: string
  secteur: Sector | string
  workForce: number
  objectives: Objectives[] // single value if specificGoal, multiple values otherwise
  // all the data exploited in the backend should be above and typed. 
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any // Placeholder for some data with no real uses at the moment. 
}
