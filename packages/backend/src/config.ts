import ConfigCommon from '../../common/src/config/configCommon'
import { Environment } from '@tee/common/src/config/types'

export default class Config extends ConfigCommon {
  protected static override _sentryDsn = process.env['SENTRY_DSN']
  protected static override _sentryEnvironment = process.env['SENTRY_ENVIRONMENT'] as Environment

  public static get BPI_FRANCE_CLIENT_ID(): string {
    return this.getEnvValue('BPI_FRANCE_CLIENT_ID')
  }

  public static get BPI_FRANCE_CLIENT_SECRET(): string {
    return this.getEnvValue('BPI_FRANCE_CLIENT_SECRET')
  }

  public static get BREVO_API_TOKEN(): string {
    return this.getEnvValue('BREVO_API_TOKEN')
  }

  public static get BREVO_SANDBOX(): boolean {
    return this.getEnvValue('BREVO_SANDBOX', 'false') === 'true'
  }

  public static get BREVO_SENDER_ID(): number {
    return parseInt(this.getEnvValue('BREVO_SENDER_ID'))
  }

  public static get BREVO_DEAL_PIPELINE(): string | undefined {
    return this.getEnvValue('BREVO_DEAL_PIPELINE')
  }
}
