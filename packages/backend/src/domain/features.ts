import { EstablishmentRepository, ContactInfoRepository } from './spi'
import { postNewContact } from './api'
import { fetchEstablishment } from './establishment/api'

/**
 * Injects infrastructure dependency into domain features
 */
export const createEstablishmentFeatures = (repo: EstablishmentRepository) => {
  /*
   * fetchEstablishment passes through the Promise of the infrastructure layer
   * (promise of Establishment in case of success, Error otherwise)
   * @param siret: a SIRET. Its format is expected to be 14 digits.
   */
  const fetchEstablishment: fetchEstablishment = async (siret) => {
    return repo.get(siret)
  }

  return { fetchEstablishment }
}

export const createContactFeatures = (repo: ContactInfoRepository) => {
  /**
   * postNewContact passes through the Promise of the infrastructure layer
   * (promise of ContactId in case of success, Error otherwise)
   *
   * @param email - an email address
   * @param attributes - attributes to store along
   */
  const postNewContact: postNewContact = async (email, attributes) => {
    return repo.add(email, attributes)
  }

  return { postNewContact }
}
