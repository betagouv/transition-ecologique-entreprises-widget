<template>
  <div class="fr-container fr-my-4w">
    <PrivacyPolicy
      date="17/06/2024"
      site-name="Mission Transition Écologique"
      :third-parties="thirdParties"
      :cookies="cookies"
    />
  </div>
  <ContactMail />
</template>

<script setup lang="ts">
// CONSOLE LOG TEMPLATE
// console.log(`TeePersonalDataPage > FUNCTION_NAME > MSG_OR_VALUE :`)

import { PrivacyPolicyProps } from '@incubateur-ademe/legal-pages-markdown'

const thirdParties = [
  {
    name: 'Scalingo',
    country: 'France',
    hostingCountry: 'France',
    serviceType: 'Hébergement',
    policyUrl: 'https://scalingo.com/data-processing-agreement'
  }
]

const cookies: PrivacyPolicyProps['cookies'] = [
  {
    category: 'Mesure d’audience anonymisée',
    name: 'Matomo',
    expiration: '13 mois',
    finalities: 'Mesure d’audience',
    editor: 'Matomo & ADEME',
    destination: 'France'
  }
]
</script>
