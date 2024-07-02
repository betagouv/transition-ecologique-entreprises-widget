import Engine from 'publicodes'
import { evaluateRule } from './publicodes'
import { Result } from 'true-myth'
import { ensureError } from '../../common/domain/error/errors'
import { ProgramType } from '@tee/data'
import { QuestionnaireData } from '@tee/common'

export class PublicodesService {
  private static instance: PublicodesService

  private readonly _publicodeEngines: Record<string, Engine>

  private constructor(programs: ProgramType[]) {
    this._publicodeEngines = initializePublicodesEngineForAllPrograms(programs)
  }

  public static init(programs: ProgramType[]): void {
    PublicodesService.instance = new PublicodesService(programs)
  }

  public static getInstance(): PublicodesService {
    return PublicodesService.instance
  }

  public evaluate(
    rule: string,
    program: ProgramType,
    questionnaireData: QuestionnaireData,
    currentDate: string
  ): Result<boolean | undefined, Error> {
    const engine = this._publicodeEngines[program.id]
    if (!engine) {
      return Result.err(
        new Error(`Trying to evaluate a rule on a program for
      which the publicodes engine has not been initialized : ${program.id}`)
      )
    }
    return evaluateRule(rule, engine, program, questionnaireData, currentDate)
  }
}

const initializePublicodesEngineForAllPrograms = (programs: ProgramType[]): Record<string, Engine> => {
  return programs.reduce((accu, program) => {
    const engineResult = initializePublicodesEngine(program.publicodes as object)

    if (engineResult.isErr) {
      throw engineResult.error
    }
    accu[program.id] = engineResult.value
    return accu
  }, {} as Record<string, Engine>)
}

const initializePublicodesEngine = (rules: object): Result<Engine, Error> => {
  let engine: Engine
  try {
    engine = new Engine(rules, { strict: { noOrphanRule: false } })
  } catch (e) {
    const err = ensureError(e)
    return Result.err(err)
  }

  return Result.ok(engine)
}
