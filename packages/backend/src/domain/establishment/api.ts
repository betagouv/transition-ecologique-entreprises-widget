import { Result } from 'true-myth'
import { Establishment } from './establishmentType'

type EstablishmentResult = Result<Establishment, Error>

export type fetchEtablishment = (siret: string) => Promise<EstablishmentResult>
