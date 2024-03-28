<template>
  <div class="fr-col-6 fr-col-md-5 fr-col-lg-4 fr-col-xl-3">
    <DsfrButton
      class="fr-btn-fullwidth fr-btn-sm-fullwidth"
      :label="Translation.t('previous')"
      icon="ri-arrow-left-line"
      secondary
      @click="previous"
    />
  </div>
  <!-- BTN NEXT -->
  <div class="fr-col-6 fr-col-md-5 fr-col-lg-4 fr-col-xl-3">
    <DsfrButton
      class="fr-btn-fullwidth fr-btn-sm-fullwidth"
      :label="Translation.t('next')"
      :disabled="selectedOptions.length === 0"
      icon="ri-arrow-right-line"
      icon-right
      @click="next"
    />
  </div>
</template>

<script setup lang="ts">
import type { TrackOptionsUnion } from '@/types'
import Translation from '@/utils/translation'
import type { DsfrButton } from '@gouvminint/vue-dsfr'

interface Props {
  selectedOptions: TrackOptionsUnion[]
}
defineProps<Props>()

const emit = defineEmits<{
  previous: []
  next: []
}>()

function previous() {
  emit('previous')
}

function next() {
  emit('next')
}
</script>
