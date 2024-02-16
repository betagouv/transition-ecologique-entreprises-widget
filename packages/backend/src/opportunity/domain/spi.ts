import type { Maybe, Result } from 'true-myth'
import type { ContactId, OpportunityId, ContactDetails, OpportunityDetails, OpportunityUpdateAttributes, Statistics } from './types'

export type ContactRepository = {
  createOrUpdate: (contact: ContactDetails, optIn: true) => Promise<Result<ContactId, Error>>
}

export type OpportunityRepository = {
  create: (contactId: number, opportunity: OpportunityDetails) => Promise<Result<OpportunityId, Error>>
  update: (dealId: OpportunityId, attributes: OpportunityUpdateAttributes) => Promise<Maybe<Error>>
}

export type StatisticsRepository = {
  get: () => Promise<Result<Statistics, Error>>
}
