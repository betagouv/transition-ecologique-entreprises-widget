import { PublicodeObjective } from '../questionnaire/types/types'
import { ThemeId, Theme as ThemeType } from './types'
import { Color } from './color'

export default class Theme {
  static themes: ThemeType[] = [
    {
      id: 'environmental',
      title: 'Analyses environnementales',
      tagLabel: '🌱 analyses',
      value: PublicodeObjective.EnvironmentalImpact,
      image: '/images/thematique/thematique-strategie.svg',
      color: Color.blue,
      highlightProjects: [1, 2]
    },
    {
      id: 'energy',
      title: 'Économies d’énergie',
      tagLabel: '⚡️ énergie',
      value: PublicodeObjective.EnergyPerformance,
      image: '/images/thematique/thematique-energie.svg',
      color: Color.yellow,
      highlightProjects: [1, 2]
    },
    {
      id: 'water',
      title: 'Économies d’eau',
      tagLabel: '💧 eau',
      value: PublicodeObjective.WaterConsumption,
      image: '/images/thematique/thematique-eau.svg',
      color: Color.blueLight,
      highlightProjects: [1, 2]
    },
    {
      id: 'building',
      title: 'Construction & rénovation',
      tagLabel: '🏢 bâtiment',
      value: PublicodeObjective.BuildingRenovation,
      image: '/images/thematique/thematique-batiments.svg',
      color: Color.blue,
      highlightProjects: [1, 2]
    },
    {
      id: 'mobility',
      title: 'Mobilité',
      tagLabel: '🚲 mobilité',
      value: PublicodeObjective.SustainableMobility,
      image: '/images/thematique/thematique-mobilite.svg',
      color: Color.green,
      highlightProjects: [1, 2]
    },
    {
      id: 'waste',
      title: 'Déchets & réemploi',
      tagLabel: '🗑 déchets',
      value: PublicodeObjective.WasteManagement,
      image: '/images/thematique/thematique-dechets.svg',
      color: Color.red,
      highlightProjects: [1, 2]
    },
    {
      id: 'eco-design',
      title: 'Éco-conception',
      tagLabel: '🔁 écoconception',
      value: PublicodeObjective.EcoDesign,
      image: '/images/thematique/thematique-eco-conception.svg',
      color: Color.green,
      highlightProjects: [1, 2]
    },
    {
      id: 'rh',
      title: 'Ressources humaines',
      tagLabel: '🧑‍🎓 RH',
      value: PublicodeObjective.TrainOrRecruit,
      image: '/images/thematique/thematique-ressources-humaines.svg',
      color: Color.yellow,
      highlightProjects: [1, 2]
    }
  ]

  static getByValue(value: PublicodeObjective) {
    return this.themes.find((theme) => theme.value === value)
  }

  static getById(id: ThemeId | undefined) {
    return this.themes.find((theme) => theme.id === id)
  }
}
