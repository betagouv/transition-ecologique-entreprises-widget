import type { Track } from '@/types'
import { Entreprise, TrackComponent, TrackId, YesNo } from '@/types'

export enum BuildingProperty {
  Owns = 'owns',
  Rents = 'rents',
  OwnsAndRents = 'owns_and_rents'
}

export const buildingProperty: Track = {
  id: TrackId.BuildingProperty,
  category: 'myBuildings',
  title: { fr: 'Mon statut' },
  label: { fr: 'Parlons de vos locaux. Vous êtes :' },
  callout: {
    header: { fr: 'Thématique' },
    headerStyle: 'color: white;',
    bgColor: '#6672F8',
    title: { fr: 'Zoom sur vos bâtiments' },
    titleStyle: 'color: white;',
    bigTitle: true,
    imageLeft: 'images/thema/thema-batiments.svg'
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
      value: BuildingProperty.Owns,
      questionnaireData: {
        structure_building_property: BuildingProperty.Owns,
        [Entreprise.BuildingOwner]: YesNo.Yes
      },
      title: { fr: 'Propriétaire' },
      label: { fr: '🔑 Propriétaire' },
      next: {
        default: TrackId.MobilityWishes
      }
    },
    {
      value: BuildingProperty.Rents,
      questionnaireData: {
        structure_building_property: BuildingProperty.Rents,
        [Entreprise.BuildingOwner]: YesNo.No
      },
      title: { fr: 'Locataire' },
      label: { fr: '📝 Locataire ' },
      next: {
        default: TrackId.MobilityWishes
      }
    },
    {
      value: BuildingProperty.OwnsAndRents,
      questionnaireData: {
        structure_building_property: BuildingProperty.OwnsAndRents,
        [Entreprise.BuildingOwner]: YesNo.Yes
      },
      title: { fr: 'Propriétaire & locataire' },
      label: { fr: 'Je suis à la fois propriétaire et locataire sur mes différents locaux' },
      next: {
        default: TrackId.MobilityWishes
      }
    }
  ]
}
