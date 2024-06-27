import { Program, QuestionnaireData } from './types/types'
import { CurrentDateProvider, ProgramRepository, RulesManager } from './spi'
import { filterPrograms } from './filterPrograms'
import { sortPrograms } from './sortPrograms'
import { Result } from 'true-myth'

export default class ProgramFeatures {
  private _programRepository: ProgramRepository
  private _currentDateService: CurrentDateProvider | undefined
  private _rulesService: RulesManager | undefined

  constructor(
    programRepository: ProgramRepository,
    currentDateService: CurrentDateProvider | undefined = undefined,
    rulesService: RulesManager | undefined = undefined
  ) {
    this._programRepository = programRepository
    this._currentDateService = currentDateService
    this._rulesService = rulesService
  }

  public getById(id: string): Program | undefined {
    return this._programRepository.getById(id)
  }

  public getFilteredBy(questionnaireData: QuestionnaireData): Result<Program[], Error> {
    const allPrograms = this._programRepository.getAll()
    if (!this._currentDateService || !this._rulesService) {
      return Result.err(new Error('currentDateService and rulesService should be defined to filter programs'))
    }

    let filteredPrograms = filterPrograms(allPrograms, questionnaireData, this._currentDateService.get(), this._rulesService)
    const route = questionnaireData.questionnaire_route
    if (route) {
      filteredPrograms = filteredPrograms.map((programs) => sortPrograms(programs, route))
    }
    return filteredPrograms
  }

  public getAll(): Program[] {
    return this._programRepository.getAll()
  }
}
