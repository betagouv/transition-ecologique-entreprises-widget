import { Color, ThemeId } from '@/types'
import { PublicodeObjective } from '@tee/common'

export interface ThemeType {
  id: ThemeId
  title: string
  tagLabel: string
  value: PublicodeObjective
  image: string
  color: Color
}
