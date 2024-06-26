import { SendSmtpEmail, TransactionalEmailsApi, TransactionalEmailsApiApiKeys } from '@getbrevo/brevo'
import { Maybe } from 'true-myth'
import Config from '../../../../config'
import { Program as ProgramType } from '../../../../program/domain/types/types'
import Program from '../../../../../../common/src/program/program'
import { MailerManager } from '../../../domain/spi'
import { Opportunity } from '../../../domain/types'

export default class BrevoMail {
  private readonly _templateReceipt = 11
  private _api = new TransactionalEmailsApi()

  constructor() {
    this._api.setApiKey(TransactionalEmailsApiApiKeys.apiKey, Config.BREVO_API_TOKEN)
  }

  sendReturnReceipt: MailerManager['sendReturnReceipt'] = async (
    opportunity: Opportunity,
    program: ProgramType
  ): Promise<Maybe<Error> | void> => {
    try {
      await this._api.sendTransacEmail(this._email(opportunity, program))
    } catch (error: unknown) {
      return Maybe.just(error as Error)
    }
  }

  private _email(opportunity: Opportunity, program: ProgramType) {
    const email = new SendSmtpEmail()

    email.templateId = this._templateReceipt
    email.sender = { id: Config.BREVO_SENDER_ID }
    email.to = [{ email: opportunity.email, name: this._getFullName(opportunity) }]
    email.params = this._params(opportunity, program)

    this._setHeaders(email)

    return email
  }

  private _params(opportunity: Opportunity, program: ProgramType) {
    return {
      programName: program.titre,
      prefixedProgramName: Program.getPrefixedProgramName(program),
      programLink: opportunity.linkToProgramPage,
      programPromise: program.promesse,
      operatorName: program['opérateur de contact'],
      needs: opportunity.message,
      firstname: opportunity.firstName,
      lastname: opportunity.lastName,
      phone: opportunity.phoneNumber,
      siret: opportunity.companySiret,
      date: new Date().toLocaleDateString('fr-FR', { year: 'numeric', month: 'numeric', day: 'numeric' })
    }
  }

  private _getFullName(opportunity: Opportunity) {
    return `${opportunity.firstName} ${opportunity.lastName}`
  }

  private _setHeaders(email: SendSmtpEmail) {
    if (Config.BREVO_SANDBOX) {
      email.headers = { 'X-Sib-Sandbox': 'drop' }
    }
  }
}
