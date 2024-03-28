import type { Track } from '@/types'
import { Objectives, TrackComponent, TrackId, YesNo } from '@/types'

export const waterStake: Track = {
  id: TrackId.WaterStake,
  category: 'myWater',
  title: { fr: 'Enjeu' },
  label: { fr: "Pensez-vous avoir un enjeu important sur votre consommation d'eau ?" },
  callout: {
    header: { fr: 'Thématique' },
    headerStyle: 'color: #3A3A3A;',
    bgColor: '#E8EDFF',
    title: { fr: "Votre gestion de l'eau" },
    titleStyle: 'color: #000091;',
    bigTitle: true,
    imageLeft: 'images/thema/thema-eau.svg'
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
      questionnaireData: { water_stake: YesNo.Yes, [Objectives.WaterConsumption]: YesNo.Yes },
      title: { fr: 'Oui' },
      label: { fr: "👍 Oui, je pense que c'est un enjeu pour mon entreprise" },
      next: {
        default: TrackId.EnergyReductionPriority
      }
    },
    {
      value: YesNo.No,
      questionnaireData: { water_stake: YesNo.No, [Objectives.WaterConsumption]: YesNo.No },
      title: { fr: 'Non' },
      label: { fr: '👎 Non, pas vraiment' },
      next: {
        default: TrackId.EnergyReductionPriority
      }
    },
    {
      value: YesNo.Unknown,
      questionnaireData: { water_stake: 'unknown', [Objectives.WaterConsumption]: YesNo.Yes },
      title: { fr: 'Je ne sais pas' },
      label: { fr: 'Aucune idée !' },
      next: {
        default: TrackId.EnergyReductionPriority
      }
    }
  ]
}
