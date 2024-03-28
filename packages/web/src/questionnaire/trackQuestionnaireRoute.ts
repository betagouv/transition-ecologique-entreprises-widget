import type { Track } from '@/types'
import { TrackComponent, TrackId } from '@/types'
import { QuestionnaireRoute } from '@tee/common/src/questionnaire/types'

export const questionnaireRoute: Track = {
  id: TrackId.QuestionnaireRoute,
  category: 'ourHelp',
  title: { fr: 'Par où commencer ?' },
  label: { fr: 'Comment pouvons-nous vous aider ?' },
  callout: {
    bgColor: '#FACF35', // 'fr-callout--green-emeraude',
    title: { fr: 'En avant !' },
    bigTitle: false,
    imageLeft: 'images/TEE-onboarding.png',
    description: {
      fr: 'Nous allons vous poser quelques questions pour pouvoir identifier les accompagnements et les financements dont vous pouvez bénéficier.'
    },
    hintIcon: 'fr-icon-timer-line'
  },
  interface: {
    component: TrackComponent.Cards,
    columnWidth: 6
  },
  behavior: {
    multipleChoices: false
  },
  next: {
    default: TrackId.Results
  },
  options: [
    {
      value: QuestionnaireRoute.NoSpecificGoal,
      questionnaireData: { questionnaire_route: QuestionnaireRoute.NoSpecificGoal },
      title: { fr: 'Je ne sais pas' },
      label: { fr: 'Je ne sais pas par où commencer' },
      resume: {
        fr: 'Faisons un état des lieux à 360° sur votre empreinte carbone : énergie, eau, déchets, mobilité...'
      },
      hintImage: { fr: '5 min. chrono !' },
      hintImageIcon: 'fr-icon-timer-line',
      imageTop: 'images/tracks/je-ne-sais-pas-par-ou-commencer.svg',
      next: {
        default: TrackId.Siret
      }
    },
    {
      value: QuestionnaireRoute.SpecificGoal,
      questionnaireData: {
        questionnaire_route: QuestionnaireRoute.SpecificGoal
      },
      title: { fr: "J'ai un objectif" },
      label: { fr: "J'ai un objectif précis en tête" },
      resume: {
        fr: 'Trouvons les accompagnements et financements qui peuvent vous aider à réaliser votre projet'
      },
      hintImage: { fr: '2 min. chrono !' },
      hintImageIcon: 'fr-icon-timer-line',
      imageTop: 'images/tracks/j-ai-un-obectif.svg',
      next: {
        default: TrackId.Siret
      }
    }
  ]
}
