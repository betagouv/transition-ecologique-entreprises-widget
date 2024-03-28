import type { Track } from '@/types'
import { Objectives, TrackComponent, TrackId, YesNo } from '@/types'

export const strategyAudits: Track = {
  id: TrackId.StrategyAudits,
  category: 'myStrategy',
  title: { fr: 'Audits' },
  label: {
    fr: 'Pour finir, avez-vous déjà réalisé des audits environnementaux ces 2 dernières années ?'
  },
  callout: {
    header: { fr: 'Thématique' },
    headerStyle: 'color: white;',
    bgColor: '#646EFA',
    title: { fr: 'Votre stratégie environnementale' },
    titleStyle: 'color: white;',
    bigTitle: true,
    imageLeft: 'images/thema/thema-strategie.svg'
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
      questionnaireData: {
        strategy_audits: YesNo.Yes,
        [Objectives.EnvironmentalImpact]: YesNo.No
      },
      title: { fr: 'Oui' },
      label: { fr: '✅ Oui !' },
      next: {
        default: TrackId.StrategyAuditsSelect
      }
    },
    {
      value: YesNo.No,
      questionnaireData: {
        strategy_audits: YesNo.No,
        [Objectives.EnvironmentalImpact]: YesNo.Yes
      },
      title: { fr: 'Non' },
      label: { fr: '❌ Non' },
      next: {
        default: TrackId.Results
      }
    },
    {
      value: YesNo.Unknown,
      questionnaireData: {
        strategy_audits: YesNo.Unknown,
        [Objectives.EnvironmentalImpact]: YesNo.Yes
      },
      title: { fr: 'Je ne sais pas' },
      label: { fr: 'Je ne sais pas' },
      next: {
        default: TrackId.Results
      }
    }
  ]
}
