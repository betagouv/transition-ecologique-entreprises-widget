import { QuestionnaireRoute, PublicodeObjective } from '@tee/common/src/questionnaire/types/types'

export type ProjectOpportunity = ContactDetails & ProjectDetails

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

export interface ProjectDetails {
  projectId: number
  linkToProjectPage: string
  message: string
  questionnaireRoute?: QuestionnaireRoute
  priorityObjectives?: PublicodeObjective[]
  otherData?: string
}

export interface ProjectUpdateAttributes {
  sentToOperator: boolean
}

export interface ContactId {
  id: number
}
