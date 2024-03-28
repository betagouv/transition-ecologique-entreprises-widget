// CONSOLE LOG TEMPLATE
// console.log(`questionnaire.trackSiret > FUNCTION_NAME > MSG_OR_VALUE :`)

import {
  codesNAF1,
  NAF1Letters,
  NAF1ToVar,
  CallbackActions,
  CallbackMethods,
  CleanerOperations,
  DataMappingFrom,
  HasInputOptions,
  TrackComponent,
  TrackId
  // Entreprise
} from '@/types'
import type { Track } from '@/types'
import type EstablishmentType from '@/types/establishmentType'
import Validator from '@/utils/validator'

const defaultQuestionnaireData: EstablishmentType = {
  siret: '',
  codeNaf: '',
  codeNAF1: '',
  ville: '',
  codePostal: '',
  région: null,
  structure_sizes: '',
  denomination: '',
  secteur: undefined
}

export enum SiretValue {
  Wildcard = 'wildcard'
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
    default: TrackId.StructureWorkforce
  },
  options: [
    {
      id: 'search-siret',
      hasInput: HasInputOptions.Search,
      value: undefined,
      validation: Validator.validateSiret,
      questionnaireData: { ...defaultQuestionnaireData },
      title: { fr: 'SIRET' },
      // label: { fr: 'Renseignez le SIRET de votre entreprise (14 chiffres)' },
      placeholder: { fr: 'Votre numéro SIRET (14 chiffres)' },
      hint: {
        fr: `Besoin d'aide pour retrouver votre SIRET ? <a href="https://annuaire-entreprises.data.gouv.fr/" target="_blank">Cliquez ici</a>`
      },
      // for debugging purposes
      // Examples =>
      // defaultInput: '830 141 321 00034',
      // defaultInput: '82200690400012', // - boulangerie
      // defaultInput: '83014132100034', // - TPE
      // defaultInput: '81759468200020', // - auto-entreprise
      // postResponses: {
      //   fr: 'Vous ne retrouvez pas votre SIRET ? <a href="https://annuaire-entreprises.data.gouv.fr/" target="_blank">Cliquez ici</a>'
      // },
      // required: false,
      callbacks: [
        {
          disabled: false,
          help: 'Get entreprise data from its SIRET number',
          helpDocumentation: 'https://tee-backend.osc-fr1.scalingo.io/api/docs',
          action: CallbackActions.RequestAPI,
          url: '/api/establishments/{siret}',
          method: CallbackMethods.Get,
          headers: {
            accept: 'application/json',
            'Content-Type': 'application/json'
          },
          dataPath: { siret: '' },
          dataStructure: { ...defaultQuestionnaireData },
          dataMapping: [
            {
              from: DataMappingFrom.FormData,
              id: 'inputValue',
              dataField: 'siret'
            },
            {
              from: DataMappingFrom.RawData,
              id: 'naf',
              help: 'https://www.insee.fr/fr/information/2120875',
              path: 'nafCode',
              dataField: 'codeNaf',
              onlyRemap: true
            },
            {
              from: DataMappingFrom.RawData,
              id: 'region',
              path: 'region',
              dataField: 'région',
              onlyRemap: true
            },
            {
              from: DataMappingFrom.RawData,
              id: 'codeNAF1',
              path: 'nafSectionCode',
              dataField: '.',
              onlyRemap: true,
              cleaning: [
                {
                  operation: CleanerOperations.findFromDict,
                  dict: Object.fromEntries(NAF1Letters.map((l) => [l, { [NAF1ToVar(l)]: 'oui' }]))
                  // => { "entreprise . code NAF . est A": 'oui' }
                },
                {
                  operation: CleanerOperations.injectInObject,
                  object: { ...codesNAF1 }
                }
              ]
            },
            {
              from: DataMappingFrom.RawData,
              id: 'sectorLabel',
              path: 'nafLabel',
              dataField: 'secteur',
              onlyRemap: true
            },
            {
              from: DataMappingFrom.RawData,
              id: 'denomination',
              path: 'denomination',
              dataField: 'denomination',
              onlyRemap: true
            },
            {
              from: DataMappingFrom.RawData,
              id: 'city',
              path: 'address.cityLabel',
              dataField: 'ville',
              onlyRemap: true
            },
            {
              from: DataMappingFrom.RawData,
              id: 'postalCode',
              path: 'address.zipCode',
              dataField: 'codePostal',
              onlyRemap: true
            }
          ],
          inputCleaning: [
            {
              operation: CleanerOperations.replaceAll,
              stringToReplace: ' ',
              replaceBy: ''
            }
          ],
          resultsMapping: [
            {
              respFields: ['data.denomination', 'data.siret'],
              position: 'title',
              // label: 'entité',
              class: 'fr-mb-3v',
              sep: ' - SIRET ',
              style: 'font-weight: bold;',
              cleaning: [
                {
                  operation: CleanerOperations.defaultIfNull,
                  // respFields: 'data.denomination',
                  defaultValue: { fr: 'Auto-entreprise' }
                }
              ]
            },
            {
              respFields: ['data.secteur'],
              label: "Secteur d'activité :",
              icon: 'fr-icon-briefcase-line'
            },
            {
              respFields: [
                'raw.address.streetNumber',
                'raw.address.streetType',
                'raw.address.streetLabel',
                'data.codePostal',
                'data.ville'
              ],
              // label: 'Adresse',
              icon: 'fr-icon-map-pin-2-line'
            },
            {
              respFields: ['raw.creationDate'],
              label: 'Création le',
              // prefix: 'Création le ',
              icon: 'fr-icon-time-line',
              cleaning: [
                {
                  operation: CleanerOperations.stringToDate
                }
              ]
            }
          ]
        }
      ],
      next: {
        default: TrackId.StructureWorkforce
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
