const dataTarget = {
  siret: '',
  codeNaf: '',
  ville: '',
  codePostal: '',
  structure_sizes: '',
  denomination: '',
  label_sectors: undefined,
  project_sectors: undefined
}

export const siret = {
  id: 'track_siret',
  category: 'entreprise',
  title: { fr: 'Mon SIRET' },
  label: { fr: 'Quelle est votre entreprise ?' },
  // info: { fr: "Renseignez le SIRET de votre entreprise" },
  interface: {
    component: 'input',
  },
  // behavior: {
  //   multipleChoices: false,
  // },
  next: {
    default: 'track_structure_sizes'
  },
  options: [
    {
      id: 'search-siret',
      value: { ...dataTarget },
      title: { fr: 'SIRET' },
      label: { fr: "Renseignez le SIRET de votre entreprise (14 chiffres)" },
      placeholder: { fr: 'ex : 830 141 321 00034' },
      // for debugging purposes
      // defaultInput: '830 141 321 00034', 
      /* Examples => 
        83014132100034 - TPE 
        81759468200020 - auto-entreprise
      */
      postResponses: { fr: 'Vous ne retrouvez pas votre SIRET ?&nbsp;<a href="https://annuaire-entreprises.data.gouv.fr/" target="_blank">Cliquez ici</a>' },
      // required: false,
      callbacks: [
        {
          disabled: false,
          help: 'Get entreprise data from its SIRET number',
          helpDocumentation: 'https://tee-backend-test.osc-fr1.scalingo.io/api/docs',
          action: 'requestAPI',
          url: 'https://tee-backend-test.osc-fr1.scalingo.io/api/insee/get_by_siret',
          // url: 'http://localhost:8001/api/insee/get_by_siret',
          method: 'POST',
          headers: {
            accept: 'application/json',
            'Content-Type': 'application/json'
          },
          dataStructure: { ...dataTarget },
          dataMapping: [
            {
              from: 'formData',
              id: 'inputValue',
              dataField: 'siret',
            },
            {
              from: 'rawData',
              id: 'naf',
              help: 'https://www.insee.fr/fr/information/2120875',
              path: 'etablissement.uniteLegale.activitePrincipaleUniteLegale',
              dataField: 'codeNaf',
              onlyRemap: true
            },
            {
              from: 'rawData',
              id: 'sector',
              path: 'etablissement.uniteLegale.activitePrincipaleUniteLegale',
              dataField: 'project_sectors',
              onlyRemap: true,
              cleaning: [
                {
                  operation: 'findFromRefs',
                  findInRef: 'nafCodes',
                  findFromField: 'NIV5',
                  retrieveFromField: 'tags'
                }
              ]
            },
            {
              from: 'rawData',
              id: 'sectorLabel',
              path: 'etablissement.uniteLegale.activitePrincipaleUniteLegale',
              dataField: 'label_sectors',
              onlyRemap: true,
              cleaning: [
                {
                  operation: 'findFromRefs',
                  findInRef: 'nafCodes',
                  findFromField: 'NIV5',
                  retrieveFromField: 'label_vf'
                }
              ]
            },
            {
              from: 'rawData',
              id: 'denomination',
              path: 'etablissement.uniteLegale.denominationUniteLegale',
              dataField: 'denomination',
              onlyRemap: true
            },
            {
              from: 'rawData',
              id: 'city',
              path: 'etablissement.adresseEtablissement.libelleCommuneEtablissement',
              dataField: 'ville',
              onlyRemap: true
            },
            {
              from: 'rawData',
              id: 'postalCode',
              path: 'etablissement.adresseEtablissement.codePostalEtablissement',
              dataField: 'codePostal',
              onlyRemap: true
            },
            {
              from: 'rawData',
              id: 'size',
              path: 'etablissement.uniteLegale.categorieEntreprise',
              dataField: 'structure_sizes',
              onlyRemap: true
            },
          ],
          inputCleaning: [
            {
              operation: 'replaceAll',
              stringToReplace: ' ',
              replaceBy: ''
            }
          ],
          resultsMapping: [
            {
              respFields: [
                'data.denomination',
                'data.siret'
              ],
              position: 'title',
              // label: 'entité',
              class: 'fr-mb-3v',
              sep: ' - SIRET ',
              style: 'font-weight: bold;',
              cleaning: [
                {
                  operation: 'defaultIfNull',
                  // respFields: 'data.denomination',
                  defaultValue: { fr: 'Auto-entreprise' }
                }
              ]
            },
            // {
            //   respFields: ['data.codeNaf'],
            //   label: 'Code NAF :',
            //   icon: 'fr-icon-briefcase-line'
            // },
            {
              respFields: ['data.label_sectors'],
              label: "Secteur d'activité :",
              icon: 'fr-icon-briefcase-line'
            },
            {
              respFields: ['data.structure_sizes'],
              // label: 'Catégorie :',
              icon: 'fr-icon-parent-line',
              cleaning: [
                {
                  operation: 'defaultIfNull',
                  // respFields: 'data.structure_sizes',
                  defaultValue: { fr: 'Autre' }
                },
                {
                  operation: 'findFromDict',
                  dict: {
                    Autre: 'Auto-Entrepreneur.e',
                    TPE: 'TPE (entre 1 et 19 salarié.e.s)',
                    PME: 'PME (entre 20 et 250 salarié.e.s)',
                    ETI: 'ETI (entre 250 et 5000 salarié.e.s)',
                    GE: 'Grande Entreprise (plus de 5000 salarié.e.s)'
                  }
                }
              ]
            },
            {
              respFields: [
                'raw.etablissement.adresseEtablissement.numeroVoieEtablissement',
                'raw.etablissement.adresseEtablissement.typeVoieEtablissement',
                'raw.etablissement.adresseEtablissement.libelleVoieEtablissement',
                'data.codePostal',
                'data.ville',
              ],
              // label: 'Adresse',
              icon: 'fr-icon-map-pin-2-line'
            },
            {
              respFields: ['raw.etablissement.uniteLegale.dateCreationUniteLegale'],
              label: 'Création le',
              // prefix: 'Création le ',
              icon: 'fr-icon-time-line',
              cleaning: [
                {
                  operation: 'stringToDate'
                }
              ]
            },

            // {
            //   respFields: ['raw.etablissement.siret'],
            //   label: 'SIRET',
            //   icon: 'fr-icon-building-fill'
            // },
            // {
            //   respFields: ['raw.etablissement.siren'],
            //   label: 'SIRET',
            //   icon: 'fr-icon-building-fill'
            // },
            // {
            //   respFields: ['raw.etablissement.nic'],
            //   label: 'NIC',
            //   icon: 'fr-icon-building-fill'
            // },
          ]
        }
      ],
      next: {
        // default: 'track_structure_sizes',
        default: 'track_roles'
      },
      wildcard: {
        label: { fr: "je préfère compléter mes informations manuellement" },
        next: {
          default: 'track_structure_sizes',
        }
      }
    }
  ]
}