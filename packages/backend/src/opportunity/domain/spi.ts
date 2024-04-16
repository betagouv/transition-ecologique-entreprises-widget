import type { Maybe, Result } from 'true-myth'
import { Program } from '../../program/domain/types/types'
import type { ContactId, OpportunityId, ContactDetails, OpportunityDetails, OpportunityUpdateAttributes, Opportunity } from './types'
import StatsData from '@tee/common/src/stats/types'

export type ContactRepository = {
  createOrUpdate: (contact: ContactDetails, optIn: true) => Promise<Result<ContactId, Error>>
}

export type OpportunityRepository = {
  create: (contactId: number, opportunity: OpportunityDetails) => Promise<Result<OpportunityId, Error>>
  update: (dealId: OpportunityId, attributes: OpportunityUpdateAttributes) => Promise<Maybe<Error>>
  count: () => Promise<Result<number, Error>>
}

export type MailerService = {
  sendReturnReceipt: (opportunity: Opportunity, program: Program) => Promise<Maybe<Error> | void>
}

export type StatisticsRepository = {
  get: () => Promise<Result<StatsData, Error>>
}
