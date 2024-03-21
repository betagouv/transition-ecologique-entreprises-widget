import { QuestionnaireRoute } from '../../../../common/src/questionnaire/types'
import { type QuestionnaireData, Program } from '../domain/types'
import { type PublicodesInputData, PublicodesKeys, PublicodesQuestionnaireRoute } from './types'

export const SectorByNAF = {
  [EntrepriseSector.Craftsmanship]: ['C', 'F', 'G'],
  [EntrepriseSector.Industry]: ['B', 'C', 'D', 'E'],
  [EntrepriseSector.Tourism]: ['I'],
  [EntrepriseSector.Tertiary]: ['G', 'H', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U'],
  [EntrepriseSector.Agriculture]: ['A'],
  [EntrepriseSector.Other]: ['D', 'E', 'F', 'H', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U']
}

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

  let codeNaf1: string[]

  if (questionnaireData.secteur) {
    codeNaf1 = SectorByNAF[questionnaireData.secteur]
  } else if (questionnaireData.codeNaf1) {
    codeNaf1 = [questionnaireData.codeNaf1]
  } else {
    // TOFIX
    // Should never happen
    // Update the QuestionnaireData type accordingly
    codeNaf1 = []
  }

  if (codeNaf1) {
    export const NAF1Letters = [...'ABCDEFGHIJKLMNOPQRSTU'] as const
    NAF1Letters.forEach((NAF1) => {
      const publicodeNAF1Key = 'entreprise . code NAF niveau 1 . est ' + NAF1
      if (NAF1 in questionnaireData.codeNaf1) {
        publicodesData[publicodeNAF1Key] = 'oui'
      } else {
        publicodesData[publicodeNAF1Key] = 'non'
      }
    })
  }

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
