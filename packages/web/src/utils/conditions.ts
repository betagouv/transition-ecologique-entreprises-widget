import type { Condition, NextTrackRule } from '@/types'
import { ConditionOperators } from '@/types'

export const checkConditions = (conditions: Condition[], data: Record<string, unknown>) => {
  return conditions.every((cond) => checkCondition(cond, data))
}

const checkCondition = (condition: Condition, data: Record<string, unknown>): boolean => {
  const dataKey: string = condition.type

  switch (condition.operator) {
    case ConditionOperators.exists: {
      // actually exists and is truthy
      const exists: boolean = dataKey in data
      const isTruthy: boolean = exists && !!data[dataKey]
      return exists && isTruthy
    }

    case ConditionOperators.isMissing: {
      // actually is missing or is falsy
      const isMissing: boolean = !(dataKey in data)
      const isFalsy: boolean = dataKey in data && !data[dataKey]
      return isMissing || isFalsy
    }

    case ConditionOperators.is:
      return data[dataKey] === condition.value
  }
}

export const CheckNextTrackRules = (data: Record<string, unknown>, rules: NextTrackRule[]) => {
  const boolArray = [true]

  rules.forEach((rule: NextTrackRule) => {
    const bool = checkConditions(rule.conditions, data)
    boolArray.push(bool)
  })

  return boolArray.every((b) => b)
}
