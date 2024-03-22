// LEGACY
export enum YesNo {
  Yes = 'oui',
  No = 'non'
}

// TOFIX objective :

// cfilter nafcode not linked for publicode
// NAF CODES
// Associates a NAF1 (composed of 1 letter) to its expected publicode variable
export const NAF1ToVar = (letter: string): string => Entreprise.CodeNAF1 + letter

export const NAF1Letters = [...'ABCDEFGHIJKLMNOPQRSTU'] as const

// publicodes variable initialization to "non"
export const codesNAF1: { [p: string]: YesNo } = Object.fromEntries(NAF1Letters.map((l) => [NAF1ToVar(l), YesNo.No]))

// deleting everything below which is clear publicode !
export enum Entreprise {
  SectorActivity = "entreprise . secteur d'activité . est ",
  CodeNAF1 = 'entreprise . code NAF niveau 1 . est ',
  CodeNAF = 'entreprise . code NAF',
  Workforce = 'entreprise . effectif',
  BuildingOwner = 'entreprise . est propriétaire de ses locaux'
}

// export enum Questionnaire {
//   priorityObjective = 'questionnaire . objectif prioritaire . est '
// }

// export enum EntrepriseSector {
//   Craftsmanship = Entreprise.SectorActivity + Sector.Craftsmanship,
//   Industry = Entreprise.SectorActivity + Sector.Industry,
//   Tourism = Entreprise.SectorActivity + Sector.Tourism,
//   Tertiary = Entreprise.SectorActivity + Sector.Tertiary,
//   Agriculture = Entreprise.SectorActivity + Sector.Agriculture,
//   Other = Entreprise.SectorActivity + Sector.Other
// }

// export const Sectors = {
//   [EntrepriseSector.Craftsmanship]: YesNo.No,
//   [EntrepriseSector.Industry]: YesNo.No,
//   [EntrepriseSector.Tourism]: YesNo.No,
//   [EntrepriseSector.Tertiary]: YesNo.No,
//   [EntrepriseSector.Agriculture]: YesNo.No,
//   [EntrepriseSector.Other]: YesNo.No
// }

// export const priorityObjectives = {
//   [Objectives.EnvironmentalImpact]: YesNo.No,
//   [Objectives.EnergyPerformance]: YesNo.No,
//   [Objectives.WaterConsumption]: YesNo.No,
//   [Objectives.BuildingRenovation]: YesNo.No,
//   [Objectives.SustainableMobility]: YesNo.No,
//   [Objectives.WasteManagement]: YesNo.No,
//   [Objectives.EcoDesign]: YesNo.No,
//   [Objectives.TrainOrRecruit]: YesNo.No,
//   [Objectives.MakeSavings]: YesNo.No,
//   [Objectives.DurablyInvest]: YesNo.No,
//   [Objectives.UnknownYet]: YesNo.No
// }
