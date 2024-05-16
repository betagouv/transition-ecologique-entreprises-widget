import RequestApi from '@/service/api/requestApi'
import { Result } from 'true-myth'
import { EstablishmentSearch } from '@/types'

export default class EstablishmentApi extends RequestApi {
  private readonly url = '/api/establishments/'

  async get(query: string): Promise<Result<EstablishmentSearch, Error>> {
    const url: string = this.url + query
    try {
      const response = await fetch(url)
      if (!response.ok) {
        console.log(`HTTP Error in establishement search API, ${response.status} - ${response.statusText}`)
        return Result.err(new Error())
      }
      return Result.ok((await response.json()) as EstablishmentSearch)
    } catch (error: unknown) {
      return Result.err(error as Error)
    }
  }
}
