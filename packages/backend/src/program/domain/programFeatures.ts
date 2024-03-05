import { Program } from '@tee/data/src/type/program'
import { CurrentDateService, ProgramRepository } from './spi'
import { QuestionnaireData } from './types'
import { filterPrograms } from './filterPrograms'
import { sortPrograms } from './sortPrograms'
import { Result } from 'true-myth'

export default class ProgramFeatures {
  private _programRepository: ProgramRepository
  private _currentDateService: CurrentDateService

  constructor(programRepository: ProgramRepository, currentDateService: CurrentDateService) {
    this._programRepository = programRepository
    this._currentDateService = currentDateService
  }

  public getById(id: string): Program | undefined {
    return this._programRepository.getById(id)
  }

  public getFilteredBy(questionnaireData: QuestionnaireData): Result<Program[], Error> {
    const allPrograms = this._programRepository.getAll()
    let filteredPrograms = filterPrograms(allPrograms, questionnaireData, this._currentDateService.get())
    const route = questionnaireData.questionnaire_route
    if (route) {
      filteredPrograms = filteredPrograms.map((programs) => sortPrograms(programs, route))
    }
    return filteredPrograms
  }
}
