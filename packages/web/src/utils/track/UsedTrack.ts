import { useUsedTrackStore } from '@/stores/usedTrack'
import {
  MobilityStatus,
  Objective as ObjectiveType,
  QuestionnaireDataEnum,
  QuestionnaireRoute,
  TrackId,
  WasteManagementStatus,
  YesNo
} from '@/types'
import ObjectiveChecker from '@tee/common/src/questionnaire/objectiveChecker'

type QuestionnaireDataReturnType = {
  [QuestionnaireDataEnum.questionnaire_route]: QuestionnaireRoute
  [QuestionnaireDataEnum.priority_objective]: ObjectiveType
  [QuestionnaireDataEnum.sustainable_mobility_objective]: MobilityStatus
  [QuestionnaireDataEnum.energy_reduction_objective]: YesNo
  [QuestionnaireDataEnum.wastes_management_objective]: WasteManagementStatus
  [QuestionnaireDataEnum.water_reduction_objective]: YesNo
  [QuestionnaireDataEnum.wastes_materials_objective]: YesNo
  [QuestionnaireDataEnum.recently_audited]: YesNo
}

export default class UsedTrack {
  static findInQuestionnaireData<K extends keyof QuestionnaireDataReturnType>(trackId: TrackId, key: K): QuestionnaireDataReturnType[K] {
    return useUsedTrackStore().findInQuestionnaireDataByTrackIdAndKey(trackId, key) as QuestionnaireDataReturnType[K]
  }

  static isNoSpecificGoal(): boolean {
    return (
      this.findInQuestionnaireData(TrackId.QuestionnaireRoute, QuestionnaireDataEnum.questionnaire_route) ===
      QuestionnaireRoute.NoSpecificGoal
    )
  }

  static isSpecificGoal(): boolean {
    return (
      this.findInQuestionnaireData(TrackId.QuestionnaireRoute, QuestionnaireDataEnum.questionnaire_route) ===
      QuestionnaireRoute.SpecificGoal
    )
  }

  static getPriorityObjective(): ObjectiveType {
    return this.findInQuestionnaireData(TrackId.Goals, QuestionnaireDataEnum.priority_objective)
  }

  static hasPriorityObjective(): boolean {
    return this.findInQuestionnaireData(TrackId.Goals, QuestionnaireDataEnum.priority_objective) !== undefined
  }

  static isMobilityObjective(): boolean {
    return ObjectiveChecker.isSustainableMobility(
      this.findInQuestionnaireData(TrackId.MobilityWishes, QuestionnaireDataEnum.sustainable_mobility_objective)
    )
  }

  static isEnergyObjective(): boolean {
    return ObjectiveChecker.isEnergyPerformance(
      this.findInQuestionnaireData(TrackId.EnergyReductionPriority, QuestionnaireDataEnum.energy_reduction_objective)
    )
  }

  static isWasteObjective(): boolean {
    return ObjectiveChecker.isWasteManagement(
      this.findInQuestionnaireData(TrackId.WastesStake, QuestionnaireDataEnum.wastes_management_objective)
    )
  }

  static isWaterObjective(): boolean {
    return ObjectiveChecker.isWaterConsumption(
      this.findInQuestionnaireData(TrackId.WaterStake, QuestionnaireDataEnum.water_reduction_objective)
    )
  }

  static isEcoDesignObjective(): boolean {
    return ObjectiveChecker.isEcoDesign(
      this.findInQuestionnaireData(TrackId.WastesMaterials, QuestionnaireDataEnum.wastes_materials_objective)
    )
  }

  static isEnvironmentalImpactObjective(): boolean {
    return ObjectiveChecker.isEnvironmentalImpact(
      this.findInQuestionnaireData(TrackId.StrategyAudits, QuestionnaireDataEnum.recently_audited)
    )
  }
}
