
// FOR ENV 

export interface MetaEnv {
  VITE_DATA_DIR_PATH: string,
  VITE_DEPLOY_URL: string,
  VITE_BREVO_TOKEN: string,
  VITE_BREVO_LIST_IDS: string,
  VITE_BREVO_SENDER_EMAIL: string,
}

// FOR AID PROGRAMS 

export interface ProgramConditions {
  project_needs?: string[],
  project_status?: string[],
  project_sectors?: string[],
  structure_sizes?: string[],
}
enum ConditionOperators {
  or = 'or',
  and = 'and',
  superior = '>',
  superiorOrEqual = '>=',
  inferior = '>',
  inferiorOrEqual = '>=',
}
export interface Condition {
  type?: string,
  operator?: ConditionOperators,
  value?: any | any[],
}

export interface ProgramProvider {
  code: string,
  href?: string,
  SIREN?: string | number,
}

export interface ProgramData {
  id: string | number,
  index?: string | number,
  title: string,
  resume?: string,
  cover?: string,
  origin_url? : string,
  description?: string,
  program_type?: string,
  conditions?: Condition[],
  program_conditions?: ProgramConditions,
  program_providers?: ProgramProvider[],
  program_application?: any,
  geo_zones?: any,
  date_start?: any,
  date_end?: any,
}


// FOR TRACKS

export interface Translations {
  fr: string,
  [name: string]: string
}


enum TrackCalloutType {
  info = 'info'
}
export interface TrackCallout {
  header?: Translations,
  title: Translations,
  bigTitle: boolean,
  description: Translations,
  color?: string,
  type?: TrackCalloutType
  hintIcon?: string,
  hint?: Translations,
}

enum TrackComponents {
  cards = 'cards',
  buttons = 'buttons',
  simpleButtons = 'simpleButtons'
}
export interface TrackInterface {
  component: TrackComponents,
  columnWidth?: number | string,
}
enum TrackBehaviorOperators {
  or = 'or'
}
export interface TrackBehavior {
  multipleChoices?: boolean,
  singleChoice?: boolean,
  operator?: TrackBehaviorOperators,
}
export interface TrackOptionsField {
  id: string,
  label: Translations,
  hint?: Translations,
  required?: boolean,
  type: string
}
export interface TrackNext {
  default: string,
  [name: string]: any
}
export interface TrackOptions {
  id?: string,
  disabled?: Boolean,
  value: string | number,
  required?: Boolean,
  title: Translations,
  label: Translations,
  hint?: Translations,
  callout?: TrackCallout,
  info?: Translations,
  placeholder?: Translations,
  postResponses?: Translations,
  intro?: Translations,
  fields?: TrackOptionsField,
  next?: TrackNext
}

export interface TrackOptionsInput extends TrackOptions {
  placeholder: Translations,
  defaultInput?: string | number,
  callbacks? : any,
  wildcard?: any
}

export interface Track {
  id: string,
  help?: string,
  category?: string,
  title: Translations,
  label: Translations,
  interface?: TrackInterface,
  behavior?: TrackBehavior,
  next?: TrackNext,
  options?: TrackOptions,
  form?: FormOptions,
}

export interface TracksList {
  programs: Track[]
}

export interface UsedTrack {
  id: string | any,
  final?: boolean,
  completed: boolean,
  // updating: boolean,
  step: number,
  // values: any[] | null,
  // titles?: Translations[],
  // val: any[] | null,
  // data: object,
  selected: TrackOptions[],
  next: any
}

// FOR TRACKS - COMPONENTS

export interface TrackOpt {
  value: string,
  [name: string]: any
}

export interface TrackChoice {
  id: string | number,
  step: number,
  values: string[] | object[],
  // val: object[],
  data?: object | object[]
}

// FOR TRACK RESULTS

export interface TrackResultsConfig {
  showAlertNoResults: boolean,
  showAlertResults: boolean,
  showResultsTitle: boolean,
  showProgramInfos: boolean,
  showProgramSubtitles: boolean
}

// FOR FORMS

export interface FormValues {
  [name: string]: any,
}

enum FormFieldTypes {
  text = 'text',
  email = 'email',
  textarea = 'textarea',
  checkbox = 'checkbox',
}

export interface FormField {
  id: string,
  help?: string,
  required: boolean,
  label?: any,
  hint?: any,
  cols?: number,
  type?: FormFieldTypes,
  defaultValue?: boolean | string | number,
  preFillFrom?: FormCallbackDataMapping
}

export interface FormOptions {
  value: string | number,
  label?: Translations,
  hint?: Translations,
  intro?: Translations,
  fields?: FormField[],
  next?: string,
  callbacks: FormCallback[],
}

export interface FormDataResp {
  value: string,
  next: string,
  data: any
}

// FOR TRANSLATIONS

export interface Dict {
  id: string,
  label: any,
}

// FOR COMPONENTS

export interface ColsOptions {
  [name: string]: number | string
}

export interface Plugin {
  plugin: any,
  options?: object | null,
  icons?: any[] | null
}
export interface Comp {
  name: string,
  comp: object
}

// FOR REQUESTS

export interface ResultsMapping {
  respFields: string[],
  position?: string,
  label?: string,
  icon?: string,
  class?: string,
  sep?: string,
  style?: string,
  cleaning?:  Cleaner[] | CleanerReplaceAll[] | CleanerFromJson[] | CleanerDefaultIfNull[]
}

export interface ReqError {
  ok?: boolean,
  status?: number,
  statusText?: string,
}
export interface ReqResp extends ReqError {
  action?: CallbackActions,
  code?: string,
  message?: string,
  data?: any,
  raw?: any,
  resultsMapping?: ResultsMapping[]
}


// FOR EMAILING / REQUESTS

export interface EmailData {
  name: string,
  email: string,
}

enum DataMappingFroms {
  env = 'env',
  formData = 'formData',
  usedTracks = 'usedTracks',
  props = 'props',
  rawData = 'rawData',
}
export interface FormCallbackDataMapping {
  from: DataMappingFroms,
  id: string,
  dataField: string,
  path?: string,
  asArray?: boolean
  sep?: string
  type?: string,
  subKey?: string,
  onlyRemap?: boolean,
  cleaning?:  Cleaner[] | CleanerReplaceAll[] | CleanerFromJson[] | CleanerFromDict[] | CleanerDefaultIfNull[]
}

enum CallbackMethods {
  get = 'GET',
  post = 'POST',
  put = 'PUT',
}
enum CallbackActions {
  requestAPI = 'requestAPI',
  createContact = 'createContact',
  sendTransactionalEmail = 'sendTransactionalEmail'
}
enum CleanerOperations {
  replaceAll = 'replaceAll',
  stringToDate = 'stringToDate',
  findFromRefs = 'findFromRefs',
  findFromDict = 'findFromDict',
  defaultIfNull = 'defaultIfNull',
}

export interface Cleaner {
  operation: CleanerOperations,
}

export interface CleanerDefaultIfNull extends Cleaner {
  // respFields: string,
  defaultValue : Translations,
}
export interface CleanerReplaceAll extends Cleaner {
  stringToReplace: string,
  replaceBy: string, 
}

export enum FindInRefs {
  nafCodes= 'nafCodes'
}
export interface CleanerFromJson extends Cleaner {
  findInRef: FindInRefs,
  findFromField: string,
  retrieveFromField: string,
}

export interface CleanerFromDict extends Cleaner {
  dict: any, 
}
export interface FormCallback {
  disabled?: boolean,
  help?: string | string[],
  helpDocumentation?: string,
  action: CallbackActions,
  url: string,
  headers: object,
  headerApiKey: string,
  envApiKey: string,
  method: CallbackMethods,
  dataStructure: object | object[],
  dataMapping: FormCallbackDataMapping[]
  inputCleaning?: Cleaner[] | CleanerReplaceAll[] | CleanerFromJson[] | CleanerFromDict[] | CleanerDefaultIfNull[],
  resultsMapping?: ResultsMapping[]
}