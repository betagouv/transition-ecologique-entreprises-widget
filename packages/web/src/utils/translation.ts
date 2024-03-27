// CONSOLE LOG TEMPLATE
// console.log(`Translation > FUNCTION_NAME > MSG_OR_VALUE :`)
import { frDict } from '@/translations/fr'
import { frOperatorsDict } from '@/translations/fr-operators'
import type { PropertyPath } from '@/types'

export default class Translation {
  // internationalization
  private static _dict: object = {
    fr: frDict
  }

  private static _dictOperators: Record<string, typeof frOperatorsDict> = {
    fr: frOperatorsDict
  }

  // language selection
  private static _lang = 'fr'

  static get lang(): string {
    return this._lang
  }

  // actions
  static setLocale(lang: string) {
    this._lang = lang
  }

  static resolve(path: PropertyPath, obj: object = self, separator = '.') {
    const props: string[] = Array.isArray(path) ? path : path.split(separator)
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    return props.reduce((prev: string, curr: string) => prev?.[curr] as string | undefined, obj)
  }

  static ti(translation: string, params: Record<string, string | number | undefined> | undefined = undefined) {
    let translated = translation
    if (params) {
      for (const key in params) {
        const reg = new RegExp(`{${key}}`, 'g')
        const value = params[key]
        translated = translated.replace(reg, value ? value.toString() : '...')
      }
    }
    return translated
  }

  static translateWithDict(
    path: string,
    dictionary: Record<string, unknown>,
    params: Record<string, string | number | undefined> | undefined = undefined
  ) {
    const locDict = dictionary[this._lang] as object
    let translated = (this.resolve(path, locDict) || path) as unknown as string
    if (params) {
      translated = this.ti(translated, params)
    }
    return translated
  }

  static t(path: string, params: Record<string, string | number | undefined> | undefined = undefined) {
    return this.translateWithDict(path, this._dict as Record<string, unknown>, params)
  }

  static to(path: string, params: Record<string, string | number | undefined> | undefined = undefined) {
    return this.translateWithDict(path, this._dictOperators, params)
  }
}
