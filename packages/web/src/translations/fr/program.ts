const programFrDict = {
  program: {
    programResume: 'Le dispositif en deux mots',
    programObjective: {
      title: {
        inProgram: 'Au programme :',
        applicationSteps: 'Les étapes de votre demande d’aide :'
      }
    },
    programProviders: 'Contact',
    programType: "Nature de l'aide",
    programEndValidity: 'Date de fin',
    programAvailable: 'Aide disponible',
    programNotAvailable: "Cette aide n'est plus disponible",
    programAvailableUntil: "Disponible jusqu'au {date}",
    programDuration: 'Prestation',
    programLoanDuration: 'Durée du prêt',
    programKnowMore: 'En savoir plus',
    programAmIEligible: 'Suis-je éligible ?',
    form: {
      label: '{prefixAide} {natureAide} vous intéresse ?',
      hint: '👋 Envoyez votre demande, un conseiller {operator} vous contactera prochainement',
      needs: `Bonjour,

Mon entreprise a une activité de type "{secteur}".
Le dispositif "{titreAide}" pourrait m'intéresser car j'ai pour projet de ...
J'ai besoin d'être accompagné(e) sur ...

Merci d'avance pour votre retour`
    }
  }
}

export default programFrDict
