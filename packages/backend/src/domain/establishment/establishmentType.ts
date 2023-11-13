import { CustomError } from '../types'

export interface Establishment {
  siren: string
  nic: string
  siret: string
  uniteLegale: {
    dateCreationUniteLegale: string
    denominationUniteLegale: string
    activitePrincipaleUniteLegale: string
  }
  adresseEtablissement: {
    numeroVoieEtablissement: string
    typeVoieEtablissement: string
    libelleVoieEtablissement: string
    codePostalEtablissement: string
    libelleCommuneEtablissement: string
    codeCommuneEtablissement: string
  }
}

export class EstablishmentNotFoundError extends CustomError {}
