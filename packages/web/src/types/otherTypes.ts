import type { Translations } from './translationTypes'
import type { Plugin as VuePlugin } from 'vue'
// FOR COMPONENTS

export interface ColsOptions {
  [name: string]: number | string
}

export interface Plugin {
  plugin: VuePlugin
  options?: object | null
  icons?: any[] | null
}
export interface Comp {
  name: string
  comp: object
}

// FOR FILTERS

export interface FilterSignal {
  label: string
  value: string
}
export interface FilterEvent {
  target: any
}

// FOR REQUESTS

export interface ResultsMapping {
  respFields: string[]
  position?: string
  label?: string
  icon?: string
  class?: string
  sep?: string
  style?: string
  cleaning?: Cleaner[] | CleanerReplaceAll[] | CleanerDefaultIfNull[]
}

export interface ReqError {
  ok?: boolean
  status?: number
  statusText?: string
}
export interface ReqResp extends ReqError {
  action?: CallbackActions | string
  code?: string
  message?: string
  data?: any
  raw?: any
  resultsMapping?: ResultsMapping[]
  url?: string
}

// FOR EMAILING / REQUESTS

export interface EmailData {
  name: string
  email: string
}

export enum DataMappingFrom {
  Env = 'Env',
  FormData = 'FormData',
  UsedTracks = 'UsedTracks',
  AllUsedTracks = 'AllUsedTracks',
  SelectionValues = 'SelectionValues',
  Props = 'Props',
  PropsPath = 'PropsPath',
  RawData = 'RawData'
}

export enum CallbackMethods {
  Get = 'GET',
  Post = 'POST',
  Put = 'PUT'
}
export enum CallbackActions {
  RequestAPI = 'RequestAPI',
  CreateOpportunity = 'CreateOpportunity'
}
export enum CleanerOperations {
  replaceAll = 'replaceAll',
  stringToDate = 'stringToDate',
  findFromDict = 'findFromDict',
  defaultIfNull = 'defaultIfNull',
  injectInObject = 'injectInObject'
}

export interface Cleaner {
  operation: CleanerOperations
}

export interface CleanerDefaultIfNull extends Cleaner {
  // respFields: string,
  defaultValue: Translations
}
export interface CleanerReplaceAll extends Cleaner {
  stringToReplace: string
  replaceBy: string
}

export interface CleanerFromDict extends Cleaner {
  dict: any
}

export interface CleanerInjectInObject extends Cleaner {
  object: object
}
