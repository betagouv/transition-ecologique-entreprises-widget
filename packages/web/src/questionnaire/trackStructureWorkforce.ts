import type { NextTrackRuleSet, Track } from '@/types'
import { ConditionOperators, DataMappingFrom, TrackComponents, TrackId } from '@/types'
import { QuestionnaireRoute } from '@tee/common/src/questionnaire/types'
import { Entreprise } from '@/types/publicodesObjects'

const nextExceptions: NextTrackRuleSet[] = [
  {
    help: "Goes to track_sectors if : doesn't have infos about sector",
    rules: [
      {
        from: DataMappingFrom.UsedTracks,
        id: 'siret',
        dataField: 'siret',
        conditions: [
          {
            type: 'siret',
            operator: ConditionOperators.isMissing
          }
        ]
      }
    ],
    next: { default: TrackId.Sectors }
  },
  {
    help: "Goes to track_structure_building_property if : has infos about codeNaf AND questionnaire_route == 'no_specific_goal' (newbie)",
    rules: [
      {
        from: DataMappingFrom.UsedTracks,
        id: 'codeNaf',
        dataField: 'codeNaf',
        conditions: [
          {
            type: 'codeNaf',
            operator: ConditionOperators.exists
          }
        ]
      },
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
    help: "Goes to track_goals if : have infos about sector AND questionnaire_route == 'specific_goal' (pro)",
    rules: [
      {
        from: DataMappingFrom.UsedTracks,
        id: 'codeNaf',
        dataField: 'codeNaf',
        conditions: [
          {
            type: 'codeNaf',
            operator: ConditionOperators.exists
          }
        ]
      },
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

export const workforce: Track = {
  id: TrackId.StructureWorkforce,
  category: 'myEntreprise',
  title: { fr: 'Mes effectifs' },
  label: { fr: 'Combien êtes-vous dans votre entreprise ?' },
  interface: {
    component: TrackComponents.Buttons
  },
  behavior: {
    multipleChoices: false
  },
  options: [
    {
      disabled: false,
      value: { [Entreprise.Workforce]: 1, structure_sizes: ['Entreprise Individuelle'] },
      title: { fr: 'Entreprise individuelle' },
      label: { fr: '‍️🧍Je suis un entrepreneur individuel' },
      next: {
        default: TrackId.Sectors,
        exceptions: nextExceptions
      }
    },
    {
      disabled: false,
      value: { [Entreprise.Workforce]: 19, structure_sizes: ['TPE'] },
      title: { fr: 'Moins de 20 employés' },
      label: { fr: '‍️👫 Moins de 20 employés' },
      next: {
        default: TrackId.Sectors,
        exceptions: nextExceptions
      }
    },
    {
      disabled: false,
      value: { [Entreprise.Workforce]: 49, structure_sizes: ['PME'] },
      title: { fr: 'Entre 20 et 49 employés' },
      label: { fr: '‍️👫👫 Entre 20 et 49 employés' },
      next: {
        default: TrackId.Sectors,
        exceptions: nextExceptions
      }
    },
    {
      disabled: false,
      value: { [Entreprise.Workforce]: 249, structure_sizes: ['PME'] },
      title: { fr: 'Entre 50 et 250 employés' },
      label: { fr: '‍️👫👭👫 Entre 50 et 250 employés' },
      next: {
        default: TrackId.Sectors,
        exceptions: nextExceptions
      }
    },
    {
      disabled: false,
      value: { [Entreprise.Workforce]: 251, structure_sizes: ['ETI ou Grande Entreprise'] },
      title: { fr: '+250 employés' },
      label: { fr: '👫👭👫👫 Plus de 250 employés' },
      next: {
        default: TrackId.Sectors,
        exceptions: nextExceptions
      }
    }
  ]
}
