import { Result } from 'true-myth'
import { Operators, Program } from '../../program/domain/types/types'
import { Opportunity } from '../../opportunity/domain/types'
import { ContactId } from './types'

export interface OperatorManager {
  get operatorName(): Operators
  createOpportunity: (opporunity: Opportunity, program: Program) => Promise<Result<ContactId, Error>>
  support: (program: Program) => boolean
}
