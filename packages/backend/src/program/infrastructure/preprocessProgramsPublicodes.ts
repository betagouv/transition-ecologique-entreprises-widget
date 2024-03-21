import { QuestionnaireRoute } from '../../../../common/src/questionnaire/types'
import { type QuestionnaireData, Program } from '../domain/types'
import { type PublicodesInputData, PublicodesKeys, PublicodesQuestionnaireRoute } from './types'

/** preprocesses the data gathered from the questionnaire into variables
 * needed by publicodes */
export const preprocessInputForPublicodes = (
  questionnaireData: QuestionnaireData,
  programData: Program,
  currentDate: string
): PublicodesInputData => {
  const publicodesData: PublicodesInputData = {
    ...questionnaireData,
    [PublicodesKeys.CurrentDate]: currentDate
  }

  if (questionnaireData.codeNaf) publicodesData['entreprise . code NAF'] = enquotePublicodesLiteralString(questionnaireData.codeNaf)


// NAF CODES
// // Associates a NAF1 (composed of 1 letter) to its expected publicode variable
// export const NAF1ToVar = (letter: string): string => Entreprise.CodeNAF1 + letter

// export const NAF1Letters = [...'ABCDEFGHIJKLMNOPQRSTU'] as const

// // publicodes variable initialization to "non"
// export const codesNAF1: { [p: string]: YesNo } = Object.fromEntries(NAF1Letters.map((l) => [NAF1ToVar(l), YesNo.No]))



  publicodesData.région = questionnaireData.region

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
