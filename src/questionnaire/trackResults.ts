export const results = {
  id: 'track_results',
  category: 'results',
  title: { fr: 'Mes résultats' },
  label: { fr: 'Vos résultats'},
  intro: { fr: 'Résultats'},
  interface: {
    component: 'results',
  },
  behavior: {
    static: true,
  },
  config: {
    showAlertResults: false,
    showAlertNoResults: true,
    showResultsTitle: false,
    showProgramInfos: false,
    showProgramSubtitles: false
  },
  options: [
    {
      value: 'results.summary',
      label: { fr: "Vos résultats" },
      // fields: [],
      next: {
        default: false
      }
    }
  ],
  form: {
    value: 'contact_form.email',
    label: { fr: 'Vous êtes intéressé.e par le dispositif {title} ?' },
    hint: { fr: "Posez votre question, un conseiller vous contactera dans les 5 jours"},
    intro: { fr: `
      <h2>
        <span
          class="fr-icon-phone-fill" 
          aria-hidden="true"></span>
        Vous souhaitez en connaître d'avantage ?
      </h2>
      <h5>
        N'hésitez pas à nous laisser vos coordonnées, 
        nous nous ferons un plaisir de vous aider. 
      </h5>
    ` },
    fields: [
      {
        id: 'name',
        label: { fr: 'Prénom'},
        hint: { fr: 'Camille' },
        required: false,
        type: 'text',
        cols: 6,
        // for debugging purposes
        // defaultValue: 'Camille'
      },
      {
        id: 'surname',
        label: { fr: 'Nom'},
        hint: { fr: 'Dujardin' },
        required: false,
        type: 'text',
        cols: 6,
        // for debugging purposes
        // defaultValue: 'Dujardin'
      },
      {
        id: 'email',
        label: { fr: 'Email'},
        hint: { fr: 'camille@dujardin.fr' },
        required: true,
        type: 'email',
        // for debugging purposes
        // defaultValue: 'france-transition@beta.gouv.fr'
      },
      {
        id: 'siret',
        label: { fr: 'SIRET de votre entreprise'},
        hint: { fr: '385 290 309 00454' },
        required: false,
        type: 'text',
        preFillFrom: {
          id: 'siret',
          from: 'usedTracks',
          dataField: 'siret',
        },
        cols: 12,
        // for debugging purposes
        // defaultValue: '83014132100034'
      },
      {
        id: 'tel',
        label: { fr: 'Téléphone'},
        hint: { fr: '06 05 04 03 02' },
        required: true,
        type: 'text',
        cols: 12,
        // for debugging purposes
        // defaultValue: '06 05 04 03 02'
      },
      {
        id: 'needs',
        label: { fr: 'Quel est votre besoin ?'},
        hint: { fr: 'Je souhaite connaître les aides pour installer des éoliennes sur mon immeuble' },
        required: false,
        type: 'textarea',
        // for debugging purposes
        // defaultValue: 'Just some tests'
      },
      {
        id: 'cgu',
        help: 'http://mission-transition.beta.gouv.fr/donnee-personnelles-et-cookies',
        label: { fr: "J'accepte d'être recontacté par l'équipe de Transition Ecologique des Entreprises *"},
        hint: { fr: `
          Vos données à caractère personnel seront uniquement utilisées à des fins légitimes et nécessaires
          par l'équipe de Transition Ecologique des Entreprises dans le respect du RGPD, 
          c'est-à-dire pour vous recontacter par email ou par téléphone 
          afin de vous aider à vous orienter et à vous conseiller 
          dans votre recherche d'aides
          à la transition écologique de votre entreprise.
          Voir également nos 
          <a href="http://mission-transition.beta.gouv.fr/donnee-personnelles-et-cookies" target="_blank">
            Conditions Générales d'Utilisation
          </a>.
          <br>
          <br>
          Pour toute question vous pouvez nous contacter à "france-transition(at)beta.gouv.fr"
        ` },
        required: true,
        type: 'checkbox',
        // for debugging purposes
        // defaultValue: false
      },
    ],
    callbacks: [
      {
        disabled: false,
        help: 'First action to trigger when the user clicks on the send button / create a contact in Brevo',
        helpDocumentation: 'https://developers.brevo.com/reference/createcontact',
        action: 'createContact',
        url: 'https://api.brevo.com/v3/contacts',
        // url: 'https://api.brevo.com/v3/contacts/doubleOptinConfirmation', // for double opt-in
        method: 'POST',
        headers: {
          accept: 'application/json',
          'content-type': 'application/json',
          'api-key': ''
        },
        headerApiKey: 'api-key',
        envApiKey: 'VITE_BREVO_TOKEN',
        dataStructure: {
          email: '',
          listIds: [],
          // includeListIds: [],
          attributes: {},
          // templateId: 1,  // for double opt-in
          // redirectionUrl: 'https://gov-aid-tree-poc.netlify.app'  // for double opt-in
        },
        dataMapping: [
          {
            from: 'formData',
            id: 'email',
            dataField: 'email',
          },
          {
            from: 'env',
            id: 'VITE_BREVO_LIST_IDS',
            dataField: 'listIds',
            // dataField: 'includeListIds',
            asArray: true,
            sep: ',',
            type: 'integer'
          },
          {
            from: 'formData',
            id: 'surname',
            dataField: 'attributes.NOM',
          },
          {
            from: 'formData',
            id: 'name',
            dataField: 'attributes.PRENOM',
          },
          {
            from: 'formData',
            id: 'tel',
            dataField: 'attributes.TEL',
          },
          {
            from: 'formData',
            id: 'siret',
            dataField: 'attributes.SIRET',
          },
          // {
          //   from: 'formData',
          //   id: 'needs',
          //   dataField: 'attributes.FORM_NEEDS',
          // },
          {
            from: 'formData',
            id: 'cgu',
            dataField: 'attributes.OPT_IN',
          },
          {
            from: 'usedTracks',
            id: 'project_needs',
            dataField: 'attributes.PROJECT_NEEDS',
          },
          {
            from: 'usedTracks',
            id: 'project_sectors',
            dataField: 'attributes.PROJECT_SECTORS',
          },
          {
            from: 'usedTracks',
            id: 'user_roles',
            dataField: 'attributes.USER_ROLES',
          },
          {
            from: 'usedTracks',
            id: 'user_goals',
            dataField: 'attributes.USER_GOALS',
          },
          // {
          //   from: 'usedTracks',
          //   id: 'project_status',
          //   dataField: 'attributes.PROJECT_STATUS',
          // },
          {
            from: 'usedTracks',
            id: 'structure_sizes',
            dataField: 'attributes.STRUCTURE_SIZE',
          },
          {
            from: 'props',
            id: 'programId',
            dataField: 'attributes.PROGRAM_ID',
          },
        ]
      },
      // {
      //   disabled: true,
      //   help: 'Second action send a transactional email',
      //   helpDocumentation: [
      //     'https://developers.brevo.com/docs/send-a-transactional-email',
      //     'https://developers.brevo.com/reference/sendtransacemail'
      //   ],
      //   action: 'sendTransactionalEmail',
      //   url: 'https://api.brevo.com/v3/smtp/email',
      //   method: 'POST',
      //   headers: {
      //     accept: 'application/json',
      //     'content-type': 'application/json',
      //     'api-key': ''
      //   },
      //   headerApiKey: 'api-key',
      //   envApiKey: 'VITE_BREVO_TOKEN',
      //   dataStructure: {
      //     sender: {
      //       name: 'Transition Ecologique des Entreprises',
      //       email: ''
      //     },
      //     to: [
      //       {
      //         name: '',
      //         email: ''
      //       }
      //     ],
      //     replyTo: {
      //       name: 'Mission Transition Ecologique des Entreprises',
      //       email: 'france-transition@beta.gouv.fr'
      //     },
      //     subject: 'Test transactional email',
      //     htmlContent: `
      //       <html>
      //         <head></head>
      //         <body>
      //           <p>
      //             Bonjour,
      //           </p>
      //           <p>
      //             Merci d'avoir contacté l'équipe de Transition Ecologique des Entreprises.
      //           </p>
      //           <p>
      //             Nous revenons vers vous au plus vite
      //           </p>
      //         </body>
      //       </html>`
      //   },
      //   dataMapping: [
      //     {
      //       from: 'env',
      //       id: 'VITE_BREVO_SENDER_EMAIL',
      //       dataField: 'sender.email',
      //     },
      //     {
      //       from: 'formData',
      //       id: 'email',
      //       dataField: 'to.0.email',
      //     },
      //     {
      //       from: 'formData',
      //       id: 'name',
      //       dataField: 'to.0.name',
      //     },
      //   ]
      // }
    ],
    // next: {
    //   default: 'track_results'
    // }
  }
}
