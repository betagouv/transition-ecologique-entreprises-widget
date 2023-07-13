export const roles = {
  id: 'track_roles',
  category: 'entreprise',
  title: { fr: 'Mon rôle' },
  label: { fr: "Quel est votre rôle ?" },
  interface: {
    component: 'buttons',
  },
  behavior: {
    multipleChoices: false,
  },
  options: [
    {
      value: { user_roles: 'manager' },
      title: { fr: 'Gérant.e' },
      label: { fr: "🧑‍💼 Je suis gérant.e de cette entreprise" },
      next: {
        default: 'track_results'
      }
    },
    {
      value: { user_roles: 'employee' },
      title: { fr: 'Salarié.e' },
      label: { fr: "👩‍🎤 Je suis salarié.e de cette entreprise" },
      next: {
        default: 'track_results'
      }
    },
    {
      value: { user_roles: 'consultant' },
      title: { fr: 'Consultant.e' },
      label: { fr: "🧑‍💻 Je suis un.e consultant.e extérieur.e" },
      next: {
        default: 'track_results'
      }
    },
    {
      value: { user_roles: '*' },
      title: { fr: 'Autre' },
      label: { fr: "💁 J'ai un autre rôle" },
      next: {
        default: 'track_results'
      }
    }
  ]
}