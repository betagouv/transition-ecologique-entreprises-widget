export interface EstablishmentDocument {
  etablissement: {
    siren: string
    nic: string
    siret: string
    statutDiffusionEtablissement: string
    dateCreationEtablissement: string
    trancheEffectifsEtablissement: null
    anneeEffectifsEtablissement: null
    activitePrincipaleRegistreMetiersEtablissement: null
    dateDernierTraitementEtablissement: string
    etablissementSiege: boolean
    nombrePeriodesEtablissement: number
    uniteLegale: {
      etatAdministratifUniteLegale: string
      statutDiffusionUniteLegale: string
      dateCreationUniteLegale: string
      categorieJuridiqueUniteLegale: string
      denominationUniteLegale: string
      sigleUniteLegale: null
      denominationUsuelle1UniteLegale: null
      denominationUsuelle2UniteLegale: null
      denominationUsuelle3UniteLegale: null
      sexeUniteLegale: null
      nomUniteLegale: null
      nomUsageUniteLegale: null
      prenom1UniteLegale: null
      prenom2UniteLegale: null
      prenom3UniteLegale: null
      prenom4UniteLegale: null
      prenomUsuelUniteLegale: null
      pseudonymeUniteLegale: null
      activitePrincipaleUniteLegale: string
      nomenclatureActivitePrincipaleUniteLegale: string
      identifiantAssociationUniteLegale: null
      economieSocialeSolidaireUniteLegale: string
      societeMissionUniteLegale: string
      caractereEmployeurUniteLegale: string
      trancheEffectifsUniteLegale: string
      anneeEffectifsUniteLegale: string
      nicSiegeUniteLegale: string
      dateDernierTraitementUniteLegale: string
      categorieEntreprise: string
      anneeCategorieEntreprise: string
    }
    adresseEtablissement: {
      complementAdresseEtablissement: null
      numeroVoieEtablissement: string
      indiceRepetitionEtablissement: null
      typeVoieEtablissement: string
      libelleVoieEtablissement: string
      codePostalEtablissement: string
      libelleCommuneEtablissement: string
      libelleCommuneEtrangerEtablissement: null
      distributionSpecialeEtablissement: null
      codeCommuneEtablissement: string
      codeCedexEtablissement: null
      libelleCedexEtablissement: null
      codePaysEtrangerEtablissement: null
      libellePaysEtrangerEtablissement: null
    }
    adresse2Etablissement: {
      complementAdresse2Etablissement: null
      numeroVoie2Etablissement: null
      indiceRepetition2Etablissement: null
      typeVoie2Etablissement: null
      libelleVoie2Etablissement: null
      codePostal2Etablissement: null
      libelleCommune2Etablissement: null
      libelleCommuneEtranger2Etablissement: null
      distributionSpeciale2Etablissement: null
      codeCommune2Etablissement: null
      codeCedex2Etablissement: null
      libelleCedex2Etablissement: null
      codePaysEtranger2Etablissement: null
      libellePaysEtranger2Etablissement: null
    }
    periodesEtablissement: [
      {
        dateFin: null
        dateDebut: string
        etatAdministratifEtablissement: string
        changementEtatAdministratifEtablissement: boolean
        enseigne1Etablissement: null
        enseigne2Etablissement: null
        enseigne3Etablissement: null
        changementEnseigneEtablissement: boolean
        denominationUsuelleEtablissement: null
        changementDenominationUsuelleEtablissement: boolean
        activitePrincipaleEtablissement: string
        nomenclatureActivitePrincipaleEtablissement: string
        changementActivitePrincipaleEtablissement: boolean
        caractereEmployeurEtablissement: string
        changementCaractereEmployeurEtablissement: boolean
      }
    ]
  }
}

export interface BrevoBody {
  email: string
  listIds: number[]
  attributes: object
}
