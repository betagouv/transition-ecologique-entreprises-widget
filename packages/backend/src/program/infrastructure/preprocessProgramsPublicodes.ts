import { QuestionnaireRoute } from '../../../../common/src/questionnaire/types'
import { type QuestionnaireData, Program } from '../domain/types'
import { type PublicodesInputData, PublicodesKeys, PublicodesQuestionnaireRoute } from './types'

export enum Sector {
  Craftsmanship = 'artisanat',
  Industry = 'industrie',
  Tourism = 'tourisme',
  Tertiary = 'tertiaire',
  Agriculture = 'agriculture',
  Other = 'autre secteur'
}

// const SectorActivityPrefix = ""

// export enum EntrepriseSector {
//   Craftsmanship = SectorActivityPrefix + Sector.Craftsmanship,
//   Industry = SectorActivityPrefix + Sector.Industry,
//   Tourism = SectorActivityPrefix + Sector.Tourism,
//   Tertiary = SectorActivityPrefix + Sector.Tertiary,
//   Agriculture = SectorActivityPrefix + Sector.Agriculture,
//   Other = SectorActivityPrefix + Sector.Other
// }


export const SectorByNAF = {
  [Sector.Craftsmanship]: ['C', 'F', 'G'],
  [Sector.Industry]: ['B', 'C', 'D', 'E'],
  [Sector.Tourism]: ['I'],
  [Sector.Tertiary]: ['G', 'H', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U'],
  [Sector.Agriculture]: ['A'],
  [Sector.Other]: ['D', 'E', 'F', 'H', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U']
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

  let codeNaf1Consolidated: string[]

  if (questionnaireData.secteur) {
    codeNaf1Consolidated = SectorByNAF[questionnaireData.secteur]
  } else if (questionnaireData.codeNAF1) {
    codeNaf1Consolidated = [questionnaireData.codeNAF1]
  } else {
    // TOFIX
    // Should never happen
    // Update the QuestionnaireData type accordingly
    codeNaf1Consolidated = []
  }

  if (codeNaf1Consolidated) {
    const NAF1Letters = [...'ABCDEFGHIJKLMNOPQRSTU'] as const
    NAF1Letters.forEach((NAF1) => {
      const publicodeNAF1Key = 'entreprise . code NAF niveau 1 . est ' + NAF1
      if (NAF1 in codeNaf1Consolidated) {
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
