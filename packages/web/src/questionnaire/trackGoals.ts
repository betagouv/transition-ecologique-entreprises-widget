import type { Track } from '@/types'
import { Objective, Objectives, priorityObjectives, TrackComponent, TrackId, YesNo } from '@/types'

export const goals: Track = {
  id: TrackId.Goals,
  category: 'myEntreprise',
  title: { fr: 'Mes objectifs' },
  label: { fr: 'Quel est votre objectif prioritaire ?' },
  hint: { fr: 'Je souhaite...' },
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
      // WIP
      value: Objective.EnvironmentalImpact,
      questionnaireData: {
        ...priorityObjectives,
        [Objectives.EnvironmentalImpact]: YesNo.Yes
      },
      title: { fr: 'Impact environnemental' },
      label: { fr: '🌱 Mesurer mon impact environnemental et le réduire' },
      next: {
        default: TrackId.Results
      }
    },
    {
      value: Objective.EnergyPerformance,
      questionnaireData: {
        ...priorityObjectives,
        [Objectives.EnergyPerformance]: YesNo.Yes
      },
      title: { fr: "Gestion de l'énergie" },
      label: { fr: '⚡️ Améliorer la performance énergétique de mon entreprise' },
      next: {
        default: TrackId.Results
      }
    },
    {
      value: Objective.WaterConsumption,
      questionnaireData: {
        ...priorityObjectives,
        [Objectives.WaterConsumption]: YesNo.Yes
      },
      title: { fr: "Gestion de l'eau" },
      label: { fr: "💧 Diminuer ma consommation d'eau" },
      next: {
        default: TrackId.Results
      }
    },
    {
      value: Objective.BuildingRenovation,
      questionnaireData: {
        ...priorityObjectives,
        [Objectives.BuildingRenovation]: YesNo.Yes
      },
      title: { fr: 'Rénovation du bâtiment' },
      label: { fr: '🏢 Rénover mon bâtiment' },
      next: {
        default: TrackId.Results
      }
    },
    {
      value: Objective.SustainableMobility,
      questionnaireData: {
        ...priorityObjectives,
        [Objectives.SustainableMobility]: YesNo.Yes
      },
      title: { fr: 'Mobilité durable' },
      label: { fr: '🚲 Engager une démarche de mobilité durable' },
      next: {
        default: TrackId.Results
      }
    },
    {
      value: Objective.WasteManagement,
      questionnaireData: {
        ...priorityObjectives,
        [Objectives.WasteManagement]: YesNo.Yes
      },
      title: { fr: 'Gestion des déchets' },
      label: { fr: '🗑 Mieux gérer mes déchets' },
      next: {
        default: TrackId.Results
      }
    },
    {
      value: Objective.EcoDesign,
      questionnaireData: {
        ...priorityObjectives,
        [Objectives.EcoDesign]: YesNo.Yes
      },
      title: { fr: 'Eco-conception' },
      label: { fr: '🏭 Améliorer la performance environnementale de mes produits et services' },
      next: {
        default: TrackId.Results
      }
    },
    {
      value: Objective.TrainOrRecruit,
      questionnaireData: {
        ...priorityObjectives,
        [Objectives.TrainOrRecruit]: YesNo.Yes
      },
      title: { fr: 'Formation' },
      label: { fr: '🧑‍🎓 Former ou recruter sur la transition écologique' },
      next: {
        default: TrackId.Results
      }
    }
  ]
}
