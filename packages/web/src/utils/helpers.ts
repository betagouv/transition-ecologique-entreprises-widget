// CONSOLE LOG TEMPLATE
// console.log(`utils.helpers > FUNCTION_NAME > MSG_OR_VALUE :`)
import type {
  Cleaner,
  CleanerDefaultIfNull,
  CleanerFromDict,
  CleanerInjectInObject,
  CleanerReplaceAll,
  FormCallbackDataMapping,
  NextTrackRule,
  PropertyPath,
  ReqResp,
  ResultsMapping
} from '@/types'
import { CleanerOperations, DataMappingFrom } from '@/types'
import type { ImportMetaEnv } from '../env'
import Widget from '@/utils/widget'
import Config from '@/config'

// GENERIC HELPERS

export const getFrom = (from: any, selectors: PropertyPath[]) => {
  const res = selectors.map((selector: PropertyPath) => {
    const arraySelector = Array.isArray(selector)
      ? selector
      : selector
          // Add support for array notation, e.g.
          // a.b[3] becomes a.b.3.
          .replace(/\[([^[\]]*)\]/g, '.$1.')
          .split('.')
          .filter((t: any) => t !== '')

    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return getFromArraySelector(from, arraySelector)
  })
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return res
}

const getFromArraySelector = (from: any, selector: string[]) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return selector.reduce((prev: any, cur: any) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-unsafe-return
    return prev && prev[cur]
  }, from)
}

export const getFromOnePath = (from: any, selector: string) => {
  const val = getFrom(from, [selector])
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return val[0]
}

export const getFromResp = (from: ReqResp, resMap: ResultsMapping, lang: string = 'fr') => {
  const selectors = resMap.respFields
  let values = getFrom(from, selectors)
  if (resMap.cleaning) {
    values = values.map((value) => {
      return cleanValue(value, resMap.cleaning as Cleaner[] | CleanerReplaceAll[] | CleanerDefaultIfNull[], lang)
    })
  }
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return values
}

export const setIn = (obj: any, [head, ...rest]: string[], value: any) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const newObj: any = Array.isArray(obj) ? [...(obj as [])] : { ...obj }
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-unsafe-assignment
  newObj[head] = rest.length ? setIn(obj[head], rest, value) : value
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return newObj
}

export const setProperty = (obj: object, path: string, value: any) => {
  let resultObj: object

  if (path === '.') {
    resultObj = { ...obj, ...value } as object
  } else {
    const pathAsArray = path.split('.')
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    resultObj = setIn(obj, pathAsArray, value)
  }

  return resultObj
}

export const findInObjectsArray = (objectsArray: object[], id: string, all: boolean = false) => {
  const arrayFlat: Record<string, unknown> = Object.assign({}, ...objectsArray) as Record<string, unknown>
  return all ? arrayFlat : arrayFlat[id]
}

export const groupBy = <T>(objectsArray: T[], key: keyof T): Record<string, T[]> => {
  return objectsArray.reduce((rv: Record<string, T[]>, x: T) => {
    const keyValue = x[key] as unknown as string
    ;(rv[keyValue] = rv[keyValue] || []).push(x)
    return rv
  }, {})
}

// HELPERS FOR CLEANING AND REMAP

export const replaceAll = (value: any, cleaner: CleanerReplaceAll) => {
  const re = new RegExp(cleaner.stringToReplace, 'g')
  return String(value).replace(re, cleaner.replaceBy)
}

export const findFromDict = (value: string | string[], cleaner: CleanerFromDict) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const dict = cleaner.dict
  let valueOut: any
  if (Array.isArray(value)) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return,@typescript-eslint/no-unsafe-member-access
    valueOut = value.map((v) => dict[v] || v)
  } else {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-unsafe-assignment
    valueOut = dict[value] || value
  }
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return valueOut
}

export const findDefaultIfNull = (value: string, cleaner: CleanerDefaultIfNull, lang: string = 'fr') => {
  const defaultValue = cleaner.defaultValue
  return value || defaultValue[lang]
}

export const injectInObject = (value: object | object[], cleaner: CleanerInjectInObject) => {
  const targetObject = cleaner.object || {}
  let valueOut: object = { ...targetObject }
  if (Array.isArray(value)) {
    value.forEach((v) => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      valueOut = { ...valueOut, ...v }
    })
  } else {
    valueOut = { ...valueOut, ...value }
  }
  return valueOut
}

export const cleanValue = (
  value: any,
  cleaners: Cleaner[] | CleanerReplaceAll[] | CleanerFromDict[] | CleanerDefaultIfNull[] | CleanerInjectInObject[],
  lang: string = 'fr'
) => {
  let val: unknown = value
  cleaners.forEach((cleaner) => {
    switch (cleaner.operation) {
      case CleanerOperations.replaceAll:
        val = replaceAll(val, <CleanerReplaceAll>cleaner)
        break
      case CleanerOperations.stringToDate:
        val = new Date(val as string | number | Date).toLocaleDateString(lang)
        break
      case CleanerOperations.findFromDict:
        val = findFromDict(val as string | string[], <CleanerFromDict>cleaner)
        break
      case CleanerOperations.defaultIfNull:
        val = findDefaultIfNull(val as string, <CleanerDefaultIfNull>cleaner, lang)
        break
      case CleanerOperations.injectInObject:
        val = injectInObject(val as object | object[], <CleanerInjectInObject>cleaner)
        break
      default:
        break
    }
  })
  return val
}

export const remapItem = (
  dataStructure: object,
  dataMappings: FormCallbackDataMapping[] | NextTrackRule[],
  formData: any = {},
  trackValues: any[] = [],
  props: any = undefined,
  rawData: any = undefined,
  selectionValues: any[] = [],
  lang: string = 'fr'
) => {
  let data = { ...dataStructure }
  const metaEnv: ImportMetaEnv = Config.metaEnv

  dataMappings.forEach((dataMapping) => {
    let value: unknown = ''
    let allResponses: any
    switch (dataMapping.from) {
      case DataMappingFrom.Env:
        value = metaEnv[dataMapping.id]
        break
      case DataMappingFrom.FormData:
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        value = formData?.[dataMapping.id]
        break
      case DataMappingFrom.UsedTracks:
        value = findInObjectsArray(trackValues as object[], dataMapping.id)
        break
      case DataMappingFrom.AllUsedTracks:
        allResponses = findInObjectsArray(trackValues as object[], dataMapping.id, true)
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        value = Object.keys(allResponses)
          .map((k) => {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
            return `${k}: ${allResponses[k]}`
          })
          .join(' / ')
        break
      case DataMappingFrom.SelectionValues:
        value = findInObjectsArray(selectionValues as object[], dataMapping.id)
        break
      case DataMappingFrom.Props:
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        value = props?.[dataMapping.id]
        break
      case DataMappingFrom.PropsPath:
        value = dataMapping.path && getFromOnePath(props, dataMapping.path)
        break
      case DataMappingFrom.RawData:
        value = dataMapping.path && getFromOnePath(rawData, dataMapping.path)
        break
      default:
        break
    }

    // clean value if necessary
    if (dataMapping.cleaning) {
      value = cleanValue(value, dataMapping.cleaning, lang)
    }

    // parse as array
    if (dataMapping.asArray) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call
      value = (value as string).split(dataMapping.sep || ',')
      if (dataMapping.type === 'integer') {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call
        value = (value as string[]).map((v: string) => parseInt(v))
      }
    }
    // as integer
    if (!dataMapping.asArray && dataMapping.type === 'integer' && typeof value === 'string') {
      value = parseInt(value)
    }

    // set in data body
    data = setProperty(data, dataMapping.dataField, value)
  })
  return data
}

// UX HELPERS
export const scrollToTop = (element: Element) => {
  console.log(element, Widget.is)
  if (!Widget.is) {
    element.scrollIntoView()
  } else {
    setTimeout(() => {
      element.scrollIntoView({ behavior: 'smooth' })
    }, 100)
  }
}

export const scrollToElementCenter = (element: HTMLElement) => {
  if (!Widget.is) {
    setTimeout(() => {
      const docHeight = document.documentElement.clientHeight
      const { offsetTop, clientHeight } = element
      window.scrollTo({ top: offsetTop + clientHeight / 2 - docHeight / 2 })
    }, 100)
  } else {
    setTimeout(() => {
      element.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }, 100)
  }
}

export const scrollToId = (elementId: string) => {
  setTimeout(() => {
    const element = document.getElementById(elementId)
    element?.scrollIntoView()
  }, 100)
}

// TEXT HELPERS

export const consolidateAmounts = (str: string | undefined) => {
  const regex = /(\d+)\s*([a-zA-Z])?/g
  return str?.replace(regex, '$1\u00a0$2')
}
