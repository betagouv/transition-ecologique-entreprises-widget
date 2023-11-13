import { CustomError } from '../types'

export interface Establishment {
  siren: string
  nic: string
  siret: string
  creationDate: string
  denomination: string
  nafCode: string
  address: {
    streetNumber: string
    streetType: string
    streetLabel: string
    zipCode: string
    cityLabel: string
    cityCode: string
  }
}

export class EstablishmentNotFoundError extends CustomError {}
