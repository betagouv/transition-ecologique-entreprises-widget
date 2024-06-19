import type StatsData from '@tee/common/src/stats/types'
import { Result } from 'true-myth'

export default class StatApi {
  protected readonly url = '/api/statistics'

  async get(): Promise<Result<StatsData, Error>> {
    try {
      const response = await fetch(this.url)
      return Result.ok((await response.json()) as StatsData)
    } catch (error: unknown) {
      return Result.err(error as Error)
    }
  }
}
