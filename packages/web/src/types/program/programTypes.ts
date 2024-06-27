/* eslint-disable @typescript-eslint/no-unsafe-member-access */
// FOR AID PROGRAMS
import { PublicodesKeys, PublicodeObjective, PublicodesCondition, ProgramAidType, ProgramOperatorType } from '../../types'

interface ProgramObjectiveLink {
  lien: string
  texte: string
}

interface ProgramObjective {
  description: string
  liens: ProgramObjectiveLink[]
}

export interface ProgramData {
  id: string
  titre: string
  promesse: string
  description?: string
  'description longue'?: string
  'début de validité'?: string
  'fin de validité'?: string
  illustration: string
  objectifs: ProgramObjective[]
  'opérateur de contact': ProgramOperatorType
  'autres opérateurs'?: string[]
  "nature de l'aide": ProgramAidType
  'activable en autonomie'?: string
  "coût de l'accompagnement"?: string
  "durée de l'accompagnement"?: string
  'montant du financement'?: string
  "montant de l'avantage fiscal"?: string
  'montant du prêt'?: string
  'durée du prêt'?: string
  'taux du prêt'?: string
  url?: string

  "conditions d'éligibilité": {
    "taille de l'entreprise": string[]
    'secteur géographique': string[]
    "secteur d'activité": string[]
    "nombre d'années d'activité": string[]
    "autres critères d'éligibilité"?: string[]
  }

  publicodes: PublicodesProgramData
}

export type PublicodesProgramData = {
  [PublicodesKeys.isTargeted]:
    | {
        [k: string]: unknown
      }
    | string
  [key: string]: unknown
  [PublicodesKeys.hasObjective]?: {
    [PublicodesCondition.oneOfThese]: PublicodeObjective[]
  }
}
