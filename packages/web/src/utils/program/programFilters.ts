import {
  Entreprise,
  Objectives,
  ProgramAidType,
  type ProgramData,
  type programFiltersType,
  PublicodesCondition,
  type ValueOf
} from '@/types'

export default class ProgramFilter {
  static filterProgramsByAidType(program: ProgramData, programAidTypeSelected: ProgramAidType) {
    if (!this.isValidFilterValue(programAidTypeSelected)) {
      return true
    }

    return program["nature de l'aide"] === programAidTypeSelected
  }

  static filterProgramsByObjective(program: ProgramData, objectiveTypeSelected: Objectives) {
    if (!this.isValidFilterValue(objectiveTypeSelected)) {
      return true
    }

    if (program.publicodes[Entreprise.hasObjective]) {
      return program.publicodes[Entreprise.hasObjective][PublicodesCondition.oneOfThese].includes(objectiveTypeSelected)
    }

    return true
  }

  static isValidFilterValue(programFilterValue: ValueOf<programFiltersType>) {
    return programFilterValue !== ''
  }
}
