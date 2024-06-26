import CustomError from '../../common/domain/error/customError'

export type Siret = string

export interface Establishment extends EstablishmentDetails, GeographicDetails, SectorDetails {}

export interface EstablishmentDetails {
  siren: string
  nic: string
  siret: string
  creationDate: string
  denomination: string
  legalCategory: string
  nafCode: string
  address: {
    streetNumber: string
    streetType: string
    streetLabel: string
    zipCode: string
    cityLabel: string
    // Code officiel géographique de l'INSEE
    // https://www.insee.fr/fr/information/2560452
    cityCode: string
  }
}

export interface GeographicDetails {
  region?: string
}

export interface SectorDetails {
  nafSectionCode?: string
  nafLabel?: string
}

export class EstablishmentNotFoundError extends CustomError {}

export { EstablishmentSearch, default as EstablishmentFront } from '@tee/common/src/establishment/types'

export interface SearchResult {
  resultCount: number
  establishments: EstablishmentDetails[]
}
