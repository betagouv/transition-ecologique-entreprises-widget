import { QuestionnaireRoute } from '@tee/common/src/questionnaire/types'
import { Entry, setObjectProperty } from '../../src/common/objects'

import { Program, QuestionnaireData } from '../../src/program/domain/types'
import { PublicodesKeys, PublicodesQuestionnaireRoute } from '../../src/program/infrastructure/types'
import { makeProgramHelper, mockCurrentDateService, makeProgramsRepository } from './testing'
import { FILTERING_RULE_NAME } from '../../src/program/domain/filterPrograms'
import { expectToBeOk } from '../testing'
import ProgramFeatures from '../../src/program/domain/programFeatures'
import { publicodesService } from '../../src/program/infrastructure/publicodes'

const makeProgram = (rules: object) => makeProgramHelper({ rules: { ...{ [FILTERING_RULE_NAME]: { valeur: 'oui' } }, ...rules } })

enum DataSources {
  Questionnaire,
  Program,
  CurrentDateService
}

type QuestionnaireInputProperty = {
  inputDataEntry: Entry<QuestionnaireData>
  inputDataSource: DataSources.Questionnaire
}

type ProgramInputProperty = {
  inputDataEntry: Entry<Program>
  inputDataSource: DataSources.Program
}

type CurrentDateInput = {
  currentDate: string
  inputDataSource: DataSources.CurrentDateService
}

type PreprocessingTestCase = (QuestionnaireInputProperty | ProgramInputProperty | CurrentDateInput) & {
  title: string
  publicodesKey: string
  filteringRule: string | { [k: string]: unknown }
  expectedKeep: boolean
}

/** tests that input data for the filtering (either from the questionnaire or from the program), is correctly translated into publicodes by
  confronting a single program to a single rule
 */
const testHelperPreprocessing = (testCase: PreprocessingTestCase) => {
  test(testCase.title, () => {
    const publicodesKey = testCase.publicodesKey
    const publicodesNamespace = publicodesKey.split(' . ')[0]
    const expectedKeep = testCase.expectedKeep

    const fileringRule = testCase.filteringRule

    // namespace (if any) and variable declaration in publicodes
    const publicodesInterface = {
      ...(publicodesNamespace && { [publicodesNamespace]: null }),
      [publicodesKey]: null
    }

    const program = makeProgram({
      ...publicodesInterface,
      [FILTERING_RULE_NAME]: fileringRule
    })

    const questionnaireData: QuestionnaireData = {}
    let testCurrentDateService = mockCurrentDateService // by default

    // Set input data depending on data source
    if (
      testCase.inputDataSource !== DataSources.CurrentDateService &&
      testCase.inputDataEntry !== undefined &&
      testCase.inputDataEntry[1] !== undefined
    ) {
      if (testCase.inputDataSource === DataSources.Questionnaire) {
        setObjectProperty(questionnaireData, testCase.inputDataEntry[0], testCase.inputDataEntry[1])
      }

      if (testCase.inputDataSource === DataSources.Program) {
        const key = testCase.inputDataEntry[0]
        const value = testCase.inputDataEntry[1]
        setObjectProperty(program, key, value)
      }
    }

    if (testCase.inputDataSource === DataSources.CurrentDateService) {
      testCurrentDateService = { get: () => testCase.currentDate }
    }

    const result = new ProgramFeatures(makeProgramsRepository([program]), testCurrentDateService, publicodesService).getFilteredBy(
      questionnaireData
    )

    expectToBeOk(result)

    const expectedLength = expectedKeep ? 1 : 0
    expect(result.value).toHaveLength(expectedLength)
  })
}

describe(`
  GIVEN  questionnaireData with a property "codeNAF"
    AND  a rule that uses "entreprise . code NAF"
   WHEN  the rule is evaluated
 EXPECT  the program is properly kept or filtered out
`, () => {
  const testCodeNaf = (inputCodeNaf: string | undefined, keptCodeNaf: string, expectedKeep: boolean) => {
    testHelperPreprocessing({
      title: 'questionnaire "codeNAF" mapped to literal "entreprise . code NAF"',
      inputDataEntry: ['codeNaf', inputCodeNaf],
      inputDataSource: DataSources.Questionnaire,
      publicodesKey: 'entreprise . code NAF',
      filteringRule: `entreprise . code NAF = "${keptCodeNaf}"`,
      expectedKeep: expectedKeep
    })
  }
  const testCases = [
    {
      inputCodeNaf: '12.34Z',
      keptCodeNaf: '12.34Z',
      expectedKeep: true
    },
    {
      inputCodeNaf: '34.12Z',
      keptCodeNaf: '34.12Z',
      expectedKeep: true
    },
    {
      inputCodeNaf: '11.11Z',
      keptCodeNaf: '99.99Z',
      expectedKeep: false
    },
    {
      inputCodeNaf: undefined,
      keptCodeNaf: '99.99Z',
      expectedKeep: true
    }
  ]

  for (const testCase of testCases) {
    testCodeNaf(testCase.inputCodeNaf, testCase.keptCodeNaf, testCase.expectedKeep)
  }
})

describe(`
  GIVEN  a program with a property "début de validité"
    AND  a rule that uses "dispositif . début de validité"
   WHEN  the rule is evaluated
 EXPECT  the program is properly kept or filtered out
`, () => {
  const testValidityStart = (validityStart: string | undefined, currentDate: string, expectedKeep: boolean) => {
    testHelperPreprocessing({
      title: `"début de validité" mapped to "dispositif . début de validité", (valid since ${validityStart}, current date ${currentDate})`,
      inputDataEntry: ['début de validité', validityStart],
      inputDataSource: DataSources.Program,
      publicodesKey: 'dispositif . début de validité',
      filteringRule: `dispositif . début de validité <= ${currentDate}`,
      expectedKeep: expectedKeep
    })
  }

  const testCases = [
    {
      validityStart: '01/01/2024',
      currentDate: '20/12/2023',
      expectedKeep: false
    },
    {
      validityStart: '01/01/2024',
      currentDate: '02/01/2024',
      expectedKeep: true
    },
    {
      validityStart: '01/01/2024',
      currentDate: '01/01/2024',
      expectedKeep: true
    },
    {
      validityStart: undefined,
      currentDate: '20/12/2024',
      expectedKeep: true
    }
  ]

  testCases.forEach((testCase) => {
    testValidityStart(testCase.validityStart, testCase.currentDate, testCase.expectedKeep)
  })
})

describe(`
  GIVEN  a program with a property "fin de validité"
    AND  a rule that uses "dispositif . fin de validité"
   WHEN  the rule is evaluated
 EXPECT  the program is properly kept or filtered out
`, () => {
  const testValidityEnd = (validityEnd: string | undefined, currentDate: string, expectedKeep: boolean) => {
    testHelperPreprocessing({
      title: `"fin de validité" mapped to "dispositif . fin de validité", (valid until ${validityEnd}, current date ${currentDate})`,
      inputDataEntry: ['fin de validité', validityEnd],
      inputDataSource: DataSources.Program,
      publicodesKey: 'dispositif . fin de validité',
      filteringRule: `${currentDate} <= dispositif . fin de validité`,
      expectedKeep: expectedKeep
    })
  }

  const testCases = [
    {
      validityEnd: '31/12/2023',
      currentDate: '20/12/2023',
      expectedKeep: true
    },
    {
      validityEnd: '31/12/2023',
      currentDate: '01/01/2024',
      expectedKeep: false
    },
    {
      validityEnd: '31/12/2023',
      currentDate: '31/12/2023',
      expectedKeep: true
    },
    {
      validityEnd: undefined,
      currentDate: '01/01/2028',
      expectedKeep: true
    }
  ]

  testCases.forEach((testCase) => {
    testValidityEnd(testCase.validityEnd, testCase.currentDate, testCase.expectedKeep)
  })
})

describe(`
 GIVEN a current date
   AND a program with a rule using "date du jour"
  WHEN evaluating this rule
EXPECT the program to be kept or filtered out as expected`, () => {
  const testCurrentDate = (currentDate: string, keptDate: string, expectedKeep: boolean) => {
    //   `date du jour = ${keptDate}` ne fonctionne pas comme attendu
    // cf https://github.com/publicodes/publicodes/issues/430
    // Contournement:
    const rule = {
      'toutes ces conditions': [`date du jour <= ${keptDate}`, `date du jour >= ${keptDate}`]
    }

    testHelperPreprocessing({
      title: `current date is mapped to "date du jour" (current date ${currentDate}, keep if equal to ${keptDate})`,
      currentDate: currentDate,
      inputDataSource: DataSources.CurrentDateService,
      publicodesKey: 'date du jour',
      filteringRule: rule,
      expectedKeep: expectedKeep
    })
  }

  testCurrentDate('31/12/2023', '31/12/2023', true)
  testCurrentDate('01/12/2023', '31/12/2023', false)
})

describe(`
 GIVEN a questionnaire route
   AND a program with a rule using 'questionnaire . parcours'
  WHEN evaluating the rule
EXPECT recovers the data properly`, () => {
  const testQuestionnaireRoute = (
    questionnaireRoute: QuestionnaireRoute | undefined,
    keptQuestionnaireRoute: PublicodesQuestionnaireRoute,
    expectedKeep: boolean
  ) => {
    const rule = `${PublicodesKeys.QuestionnaireRoute} = ${keptQuestionnaireRoute}`
    testHelperPreprocessing({
      title: `questionnaireRoute (input: "${questionnaireRoute}", keep if converted to "${keptQuestionnaireRoute}")`,
      inputDataEntry: ['questionnaire_route', questionnaireRoute],
      inputDataSource: DataSources.Questionnaire,
      publicodesKey: PublicodesKeys.QuestionnaireRoute,
      filteringRule: rule,
      expectedKeep: expectedKeep
    })
  }

  testQuestionnaireRoute(QuestionnaireRoute.SpecificGoal, PublicodesQuestionnaireRoute.SpecificGoal, true)
  testQuestionnaireRoute(QuestionnaireRoute.NoSpecificGoal, PublicodesQuestionnaireRoute.NoSpecificGoal, true)
  testQuestionnaireRoute(QuestionnaireRoute.SpecificGoal, PublicodesQuestionnaireRoute.NoSpecificGoal, false)
  testQuestionnaireRoute(undefined, PublicodesQuestionnaireRoute.NoSpecificGoal, true)
  testQuestionnaireRoute(undefined, PublicodesQuestionnaireRoute.SpecificGoal, true)
})
