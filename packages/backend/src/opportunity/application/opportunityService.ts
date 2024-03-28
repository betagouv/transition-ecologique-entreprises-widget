import { Opportunity, OpportunityId } from '../domain/types'
import OpportuntiyFeatures from '../domain/opportunityFeatures'
import { Result } from 'true-myth'
import { addBrevoDeal, updateBrevoDeal } from '../infrastructure/api/brevo/brevoDeal'
import { addBrevoContact } from '../infrastructure/api/brevo/brevoContact'
import { OperatorRepository } from '../../operator/domain/spi'
import { BpiFrance } from '../../operator/infrastructure/api/bpi/bpiFrance'
import { ContactRepository, MailRepository, OpportunityRepository } from '../domain/spi'
import { ProgramRepository } from '../../program/domain/spi'
import ProgramsJson from '../../program/infrastructure/programsJson'
import BrevoMail from '../infrastructure/api/brevo/brevoMail'

export default class OpportunityService {
  private _opportunityFeatures: OpportuntiyFeatures

  constructor() {
    this._opportunityFeatures = new OpportuntiyFeatures(
      this._getContactRepository(),
      this._getOpportunityRepository(),
      this._getOperatorRepositories(),
      this._getProgramRepository(),
      this._getMailRepository()
    )
  }

  public async createOpportunity(opportunity: Opportunity, optIn: boolean): Promise<Result<OpportunityId, Error>> {
    if (!optIn) {
      return Result.err(new Error('opt-in is required for storing contact data'))
    }
    return await this._opportunityFeatures.createOpportunity(opportunity, optIn)
  }

  private _getContactRepository(): ContactRepository {
    return {
      createOrUpdate: addBrevoContact
    }
  }

  private _getOpportunityRepository(): OpportunityRepository {
    return { create: addBrevoDeal, update: updateBrevoDeal }
  }

  private _getOperatorRepositories(): OperatorRepository[] {
    return [new BpiFrance()]
  }

  private _getProgramRepository(): ProgramRepository {
    return ProgramsJson.getInstance()
  }

  private _getMailRepository(): MailRepository {
    return { sendReturnReceipt: new BrevoMail().sendReturnReceipt }
  }
}
