import { Result } from 'true-myth'
import { Etablissement, ContactInfoResponse } from './types'

type EtablissementResult = Result<Etablissement, Error>
export type fetchEtablissement = (siret: string) => Promise<EtablissementResult>

type BrevoResult = Result<ContactInfoResponse, Error>
export type postContact = (
  email: string,
  listIds: number[],
  attributes: object
) => Promise<BrevoResult>
