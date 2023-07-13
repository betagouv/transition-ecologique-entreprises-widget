export const status = {
  id: 'track_status',
  category: 'goals',
  title: { fr: "Mon niveau d'avancement" },
  label: { fr: 'Statut de votre projet' },
  interface: {
    component: 'buttons',
  },
  behavior: {
    multipleChoices: false,
    operator: 'or',
  },
  options: [
    {
      value: { project_status: 'economies' },
      title: { fr: 'Economies' },
      label: { fr: 'Je veux faire des économies' },
      next: {
        default: 'track_structure_sizes'
      },
    },
    {
      value: { project_status: 'carbon' },
      title: { fr: 'Emissions carbone' },
      label: { fr: "J'ai besoin de connaître et réduire mes émissions carbone" },
      next: {
        default: 'track_results'
      },
    },
    {
      value: { project_status: 'improve' },
      title: { fr: 'Améliorer mon produit/service' },
      label: { fr: "J'ai besoin d'améliorer mon produit/service" },
      next: {
        default: 'track_results'
      },
    }
  ]
}
