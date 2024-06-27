import type { Maybe, Result } from 'true-myth'
import { Program } from '../../program/domain/types/types'
import type { ContactId, OpportunityId, ContactDetails, OpportunityDetails, OpportunityUpdateAttributes, Opportunity } from './types'

export type ContactRepository = {
  createOrUpdate: (contact: ContactDetails, optIn: true) => Promise<Result<ContactId, Error>>
}

export type OpportunityRepository = {
  create: (contactId: number, opportunity: OpportunityDetails) => Promise<Result<OpportunityId, Error>>
  update: (dealId: OpportunityId, attributes: OpportunityUpdateAttributes) => Promise<Maybe<Error>>
  readDates: () => Promise<Result<Date[], Error>>
}

export type MailerManager = {
  sendReturnReceipt: (opportunity: Opportunity, program: Program) => Promise<Maybe<Error> | void>
}
