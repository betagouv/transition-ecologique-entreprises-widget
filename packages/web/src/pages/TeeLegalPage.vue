<template>
  <div class="fr-container fr-my-4w">
    <LegalNotice
      licence-url="https://github.com/betagouv/mission-transition-ecologique/blob/main/LICENSE"
      :privacy-policy-url="privacyPolicy"
      :site-url="siteUrl"
      :site-host="{
        address: '13 rue Jacques Peirotes 67000 Strasbourg',
        country: 'France',
        email: 'hello@scalingo.com',
        name: 'Scalingo'
      }"
      site-name="Mission Transition Écologique"
      date="17/06/2024"
      :third-parties="thirdParties"
      :contact-email="Contact.email"
    />
  </div>
  <ContactMail />
</template>

<script setup lang="ts">
// CONSOLE LOG TEMPLATE
// console.log(`TeeLegalPage > FUNCTION_NAME > MSG_OR_VALUE :`)
import { RouteName } from '@/types/routeType'
import Contact from '@/utils/contact'

const privacyPolicy = new URL(useRouter().resolve({ name: RouteName.PersonalData }).href, window.location.origin).href
const siteUrl = new URL(useRouter().resolve({ name: RouteName.Homepage }).href, window.location.origin).href
//
const thirdParties = [
  {
    name: 'API recherche entreprise',
    url: 'https://api.gouv.fr/les-api/api-recherche-entreprises',
    text: "La recherche d'entreprise est effectuée via l'"
  }
]
</script>
