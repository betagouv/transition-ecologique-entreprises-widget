import { Maybe, Result } from 'true-myth'
import type { ContactRepository, MailerService, OpportunityRepository } from './spi'
import type { OpportunityId, Opportunity, ContactDetails } from './types'
import OperatorFeatures from '../../operator/domain/operatorFeatures'
import { OperatorRepository } from '../../operator/domain/spi'
import { ProgramRepository } from '../../program/domain/spi'
import ProgramFeatures from '../../program/domain/programFeatures'
import { Program } from '@tee/data/src/type/program'
import Validator from '../../../../common/src/establishment/validator'
import EstablishmentService from '../../establishment/application/establishmentService'
import { Address } from '../../establishment/domain/types'

export default class OpportunityFeatures {
  private readonly _contactRepository: ContactRepository
  private readonly _opportunityRepository: OpportunityRepository
  private readonly _operatorRepositories: OperatorRepository[]
  private readonly _programRepository: ProgramRepository
  private readonly _mailRepository: MailerService

  constructor(
    contactRepository: ContactRepository,
    opportunityRepository: OpportunityRepository,
    operatorRepositories: OperatorRepository[],
    programRepository: ProgramRepository,
    mailRepository: MailerService
  ) {
    this._contactRepository = contactRepository
    this._opportunityRepository = opportunityRepository
    this._operatorRepositories = operatorRepositories
    this._programRepository = programRepository
    this._mailRepository = mailRepository
  }

  createOpportunity = async (opportunity: Opportunity, optIn: true): Promise<Result<OpportunityId, Error>> => {
    const maybeFullopportunity = await this._verifyAndAddEstablishmentData(opportunity)
    if (maybeFullopportunity.isErr) {
      return Result.err(maybeFullopportunity.error)
    }
    opportunity = maybeFullopportunity.value
    const contactIdResult = await this._contactRepository.createOrUpdate(opportunity as ContactDetails, optIn)
    if (contactIdResult.isErr) {
      return Result.err(contactIdResult.error)
    }

    const program = this._getProgramById(opportunity.programId)
    opportunity = this._addContactOperatorToOpportunity(opportunity, program)

    const opportunityResult = await this._opportunityRepository.create(contactIdResult.value.id, opportunity)

    if (!opportunityResult.isErr && program) {
      this._sendReturnReceipt(opportunity, program)
      this._createOpportunityOnOperator(opportunityResult.value, opportunity, program)
    }

    return opportunityResult
  }

  private _createOpportunityOnOperator(opportunityId: OpportunityId, opportunity: Opportunity, program: Program) {
    void new OperatorFeatures(this._operatorRepositories).createOpportunity(opportunity, program).then(async (operatorResult) => {
      if (false !== operatorResult) {
        const opportunityUpdateErr = await this._updateOpportunitySentToOperator(opportunityId, operatorResult.isOk)
        if (opportunityUpdateErr.isJust) {
          // TODO: Send an email to the admin: Opportunity not updated
        }
      }
    })
  }

  private async _updateOpportunitySentToOperator(opportunityId: OpportunityId, success: boolean): Promise<Maybe<Error>> {
    return await this._opportunityRepository.update(opportunityId, { sentToOperator: success })
  }

  private _addContactOperatorToOpportunity(opportunity: Opportunity, program: Program | undefined): Opportunity {
    if (program) {
      opportunity.programContactOperator = program['opérateur de contact']
    }
    return opportunity
  }

  private _getProgramById(id: string): Program | undefined {
    return new ProgramFeatures(this._programRepository).getById(id)
  }

  private _sendReturnReceipt(opportunity: Opportunity, program: Program) {
    void this._mailRepository.sendReturnReceipt(opportunity, program).then((hasError) => {
      if (hasError) {
        // TODO: Send an email to the admin: Receipt not sent or add error on sentry
      }
    })
  }

  private async _verifyAndAddEstablishmentData(opportunity: Opportunity): Promise<Result<Opportunity, Error>> {
    if (!Validator.validateSiret(opportunity.companySiret)) {
      return Result.err(new Error('invalid SIRET')) //since there is a validator in the front end,
      // it means this is a direct query which we can ignore if poorly formatted
    }
    const establishmentInfos = await new EstablishmentService().getFullDataBySiret(opportunity.companySiret)
    if (establishmentInfos.isErr) {
      return Result.ok(opportunity) // if we don't suceed in enhancing the data, we still we to create an opportunity
    }
    opportunity.companyName = establishmentInfos.value.denomination
    opportunity.companySector = establishmentInfos.value.nafLabel || ''

    const otherDataObj = JSON.parse(opportunity.otherData || '{}') as OpportunityData
    otherDataObj.nafCode = establishmentInfos.value.nafCode
    otherDataObj.address = establishmentInfos.value.address
    otherDataObj.region = establishmentInfos.value.region || ''
    opportunity.otherData = JSON.stringify(otherDataObj)

    return Result.ok(opportunity)
  }
}

interface OpportunityData {
  nafCode?: string
  address?: Address
  region?: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any
}
