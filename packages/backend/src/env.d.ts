declare global {
  namespace NodeJS {
    export interface ProcessEnv {
      readonly [key: string]: string | undefined
      readonly SIRENE_API_TOKEN: string
      readonly BREVO_API_TOKEN: string
      readonly BREVO_LIST_IDS: string
      readonly BREVO_SENDER_EMAIL: string
      readonly BREVO_SENDER_ID: string
      readonly BREVO_SANDBOX: string
      readonly BPI_FRANCE_CLIENT_ID: string
      readonly BPI_FRANCE_CLIENT_SECRET: string
      readonly SENTRY_DSN: string | undefined
      SENTRY_ENVIRONMENT: string
      // more env variables...
    }
  }
}

export {}
