import RequestApi from '@/service/api/requestApi'
import { Result } from 'true-myth'
import { EstablishmentSearch } from '@tee/common/src/establishement/types'

export default class EstablishmentApi extends RequestApi {
  private readonly url = '/api/establishments/'

  async get(query: string): Promise<Result<EstablishmentSearch, Error>> {
    const url: string = this.url + query
    try {
      const response = await fetch(url)
      return Result.ok((await response.json()) as EstablishmentSearch)
    } catch (error: unknown) {
      return Result.err(error as Error)
    }
  }
}
