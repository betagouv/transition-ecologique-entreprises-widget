<template>
  <div
    v-if="!hasSpinner || !hasError"
    class="fr-col-9 fr-col-hidden-md fr-text-right fr-col-xs-12"
  >
    <ProgramModalFilter />
  </div>
  <div
    v-if="!hasSpinner"
    class="fr-col-2 fr-col-md-3 fr-col-lg-2 fr-col-hidden fr-col-unhidden-md"
  >
    <div class="fr-sidemenu fr-pr-0 fr-mr-3v">
      <div class="fr-text--bold fr-text-left fr-mb-3v">Filtres</div>
      <ProgramFiltersAccordion />
    </div>
  </div>
</template>
<script setup lang="ts">
interface ProgramFiltersProps {
  hasSpinner: boolean
  hasError: boolean
}

defineProps<ProgramFiltersProps>()
</script>
