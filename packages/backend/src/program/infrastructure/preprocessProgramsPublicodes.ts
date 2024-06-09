import {
  MobilityStatus,
  Objective,
  PublicodeObjective,
  PublicodesKeys,
  QuestionnaireRoute,
  Sector,
  StructureSize,
  WasteManagementStatus,
  YesNo
} from '@tee/common/src/questionnaire/types'

enum BuildingProperty {
  Owns = 'proprietaire',
  Rents = 'locataire',
  OwnsAndRents = 'proprietaire-et-locataire'
}

import { type Program } from '@tee/data/src/type/program'
import { QuestionnaireData } from '../domain/types/types'
import { type PublicodesInputData, PublicodesQuestionnaireRoute, SectorToNAFSection, NAF1Letters } from './types'

const SizeToWorkforce: { [key in StructureSize]: number } = {
  [StructureSize.EI]: 1,
  [StructureSize.TPE]: 19,
  [StructureSize.PE]: 49,
  [StructureSize.ME]: 249,
  [StructureSize.ETI_GE]: 251
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

  setRegion(publicodesData, questionnaireData)
  setStructureSize(publicodesData, questionnaireData)
  setCodeNAF(publicodesData, questionnaireData)
  setSectors(publicodesData, questionnaireData)
  setObjectives(publicodesData, questionnaireData)
  setQuestionnaireRoute(publicodesData, questionnaireData)
  setDateValidity(publicodesData, programData)

  return publicodesData
}

const setRegion = (publicodesData: PublicodesInputData, questionnaireData: QuestionnaireData) => {
  if (questionnaireData.region) {
    publicodesData['région'] = questionnaireData.region
  }
}
const setStructureSize = (publicodesData: PublicodesInputData, questionnaireData: QuestionnaireData) => {
  if (questionnaireData.structure_size) {
    publicodesData[PublicodesKeys.Workforce] = SizeToWorkforce[questionnaireData.structure_size]
  }
}
const setCodeNAF = (publicodesData: PublicodesInputData, questionnaireData: QuestionnaireData) => {
  if (questionnaireData.codeNAF) {
    publicodesData[PublicodesKeys.CodeNAF] = enquotePublicodesLiteralString(questionnaireData.codeNAF)
  }
}
const setSectors = (publicodesData: PublicodesInputData, questionnaireData: QuestionnaireData) => {
  let codeNAF1s: string[] = []
  if (questionnaireData.codeNAF1) {
    codeNAF1s = [questionnaireData.codeNAF1]
  } else {
    codeNAF1s = SectorToNAFSection[questionnaireData.sector as Sector]
  }

  if (!codeNAF1s) {
    return
  }

  NAF1Letters.forEach((NAF1) => {
    const publicodeNAF1Key = 'entreprise . code NAF niveau 1 . est ' + NAF1
    publicodesData[publicodeNAF1Key] = codeNAF1s.includes(NAF1) ? YesNo.Yes : YesNo.No
  })
}

const setObjectives = (publicodesData: PublicodesInputData, questionnaireData: QuestionnaireData) => {
  if (questionnaireData.priority_objective) {
    // "J'ai un objectif précis en tête"
    for (const objective of Object.values(Objective)) {
      const publicodeObjectiveKey = 'questionnaire . objectif prioritaire . est ' + objective
      publicodesData[publicodeObjectiveKey] = objective == questionnaireData.priority_objective ? YesNo.Yes : YesNo.No
    }
  } else {
    // "Je ne sais pas par où commencer"
    if (questionnaireData.recently_audited == YesNo.Yes) {
      publicodesData[PublicodeObjective.EnvironmentalImpact] = YesNo.No
    } else {
      publicodesData[PublicodeObjective.EnvironmentalImpact] = YesNo.Yes
    }

    if (questionnaireData.wastes_materials_objective == YesNo.No) {
      publicodesData[PublicodeObjective.EcoDesign] = YesNo.No
    } else {
      publicodesData[PublicodeObjective.EcoDesign] = YesNo.Yes
    }

    if (
      questionnaireData.wastes_management_objective == WasteManagementStatus.No ||
      questionnaireData.wastes_management_objective == WasteManagementStatus.NoMax
    ) {
      publicodesData[PublicodeObjective.WasteManagement] = YesNo.No
    } else {
      publicodesData[PublicodeObjective.WasteManagement] = YesNo.Yes
    }

    if (questionnaireData.water_reduction_objective == YesNo.No) {
      publicodesData[PublicodeObjective.WaterConsumption] = YesNo.No
    } else {
      publicodesData[PublicodeObjective.WaterConsumption] = YesNo.Yes
    }

    if (questionnaireData.building_property == BuildingProperty.Rents) {
      publicodesData[PublicodesKeys.BuildingOwner] = YesNo.No
    } else {
      publicodesData[PublicodesKeys.BuildingOwner] = YesNo.Yes
    }

    if (
      questionnaireData.sustainable_mobility_objective == MobilityStatus.No ||
      questionnaireData.sustainable_mobility_objective == MobilityStatus.NoMax
    ) {
      publicodesData[PublicodeObjective.SustainableMobility] = YesNo.No
    } else {
      publicodesData[PublicodeObjective.SustainableMobility] = YesNo.Yes
    }

    if (questionnaireData.energy_reduction_objective == YesNo.No) {
      publicodesData[PublicodeObjective.EnergyPerformance] = YesNo.No
    } else {
      publicodesData[PublicodeObjective.EnergyPerformance] = YesNo.Yes
    }
  }
}
const setQuestionnaireRoute = (publicodesData: PublicodesInputData, questionnaireData: QuestionnaireData) => {
  if (questionnaireData.questionnaire_route) {
    const route = questionnaireData.questionnaire_route
    publicodesData[PublicodesKeys.QuestionnaireRoute] = convertQuestionnaireRoute(route)
  }
}
const setDateValidity = (publicodesData: PublicodesInputData, programData: Program) => {
  if (programData['début de validité']) {
    publicodesData['dispositif . début de validité'] = programData['début de validité']
  }
  if (programData['fin de validité']) {
    publicodesData['dispositif . fin de validité'] = programData['fin de validité']
  }
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
