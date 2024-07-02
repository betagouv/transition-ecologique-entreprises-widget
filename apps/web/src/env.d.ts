/// <reference types="vite/client" />
export interface ImportMetaEnv {
  readonly [key: string]: boolean | string | number
  readonly VITE_NO_DEBUG_SWITCH: string
  readonly VITE_DEPLOY_URL: string
  readonly VITE_CONTACT_EMAIL: string
  readonly VITE_MATOMO_DEACTIVATE: string
  readonly VITE_MATOMO_URL: string
  readonly VITE_MATOMO_APP_ID: number
  readonly VITE_TEE_BACKEND_URL: string
  readonly VITE_SENTRY_DSN: string | undefined
  readonly SENTRY_AUTH_TOKEN: string | undefined
  VITE_SENTRY_ENVIRONMENT: string
  readonly BASE_URL: string
  readonly MODE: string
  readonly DEV: boolean
  readonly PROD: boolean
  readonly SSR: boolean
  // more env variables...
}

export interface ImportMeta {
  readonly env: ImportMetaEnv
}
