import { QuestionnaireRoute, Sector, Objectives, YesNo } from '../../../../common/src/questionnaire/types'

export { type Program } from '@tee/data/src/type/program'
export { type Operators } from '@tee/data/src/generated/program'

export interface QuestionnaireDataWOObjectives {
  questionnaire_route?: QuestionnaireRoute
  siret?: string
  codeNaf?: string
  codeNAF1?: string
  ville?: string
  codePostal?: string
  region?: string
  structure_sizes?: string
  denomination?: string
  secteur?: Sector | string
  workForce?: number
}

// type ObjectivesInterface = {
//   [key in keyof typeof Objectives]?: string;
// }
type ObjectivesInterface = {
  [key in Objectives]?: YesNo;
}

// Extend the QuestionnaireData interface with ObjectivesInterface
export interface QuestionnaireData extends QuestionnaireDataWOObjectives, ObjectivesInterface {
  [key: string]: any // Accept the excess values send by the front end. 
}
