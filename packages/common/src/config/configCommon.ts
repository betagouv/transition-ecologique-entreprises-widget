import { Environment } from './types'

export default abstract class ConfigCommon {
  protected static _sentryEnvironments: Environment[] = [Environment.Prod, Environment.Preprod]
  protected static _sentryDefaultEnvironment = Environment.Preprod

  protected static _sentryDsn: string | undefined
  protected static _sentryEnvironment: Environment | undefined

  protected static isValidSentryEnvironment(sentryEnvironment: Environment): boolean {
    return this._sentryEnvironments.includes(sentryEnvironment)
  }

  protected static getEnvValue(name: string, defaultValue: string | undefined = undefined): string {
    const value = process.env[name]

    if (!value) {
      if (defaultValue) {
        return defaultValue
      }

      throw new Error(`${name} is not defined`)
    }

    return value
  }

  public static get SENTRY_DSN(): string | undefined {
    if (!this._sentryDsn) {
      return undefined
    }

    return this._sentryDsn
  }

  public static get SENTRY_ENVIRONMENT(): Environment {
    if (!this._sentryEnvironment) {
      this._sentryEnvironment = this._sentryDefaultEnvironment
    }

    if (!this.isValidSentryEnvironment(this._sentryEnvironment)) {
      throw new Error('SENTRY_ENVIRONMENT is not valid')
    }

    return this._sentryEnvironment
  }
}
