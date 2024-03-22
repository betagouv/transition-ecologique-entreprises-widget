import { TrackComponents, TrackId } from '@/types'
import type { Track } from '@/types'
import { Sector } from '@tee/common/src/questionnaire/types'

export const sectors: Track = {
  id: TrackId.Sectors,
  help: 'https://www.insee.fr/fr/metadonnees/nafr2',
  category: 'myEntreprise',
  title: { fr: 'Mon activité' },
  label: { fr: 'Quelle est votre activité ?' },
  interface: {
    component: TrackComponents.Buttons
  },
  behavior: {
    multipleChoices: false
  },
  options: [
    {
      value: { secteur: Sector.Craftsmanship },
      title: { fr: 'Artisanat' },
      label: { fr: '👩‍🎨 J’ai une activité artisanale' },
      next: {
        default: TrackId.StructureRegion
      }
    },
    {
      value: { secteur: Sector.Industry },
      title: { fr: 'Industrie' },
      label: { fr: '👩‍🔧 J’ai une activité industrielle, fabrication, production' },
      next: {
        default: TrackId.StructureRegion
      }
    },
    {
      value: { secteur: Sector.Tourism },
      title: { fr: 'Tourisme' },
      label: { fr: '🤵‍♂️ J’ai une activité de tourisme, restauration' },
      next: {
        default: TrackId.StructureRegion
      }
    },
    {
      value: { secteur: Sector.Tertiary },
      title: { fr: 'Tertiaire' },
      label: { fr: '🧑‍⚖️ J’ai une activité tertiaire, de services' },
      next: {
        default: TrackId.StructureRegion
      }
    },
    {
      value: { secteur: Sector.Agriculture },
      title: { fr: 'Agriculture' },
      label: { fr: '👩‍🌾 J’ai une activité agricole' },
      next: {
        default: TrackId.StructureRegion
      }
    },
    {
      value: { secteur: Sector.Other },
      title: { fr: 'Autre' },
      label: { fr: "Je suis dans un autre secteur d'activité" },
      next: {
        default: TrackId.StructureRegion
      }
    }
  ]
}
