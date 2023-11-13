import { Body, Controller, Post, Route, SuccessResponse, TsoaResponse, Res, Example } from 'tsoa'
import { createEtablissementFeatures } from '../domain/features'
import { EtablissementRepository } from '../domain/spi'
import {
  EstablishmentNotFoundError,
  Establishment
} from '../domain/establishment/establishmentType'
import { getEtablissement } from '../infrastructure/sirene-API'
import { ErrorJSON, ValidateErrorJSON } from './types'

/**
 * Defines how to access external data services.
 * Uses the "Repository" pattern, see README.md
 */
const etablissementRepository: EtablissementRepository = {
  get: getEtablissement
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

const exampleEtablissement = {
  siren: '830141321',
  nic: '00034',
  siret: '83014132100034',
  statutDiffusionEtablissement: 'O',
  dateCreationEtablissement: '2021-12-01',
  trancheEffectifsEtablissement: null,
  anneeEffectifsEtablissement: null,
  activitePrincipaleRegistreMetiersEtablissement: null,
  dateDernierTraitementEtablissement: '2022-05-07T13:11:04',
  etablissementSiege: true,
  nombrePeriodesEtablissement: 1,
  uniteLegale: {
    etatAdministratifUniteLegale: 'A',
    statutDiffusionUniteLegale: 'O',
    dateCreationUniteLegale: '2017-06-01',
    categorieJuridiqueUniteLegale: '5710',
    denominationUniteLegale: 'MULTI',
    sigleUniteLegale: null,
    denominationUsuelle1UniteLegale: null,
    denominationUsuelle2UniteLegale: null,
    denominationUsuelle3UniteLegale: null,
    sexeUniteLegale: null,
    nomUniteLegale: null,
    nomUsageUniteLegale: null,
    prenom1UniteLegale: null,
    prenom2UniteLegale: null,
    prenom3UniteLegale: null,
    prenom4UniteLegale: null,
    prenomUsuelUniteLegale: null,
    pseudonymeUniteLegale: null,
    activitePrincipaleUniteLegale: '62.01Z',
    nomenclatureActivitePrincipaleUniteLegale: 'NAFRev2',
    identifiantAssociationUniteLegale: null,
    economieSocialeSolidaireUniteLegale: 'N',
    societeMissionUniteLegale: 'N',
    caractereEmployeurUniteLegale: 'N',
    trancheEffectifsUniteLegale: '02',
    anneeEffectifsUniteLegale: '2020',
    nicSiegeUniteLegale: '00034',
    dateDernierTraitementUniteLegale: '2022-08-29T10:18:51',
    categorieEntreprise: 'PME',
    anneeCategorieEntreprise: '2020'
  },
  adresseEtablissement: {
    complementAdresseEtablissement: null,
    numeroVoieEtablissement: '116',
    indiceRepetitionEtablissement: null,
    typeVoieEtablissement: 'RUE',
    libelleVoieEtablissement: 'DALAYRAC',
    codePostalEtablissement: '94120',
    libelleCommuneEtablissement: 'FONTENAY-SOUS-BOIS',
    libelleCommuneEtrangerEtablissement: null,
    distributionSpecialeEtablissement: null,
    codeCommuneEtablissement: '94033',
    codeCedexEtablissement: null,
    libelleCedexEtablissement: null,
    codePaysEtrangerEtablissement: null,
    libellePaysEtrangerEtablissement: null
  },
  adresse2Etablissement: {
    complementAdresse2Etablissement: null,
    numeroVoie2Etablissement: null,
    indiceRepetition2Etablissement: null,
    typeVoie2Etablissement: null,
    libelleVoie2Etablissement: null,
    codePostal2Etablissement: null,
    libelleCommune2Etablissement: null,
    libelleCommuneEtranger2Etablissement: null,
    distributionSpeciale2Etablissement: null,
    codeCommune2Etablissement: null,
    codeCedex2Etablissement: null,
    libelleCedex2Etablissement: null,
    codePaysEtranger2Etablissement: null,
    libellePaysEtranger2Etablissement: null
  },
  periodesEtablissement: [
    {
      dateFin: null,
      dateDebut: '2021-12-01',
      etatAdministratifEtablissement: 'A',
      changementEtatAdministratifEtablissement: false,
      enseigne1Etablissement: null,
      enseigne2Etablissement: null,
      enseigne3Etablissement: null,
      changementEnseigneEtablissement: false,
      denominationUsuelleEtablissement: null,
      changementDenominationUsuelleEtablissement: false,
      activitePrincipaleEtablissement: '62.01Z',
      nomenclatureActivitePrincipaleEtablissement: 'NAFRev2',
      changementActivitePrincipaleEtablissement: false,
      caractereEmployeurEtablissement: 'N',
      changementCaractereEmployeurEtablissement: false
    }
  ]
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

  @Example<Establishment>(exampleEtablissement)
  @Post('get_by_siret')
  public async health(
    @Body() requestBody: SiretBody,
    @Res() requestFailedResponse: TsoaResponse<500, ErrorJSON>,
    @Res() _validationFailedResponse: TsoaResponse<422, ValidateErrorJSON>,
    @Res() notFoundResponse: TsoaResponse<404, EstablishmentNotFoundErrorJSON>
  ): Promise<Establishment> {
    const requestedSiret = requestBody.siret

    const feat = createEtablissementFeatures(etablissementRepository)
    const etablissementResult = await feat.fetchEtablissement(requestedSiret)

    if (etablissementResult.isErr) {
      const err = etablissementResult.error

      if (err instanceof EstablishmentNotFoundError) {
        return notFoundResponse(404, { message: 'Establishment not found' })
      }

      return requestFailedResponse(500, { message: `Server internal error` })
    }

    return etablissementResult.value
  }
}
