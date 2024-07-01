import EstablishmentFeatures from '../domain/establishmentFeatures'
import { getEstablishment } from '../infrastructure/api/sirene/sirene'
import { CityToRegionMappingType, EstablishmentRepository, NafMappingType } from '../domain/spi'
import type { Establishment, Siret } from '../domain/types'
import { Result } from 'true-myth'
import { CityToRegionMapping } from '../infrastructure/json/cityToRegionMapping'
import { NafMapping } from '../infrastructure/json/nafMapping'
import { RechercheEntreprise } from '../infrastructure/api/recherche-entreprise/recherche-entreprise'
import { EstablishmentSearch } from '@tee/common'

export default class EstablishmentService {
  private _establishmentFeatures: EstablishmentFeatures

  constructor() {
    this._establishmentFeatures = new EstablishmentFeatures(
      this._getEstablishmentRepository(),
      this._getCityToRegionMapping(),
      this._getNafMapping()
    )
  }

  public search(query: string): Promise<Result<EstablishmentSearch, Error>> {
    return this._establishmentFeatures.search(query)
  }

  public getBySiret(siret: Siret): Promise<Result<Establishment, Error>> {
    return this._establishmentFeatures.getBySiret(siret)
  }

  private _getEstablishmentRepository(): EstablishmentRepository {
    const rechercheEntreprise = new RechercheEntreprise()
    return { get: getEstablishment, search: rechercheEntreprise.searchEstablishment }
  }

  private _getCityToRegionMapping(): CityToRegionMappingType {
    return new CityToRegionMapping()
  }

  private _getNafMapping(): NafMappingType {
    return new NafMapping()
  }
}
