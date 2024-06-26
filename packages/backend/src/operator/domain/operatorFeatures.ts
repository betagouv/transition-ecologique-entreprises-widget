import { Program } from '../../program/domain/types/types'
import { OperatorManager } from './spi'
import { Opportunity } from '../../opportunity/domain/types'
import { Result } from 'true-myth'
import { ContactId } from './types'

export default class OperatorFeatures {
  private readonly _operatorRepositories: OperatorManager[]
  constructor(operatorRepositories: OperatorManager[]) {
    this._operatorRepositories = operatorRepositories
  }

  public async createOpportunity(opportunity: Opportunity, program: Program): Promise<Result<ContactId, Error> | false> {
    for (const operatorRepository of this._operatorRepositories) {
      if (operatorRepository.support(program)) {
        return await operatorRepository.createOpportunity(opportunity, program)
      }
    }

    return false
  }
}
