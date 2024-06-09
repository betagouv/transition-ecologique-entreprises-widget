import { Result } from 'true-myth'
import type { CityToRegionMapping, EstablishmentRepository, NafMapping } from './spi'
import { Establishment, EstablishmentDetails, EstablishmentSearch, SearchResult, EstablishmentFront, Siret } from './types'
import Validator from '@tee/common/src/establishment/validator'

export default class EstablishmentFeatures {
  private readonly _establishmentRepository: EstablishmentRepository
  private readonly _cityToRegionMapping: CityToRegionMapping
  private readonly _nafMapping: NafMapping

  constructor(establishmentRepository: EstablishmentRepository, cityToRegionMapping: CityToRegionMapping, nafMapping: NafMapping) {
    this._establishmentRepository = establishmentRepository
    this._cityToRegionMapping = cityToRegionMapping
    this._nafMapping = nafMapping
  }

  public async search(query: string): Promise<Result<EstablishmentSearch, Error>> {
    if (Validator.validateSiret(query)) {
      const bySiretResult = await this._searchBySiret(query)
      if (bySiretResult.isOk) {
        return bySiretResult
      }
    }

    return await this._searchByQuery(query)
  }

  public async getBySiret(siret: Siret): Promise<Result<Establishment, Error>> {
    const establishmentResult: Result<EstablishmentDetails, Error> = await this._establishmentRepository.get(siret)

    if (establishmentResult.isErr) {
      return Result.err(establishmentResult.error)
    }

    let establishment = this._addRegionToEstablishment(establishmentResult.value)
    establishment = this._addSectorDetailsToEstablishment(establishment)

    return Result.ok(establishment)
  }

  private async _searchBySiret(siret: string): Promise<Result<EstablishmentSearch, Error>> {
    const trimmedSiret = String(siret).replace(/[\s]/g, '')

    const resultEstablishment = await this.getBySiret(trimmedSiret)
    if (resultEstablishment.isErr) {
      return Result.err(resultEstablishment.error)
    }
    const establishmentSearch = this._convertEstablishmentToSearch(resultEstablishment.value)
    return Result.ok(establishmentSearch)
  }

  private async _searchByQuery(query: string): Promise<Result<EstablishmentSearch, Error>> {
    const results = await this._establishmentRepository.search(query)
    if (results.isOk) {
      const establishmentsSearch = this._enrichAndConvertToEstablishmentSearch(results.value)
      return Result.ok(establishmentsSearch)
    }
    return Result.err(results.error)
  }

  private _addRegionToEstablishment(establishment: Establishment): Establishment {
    const maybeRegion = this._cityToRegionMapping.getRegion(establishment.address.cityCode)
    if (maybeRegion.isNothing) {
      return establishment
    }
    return { ...establishment, region: maybeRegion.value }
  }

  private _addSectorDetailsToEstablishment(establishment: Establishment): Establishment {
    const code = establishment.nafCode
    const maybeLabel = this._nafMapping.getLabel(code)
    const maybeSectionCode = this._nafMapping.getSectionCode(code)

    if (maybeLabel.isNothing || maybeSectionCode.isNothing) {
      return establishment
    }

    return {
      ...establishment,
      nafLabel: maybeLabel.value,
      nafSectionCode: maybeSectionCode.value
    }
  }

  private _convertEstablishmentToFront(establishment: Establishment): EstablishmentFront {
    return {
      siret: establishment.siret,
      codeNAF: establishment.nafCode,
      codeNAF1: establishment.nafSectionCode || '',
      ville: establishment.address.cityLabel,
      codePostal: establishment.address.zipCode,
      region: establishment.region || '',
      structure_size: undefined,
      denomination: establishment.denomination,
      secteur: establishment.nafLabel || '',
      creationDate: establishment.creationDate
    }
  }

  private _convertEstablishmentToSearch(establishment: Establishment): EstablishmentSearch {
    return {
      resultCount: 1,
      establishments: [this._convertEstablishmentToFront(establishment)]
    }
  }

  private _enrichAndConvertToEstablishmentSearch(result: SearchResult): EstablishmentSearch {
    const transformedEstablishments = result.establishments.map((establishmentDetails) => {
      let establishment = this._addRegionToEstablishment(establishmentDetails)
      establishment = this._addSectorDetailsToEstablishment(establishment)
      return this._convertEstablishmentToFront(establishment)
    })
    return { resultCount: result.resultCount, establishments: transformedEstablishments }
  }
}
