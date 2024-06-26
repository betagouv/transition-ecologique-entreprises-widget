import RequestApi from '@/service/api/requestApi'
import type StatsData from '@tee/common/src/stats/types'

export default class StatApi extends RequestApi<StatsData> {
  protected readonly url = '/api/statistics'
}
