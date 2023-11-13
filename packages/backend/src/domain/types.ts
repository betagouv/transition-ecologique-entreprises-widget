export interface ContactInfoBodyAttributes {
  NOM: string
  PRENOM: string
  TEL: string
  SIRET: string
  OPT_IN: boolean
  FORM_NEEDS?: string
  PROJECT_NEEDS?: string
  PROJECT_SECTORS?: string[]
  USER_ROLES?: string
  USER_GOALS?: string
  STRUCTURE_SIZE?: string | number
  PROGRAM_ID?: string
  ALL_RESPONSES?: string
}

export interface ContactInfoBody {
  email: string
  listIds: number[]
  attributes: ContactInfoBodyAttributes
}

export interface ContactId {
  id: number
}

export class CustomError extends Error {
  constructor(...args: Array<string | undefined>) {
    super(...args)
    this.name = this.constructor.name
    Error.captureStackTrace(this, CustomError)
  }
}

export class ServiceNotFoundError extends CustomError {}
