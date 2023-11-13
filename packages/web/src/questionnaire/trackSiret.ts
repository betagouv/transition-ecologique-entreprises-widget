import {
  codesNAF1,
  EntrepriseSector,
  NAF1Letters,
  NAF1ToVar,
  Sector,
  sectors,
  YesNo,
  CallbackActions,
  CallbackMethods,
  CleanerOperations,
  DataMappingFrom,
  FindInRefs,
  HasInputOptions,
  TrackComponents,
  TrackId
} from '@/types'
import type { Track } from '@/types'

const metaEnv = import.meta.env
// console.log('trackSiret >  metaEnv :', metaEnv)
const TEE_BACKEND_URL = metaEnv.VITE_TEE_BACKEND_URL || 'https://tee-backend.osc-fr1.scalingo.io'

const dataTarget = {
  siret: '',
  codeNaf: '',
  codeNAF1: '',
  ville: '',
  codePostal: '',
  région: null,
  structure_sizes: '',
  denomination: '',
  // project_sectors: undefined,
  secteur: undefined
}

export const siret: Track = {
  id: TrackId.Siret,
  category: 'myEntreprise',
  title: { fr: 'Mon SIRET' },
  label: { fr: 'Quelle est votre entreprise ?' },
  // info: { fr: "Renseignez le SIRET de votre entreprise" },
  interface: {
    component: TrackComponents.Input
  },
  // behavior: {
  //   multipleChoices: false,
  // },
  next: {
    default: TrackId.StructureWorkforce
  },
  options: [
    {
      id: 'search-siret',
      hasInput: HasInputOptions.Search,
      value: { ...dataTarget },
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
          url: `${TEE_BACKEND_URL}/api/insee/get_by_siret`,
          // url: 'http://localhost:8001/api/insee/get_by_siret',
          method: CallbackMethods.Post,
          headers: {
            accept: 'application/json',
            'Content-Type': 'application/json'
          },
          dataBody: { siret: '' },
          dataStructure: { ...dataTarget },
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
              path: 'address.cityCode',
              dataField: 'région',
              onlyRemap: true,
              cleaning: [
                {
                  operation: CleanerOperations.findFromRefs,
                  findInRef: FindInRefs.ComCodes,
                  findFromField: 'COM',
                  retrieveFromField: 'REGION'
                }
              ]
            },
            {
              from: DataMappingFrom.RawData,
              id: 'secteur',
              path: 'nafCode',
              dataField: '.',
              onlyRemap: true,
              cleaning: [
                {
                  operation: CleanerOperations.findFromRefs,
                  findInRef: FindInRefs.NafCodes,
                  findFromField: 'NIV5',
                  retrieveFromField: 'tagsFr'
                  // => ['artisanat', 'industrie']
                },
                {
                  operation: CleanerOperations.findFromDict,
                  dict: {
                    [Sector.Craftsmanship]: { [EntrepriseSector.Craftsmanship]: YesNo.Yes },
                    [Sector.Industry]: { [EntrepriseSector.Industry]: YesNo.Yes },
                    [Sector.Tourism]: { [EntrepriseSector.Tourism]: YesNo.Yes },
                    [Sector.Tertiary]: { [EntrepriseSector.Tertiary]: YesNo.Yes },
                    [Sector.Agriculture]: { [EntrepriseSector.Agriculture]: YesNo.Yes },
                    [Sector.Other]: { [EntrepriseSector.Other]: YesNo.Yes }
                  }
                },
                {
                  operation: CleanerOperations.injectInObject,
                  object: { ...sectors }
                }
              ]
            },
            {
              from: DataMappingFrom.RawData,
              id: 'codeNAF1',
              path: 'nafCode',
              dataField: '.',
              onlyRemap: true,
              cleaning: [
                {
                  operation: CleanerOperations.findFromRefs,
                  findInRef: FindInRefs.NafCodes,
                  findFromField: 'NIV5',
                  retrieveFromField: 'NIV1'
                  // => 'A'
                },
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
              path: 'nafCode',
              dataField: 'secteur',
              onlyRemap: true,
              cleaning: [
                {
                  operation: CleanerOperations.findFromRefs,
                  findInRef: FindInRefs.NafCodes,
                  findFromField: 'NIV5',
                  retrieveFromField: 'label_vf'
                }
              ]
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
            // {
            //   from: DataMappingFrom.RawData,
            //   id: 'size',
            //   path: 'uniteLegale.categorieEntreprise',
            //   dataField: 'structure_sizes',
            //   onlyRemap: true
            // },
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
            // {
            //   respFields: ['data.codeNaf'],
            //   label: 'Code NAF :',
            //   icon: 'fr-icon-briefcase-line'
            // },
            {
              respFields: ['data.secteur'],
              label: "Secteur d'activité :",
              icon: 'fr-icon-briefcase-line'
            },
            // {
            //   respFields: ['data.structure_sizes'],
            //   // label: 'Catégorie :',
            //   icon: 'fr-icon-parent-line',
            //   cleaning: [
            //     {
            //       operation: 'defaultIfNull',
            //       // respFields: 'data.structure_sizes',
            //       defaultValue: { fr: 'Autre' }
            //     },
            //     {
            //       operation: 'findFromDict',
            //       dict: {
            //         Autre: 'Auto-Entrepreneur.e',
            //         TPE: 'TPE (entre 1 et 19 salarié.e.s)',
            //         PME: 'PME (entre 20 et 250 salarié.e.s)',
            //         ETI: 'ETI (entre 250 et 5000 salarié.e.s)',
            //         GE: 'Grande Entreprise (plus de 5000 salarié.e.s)'
            //       }
            //     }
            //   ]
            // },
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
        // default: 'track_structure_sizes',
        // exceptions: nextExceptions
        // default: 'track_roles'
      },
      wildcard: {
        label: { fr: 'je préfère compléter mes informations manuellement' },
        next: {
          default: TrackId.StructureWorkforce
          // default: 'track_structure_sizes',
          // exceptions: nextExceptions
        }
      }
    }
  ]
}
