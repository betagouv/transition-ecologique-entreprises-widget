import { Result } from 'true-myth'
import { Establishment } from './establishmentType'

type EstablishmentResult = Result<Establishment, Error>

export type fetchEstablishment = (siret: string) => Promise<EstablishmentResult>
