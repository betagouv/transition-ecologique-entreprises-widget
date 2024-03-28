// CONSOLE LOG TEMPLATE
// console.log(`questionnaire.trackStructureRegion > FUNCTION_NAME > MSG_OR_VALUE :`)

import type { Track, TrackOptionsUnion } from '@/types'
import { TrackComponent, TrackId, ConditionOperators, DataMappingFrom } from '@/types'
import { QuestionnaireRoute } from '@tee/common/src/questionnaire/types'
import type { NextTrackRuleSet } from '@/types'

// note : based on authorized values in "/packages/data/common/interface.yaml"
const regionsList = [
  //France métropolitaine
  'Auvergne-Rhône-Alpes',
  'Bourgogne-Franche-Comté',
  'Bretagne',
  'Centre-Val de Loire',
  'Corse',
  'Grand Est',
  'Hauts-de-France',
  'Normandie',
  'Nouvelle-Aquitaine',
  'Occitanie',
  "Provence-Alpes-Côte d'Azur",
  'Pays de la Loire',
  'Île-de-France',

  //DOM
  'Guadeloupe',
  'Guyane',
  'La Réunion',
  'Martinique',
  'Mayotte',

  //Collectivités d'outre-mer
  'Ile de Clipperton',
  'Nouvelle-Calédonie',
  'Polynésie française',
  'Saint-Barthélemy',
  'Saint-Martin',
  'Saint-Pierre-Et-Miquelon',
  'Terres australes et antarctiques françaises',
  'Wallis et Futuna'
]

const nextTrackRulesSet: NextTrackRuleSet[] = [
  {
    help: "Goes to track_structure_building_property if : questionnaire_route == 'no_specific_goal' (newbie)",
    rules: [
      {
        from: DataMappingFrom.UsedTracks,
        id: 'questionnaire_route',
        dataField: 'questionnaire_route',
        conditions: [
          {
            type: 'questionnaire_route',
            operator: ConditionOperators.is,
            value: QuestionnaireRoute.NoSpecificGoal
          }
        ]
      }
    ],
    next: { default: TrackId.BuildingProperty }
  },
  {
    help: "Goes to track_goals if : questionnaire_route == 'specific_goal' (pro)",
    rules: [
      {
        from: DataMappingFrom.UsedTracks,
        id: 'questionnaire_route',
        dataField: 'questionnaire_route',
        conditions: [
          {
            type: 'questionnaire_route',
            operator: ConditionOperators.is,
            value: QuestionnaireRoute.SpecificGoal
          }
        ]
      }
    ],
    next: { default: TrackId.Goals }
  }
]

const regionsOptions: TrackOptionsUnion[] = regionsList.map((regName) => {
  return {
    value: regName,
    questionnaireData: { région: regName },
    title: { fr: regName },
    label: { fr: regName },
    next: {
      default: TrackId.Goals,
      ruleSet: nextTrackRulesSet
    }
  }
})

export const regions: Track = {
  id: TrackId.StructureRegion,
  category: 'myEntreprise',
  title: { fr: 'Ma localisation' },
  label: { fr: 'Où êtes-vous situé ?' },
  interface: {
    component: TrackComponent.Select
  },
  behavior: {
    multipleChoices: false
  },
  options: regionsOptions
}
