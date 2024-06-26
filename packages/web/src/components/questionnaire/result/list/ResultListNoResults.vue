<template>
  <div
    v-if="hasSpinner || hasError || !countItems"
    class="fr-col-9 fr-text-center"
  >
    <TeeSpinner
      v-if="hasSpinner"
      scale="6"
    />
    <ProgramListNoResults
      v-else-if="!countItems && !hasError"
      image="images/tracks/no-results.svg"
      :message="{ fr: 'Aucune aide n\'a pu être identifiée avec les critères choisis...' }"
    />
    <TeeError
      v-else-if="hasError"
      :mailto="Contact.email"
      :email="Contact.email"
    />
  </div>
</template>

<script setup lang="ts">
import Contact from '@/utils/contact'
import ProgramListNoResults from '@/components/program/list/ProgramListNoResults.vue'

interface Props {
  hasError?: boolean
  hasSpinner?: boolean
  countItems?: number
}
defineProps<Props>()
</script>
