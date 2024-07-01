import { Project } from '@tee/common'

export interface BaserowProject {
  id: number
  order: string
  Nom: string
  'Description courte': string
  Image: BaserowLinkedObject[]
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

export interface BaserowImageTable {
  id: number
  Titre: string
  'Alt-text': string
  Image: BaserowImage[]
  'Image URL TEE': string
}

export interface BaserowImage {
  url: string
}
