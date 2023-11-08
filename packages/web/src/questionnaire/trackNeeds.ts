export const needs = {
  id: 'track_needs',
  category: 'start',
  title: { fr: 'Je me lance' },
  label: { fr: 'Votre besoin' },
  bgColor: '#E8EDFF', // 'fr-callout--green-emeraude',
  imageRight: 'images/TEE-illustrationHP.png',
  callout: {
    header: { fr: 'TPE, PME,' },
    headerStyle: 'color: #6672F8; font-size: 1.7rem; font-weight: bold; margin-bottom: 1.5rem;',
    title: { fr: 'Trouvez comment allier écologie avec économies' },
    titleStyle: 'font-size: 2.8rem;',
    bigTitle: true,
    description: { fr: "Je complète mon profil en moins de 2 minutes, et je découvre comment faire des économies en réduisant mon impact environnemental." },
    descriptionStyle: 'font-size: 1.3rem; line-height: 2rem;'
  },
  interface: {
    component: 'simpleButtons',
    columnWidth: 'auto',
  },
  behavior: {
    multipleChoices: false,
    singleChoice: true,
  },
  options: [
    {
      disabled: false,
      value: { project_needs: '*' },
      title: { fr: '' },
      label: { fr: "Je me lance !" },
      next: {
        // default: 'track_goals'
        default: 'track_help'
      }
    },
    {
      disabled: true,
      value: { project_needs: 'starting' },
      title: { fr: 'Découvrir' },
      label: { fr: "Je débute, je visite, je fais mes premiers pas" },
      hint: { fr: "Obtenez rapidement des premiers conseils, à travers notre outil ou avec un conseiller, afin d’initier votre transition écologique" },
      next: {
        default: 'track_sectors'
      }
    },
    {
      disabled: true,
      value: { project_needs: 'advices' },
      title: { fr: 'Conseils' },
      label: { fr: "Je souhaite être conseillé pour réduire mon impact environnemental" },
      hint: { fr: "Faites des économies, cadrez un projet avec un accompagnement, un expert, un diagnostic adapté à votre situation" },
      next: {
        // default: 'track_structure_sizes'
        default: 'track_goals'
      }
    },
    {
      disabled: true,
      value: { project_needs: 'financing' },
      title: { fr: 'Financements' },
      label: { fr: "J’ai un projet de transition écologique et je cherche un financement" },
      hint: { fr: "Obtenez une aide technique ou financière pour vos investissements ou un projet ayant un impact environnemental" },
      next: {
        default: 'track_goals'
      }
    },
    {
      disabled: true,
      value: { project_needs: '*', 'entreprise . effectif' : 25 },
      title: { fr: "M'informer" },
      label: { fr: "(QUESTION TEST) Je cherche juste à m'informer" },
      hint: { fr: "Faites une première recherche et découvrez les différentes offres" },
      next: {
        default: 'track_results'
      }
    }
  ]
}
