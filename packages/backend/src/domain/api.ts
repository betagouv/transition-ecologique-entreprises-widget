import { Result } from 'true-myth'
import { ContactId } from './types'

export type postNewContact = (
  email: string,
  attributes: object
) => Promise<Result<ContactId, Error>>
