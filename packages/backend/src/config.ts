export default class Config {
  private static _sentryEnvironment = ['prod', 'preprod']
  private static _sentryDefaultEnvironment = 'preprod'

  public static get SENTRY_DSN(): string | undefined {
    if (!process.env['SENTRY_DSN']) {
      return undefined
    }

    return process.env['SENTRY_DSN']
  }

  public static get SENTRY_ENVIRONMENT(): string {
    if (!process.env['SENTRY_ENVIRONMENT']) {
      process.env['SENTRY_ENVIRONMENT'] = this._sentryDefaultEnvironment
    }

    if (!this.isValidSentryEnvironment(process.env['SENTRY_ENVIRONMENT'])) {
      throw new Error('SENTRY_ENVIRONMENT is not valid')
    }

    return process.env['SENTRY_ENVIRONMENT']
  }

  private static isValidSentryEnvironment(sentryEnvironment: string): boolean {
    return this._sentryEnvironment.includes(sentryEnvironment)
  }
}
