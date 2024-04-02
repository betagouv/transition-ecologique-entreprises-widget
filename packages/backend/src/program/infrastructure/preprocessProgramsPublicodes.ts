import {
  QuestionnaireRoute,
  SizeToWorkforce,
  WastePriority,
  Sector,
  StructureSize,
  YesNo,
  BuildingProperty,
  PublicodeObjectives,
  PublicodesKeys,
  Objective,
  MobilityPriority
} from '../../../../common/src/questionnaire/types'
import { type QuestionnaireData, Program } from '../domain/types'
import { type PublicodesInputData, PublicodesQuestionnaireRoute, SectorToNAFSection, NAF1Letters } from './types'

/** preprocesses the data gathered from the questionnaire into variables
 * needed by publicodes */
export const preprocessInputForPublicodes = (
  questionnaireData: QuestionnaireData,
  programData: Program,
  currentDate: string
): PublicodesInputData => {
  const publicodesData: PublicodesInputData = {
    ...questionnaireData,
    [PublicodesKeys.CurrentDate]: currentDate,
    [PublicodesKeys.Workforce]: SizeToWorkforce[questionnaireData.structure_size as StructureSize]
  }

  if (questionnaireData.siret) publicodesData[PublicodesKeys.CodeNAF] = enquotePublicodesLiteralString(questionnaireData.codeNAF as string)
  publicodesData

  if (questionnaireData.siret?.length == 14) {
    const codeNAF1 = questionnaireData.codeNAF1 as string
    // if we have the exact section value from the SIREN database
    // we put one value to Oui and all the others to No
    NAF1Letters.forEach((NAF1) => {
      const publicodeNAF1Key = 'entreprise . code NAF niveau 1 . est ' + NAF1
      publicodesData[publicodeNAF1Key] = codeNAF1 == NAF1 ? 'oui' : 'non'
    })
  } else {
    // if we have the section value from the sector,
    // we put some value to Oui as they are probable
    // but we don't put any value to No as we are not certain they are false.
    const sector = questionnaireData.sector as Sector
    SectorToNAFSection[sector].map((NAF1) => {
      const publicodeNAF1Key = 'entreprise . code NAF niveau 1 . est ' + NAF1
      publicodesData[publicodeNAF1Key] = 'oui'
    })
    // at the same time, we add a "sector entry" that filter a lot of programs
    // and that doesn't exists using the siret...
    for (const sector of Object.values(Sector)) {
      const sectorKey = "entreprise . secteur d'activité . est " + sector
      publicodesData[sectorKey] = sector == questionnaireData.sector ? 'oui' : 'non'
    }
    publicodesData['secteur'] = questionnaireData.sector
  }

  if (questionnaireData.priority_objective) {
    // priority objective = 1 objective to 'oui',
    // all the others to 'non'
    for (const objective of Object.values(Objective)) {
      const publicodeObjectiveKey = 'questionnaire . objectif prioritaire . est ' + objective
      publicodesData[publicodeObjectiveKey] = objective == questionnaireData.priority_objective ? 'oui' : 'non'
    }
  } else {
    // here we set an objective only if we have specific data about this objectif
    // at least this would be logical.
    // right now we are strictly encoding the previous logic
    // which vary from objective to objective.

    if (questionnaireData.strategy_audits == YesNo.Yes) {
      publicodesData[PublicodeObjectives.EnvironmentalImpact] = YesNo.No
    } else {
      publicodesData[PublicodeObjectives.EnvironmentalImpact] = YesNo.Yes
    }

    if (questionnaireData.wastes_materials_priority == YesNo.No) {
      publicodesData[PublicodeObjectives.EcoDesign] = YesNo.No
    } else {
      publicodesData[PublicodeObjectives.EcoDesign] = YesNo.Yes
    }

    if (questionnaireData.wastes_priority == WastePriority.No || questionnaireData.wastes_priority == WastePriority.NoMax) {
      publicodesData[PublicodeObjectives.WasteManagement] = YesNo.No
    } else {
      publicodesData[PublicodeObjectives.WasteManagement] = YesNo.Yes
    }

    if (questionnaireData.water_priority == YesNo.No) {
      publicodesData[PublicodeObjectives.WaterConsumption] = YesNo.No
    } else {
      publicodesData[PublicodeObjectives.WaterConsumption] = YesNo.Yes
    }

    if (questionnaireData.structure_building_property == BuildingProperty.Rents) {
      publicodesData[PublicodesKeys.BuildingOwner] = YesNo.No
    } else {
      publicodesData[PublicodesKeys.BuildingOwner] = YesNo.Yes
    }
    if (
      questionnaireData.sustainable_mobility_priority == MobilityPriority.No ||
      questionnaireData.sustainable_mobility_priority == MobilityPriority.NoMax
    ) {
      publicodesData[PublicodeObjectives.SustainableMobility] = YesNo.No
    } else {
      publicodesData[PublicodeObjectives.SustainableMobility] = YesNo.Yes
    }
  }

  const route = questionnaireData.questionnaire_route
  publicodesData[PublicodesKeys.QuestionnaireRoute] = convertQuestionnaireRoute(route)

  if (programData['début de validité']) {
    publicodesData['dispositif . début de validité'] = programData['début de validité']
  }
  if (programData['fin de validité']) {
    publicodesData['dispositif . fin de validité'] = programData['fin de validité']
  }

  publicodesData['région'] = questionnaireData.region

  console.log(publicodesData)
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
