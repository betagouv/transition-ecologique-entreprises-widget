import type { CurrentDateProvider } from '../domain/spi'

export const currentDateService: CurrentDateProvider = {
  get: () => new Date().toLocaleDateString('fr-FR')
}
