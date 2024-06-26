import { Result } from 'true-myth'
import { Program, QuestionnaireData } from './types/types'
import { RulesManager } from './spi'

/** Expected rule to evaluate if a program should be displayed to the user or
 * filtered out (in a program's `publicodes`
 * property).
 *  @constant
 *  @default
 */
export const FILTERING_RULE_NAME = 'entreprise . est ciblée'

/** Filter out programs for which the company is not eligible
 *
 * @returns Programs from `programs` that are either eligible (rules evaluate
 *   to `true`) or which eligibility cannot be assessed (rules evaluate to
 *   `undefined`, for instance with missing data)
 */
export const filterPrograms = (
  programs: Program[],
  inputData: QuestionnaireData,
  currentDate: string,
  rulesService: RulesManager
): Result<Program[], Error> => {
  const filteredPrograms: Program[] = []

  for (const program of programs) {
    const evaluation = rulesService.evaluate(FILTERING_RULE_NAME, program, inputData, currentDate)

    if (evaluation.isErr) {
      return Result.err(addErrorDetails(evaluation.error, program.id))
    }

    if (shouldKeepProgram(evaluation)) {
      filteredPrograms.push(program)
    }
  }

  return Result.ok(filteredPrograms)
}

const addErrorDetails = (err: Error, programName: string): Error => {
  return new Error(`Evaluation of rule failed on program with id ${programName}`, {
    cause: err
  })
}

const shouldKeepProgram = (evaluation: Result<boolean | undefined, Error>): boolean => {
  const isPositive = evaluation.isOk && evaluation.value
  const isUndefined = evaluation.isOk && typeof evaluation.value === 'undefined'

  return isPositive || isUndefined
}
