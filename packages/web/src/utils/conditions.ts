import type { ConditionTrack, NextTrackRule } from '@/types'
import { ConditionOperators } from '@/types'

export const CheckConditions = (
  data: any,
  conditions: ConditionTrack[],
  strict: boolean = false
) => {
  // console.log()
  // console.log('utils > conditions > CheckConditions > data :', data)
  // console.log('...')
  // console.log('utils > conditions > CheckConditions > rules :', rules)
  const boolArray = [true]

  conditions.forEach((condition: ConditionTrack) => {
    // console.log('utils > conditions > CheckConditions > condition :', condition)
    const condOperator = condition.operator
    // console.log('utils > conditions > CheckConditions > condOperator :', condOperator)
    const condField: string = condition.type || ''
    const dataValue = data[condField]
    // console.log('utils > conditions > CheckConditions > dataValue :', dataValue)
    const condVal = condition.value
    let condBool = !strict
    if (dataValue) {
      switch (condOperator) {
        case ConditionOperators.exists:
          condBool = !!dataValue
          break
        case ConditionOperators.missing:
          condBool = !dataValue
          break
        case ConditionOperators.is:
          condBool = condition.value === dataValue
          break
        case ConditionOperators.or:
          condBool = dataValue.includes('*') || condVal.includes('*')
          if (!condBool) {
            const intersection = condVal.filter((v: any) => dataValue.includes(v))
            condBool = dataValue.includes('*') || intersection.length
          }
          break
      }
    }
    // console.log('utils > conditions > CheckConditions > condBool :', condBool)
    boolArray.push(condBool)
  })

  return boolArray.every((b) => !!b)
}

export const CheckNextTrackRules = (data: any, rules: NextTrackRule[]) => {
  // console.log()
  // console.log('utils > conditions > CheckNextTrackRules > data :', data)
  // console.log('...')
  const boolArray = [true]

  rules.forEach((rule: NextTrackRule) => {
    // console.log('utils > conditions > CheckNextTrackRules > rule :', rule)
    const bool = CheckConditions(data, rule.conditions, true)
    boolArray.push(bool)
  })

  return boolArray.every((b) => !!b)
}
