import { Color, Objective as ObjectiveEnum, PublicodeObjective, PublicodesKeys, ThemeId, ThemeType } from '@/types'
import UsedTrack from '@/utils/track/usedTrack'

export class Theme {
  static themes: ThemeType[] = [
    {
      id: ThemeId.Environmental,
      title: 'Analyses environnementales',
      tagLabel: '🌱 analyses',
      value: PublicodeObjective.EnvironmentalImpact,
      image: '/images/thematique/thematique-strategie.svg',
      color: Color.blue
    },
    {
      id: ThemeId.Energy,
      title: 'Économies d’énergie',
      tagLabel: '⚡️ énergie',
      value: PublicodeObjective.EnergyPerformance,
      image: '/images/thematique/thematique-energie.svg',
      color: Color.yellow
    },
    {
      id: ThemeId.Water,
      title: 'Économies d’eau',
      tagLabel: '💧 eau',
      value: PublicodeObjective.WaterConsumption,
      image: '/images/thematique/thematique-eau.svg',
      color: Color.blueLight
    },
    {
      id: ThemeId.Building,
      title: 'Construction & rénovation',
      tagLabel: '🏢 bâtiment',
      value: PublicodeObjective.BuildingRenovation,
      image: '/images/thematique/thematique-batiments.svg',
      color: Color.blue
    },
    {
      id: ThemeId.Mobility,
      title: 'Mobilité',
      tagLabel: '🚲 mobilité',
      value: PublicodeObjective.SustainableMobility,
      image: '/images/thematique/thematique-mobilite.svg',
      color: Color.green
    },
    {
      id: ThemeId.Waste,
      title: 'Déchets & réemploi',
      tagLabel: '🗑 déchets',
      value: PublicodeObjective.WasteManagement,
      image: '/images/thematique/thematique-dechets.svg',
      color: Color.red
    },
    {
      id: ThemeId.EcoDesign,
      title: 'Éco-conception',
      tagLabel: '🔁 écoconception',
      value: PublicodeObjective.EcoDesign,
      image: '/images/thematique/thematique-eco-conception.svg',
      color: Color.green
    },
    {
      id: ThemeId.RH,
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

  static getTitleByValue(objective: PublicodeObjective) {
    return this.getByValue(objective)?.title ?? ''
  }

  static getImageByValue(objective: PublicodeObjective) {
    return this.getByValue(objective)?.image ?? ''
  }

  static getColorByValue(objective: PublicodeObjective) {
    return this.getByValue(objective)?.color ?? ''
  }

  static getTags(): ThemeType[] {
    const tags = []

    if (UsedTrack.isNoSpecificGoal()) {
      UsedTrack.isEnvironmentalImpactObjective()
        ? tags.push(this.getByValue(PublicodeObjective.EnvironmentalImpact) as ThemeType)
        : undefined
      UsedTrack.isEcoDesignObjective() ? tags.push(this.getByValue(PublicodeObjective.EcoDesign) as ThemeType) : undefined
      UsedTrack.isEnergyObjective() ? tags.push(this.getByValue(PublicodeObjective.EnergyPerformance) as ThemeType) : undefined
      UsedTrack.isWasteObjective() ? tags.push(this.getByValue(PublicodeObjective.WasteManagement) as ThemeType) : undefined
      UsedTrack.isWaterObjective() ? tags.push(this.getByValue(PublicodeObjective.WaterConsumption) as ThemeType) : undefined
      UsedTrack.isMobilityObjective() ? tags.push(this.getByValue(PublicodeObjective.SustainableMobility) as ThemeType) : undefined

      return tags
    }

    tags.push(...this.themes)

    return tags
  }

  static isPublicodeObjective(objective: PublicodeObjective | ''): objective is PublicodeObjective {
    return objective !== ''
  }

  static getPublicodeObjectiveByObjective(objective: ObjectiveEnum): PublicodeObjective | undefined {
    const key = Object.keys(PublicodeObjective).find(
      (key) => PublicodeObjective[key as keyof typeof PublicodeObjective] === ((PublicodesKeys.Goal + objective) as PublicodeObjective)
    ) as keyof typeof PublicodeObjective | undefined

    if (!key) {
      return undefined
    }

    return PublicodeObjective[key]
  }
}
