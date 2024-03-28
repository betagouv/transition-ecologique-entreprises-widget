<template>
  <div
    class="fr-container--fluid fr-px-0v fr-px-md-2v fr-mt-0 fr-mb-10v"
    style="min-height: 800px"
  >
    <router-view :key="useRoute().path" />
  </div>
  <ContactHelp v-if="useNavigationStore().isByRouteName(RouteName.QuestionnaireResult)" />
</template>

<script setup lang="ts">
// CONSOLE LOG TEMPLATE
// console.log(`TeeQuestionnairePage > FUNCTION_NAME > MSG_OR_VALUE :`)

import ContactHelp from '@/components/contact/ContactHelp.vue'
import { useNavigationStore } from '@/stores/navigation'
import { RouteName } from '@/types/routeType'
import { useRoute } from 'vue-router'
</script>
