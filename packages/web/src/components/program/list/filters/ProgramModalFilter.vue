<template>
  <DsfrButton
    label="Filtres"
    tertiary
    no-outline
    size="sm"
    @click="open()"
  />
  <DsfrModal
    ref="modal"
    :opened="opened"
    title=""
    size="sm"
    @close="close()"
  >
    <template #default>
      <div class="fr-h5 tee-text-blue fr-text-center">Filtres</div>
      <ProgramFiltersAccordion accordion-class="fr-accordion-bg--blue" />
    </template>
  </DsfrModal>
</template>
<script setup lang="ts">
import { DsfrModal } from '@gouvminint/vue-dsfr'
import { ref } from 'vue'

const close = () => {
  opened.value = false
}

const opened = ref<boolean>(false)

const open = () => {
  opened.value = true
}
</script>
