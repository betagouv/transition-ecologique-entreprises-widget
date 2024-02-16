import { Result } from 'true-myth'
import { Statistics } from '../domain/types'
import { StatisticsRepository } from '../domain/spi'

const fakeStatistics: Statistics = {
  nProgramsActivated: 0,
  nProgramsUnknownOutcome: 532,
  nProgramsProposed: 532,
  demandsTimeSeries: [
    { year: '2023', month: '10', nDemands: 150 },
    { year: '2023', month: '11', nDemands: 123 },
    { year: '2023', month: '12', nDemands: 65 },
    { year: '2024', month: '01', nDemands: 110 },
    { year: '2024', month: '02', nDemands: 100 }
  ]
}

const fakeStatisticsRepository: StatisticsRepository = {
  get: async () => Result.ok(fakeStatistics)
}

export default class StatisticsService {
  public async get(): Promise<Result<Statistics, Error>> {
    return Promise.resolve(this._getStatisticsRepository().get())
  }

  private _getStatisticsRepository(): StatisticsRepository {
    return fakeStatisticsRepository
  }
}
