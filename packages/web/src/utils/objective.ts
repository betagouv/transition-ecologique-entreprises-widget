import { PublicodeObjective, Objective as ObjectiveEnum, PublicodesKeys, Theme, Color } from '@/types'
import UsedTrack from '@/utils/track/usedTrack'

export default class Objective {
  static objectives: Theme[] = [
    {
      id: 'analyse',
      title: 'Analyses environnementales',
      tagLabel: '🌱 analyses',
      value: PublicodeObjective.EnvironmentalImpact,
      image: '/images/thematique/thematique-strategie.svg',
      color: Color.blue,
      highlightProjects: [1, 2],
      displayDots: true
    },
    {
      id: 'energie',
      title: 'Économies d’énergie',
      tagLabel: '⚡️ énergie',
      value: PublicodeObjective.EnergyPerformance,
      image: '/images/thematique/thematique-energie.svg',
      color: Color.yellow,
      highlightProjects: [1, 2],
      displayDots: true
    },
    {
      id: 'eau',
      title: 'Économies d’eau',
      tagLabel: '💧 eau',
      value: PublicodeObjective.WaterConsumption,
      image: '/images/thematique/thematique-eau.svg',
      color: Color.blueLight,
      highlightProjects: [1],
      displayDots: false
    },
    {
      id: 'batiment',
      title: 'Construction & rénovation',
      tagLabel: '🏢 bâtiment',
      value: PublicodeObjective.BuildingRenovation,
      image: '/images/thematique/thematique-batiments.svg',
      color: Color.blue,
      highlightProjects: [1, 2],
      displayDots: true
    },
    {
      id: 'mobilite',
      title: 'Mobilité',
      tagLabel: '🚲 mobilité',
      value: PublicodeObjective.SustainableMobility,
      image: '/images/thematique/thematique-mobilite.svg',
      color: Color.green,
      highlightProjects: [1, 2],
      displayDots: true
    },
    {
      id: 'renovation',
      title: 'Déchets & réemploi',
      tagLabel: '🗑 déchets',
      value: PublicodeObjective.WasteManagement,
      image: '/images/thematique/thematique-dechets.svg',
      color: Color.red,
      highlightProjects: [1, 2],
      displayDots: true
    },
    {
      id: 'ecoconception',
      title: 'Éco-conception',
      tagLabel: '🔁 écoconception',
      value: PublicodeObjective.EcoDesign,
      image: '/images/thematique/thematique-eco-conception.svg',
      color: Color.green,
      highlightProjects: [1, 2],
      displayDots: true
    },
    {
      id: 'rh',
      title: 'Ressources humaines',
      tagLabel: '🧑‍🎓 RH',
      value: PublicodeObjective.TrainOrRecruit,
      image: '/images/thematique/thematique-ressources-humaines.svg',
      color: Color.yellow,
      highlightProjects: [1, 2],
      displayDots: true
    }
  ]

  static getObjective(publicodeObjective: PublicodeObjective) {
    return this.objectives.find((objective) => objective.value === publicodeObjective)
  }

  static getTitleByObjective(objective: PublicodeObjective) {
    return this.getObjective(objective)?.title ?? ''
  }

  static getImageByObjective(objective: PublicodeObjective) {
    return this.getObjective(objective)?.image ?? ''
  }

  static getColorByObjective(objective: PublicodeObjective) {
    return this.getObjective(objective)?.color ?? ''
  }

  static getTags(): Objective[] {
    const tags = []

    if (UsedTrack.isNoSpecificGoal()) {
      UsedTrack.isEnvironmentalImpactObjective() ? tags.push(this.getObjective(PublicodeObjective.EnvironmentalImpact) as Theme) : undefined
      UsedTrack.isEcoDesignObjective() ? tags.push(this.getObjective(PublicodeObjective.EcoDesign) as Theme) : undefined
      UsedTrack.isEnergyObjective() ? tags.push(this.getObjective(PublicodeObjective.EnergyPerformance) as Theme) : undefined
      UsedTrack.isWasteObjective() ? tags.push(this.getObjective(PublicodeObjective.WasteManagement) as Theme) : undefined
      UsedTrack.isWaterObjective() ? tags.push(this.getObjective(PublicodeObjective.WaterConsumption) as Theme) : undefined
      UsedTrack.isMobilityObjective() ? tags.push(this.getObjective(PublicodeObjective.SustainableMobility) as Theme) : undefined

      return tags
    }

    tags.push(...this.objectives)
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
