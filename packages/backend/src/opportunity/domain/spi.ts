import type { Maybe, Result } from 'true-myth'
import { Program } from '../../program/domain/types'
import type { ContactId, OpportunityId, ContactDetails, OpportunityDetails, OpportunityUpdateAttributes, Opportunity } from './types'

export type ContactRepository = {
  createOrUpdate: (contact: ContactDetails, optIn: true) => Promise<Result<ContactId, Error>>
}

export type OpportunityRepository = {
  create: (contactId: number, opportunity: OpportunityDetails) => Promise<Result<OpportunityId, Error>>
  update: (dealId: OpportunityId, attributes: OpportunityUpdateAttributes) => Promise<Maybe<Error>>
}

export type MailRepository = {
  sendReturnReceipt: (opportunity: Opportunity, program: Program) => Promise<Result<void, Error>>
}
