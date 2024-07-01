import { Maybe, Result } from 'true-myth'
import { EstablishmentDetails, SearchResult } from './types'

export type EstablishmentRepository = {
  get: (siret: string) => Promise<Result<EstablishmentDetails, Error>>
  search: (query: string) => Promise<Result<SearchResult, Error>>
}

export type CityToRegionMappingType = {
  getRegion: (cityCode: string) => Maybe<string>
}

export type NafMappingType = {
  getLabel: (nafCode: string) => Maybe<string>
  getSectionCode: (nafCode: string) => Maybe<string>
}
