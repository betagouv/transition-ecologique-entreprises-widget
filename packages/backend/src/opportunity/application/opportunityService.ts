import { Opportunity, OpportunityId } from '../domain/types'
import OpportuntiyFeatures from '../domain/opportunityFeatures'
import { Result } from 'true-myth'
import { addBrevoDeal, updateBrevoDeal } from '../infrastructure/api/brevo/brevoDeal'
import { addBrevoContact } from '../infrastructure/api/brevo/brevoContact'
import { OperatorRepository } from '../../operator/domain/spi'
import { BpiFrance } from '../../operator/infrastructure/api/bpi/bpiFrance'
import { ContactRepository, OpportunityRepository } from '../domain/spi'
import { ProgramRepository } from '../../program/domain/spi'
import ProgramsJson from '../../program/infrastructure/programsJson'

export default class OpportunityService {
  private _opportunityFeatures: OpportuntiyFeatures

  constructor() {
    this._opportunityFeatures = new OpportuntiyFeatures(
      this.getContactRepository(),
      this.getOpportunityRepository(),
      this.getOperatorRepositories(),
      this.getProgramRepository()
    )
  }

  public async createOpportunity(opportunity: Opportunity, optIn: boolean): Promise<Result<OpportunityId, Error>> {
    if (!optIn) {
      return Result.err(new Error('opt-in is required for storing contact data'))
    }
    return await this._opportunityFeatures.createOpportunity(opportunity, optIn)
  }

  private getContactRepository(): ContactRepository {
    return {
      createOrUpdate: addBrevoContact
    }
  }

  private getOpportunityRepository(): OpportunityRepository {
    return { create: addBrevoDeal, update: updateBrevoDeal }
  }

  private getOperatorRepositories(): OperatorRepository[] {
    return [new BpiFrance()]
  }

  private getProgramRepository(): ProgramRepository {
    return ProgramsJson.getInstance()
  }
}