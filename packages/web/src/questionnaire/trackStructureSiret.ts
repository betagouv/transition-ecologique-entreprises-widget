// CONSOLE LOG TEMPLATE
// console.log(`questionnaire.trackSiret > FUNCTION_NAME > MSG_OR_VALUE :`)

import { HasInputOptions, SiretValue, TrackComponent, TrackId } from '@/types'
import type { Track, NextTrackRuleSet, EstablishmentType } from '@/types'
import { ConditionOperators, DataMappingFrom } from '@/types'
import { QuestionnaireRoute, LegalCategory } from '@/types'
import SiretValidator from '@tee/common/src/establishment/validator/siretValidator'

// legalCategory == '1000' means it's an individual compagny
const nextTrackRuleSets: NextTrackRuleSet[] = [
  {
    help: "Goes to track_goals if : legalCategory == '1000' AND questionnaire_route == 'specific_goal' (pro)",
    rules: [
      {
        from: DataMappingFrom.UsedTracks,
        id: 'legalCategory',
        dataField: 'legalCategory',
        conditions: [
          {
            type: 'legalCategory',
            operator: ConditionOperators.is,
            value: LegalCategory.EI
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
  },
  {
    help: "Goes to track_structure_building_property if : legalCategory == '1000' AND questionnaire_route == 'no_specific_goal' (newbie)",
    rules: [
      {
        from: DataMappingFrom.UsedTracks,
        id: 'legalCategory',
        dataField: 'legalCategory',
        conditions: [
          {
            type: 'legalCategory',
            operator: ConditionOperators.is,
            value: LegalCategory.EI
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
  }
]

const defaultQuestionnaireData: EstablishmentType = {
  siret: '',
  codeNAF: '',
  codeNAF1: '',
  ville: '',
  legalCategory: '',
  codePostal: '',
  region: undefined,
  structure_size: undefined,
  denomination: '',
  secteur: '',
  creationDate: ''
}

export const siret: Track = {
  id: TrackId.Siret,
  category: 'myEntreprise',
  title: { fr: 'Mon SIRET' },
  label: { fr: 'Quelle est votre entreprise ?' },
  interface: {
    component: TrackComponent.Siret
  },
  next: {
    default: TrackId.StructureWorkforce,
    ruleSet: nextTrackRuleSets
  },
  options: [
    {
      id: 'search-siret',
      hasInput: HasInputOptions.Search,
      value: undefined,
      validation: SiretValidator.validate,
      questionnaireData: { ...defaultQuestionnaireData },
      title: { fr: 'SIRET' },
      hintLabel: { fr: 'ex : "Fromagerie Sanzot Angers" ou N° SIRET "130 025 265 00013"' },
      next: {
        default: TrackId.StructureWorkforce,
        ruleSet: nextTrackRuleSets
      },
      wildcard: {
        label: { fr: 'je préfère compléter mes informations manuellement' },
        value: SiretValue.Wildcard,
        next: {
          default: TrackId.StructureWorkforce
        }
      }
    }
  ]
}
