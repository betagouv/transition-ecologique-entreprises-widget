import { Project } from '@tee/common/src/project/types'
import { Theme } from '@tee/common/src/theme/types'
export interface BaserowProject {
  id: number
  order: string
  Nom: string
  'Description courte': string
  Image: BaserowImage[]
  'Qu’est-ce que c’est ?': string
  'Pour aller plus loin': string
  Titre: string
  'Projets complémentaires': BaserowLinkedObject[]
  'Thématique principale': BaserowLinkedObject[]
  NameTag: string
  Publié: boolean
  'Thématiques secondaires': BaserowLinkedObject[]
  Dispositifs: BaserowLinkedObject[]
  Prio: number
}

export interface BaserowTheme {
  id: number
  Nom: string
  'Nom (Tech)': string
}

export interface CoreThemeType extends Omit<Theme, 'highlightProjects'> {}

export interface BaserowLinkedObject {
  id: number
  value: string
}

export interface RawProject extends Omit<Project, 'themes' | 'mainTheme' | 'linkedProjects' | 'programs'> {
  themes: string[]
  mainTheme: string
  linkedProjects: number[]
  programs: string[]
}

export interface BaserowImage {
  url: string
  thumbnails: Thumbnails
}

interface Thumbnails {
  tiny: Thumbnail
  small: Thumbnail
}

interface Thumbnail {
  url: string
  width: number
  height: number
}
