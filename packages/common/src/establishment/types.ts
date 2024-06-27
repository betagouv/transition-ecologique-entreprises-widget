import { StructureSize, LegalCategory } from '../questionnaire/types/types'

export interface EstablishmentId {
  siret: string
}

export default interface EstablishmentFront extends EstablishmentId {
  codeNAF: string
  codeNAF1: string
  ville: string
  codePostal: string
  legalCategory: LegalCategory | string
  region: string | undefined
  structure_size: StructureSize | undefined
  denomination: string | undefined
  secteur: string
  creationDate: string
}

export interface EstablishmentSearch {
  establishments: EstablishmentFront[]
  resultCount: number
}
