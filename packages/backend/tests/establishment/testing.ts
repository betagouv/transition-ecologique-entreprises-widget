import { Maybe, Result } from 'true-myth'
import { NafMapping, type EstablishmentRepository } from '../../src/establishment/domain/spi'
import { type COG2023Mapping } from '../../src/establishment/infrastructure/json/cityToRegionMapping'

const testEstablishment = {
  siren: '830141321',
  nic: '00034',
  siret: '83014132100034',
  creationDate: '2021-12-01',
  denomination: 'MULTI',
  nafCode: '62.01Z',
  legalCategory: '5710',
  address: {
    streetNumber: '116',
    streetType: 'RUE',
    streetLabel: 'DALAYRAC',
    zipCode: '94120',
    cityLabel: 'FONTENAY-SOUS-BOIS',
    cityCode: '94033'
  }
}

const searchResult = {
  resultCount: 1,
  establishments: [testEstablishment]
}

export const dummyEstablishmentRepository: EstablishmentRepository = {
  get: (_siret: string) => Promise.resolve(Result.ok(testEstablishment)),
  search: (_siret: string) => Promise.resolve(Result.ok(searchResult))
}

export const nothingRegionMapping: COG2023Mapping = {
  getRegion: (_cityCode: string) => Maybe.nothing<string>()
}

export const nothingNafMapping: NafMapping = {
  getLabel: (_nafCode: string) => Maybe.nothing<string>(),
  getSectionCode: (_nafCode: string) => Maybe.nothing<string>()
}
