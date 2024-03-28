import type { Track } from '@/types'
import { TrackComponent, TrackId, YesNo } from '@/types'

export const wastesSorting: Track = {
  id: TrackId.WastesSorting,
  category: 'myWastes',
  title: { fr: 'Tri des déchets' },
  label: { fr: 'Avez-vous mis en place une solution de tri des déchets dans votre entreprise ?' },
  callout: {
    header: { fr: 'Thématique' },
    headerStyle: 'color: #3A3A3A;',
    bgColor: '#FCA081',
    title: { fr: 'Votre gestion des déchets' },
    titleStyle: 'color: #000091;',
    bigTitle: true,
    imageLeft: 'images/thema/thema-dechets.svg'
  },
  interface: {
    component: TrackComponent.Buttons
  },
  behavior: {
    multipleChoices: false
  },
  next: {
    default: TrackId.Results
  },
  options: [
    {
      value: YesNo.Yes,
      questionnaireData: { wastes_sorting: YesNo.Yes },
      title: { fr: 'Oui' },
      label: { fr: '✅ Oui, j’ai déjà mis en place un système de tri' },
      next: {
        default: TrackId.WastesMaterials
      }
    },
    {
      value: YesNo.No,
      questionnaireData: { wastes_sorting: 'can do better' },
      title: { fr: 'Je peux faire mieux' },
      label: { fr: '🗑 Je peux faire mieux !' },
      next: {
        default: TrackId.WastesMaterials
      }
    },
    {
      value: YesNo.Unknown,
      questionnaireData: { wastes_sorting: YesNo.Unknown },
      title: { fr: 'Je ne sais pas' },
      label: { fr: 'Je ne sais pas' },
      next: {
        default: TrackId.WastesMaterials
      }
    }
  ]
}
