import type { Track } from '@/types'
import { Objectives, TrackComponent, TrackId, YesNo } from '@/types'

export const wastesStake: Track = {
  id: TrackId.WastesStake,
  category: 'myWastes',
  title: { fr: 'Enjeu' },
  label: { fr: 'Aimeriez-vous améliorer la gestion des déchets de votre activité ? ' },
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
      questionnaireData: { wastes_stake: YesNo.Yes, [Objectives.WasteManagement]: YesNo.Yes },
      title: { fr: 'Oui' },
      label: { fr: '👍 Oui, j’aimerais faire mieux !' },
      next: {
        default: TrackId.WastesSorting
      }
    },
    {
      value: 'maximum',
      questionnaireData: { wastes_stake: 'no-max', [Objectives.WasteManagement]: YesNo.No },
      title: { fr: 'Non' },
      label: { fr: '🤓 Non, je fais déja mon maximum' },
      next: {
        default: TrackId.WastesSorting
      }
    },
    {
      value: YesNo.No,
      questionnaireData: { wastes_stake: YesNo.No, [Objectives.WasteManagement]: YesNo.No },
      title: { fr: 'Non' },
      label: { fr: '👎 Non, la gestion des déchets n’est pas un enjeu pour moi ' },
      next: {
        default: TrackId.WastesSorting
      }
    },
    {
      value: YesNo.Unknown,
      questionnaireData: { wastes_stake: YesNo.Unknown, [Objectives.WasteManagement]: YesNo.Yes },
      title: { fr: 'Aucune idée' },
      label: { fr: 'Aucune idée' },
      next: {
        default: TrackId.WastesSorting
      }
    }
  ]
}
