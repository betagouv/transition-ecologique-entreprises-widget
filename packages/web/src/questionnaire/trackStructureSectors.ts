import { Sectors, SectorByNAF, NAF1ToVar, codesNAF1, EntrepriseSector, YesNo, Sector, TrackComponent, TrackId } from '@/types'
import type { Track } from '@/types'

export const sectors: Track = {
  id: TrackId.Sectors,
  help: 'https://www.insee.fr/fr/metadonnees/nafr2',
  category: 'myEntreprise',
  title: { fr: 'Mon activité' },
  label: { fr: 'Quelle est votre activité ?' },
  interface: {
    component: TrackComponent.Buttons
  },
  behavior: {
    multipleChoices: false
  },
  options: [
    {
      value: Sector.Craftsmanship,
      questionnaireData: {
        secteur: Sector.Craftsmanship,
        ...Sectors,
        [EntrepriseSector.Craftsmanship]: YesNo.Yes,
        ...codesNAF1,
        ...(Object.assign(
          {},
          ...SectorByNAF[EntrepriseSector.Craftsmanship].map((letter) => {
            return { [NAF1ToVar(letter)]: YesNo.Yes }
          })
        ) as object)
      },
      title: { fr: 'Artisanat' },
      label: { fr: '👩‍🎨 J’ai une activité artisanale' },
      next: {
        default: TrackId.StructureRegion
      }
    },
    {
      value: Sector.Industry,
      questionnaireData: {
        secteur: Sector.Industry,
        ...Sectors,
        [EntrepriseSector.Industry]: YesNo.Yes,
        ...codesNAF1,
        ...(Object.assign(
          {},
          ...SectorByNAF[EntrepriseSector.Industry].map((letter) => {
            return { [NAF1ToVar(letter)]: YesNo.Yes }
          })
        ) as object)
      },
      title: { fr: 'Industrie' },
      label: { fr: '👩‍🔧 J’ai une activité industrielle, fabrication, production' },
      next: {
        default: TrackId.StructureRegion
      }
    },
    {
      value: Sector.Tourism,
      questionnaireData: {
        secteur: Sector.Tourism,
        ...Sectors,
        [EntrepriseSector.Tourism]: YesNo.Yes,
        ...codesNAF1,
        ...(Object.assign(
          {},
          ...SectorByNAF[EntrepriseSector.Tourism].map((letter) => {
            return { [NAF1ToVar(letter)]: YesNo.Yes }
          })
        ) as object)
      },
      title: { fr: 'Tourisme' },
      label: { fr: '🤵‍♂️ J’ai une activité de tourisme, restauration' },
      next: {
        default: TrackId.StructureRegion
      }
    },
    {
      value: Sector.Tertiary,
      questionnaireData: {
        secteur: Sector.Tertiary,
        ...Sectors,
        [EntrepriseSector.Tertiary]: YesNo.Yes,
        ...codesNAF1,
        ...(Object.assign(
          {},
          ...SectorByNAF[EntrepriseSector.Tertiary].map((letter) => {
            return { [NAF1ToVar(letter)]: YesNo.Yes }
          })
        ) as object)
      },
      title: { fr: 'Tertiaire' },
      label: { fr: '🧑‍⚖️ J’ai une activité tertiaire, de services' },
      next: {
        default: TrackId.StructureRegion
      }
    },
    {
      value: Sector.Agriculture,
      questionnaireData: {
        secteur: Sector.Agriculture,
        ...Sectors,
        [EntrepriseSector.Agriculture]: YesNo.Yes,
        ...codesNAF1,
        ...(Object.assign(
          {},
          ...SectorByNAF[EntrepriseSector.Agriculture].map((letter) => {
            return { [NAF1ToVar(letter)]: YesNo.Yes }
          })
        ) as object)
      },
      title: { fr: 'Agriculture' },
      label: { fr: '👩‍🌾 J’ai une activité agricole' },
      next: {
        default: TrackId.StructureRegion
      }
    },
    {
      value: Sector.Other,
      questionnaireData: {
        secteur: Sector.Other,
        ...Sectors,
        [EntrepriseSector.Other]: YesNo.Yes,
        ...codesNAF1,
        ...(Object.assign(
          {},
          ...SectorByNAF[EntrepriseSector.Other].map((letter) => {
            return { [NAF1ToVar(letter)]: YesNo.Yes }
          })
        ) as object)
      },
      title: { fr: 'Autre' },
      label: { fr: "Je suis dans un autre secteur d'activité" },
      next: {
        default: TrackId.StructureRegion
      }
    }
  ]
}
