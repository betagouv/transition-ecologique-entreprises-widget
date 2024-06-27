import { Controller, Route, SuccessResponse, TsoaResponse, Res, Example, Get, Path } from 'tsoa'
import EstablishmentService from '../application/establishmentService'
import { EstablishmentNotFoundError, Establishment } from '../domain/types'
import { ErrorJSON, ValidateErrorJSON } from '../../common/controller/jsonError'
import { EstablishmentSearch } from '@tee/common/src/establishment/types'

interface EstablishmentNotFoundErrorJSON {
  message: 'Establishment not found'
}

/**
 * @pattern ^\d{14}$ SIRET should be made of 14 digits
 */
export type Siret = string

const exampleEstablishment = {
  siren: '830141321',
  nic: '00034',
  siret: '83014132100034',
  creationDate: '2021-12-01',
  denomination: 'MULTI',
  nafCode: '62.01Z',
  legalCategory: '5710',
  nafSectionCode: 'A',
  nafLabel: 'Programmation informatique',
  address: {
    streetNumber: '116',
    streetType: 'RUE',
    streetLabel: 'DALAYRAC',
    zipCode: '94120',
    cityLabel: 'FONTENAY-SOUS-BOIS',
    cityCode: '94033'
  },
  region: 'Île-de-France'
}

@SuccessResponse('200', 'OK')
@Route('establishments')
export class SireneController extends Controller {
  /**
   * Retrieve establishments informations used in front end
   * for a single establishment using the SIRENE API if search by SIRET
   * or for up to 3 establishments using the Recherche-entreprise API otherwise.
   * Also return the number of matches found
   *
   * @summary Search for establishments from a query
   *
   * @example requestBody: {"string": "siret, nom, adresse..."}
   */

  @Example<Establishment>(exampleEstablishment)
  @Get('{query}')
  public async getEstablishmentBySiret(
    @Path() query: string,
    @Res() requestFailedResponse: TsoaResponse<500, ErrorJSON>,
    @Res() _validationFailedResponse: TsoaResponse<422, ValidateErrorJSON>,
    @Res() notFoundResponse: TsoaResponse<404, EstablishmentNotFoundErrorJSON>
  ): Promise<EstablishmentSearch> {
    const establishmentResult = await new EstablishmentService().search(query)

    if (establishmentResult.isErr) {
      const err = establishmentResult.error

      if (err instanceof EstablishmentNotFoundError) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
        return notFoundResponse(404, { message: 'Establishment not found' })
      }

      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      return requestFailedResponse(500, { message: `Server internal error` })
    }

    return establishmentResult.value
  }
}
