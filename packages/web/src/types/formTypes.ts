import type { Translations } from './translationTypes'
import type {
  DataMappingFrom,
  Cleaner,
  CleanerReplaceAll,
  CleanerFromJson,
  CleanerFromDict,
  CleanerDefaultIfNull,
  CallbackActions,
  CallbackMethods,
  ResultsMapping,
  CleanerInjectInObject
} from './otherTypes'

// FOR FORMS
export interface FormValues {
  [name: string]: any,
}

export enum FormFieldTypes {
  Text = 'Text',
  Email = 'Email',
  Textarea = 'Textarea',
  Checkbox = 'Checkbox',
}

export interface FormCallbackDataMapping {
  from: DataMappingFrom,
  id: string,
  help?: string,
  dataField: string,
  path?: string,
  asArray?: boolean
  sep?: string
  type?: string,
  subKey?: string,
  onlyRemap?: boolean,
  cleaning?:  (Cleaner | CleanerReplaceAll | CleanerFromJson | CleanerFromDict | CleanerDefaultIfNull | CleanerInjectInObject) []
}

export interface FormField {
  id: string,
  help?: string,
  required: boolean,
  label: Translations,
  hint?: Translations,
  cols?: number,
  type?: FormFieldTypes,
  rows?: number,
  defaultValue?: boolean | string | number,
  injectInText?: boolean,
  dataStructure?: Record<string, string>,
  dataMapping?: FormCallbackDataMapping[],
  preFillFrom?: FormCallbackDataMapping,
}

export interface FormCallback {
  disabled?: boolean,
  help?: string | string[],
  helpDocumentation?: string,
  action: CallbackActions,
  url: string,
  headers: HeadersInit,
  headerApiKey?: string, // This is not used in the track object
  envApiKey?: string, // This is not used in the track object
  method: CallbackMethods,
  dataBody?: object | object[],
  dataStructure: object | object[],
  dataMapping: FormCallbackDataMapping[]
  inputCleaning?: Cleaner[] | CleanerReplaceAll[] | CleanerFromJson[] | CleanerFromDict[] | CleanerDefaultIfNull[],
  resultsMapping?: ResultsMapping[]
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
