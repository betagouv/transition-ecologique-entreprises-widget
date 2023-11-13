import { Body, Controller, Post, Route, SuccessResponse, TsoaResponse, Res, Example } from 'tsoa'
import { createEstablishmentFeatures } from '../domain/features'
import { EstablishmentRepository } from '../domain/spi'
import {
  EstablishmentNotFoundError,
  Establishment
} from '../domain/establishment/establishmentType'
import { getEstablishment } from '../infrastructure/sireneAPI'
import { ErrorJSON, ValidateErrorJSON } from './types'
import { CustomError } from '../domain/types'

/**
 * Defines how to access external data services.
 * Uses the "Repository" pattern, see README.md
 */
const establishmentRepository: EstablishmentRepository = {
  get: getEstablishment
}

interface EstablishmentNotFoundErrorJSON {
  message: 'Establishment not found'
}

interface SiretBody {
  /**
   * @pattern ^\d{14}$ SIRET should be made of 14 digits
   */
  siret: string
}

const exampleEstablishment = {
  siren: '830141321',
  nic: '00034',
  siret: '83014132100034',
  creationDate: '2021-12-01',
  denomination: 'MULTI',
  nafCode: '62.01Z',
  address: {
    streetNumber: '116',
    streetType: 'RUE',
    streetLabel: 'DALAYRAC',
    zipCode: '94120',
    cityLabel: 'FONTENAY-SOUS-BOIS',
    cityCode: '94033'
  }
}

@SuccessResponse('200', 'OK')
@Route('insee')
export class SireneController extends Controller {
  /**
   * Retrieves information of an Establishment ("Établissement").
   * Supply the SIRET and receive the corresponding establishment details.
   *
   * @summary Retrieves information of an "Établissement"
   *
   * @example requestBody: {"siret": "83014132100034"}
   */

  @Example<Establishment>(exampleEstablishment)
  @Post('get_by_siret')
  public async getEstablishmentBySiret(
    @Body() requestBody: SiretBody,
    @Res() requestFailedResponse: TsoaResponse<500, ErrorJSON>,
    @Res() _validationFailedResponse: TsoaResponse<422, ValidateErrorJSON>,
    @Res() notFoundResponse: TsoaResponse<404, EstablishmentNotFoundErrorJSON>
  ): Promise<Establishment> {
    const requestedSiret = requestBody.siret

    const feat = createEstablishmentFeatures(establishmentRepository)
    const establishmentResult = await feat.fetchEstablishment(requestedSiret)

    if (establishmentResult.isErr) {
      return this.handleError(establishmentResult.error, notFoundResponse, requestFailedResponse)
    }

    return establishmentResult.value
  }

  private handleError(
    err: CustomError,
    notFoundResponse: TsoaResponse<404, EstablishmentNotFoundErrorJSON>,
    requestFailedResponse: TsoaResponse<500, ErrorJSON>
  ) {
    if (err instanceof EstablishmentNotFoundError) {
      return notFoundResponse(404, { message: 'Establishment not found' })
    }

    return requestFailedResponse(500, { message: `Server internal error` })
  }
}
