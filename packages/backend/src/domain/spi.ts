import { Result } from 'true-myth'
import { ContactId } from './types'
import { Establishment } from './establishment/establishmentType'

export type EstablishmentRepository = {
  get: (siret: string) => Promise<Result<Establishment, Error>>
}

export type ContactInfoRepository = {
  add: (email: string, attributes: object) => Promise<Result<ContactId, Error>>
}
