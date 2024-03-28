// CONSOLE LOG TEMPLATE
// console.log(`tracks.trackResults > FUNCTION_NAME > MSG_OR_VALUE :`)

import type { Track } from '@/types'
import { TrackComponent, TrackId } from '@/types'

export const results: Track = {
  id: TrackId.Results,
  category: 'results',
  title: { fr: 'Dispositifs' },
  label: { fr: 'Vos résultats' },
  hint: { fr: '🎉 Félicitations, vous avez terminé !' },
  resume: {
    fr: "D’après les informations que vous avez renseignées, voici les accompagnements dont vous pouvez bénéficier pour diminuer l'empreinte écologique de votre entreprise."
  },
  interface: {
    component: TrackComponent.Results
  },
  config: {
    noResultsMessage: { fr: "Aucune aide n'a pu être identifiée avec les critères choisis..." },
    noResultsImage: 'images/tracks/no-results.svg',
    showResultsTitle: false,
    showProgramInfos: true,
    showProgramSubtitles: false
  },
  options: [
    {
      value: 'results.summary',
      label: { fr: 'Vos résultats' },
      // fields: [],
      next: {
        default: false
      }
    }
  ]
}
