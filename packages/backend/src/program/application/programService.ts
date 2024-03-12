import { Result } from 'true-myth'

import { Program } from '@tee/data/src/type/program'
import ProgramFeatures from '../domain/programFeatures'
import { QuestionnaireData } from '../domain/types'

import ProgramsJson from '../infrastructure/programsJson'
import { currentDateService } from '../infrastructure/currentDate'
import { PublicodesService } from '../infrastructure/publicodesService'

export default class ProgramService {
  private _program: ProgramFeatures

  constructor() {
    const programsService = ProgramsJson.getInstance()
    this._program = new ProgramFeatures(programsService, currentDateService, new PublicodesService(programsService.getAll()))
  }

  public getById(id: string): Program | undefined {
    return this._program.getById(id)
  }

  public getFilteredPrograms(questionnaireData: QuestionnaireData): Result<Program[], Error> {
    return this._program.getFilteredBy(questionnaireData)
  }
}
