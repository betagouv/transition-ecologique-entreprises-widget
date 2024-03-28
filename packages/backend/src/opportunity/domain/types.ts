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
  programUrl: string
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
