// CONSOLE LOG TEMPLATE
// console.log(`tracks.trackResults > FUNCTION_NAME > MSG_OR_VALUE :`)

import type { Track } from '@/types'
import {
  CallbackActions,
  CallbackMethods,
  ConditionOperators,
  DataMappingFrom,
  Entreprise,
  FormFieldTypes,
  TrackComponents,
  TrackId
} from '@/types'

export const results: Track = {
  id: TrackId.Results,
  category: 'results',
  title: { fr: 'Dispositifs' },
  label: { fr: 'Vos résultats' },
  hint: { fr: '🎉 Félicitations, vous avez terminé !' },
  resume: {
    // fr: "D’après les informations que vous avez renseignées, voici les accompagnements dont vous pouvez bénéficier pour diminuer l'empreinte écologique de votre entreprise."
    fr: 'Voici les accompagnements \
      dont vous pouvez bénéficier pour diminuer l’empreinte écologique \
      de votre {structure_sizes} du secteur {secteur} \
      en région {région}.'
  },
  interface: {
    component: TrackComponents.Results
  },
  config: {
    noResultsMessage: { fr: "Aucune aide n'a pu être identifiée avec les critères choisis..." },
    noResultsImage: 'images/tracks/no-results.svg',
    showResultsTitle: false,
    showProgramInfos: true,
    showProgramSubtitles: false,
    filters: [
      {
        field: "nature de l'aide",
        label: "nature de l'aide",
        trueIf: ConditionOperators.is,
        values: [
          {
            label: 'Accompagnement',
            value: 'accompagnement'
          },
          {
            label: 'Financement',
            value: 'financement'
          },
          {
            label: 'Prêt',
            value: 'prêt'
          },
          {
            label: 'Avantage fiscal',
            value: 'avantage fiscal'
          },
          {
            label: 'Formation',
            value: 'formation'
          }
          // for debugging purposes
          // {
          //   label: 'FAIL',
          //   value: 'xxx'
          // }
        ]
      },
      {
        field: ['publicodes', 'entreprise . a un objectif ciblé', 'une de ces conditions'],
        label: 'objectif',
        trueIf: ConditionOperators.exists,
        values: [
          {
            label: '🌱 Stratégie environnementale',
            value: 'questionnaire . objectif prioritaire . est mon impact environnemental'
          },
          {
            label: '⚡️ Energie',
            value: 'questionnaire . objectif prioritaire . est ma performance énergétique'
          },
          {
            label: '💧 Eau',
            value: "questionnaire . objectif prioritaire . est diminuer ma consommation d'eau"
          },
          {
            label: '🏢 Bâtiment',
            value: 'questionnaire . objectif prioritaire . est rénover mon bâtiment'
          },
          {
            label: '🚲 Mobilité',
            value: 'questionnaire . objectif prioritaire . est la mobilité durable'
          },
          {
            label: '🗑 Déchets',
            value: 'questionnaire . objectif prioritaire . est la gestion des déchets'
          },
          {
            label: '🏭 Production',
            value: "questionnaire . objectif prioritaire . est l'écoconception"
          },
          {
            label: '🧑‍🎓 RH',
            value: 'questionnaire . objectif prioritaire . est former ou recruter'
          }
        ]
      }
    ]
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
  ],
  form: {
    value: 'contact_form.email',
    // label: { fr: 'Vous êtes intéressé.e par le dispositif {title} ?' },
    label: { fr: '{prefixAide} {natureAide} vous intéresse ?' },
    hint: {
      fr: '👋 Envoyez votre demande, un conseiller {operator} vous contactera prochainement'
    },
    // intro: { fr: `
    //   <h2>
    //     <span
    //       class="fr-icon-phone-fill"
    //       aria-hidden="true"></span>
    //     Vous souhaitez en connaître d'avantage ?
    //   </h2>
    //   <h5>
    //     N'hésitez pas à nous laisser vos coordonnées,
    //     nous nous ferons un plaisir de vous aider.
    //   </h5>
    // ` },
    fields: [
      {
        id: 'name',
        label: { fr: 'Prénom' },
        // hint: { fr: 'Camille' },
        required: true,
        type: FormFieldTypes.Text,
        cols: 6
        // for debugging purposes
        // defaultValue: 'Camille'
      },
      {
        id: 'surname',
        label: { fr: 'Nom' },
        // hint: { fr: 'Dujardin' },
        required: true,
        type: FormFieldTypes.Text,
        cols: 6
        // for debugging purposes
        // defaultValue: 'Dujardin'
      },
      {
        id: 'email',
        label: { fr: 'Email' },
        // hint: { fr: 'camille@dujardin.fr' },
        required: true,
        type: FormFieldTypes.Email
        // for debugging purposes
        // defaultValue: 'contact@multi.coop'
      },
      {
        id: 'tel',
        label: { fr: 'Téléphone' },
        // hint: { fr: '06 05 04 03 02' },
        required: true,
        type: FormFieldTypes.Text,
        cols: 12
        // for debugging purposes
        // defaultValue: '06 05 04 03 02'
      },
      {
        id: 'siret',
        label: { fr: 'SIRET de votre entreprise' },
        // hint: { fr: '385 290 309 00454' },
        required: true,
        type: FormFieldTypes.Text,
        preFillFrom: {
          id: 'siret',
          from: DataMappingFrom.UsedTracks,
          dataField: 'siret'
        },
        cols: 12
        // for debugging purposes
        // defaultValue: '83014132100034'
      },
      {
        id: 'needs',
        label: { fr: 'Quel est votre besoin ?' },
        hint: {
          fr: 'Je souhaite connaître les aides pour installer des éoliennes sur mon immeuble'
        },
        required: false,
        type: FormFieldTypes.Textarea,
        rows: 8,
        // for debugging purposes
        defaultValue: `Bonjour,

Mon entreprise a une activité de type "{secteur}".
Le dispositif "{titreAide}" pourrait m'intéresser car j'ai pour projet de ...
J'ai besoin d'être accompagné(e) sur ...

Merci d'avance pour votre retour`,
        injectInText: true,
        dataStructure: {
          secteur: '',
          natureAide: '',
          titreAide: '',
          objectif: ''
        },
        dataMapping: [
          {
            from: DataMappingFrom.UsedTracks,
            id: 'secteur',
            dataField: 'secteur'
          },
          {
            from: DataMappingFrom.UsedTracks,
            id: 'objectif',
            dataField: 'objectif'
          },
          // {
          //   from: 'propsPath',
          //   id: 'program',
          //   path: "program.nature de l'aide",
          //   dataField: 'natureAide',
          // },
          {
            from: DataMappingFrom.PropsPath,
            id: 'program',
            path: 'program.titre',
            dataField: 'titreAide'
          }
        ]
      },
      {
        id: 'cgu',
        help: 'https://mission-transition-ecologique.beta.gouv.fr/donnees-personnelles',
        label: {
          fr: "J'accepte d'être recontacté par l'équipe de Transition Ecologique des Entreprises *"
        },
        hint: {
          fr: `
          Vos données à caractère personnel seront uniquement utilisées à des fins légitimes et nécessaires
          par l'équipe de Transition Ecologique des Entreprises dans le respect du RGPD,
          c'est-à-dire pour vous recontacter par email ou par téléphone
          afin de vous aider à vous orienter et à vous conseiller
          dans votre recherche d'aides
          à la transition écologique de votre entreprise.
          Voir également nos
          <a href="https://mission-transition-ecologique.beta.gouv.fr/donnees-personnelles" target="_blank">
            Conditions Générales d'Utilisation
          </a>.
          <br>
          <br>
          Pour toute question, vous pouvez nous contacter à "france-transition(at)beta.gouv.fr"
        `
        },
        required: true,
        type: FormFieldTypes.Checkbox
        // for debugging purposes
        // defaultValue: false
      }
    ],
    callbacks: [
      {
        disabled: false,
        help: 'First action to trigger when the user clicks on the send button / create a contact in Brevo',
        // helpDocumentation: 'https://developers.brevo.com/reference/createcontact',
        helpDocumentation: '/api/docs',
        action: CallbackActions.CreateOpportunity,
        url: '/api/opportunities',
        method: CallbackMethods.Post,
        headers: {
          accept: 'application/json',
          'content-type': 'application/json'
        },
        dataStructure: {
          opportunity: {},
          optIn: false
        },
        dataMapping: [
          {
            from: DataMappingFrom.FormData,
            id: 'name',
            dataField: 'opportunity.firstName'
          },
          {
            from: DataMappingFrom.FormData,
            id: 'surname',
            dataField: 'opportunity.lastName'
          },
          {
            from: DataMappingFrom.FormData,
            id: 'email',
            dataField: 'opportunity.email'
          },
          {
            from: DataMappingFrom.FormData,
            id: 'tel',
            dataField: 'opportunity.phoneNumber'
          },
          {
            from: DataMappingFrom.FormData,
            id: 'siret',
            dataField: 'opportunity.companySiret'
          },
          {
            from: DataMappingFrom.UsedTracks,
            id: 'denomination',
            dataField: 'opportunity.companyName'
          },
          {
            from: DataMappingFrom.UsedTracks,
            id: 'secteur',
            dataField: 'opportunity.companySector'
          },
          {
            from: DataMappingFrom.UsedTracks,
            id: Entreprise.Workforce,
            dataField: 'opportunity.companySize'
          },
          {
            from: DataMappingFrom.Props,
            id: 'programId',
            dataField: 'opportunity.programId'
          },
          {
            from: DataMappingFrom.FormData,
            id: 'needs',
            dataField: 'opportunity.message'
          },
          {
            from: DataMappingFrom.UsedTracks,
            id: 'questionnaire_route',
            dataField: 'opportunity.questionnaireRoute'
          },
          {
            from: DataMappingFrom.FormData,
            id: 'cgu',
            dataField: 'optIn'
          },
          {
            from: DataMappingFrom.AllUsedTracks,
            id: '*',
            dataField: 'opportunity.otherData'
          }
        ]
      }
    ]
  }
}
