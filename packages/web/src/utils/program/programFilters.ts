import {
  PublicodesKeys,
  PublicodeObjective,
  ProgramAidType,
  Region,
  ProgramOperatorType,
  type ProgramData,
  type programFiltersType,
  PublicodesCondition,
  type ValueOf
} from '@/types'

export default class ProgramFilter {
  static filterProgramsByAidType(program: ProgramData, programAidTypesSelected: ProgramAidType[]) {
    if (!this.isValidFilterValues(programAidTypesSelected)) {
      return true
    }
    return programAidTypesSelected.includes(program["nature de l'aide"])
  }
  static filterProgramsByRegion(program: ProgramData, regionsSelected: Region[]) {
    if (!this.isValidFilterValues(regionsSelected)) {
      return true
    }
    const geoSectors = program["conditions d'éligibilité"]['secteur géographique']
      .map((regionString: string) => regionString.split(', '))
      .flat()

    if (geoSectors.includes("France et territoires d'outre-mer")) {
      return true
    }
    const matchingRegions = regionsSelected.filter((regionString: Region) => geoSectors.includes(regionString))
    return matchingRegions.length > 0
  }

  static filterProgramsByOperator(program: ProgramData, programOperatorsSelected: ProgramOperatorType[]) {
    if (!this.isValidFilterValues(programOperatorsSelected)) {
      return true
    }
    const matchingOperators = programOperatorsSelected.filter((operator: ProgramOperatorType) =>
      program['opérateur de contact'].includes(operator)
    )
    return matchingOperators.length > 0
  }

  static filterProgramsByObjective(program: ProgramData, objectiveTypeSelected: PublicodeObjective) {
    if (!this.isValidFilterValue(objectiveTypeSelected)) {
      return true
    }

    if (program.publicodes[PublicodesKeys.hasObjective]) {
      return program.publicodes[PublicodesKeys.hasObjective][PublicodesCondition.oneOfThese].includes(objectiveTypeSelected)
    }

    return true
  }

  static isValidFilterValue(programFilterValue: ValueOf<programFiltersType>) {
    return programFilterValue !== ''
  }

  static isValidFilterValues(programFilterValue: ValueOf<programFiltersType>) {
    return programFilterValue.length > 0
  }
}
