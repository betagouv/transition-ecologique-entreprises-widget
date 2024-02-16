import { Controller, Get, Res, Route, SuccessResponse, TsoaResponse } from 'tsoa'
import { ErrorJSON } from '../../common/controller/jsonError'
import StatisticsService from '../application/statisticsService'
import { Statistics } from '../domain/types'

@SuccessResponse('200', 'OK')
@Route('opportunities')
export class StatisticsController extends Controller {
  /**
   * Request statistics about the opportunities
   */
  @Get('statistics')
  public async get(@Res() requestFailedResponse: TsoaResponse<500, ErrorJSON>): Promise<Statistics> {
    const opportunityResult = await new StatisticsService().get()

    if (opportunityResult.isErr) {
      const err = opportunityResult.error

      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      return requestFailedResponse(500, { message: `Server internal error: ${err.message}` })
    }

    return opportunityResult.value
  }
}
