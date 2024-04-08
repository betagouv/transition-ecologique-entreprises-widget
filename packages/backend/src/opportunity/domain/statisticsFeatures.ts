import { Result } from 'true-myth'

import { Statistics } from './types'
import { OpportunityRepository } from './spi'

export default class StatisticsFeatures {
  private readonly _opportunityRepository: OpportunityRepository

  constructor(opportunityRepository: OpportunityRepository) {
    this._opportunityRepository = opportunityRepository
  }

  async computeStatistics(): Promise<Result<Statistics, Error>> {
    await new Promise((res) => setTimeout(res, 100))

    const nOpportunitiesCreated = await this.getOpportunitiesCreated()

    const fakeStatistics: Statistics = {
      nProgramsActivated: null,
      nOpportunitiesCreated: nOpportunitiesCreated,
      nProgramsProposed: 110,
      demandsTimeSeries: [
        { year: '2023', month: '06', nDemands: 1 },
        { year: '2023', month: '07', nDemands: 4 },
        { year: '2023', month: '08', nDemands: 5 },
        { year: '2024', month: '09', nDemands: 16 },
        { year: '2024', month: '10', nDemands: 7 },
        { year: '2023', month: '11', nDemands: 72 },
        { year: '2023', month: '12', nDemands: 443 },
        { year: '2024', month: '01', nDemands: 164 },
        { year: '2024', month: '02', nDemands: 110 },
        { year: '2024', month: '03', nDemands: 85 },
        { year: '2024', month: '04', nDemands: 24 }
      ]
    }

    return Result.ok(fakeStatistics)
  }

  async getOpportunitiesCreated(): Promise<number | null> {
    const countResult = await this._opportunityRepository.count()

    if (countResult.isOk) {
      return countResult.value
    }

    return null
  }
}
