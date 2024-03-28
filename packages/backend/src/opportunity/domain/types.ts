import { Objectives } from '@tee/web/src/types'
import { QuestionnaireRoute } from '@tee/common/src/questionnaire/types'
import { type Operators } from '@tee/data/src/generated/program'

export interface Opportunity extends ContactDetails, OpportunityDetails {}

export interface ContactDetails {
  firstName: string
  lastName: string
  email: string
  phoneNumber: string
  companySiret: string
  companyName?: string | null
  companySector?: string
  companySize?: number
}

export interface OpportunityDetails {
  programId: string
  programContactOperator?: Operators
  message: string
  questionnaireRoute?: QuestionnaireRoute
  priorityObjectives?: Objectives[]
  sentToOperator?: boolean
  otherData?: string
}

export type OpportunityUpdateAttributes = Required<Pick<OpportunityDetails, 'sentToOperator'>>

export interface ContactId {
  id: number
}

export interface OpportunityId {
  id: string
}

export type DemandsTimeSeries = {
  year: YYYY
  month: MM
  nDemands: number
}[]

export interface Statistics {
  nProgramsActivated: number
  nProgramsUnknownOutcome: number
  nProgramsProposed: number
  demandsTimeSeries: DemandsTimeSeries
}

type MM =
  | '01'
  | '02'
  | '03'
  | '04'
  | '05'
  | '06'
  | '07'
  | '08'
  | '09'
  | '10'
  | '11'
  | '12'
  | '13'
  | '14'
  | '15'
  | '16'
  | '17'
  | '18'
  | '19'
  | '20'
  | '21'
  | '22'
  | '23'
  | '24'
  | '25'
  | '26'
  | '27'
  | '28'
  | '29'
  | '30'
  | '31'

// Beware of the bug of the year 2030
type YYYY = '2023' | '2024' | '2025' | '2026' | '2027' | '2028' | '2029'
