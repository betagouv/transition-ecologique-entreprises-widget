import { Result } from 'true-myth'

import { Program } from '@tee/data/src/type/program'
import ProgramFeatures from '../domain/programFeatures'
import { QuestionnaireData } from '../domain/types/types'

import ProgramsJson from '../infrastructure/programsJson'
import { currentDateService } from '../infrastructure/currentDate'
import { PublicodesService } from '../infrastructure/publicodesService'
import { Objective } from '@tee/common/src/questionnaire/types'

export default class ProgramService {
  private _program: ProgramFeatures

  public static init(): void {
    PublicodesService.init(ProgramsJson.getInstance().getAll())
  }

  public constructor() {
    const programsService = ProgramsJson.getInstance()
    this._program = new ProgramFeatures(programsService, currentDateService, PublicodesService.getInstance())
  }

  public getById(id: string): Program | undefined {
    return this._program.getById(id)
  }

  public getFilteredPrograms(questionnaireData: QuestionnaireData): Result<Program[], Error> {
    return this._program.getFilteredBy(questionnaireData)
  }

  public getAll(): Program[] {
    return this._program.getAll()
  }

  public getObjectives(id: string): Objective[] {
    return this._program.getObjectives(id)
  }
}
