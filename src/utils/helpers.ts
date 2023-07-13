// @ts-ignore
import nafCodesJson from '@public/data/references/naf_codes_flat.json'

// enum NafCodeFields {
//   tags = 'tags',
//   NIV5 = 'NIV5',
//   NIV4 = 'NIV4',
//   NIV3 = 'NIV3',
//   NIV2 = 'NIV2',
//   NIV1 = 'NIV1',
//   label_vf = 'label_vf',
// }
interface NafCode {
  tags: string[],
  NIV5: string,
  NIV4: string,
  NIV3: string,
  NIV2: string,
  NIV1: string,
  label_vf: string,
}
interface Refs {
  nafCodes: NafCode[]
}
const refs: Refs = {
  nafCodes: nafCodesJson
}

import type { FormCallbackDataMapping, Cleaner, CleanerReplaceAll, CleanerFromJson, CleanerFromDict, CleanerDefaultIfNull, ResultsMapping } from '@/types/index'

// GENERIC HELPERS

export const getFrom = (from: any, selectors: string[]) => {
  // console.log('utils > helpers > getFrom >  selectors :', selectors)
  const res = selectors.map((s: string) => {
  // @ts-ignore
  return s.replace(/\[([^[\]]*)\]/g, '.$1.')
    .split('.')
    .filter((t: any) => t !== '')
    .reduce((prev: any, cur: any) => {
      return prev && prev[cur]
    }, from)
  })
  return res
}

export const getFromOnePath = (from: any, selector: string) => {
  const val = getFrom(from, [selector])
  return val[0]
}

export const getFromResp = (from: any, resMap: ResultsMapping, lang: string = 'fr') => {
  const selectors = resMap.respFields
  // console.log('utils > helpers > getFromResp >  selectors :', selectors)
  let val = getFrom(from, selectors)
  if (resMap.cleaning) {
    // console.log('utils > helpers > getFromResp >  selectors :', selectors)
    val = val.map(v => {
      // @ts-ignore
      return cleanValue(v, resMap.cleaning, lang)
    })
  }
  return val
}

export const setIn = (obj: any, [head, ...rest]: string[], value: any) => {
  // console.log('utils > helpers > setIn >  obj :', obj)
  const newObj: any = Array.isArray(obj) ? [...obj] : {...obj}
  newObj[head] = rest.length ? setIn(obj[head], rest, value) : value;
  return newObj
}

export const setProperty = (obj: object, path: string, value: any) => {
  // console.log('utils > helpers > setProperty >  obj :', obj)
  // const [head, ...rest] = path.split('.')
  const pathAsArray = path.split('.')
  const resObj = setIn(obj, pathAsArray, value)
  return resObj
}

export const findInTracksArray = (tracksArray: object[], id: string) => {
  // console.log()
  // console.log('utils > helpers > findInTracksArray >  tracksArray :', tracksArray)
  // console.log('utils > helpers > findInTracksArray >  id :', id)

  // let value = undefined

  let UsedTracksFlat: any = {} 
  tracksArray.map( item => {
    UsedTracksFlat = {...UsedTracksFlat, ...item}
  })
  // console.log('utils > helpers > findInTracksArray >  UsedTracksFlat :', UsedTracksFlat)

  const value = UsedTracksFlat[id] 
  // console.log('utils > helpers > findInTracksArray >  value :', value)
  return value
}

// HELPERS FOR CLEANING AND REMAP

export const replaceAll = (value: any, cleaner: CleanerReplaceAll) => {
  const re = new RegExp(cleaner.stringToReplace, 'g')
  const val = String(value).replace(re, cleaner.replaceBy)
  return val
}

export const findFromRefs = (value: string, cleaner: CleanerFromJson) => {
  let val = value
  // console.log('utils > helpers > findFromRefs >  cleaner :', cleaner)

  const findInRef = cleaner.findInRef
  const fromField = cleaner.findFromField
  const targetField = cleaner.retrieveFromField
  const json = refs[findInRef]
  // @ts-ignore
  const obj: object = json.find(item => item[fromField] === value)

  // console.log('utils > helpers > findFromRefs >  json :', json)
  // console.log('utils > helpers > findFromRefs >  obj :', obj)
  
  // @ts-ignore
  val = obj && obj[targetField]

  return val
}

export const findFromDict = (value: string, cleaner: CleanerFromDict) => {
  const dict = cleaner.dict
  const val = dict[value] || value
  return val
}

export const findDefaultIfNull = (value: string, cleaner: CleanerDefaultIfNull, lang: string = 'fr') => {
  // console.log()
  // console.log('utils > helpers > findDefaultIfNull > value :', value)
  // const respFields = cleaner.respFields
  const defaultValue = cleaner.defaultValue
  // console.log('utils > helpers > findDefaultIfNull > respFields :', respFields)
  // console.log('utils > helpers > findDefaultIfNull > defaultValue :', defaultValue)

  const val = value || defaultValue[lang]

  return val
}

export const cleanValue = (value: any, cleaners: Cleaner[] | CleanerReplaceAll[] | CleanerFromJson[] | CleanerFromDict[] | CleanerDefaultIfNull[], lang: string = 'fr') => {
  // console.log('utils > helpers > cleanValue > value :', value)
  let val = value
  cleaners.forEach((cleaner) => {
    // console.log('utils > helpers > cleanValue > cleaner :', cleaner)
    switch (cleaner.operation) {
      case 'replaceAll':
        val = replaceAll(val, <CleanerReplaceAll>cleaner)
        break
      case 'stringToDate':
        val = new Date(val).toLocaleDateString(lang)
        break
      case 'findFromRefs':
        val = findFromRefs(val, <CleanerFromJson>cleaner)
        break
      case 'findFromDict':
        val = findFromDict(val, <CleanerFromDict>cleaner)
        break 
      case 'defaultIfNull':
        val = findDefaultIfNull(val, <CleanerDefaultIfNull>cleaner, lang)
        break 
    }
  })
  // console.log('utils > helpers > cleanValue > val :', val)
  return val
}

export const remapItem = (
  dataStructure: object,
  dataMapping: FormCallbackDataMapping[],
  formData: object | any = {},
  trackValues: any[] = [],
  props: object | any = undefined,
  rawData: object | any = undefined,
  lang: string = 'fr'
  ) => {
  
  console.log()
  // console.log('utils > helpers > remapItem >  dataStructure :', dataStructure)
  let data = { ...dataStructure }
  const metaEnv = import.meta.env
  // console.log('utils > helpers > remapItem >  metaEnv :', metaEnv)
  
  dataMapping.forEach(dm => {
    console.log()
    // console.log('utils > helpers > remapItem >  dm :', dm)
    let value: any = ''
    switch (dm.from) {
      case 'env':
        value = metaEnv[dm.id]
        break
      case 'formData':
        value = formData && formData[dm.id]
        break
      case 'usedTracks':
        value = findInTracksArray(trackValues, dm.id)
        break
      case 'props':
        value = props && props[dm.id]
        break
      case 'rawData':
        // console.log('utils > helpers > remapItem >  rawData :', rawData)
        value = dm.path && getFromOnePath(rawData, dm.path )
        break
      default:
        value = ''
    }

    // clean value if necessary
    if (dm.cleaning) {
      value = cleanValue(value, dm.cleaning, lang)
    }
    // console.log('utils > helpers > remapItem >  value :', value)

    // parse as array
    if (dm.asArray) {
      value = value.split( dm.sep || ',')
      if (dm.type === 'integer') { value = value.map((v: string) => parseInt(v)) }
    }
    // as integer
    if (!dm.asArray && dm.type === 'integer') {
      value = parseInt(value)
    }
    // console.log('utils > helpers > remapItem >  value :', value)

    // set in data body
    data = setProperty(data, dm.dataField, value)
    // console.log('utils > helpers > remapItem >  data :', data)

  })
  return data
}