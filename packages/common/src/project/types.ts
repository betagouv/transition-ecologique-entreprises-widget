import { ThemeId } from '../theme/types'
import projects from '@tee/data/static/project.json'
import { QuestionnaireRoute, PublicodeObjective } from '@tee/common/src/questionnaire/types/types'

export interface Project {
  id: number
  priority?: number
  title: string // titre
  nameTag: string // Affichage du projet s'il doit être mis en avant dans une thématique (étape "quel est votre objectif prioritaire")
  shortDescription: string // texte affiché sur les cartes projets (carte présentes sur l'annuaire)
  image: string // image associée au projet (par exemple affichée sur la carte présente sur l'annuaire)
  longDescription: string // qu'est ce que c'est
  moreDescription: string // Pour aller plus loin
  themes: ThemeId[] // liste tous les thèmes auxquels le projet appartient,
  mainTheme: ThemeId // nom du thème principal (pour l'instant, donne sa couleur dans la banèire)
  programs: string[] // liste des programmes associés au projet
  linkedProjects: ProjectId[] // liste de projets à afficher dans projets complémentaires, en bas de la page Projet
}

export type ProjectOpportunity = ContactDetails & ProjectOpportunityDetails

export interface ContactDetails {
  firstName: string
  lastName: string
  email: string
  phoneNumber: string
  companySiret: string
  companyName?: string | null
  companySector?: string
  companySize?: number
}

export interface ProjectOpportunityDetails {
  projectId: number
  linkToProjectPage: string
  message: string
  questionnaireRoute?: QuestionnaireRoute
  priorityObjectives?: PublicodeObjective[]
  otherData?: string
}

export interface OpportunityId {
  id: string
}

export interface ProjectBody {
  project: ProjectOpportunity
  optIn: boolean
}

export type ProjectId = (typeof projects)[number]['id']
