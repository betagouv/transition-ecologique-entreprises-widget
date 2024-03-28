import type { Translations, FormCallback, FormCallbackDataMapping, FormOptions, PropertyPath, TrackId } from '@tee/web/src/types'
import { ConditionOperators } from '@tee/web/src/types/conditionOperators'

// FOR TRACKS
type ConditionIs = {
  type: string
  operator: ConditionOperators.is
  value: string | number | object
}

type ConditionExistsOrIsMissing = {
  type: string
  operator: ConditionOperators.exists | ConditionOperators.isMissing
}

export type Condition = ConditionIs | ConditionExistsOrIsMissing

export enum TrackCalloutType {
  info = 'info'
}

export interface TrackCallout {
  header?: Translations
  headerStyle?: string
  title: Translations
  titleStyle?: string
  bigTitle: boolean
  description?: Translations
  descriptionStyle?: string
  bgColor?: string
  type?: TrackCalloutType
  imageLeft?: string
  imageRight?: string
  hintIcon?: string
  hint?: Translations
}

export enum TrackComponent {
  Cards = 'cards',
  Buttons = 'buttons',
  SimpleButtons = 'simpleButtons',
  Form = 'form',
  Input = 'input',
  Siret = 'siret',
  Select = 'select',
  Results = 'results'
}
export interface TrackInterface {
  component: TrackComponent
  columnWidth?: number | string
}
export interface TrackBehavior {
  multipleChoices?: boolean
}
export interface TrackOptionsField {
  id: string
  label: Translations
  hint?: Translations
  required?: boolean
  type: TrackFieldType
}

export enum TrackFieldType {
  Text = 'text',
  Number = 'number',
  Select = 'select',
  Radio = 'radio',
  Checkbox = 'checkbox',
  Textarea = 'textarea',
  Email = 'email',
  Tel = 'tel',
  Date = 'date',
  Search = 'search'
}

export interface TrackNext {
  default: TrackId | false
  ruleSet?: NextTrackRuleSet[]
  [name: string]: any
}

export interface NextTrackRuleSet {
  help?: string
  rules: NextTrackRule[]
  next: TrackNext
}

export interface NextTrackRule extends FormCallbackDataMapping {
  conditions: Condition[]
}

export enum HasInputOptions {
  Number = TrackFieldType.Number,
  Date = TrackFieldType.Date,
  Text = TrackFieldType.Text,
  Search = TrackFieldType.Search
}

export interface TrackOptions {
  id?: string
  disabled?: boolean
  value?: string | number | object | Record<string, string | number>
  validation?: CallableFunction
  questionnaireData?: object
  required?: boolean
  title?: Translations
  label?: Translations
  resume?: Translations
  hint?: Translations
  hintImageIcon?: string
  hintIcon?: string
  hintImage?: Translations
  imageTop?: string
  hasInput?: HasInputOptions
  callout?: TrackCallout
  info?: Translations
  placeholder?: Translations
  postResponses?: Translations
  callbacks?: FormCallback[]
  intro?: Translations
  fields?: TrackOptionsField[]
  next?: TrackNext
}

export interface InputCleaningRule {
  operator?: ConditionOperators
  conditionValue?: string | number
  valueField?: string
  value?: any
}

export interface TrackOptionsInput extends TrackOptions {
  hasInput: HasInputOptions
  defaultInput?: string | number
  inputField?: string
  inputMax?: number
  inputMin?: number
  inputCleaning?: InputCleaningRule[]
  wildcard?: TrackOptionWildcard
}

interface TrackOptionWildcard {
  label: Translations
  value?: string | number
  next: TrackNext
}

export interface TrackOptionsSelect extends TrackOptions {
  label: Translations
}

// Alias for TrackOptions (TrackOptions | TrackOptionsSelect | TrackOptionsInput)
export type TrackOptionsUnion = TrackOptions | TrackOptionsSelect | TrackOptionsInput

export type TrackOptionItem = {
  option: TrackOptionsUnion
  index?: number
  remove?: boolean
}

export interface Track {
  id: TrackId
  help?: string
  category?: string
  bgColor?: string
  imageRight?: string
  title: Translations
  label: Translations
  info?: Translations
  hint?: Translations
  resume?: Translations
  callout?: TrackCallout
  interface?: TrackInterface
  behavior?: TrackBehavior
  config?: TrackResultsConfig
  next?: TrackNext
  options?: TrackOptionsUnion[]
  form?: FormOptions
}

export interface TracksList {
  programs: Track[]
}

export interface UsedTrack {
  id: TrackId
  component: TrackComponent
  category?: string
  final?: boolean
  completed: boolean
  // updating: boolean,
  step: number
  // values: any[] | null,
  // titles?: Translations[],
  // val: any[] | null,
  // data: object,
  selected: TrackOptionsUnion[]
  next?: TrackNext
}

// FOR TRACKS - COMPONENTS

export interface TrackOpt {
  value: string
  [name: string]: any
}

export interface TrackChoice {
  id: string | number
  step: number
  values: string[] | object[]
  // val: object[],
  data?: object | object[]
}

// FOR TRACK RESULTS

export interface TrackFilterValue {
  label: string
  value: string
}

export interface TrackFilter {
  field: PropertyPath
  label: string
  trueIf: ConditionOperators
  values: TrackFilterValue[]
}
export interface TrackResultsConfig {
  noResultsMessage: Translations
  noResultsImage: string
  showResultsTitle: boolean
  showProgramInfos: boolean
  showProgramSubtitles: boolean
  filters?: TrackFilter[]
}

export const isTrackOptionsInput = (option: TrackOptionsInput | TrackOptions): option is TrackOptionsInput => {
  return 'hasInput' in option
}

export interface UsedTrackValuePair {
  currentId: string
  completed: boolean
  selection: (string | number | object | undefined)[]
}
