import { Sector, PublicodesKeys } from '@tee/common/src/questionnaire/types'

export interface PublicodesInputData {
  [PublicodesKeys.CodeNAF]?: string
  [PublicodesKeys.CodeNAF1]?: string
  [PublicodesKeys.ValidityStart]?: string
  [PublicodesKeys.ValidityEnd]?: string
  [PublicodesKeys.CurrentDate]: string
  [PublicodesKeys.QuestionnaireRoute]?: PublicodesQuestionnaireRoute
  [PublicodesKeys.Workforce]?: number
  région?: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any
}

export enum PublicodesQuestionnaireRoute {
  NoSpecificGoal = '"je ne sais pas par où commencer"',
  SpecificGoal = '"objectif précis"'
}

export const SectorToNAFSection: Record<Sector, string[]> = {
  [Sector.Craftsmanship]: ['C', 'F', 'G'],
  [Sector.Industry]: ['B', 'C', 'D', 'E'],
  [Sector.Tourism]: ['I'],
  [Sector.Tertiary]: ['G', 'H', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U'],
  [Sector.Agriculture]: ['A'],
  [Sector.Other]: ['D', 'E', 'F', 'H', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U']
}

export const NAF1Letters = [...'ABCDEFGHIJKLMNOPQRSTU'] as const
