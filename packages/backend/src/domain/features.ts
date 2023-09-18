import { EtablissementRepository, ContactInfoRepository } from './spi'
import { fetchEtablissement, postNewContact } from './api'

/**
 * Injects infrastructure dependency into domain features
 */
export const createEtablissementFeatures = (etablissementRepository: EtablissementRepository) => {
  /**
   * fetchEtablissement passes through the Promise of the infrastructure layer
   * (promise of Etablissement in case of success, Error otherwise)
   * @param siret: a SIRET. Its format is expected to be 14 digits.
   */
  const fetchEtablissement: fetchEtablissement = async (siret) => {
    return etablissementRepository.get(siret)
  }

  return { fetchEtablissement }
}

export const createContactFeatures = (contactInfoRepository: ContactInfoRepository) => {
  /**
   * postNewContact passes through the Promise of the infrastructure layer
   * (promise of BrevoResult in case of success, Error otherwise)
   *
   * @param email: an email address
   * @param attributes: attributes to store along
   */
  const postNewContact: postNewContact = async (email: string, attributes: object) => {
    return contactInfoRepository.add(email, attributes)
  }

  return { postNewContact }
}
