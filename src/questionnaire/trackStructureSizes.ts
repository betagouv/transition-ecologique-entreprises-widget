export const sizes = {
  id: 'track_structure_sizes',
  category: 'entreprise',
  title: { fr: 'Mon entreprise' },
  label: { fr: 'Quelle est la taille de votre entreprise ?' },
  interface: {
    component: 'buttons',
  },
  behavior: {
    multipleChoices: false,
  },
  options: [
    {
      value: { structure_sizes: 'TPE' },
      title: { fr: 'TPE' },
      label: { fr: "TPE (moins de 20 salarié.e.s)" },
      next: {
        default: 'track_sectors'
      }
    },
    {
      value: { structure_sizes: 'PME' },
      title: { fr: 'PME' },
      label: { fr: "PME (entre 20 et 249 salarié.e.s)" },
      next: {
        default: 'track_sectors'
      }
    },
    {
      disabled: false,
      value: { structure_sizes: 'ETI' },
      title: { fr: 'ETI' },
      label: { fr: "ETI (entre 250 et 5000 salarié.e.s)" },
      next: {
        default: 'track_sectors'
      }
    },
    {
      disabled: false,
      value: { structure_sizes: 'GE' },
      title: { fr: 'GE' },
      label: { fr: "GE (plus de 5000 salarié.e.s)" },
      next: {
        default: 'track_sectors'
      }
    }
  ]
}