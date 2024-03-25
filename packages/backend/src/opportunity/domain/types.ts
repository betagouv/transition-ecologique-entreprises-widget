import { Objectives } from '@tee/common/src/questionnaire/types'
import { QuestionnaireRoute } from '@tee/common/src/questionnaire/types'
import { type Operators } from '@tee/data/src/generated/program'

export interface Opportunity extends ContactDetails, OpportunityDetails {}

export enum Questionnaire {
  priorityObjective = 'questionnaire . objectif prioritaire . est '
}
export enum PublicodeObjectives {
  EnvironmentalImpact = Questionnaire.priorityObjective + Objectives.EnvironmentalImpact,
  EnergyPerformance = Questionnaire.priorityObjective + Objectives.EnergyPerformance,
  WaterConsumption = Questionnaire.priorityObjective + Objectives.WaterConsumption,
  BuildingRenovation = Questionnaire.priorityObjective + Objectives.BuildingRenovation,
  SustainableMobility = Questionnaire.priorityObjective + Objectives.SustainableMobility,
  WasteManagement = Questionnaire.priorityObjective + Objectives.WasteManagement,
  EcoDesign = Questionnaire.priorityObjective + Objectives.EcoDesign,
  TrainOrRecruit = Questionnaire.priorityObjective + Objectives.TrainOrRecruit,
  MakeSavings = Questionnaire.priorityObjective + Objectives.MakeSavings,
  DurablyInvest = Questionnaire.priorityObjective + Objectives.DurablyInvest,
  UnknownYet = Questionnaire.priorityObjective + Objectives.UnknownYet
}

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
  priorityObjectives?: PublicodeObjectives[]
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
