import { Color } from '@tee/web/src/types/color'
import { CoreThemeType } from '../types'
import { PublicodeObjective } from '@tee/common/src/questionnaire/types/types'

export default class CoreTheme {
  static themes: CoreThemeType[] = [
    {
      id: 'environmental',
      title: 'Analyses environnementales',
      tagLabel: '🌱 analyses',
      value: PublicodeObjective.EnvironmentalImpact,
      image: '/images/thematique/thematique-strategie.svg',
      color: Color.blue
    },
    {
      id: 'energy',
      title: 'Économies d’énergie',
      tagLabel: '⚡️ énergie',
      value: PublicodeObjective.EnergyPerformance,
      image: '/images/thematique/thematique-energie.svg',
      color: Color.yellow
    },
    {
      id: 'water',
      title: 'Économies d’eau',
      tagLabel: '💧 eau',
      value: PublicodeObjective.WaterConsumption,
      image: '/images/thematique/thematique-eau.svg',
      color: Color.blueLight
    },
    {
      id: 'building',
      title: 'Construction & rénovation',
      tagLabel: '🏢 bâtiment',
      value: PublicodeObjective.BuildingRenovation,
      image: '/images/thematique/thematique-batiments.svg',
      color: Color.blue
    },
    {
      id: 'mobility',
      title: 'Mobilité',
      tagLabel: '🚲 mobilité',
      value: PublicodeObjective.SustainableMobility,
      image: '/images/thematique/thematique-mobilite.svg',
      color: Color.green
    },
    {
      id: 'waste',
      title: 'Déchets & réemploi',
      tagLabel: '🗑 déchets',
      value: PublicodeObjective.WasteManagement,
      image: '/images/thematique/thematique-dechets.svg',
      color: Color.red
    },
    {
      id: 'eco-design',
      title: 'Éco-conception',
      tagLabel: '🔁 écoconception',
      value: PublicodeObjective.EcoDesign,
      image: '/images/thematique/thematique-eco-conception.svg',
      color: Color.green
    },
    {
      id: 'rh',
      title: 'Ressources humaines',
      tagLabel: '🧑‍🎓 RH',
      value: PublicodeObjective.TrainOrRecruit,
      image: '/images/thematique/thematique-ressources-humaines.svg',
      color: Color.yellow
    }
  ]

  static getByValue(value: PublicodeObjective) {
    return this.themes.find((theme) => theme.value === value)
  }
  static getById(id: string) {
    return this.themes.find((theme) => theme.id === id)
  }
}

export type ThemeId = (typeof CoreTheme.themes)[number]['id']
