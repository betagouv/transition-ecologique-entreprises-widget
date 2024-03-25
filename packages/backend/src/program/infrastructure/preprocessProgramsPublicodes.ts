import { QuestionnaireRoute, Sector, Objectives } from '../../../../common/src/questionnaire/types'
import { type QuestionnaireData, Program } from '../domain/types'
import { type PublicodesInputData, PublicodesKeys, PublicodesQuestionnaireRoute, SectorToNafSection } from './types'

/** preprocesses the data gathered from the questionnaire into variables
 * needed by publicodes */
export const preprocessInputForPublicodes = (
  questionnaireData: QuestionnaireData,
  programData: Program,
  currentDate: string
): PublicodesInputData => {

  // we start from a clean object, which create front to back isolation...
  let publicodesData: PublicodesInputData = {
    ...questionnaireData, // TOFIX debug
    [PublicodesKeys.CurrentDate]: currentDate
  };
  
  if (questionnaireData.codeNaf) publicodesData[PublicodesKeys.NAFCode] = enquotePublicodesLiteralString(questionnaireData.codeNaf)

  publicodesData[PublicodesKeys.Workforce] = questionnaireData.workForce

  let codeNaf1Consolidated: string[]
  if (questionnaireData.siret) { //if we have a siret, codeNAF1 exist, we use it
    const existingNAF1 = questionnaireData.codeNAF1 as string;
    codeNaf1Consolidated = [existingNAF1]
  } else { // we are using manual informations
    // secteur is always of type Sector, we give the info to the TS type checker
    const secteurAsSector = questionnaireData.secteur as Sector
    codeNaf1Consolidated = SectorToNafSection[secteurAsSector]
  }
  const NAF1Letters = [...'ABCDEFGHIJKLMNOPQRSTU'] as const
  // it is mandatory to write all the naf sections, whether they are true or false
  NAF1Letters.forEach((NAF1) => {
    const publicodeNAF1Key = 'entreprise . code NAF niveau 1 . est ' + NAF1
    publicodesData[publicodeNAF1Key] = (codeNaf1Consolidated.includes(NAF1)) ? 'oui' : 'non';
  })

  for (const objective of Object.values(Objectives)) {
    // it is mandatory to write all the objectives, whether they are true or false
    const publicodeObjectiveKey = 'questionnaire . objectif prioritaire . est ' + objective;
    publicodesData[publicodeObjectiveKey] = (questionnaireData[objective] == 'oui') ? 'oui' : 'non'; 
  }

  publicodesData.région = questionnaireData.region as string

  const route = questionnaireData.questionnaire_route
  if (route) {
    publicodesData[PublicodesKeys.QuestionnaireRoute] = convertQuestionnaireRoute(route)
  }

  if (programData['début de validité']) {
    publicodesData['dispositif . début de validité'] = programData['début de validité']
  }
  if (programData['fin de validité']) {
    publicodesData['dispositif . fin de validité'] = programData['fin de validité']
  }
  console.log("publiocode data" , publicodesData) //TOFIX delete
  return publicodesData
}

const convertQuestionnaireRoute = (route: QuestionnaireRoute): PublicodesQuestionnaireRoute => {
  switch (route) {
    case QuestionnaireRoute.NoSpecificGoal:
      return PublicodesQuestionnaireRoute.NoSpecificGoal
    case QuestionnaireRoute.SpecificGoal:
      return PublicodesQuestionnaireRoute.SpecificGoal
  }
}

/** for publicodes to interpret a value as a literal string, it expects
 * extra pair of quotes, added by this function. Without it, it is interpreted as a reference to another rule
 */
const enquotePublicodesLiteralString = (value: string): string => {
  return `"${value}"`
}
