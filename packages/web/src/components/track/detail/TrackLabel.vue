<template>
  <div
    v-if="!useUsedTrackStore().currentIsFirst"
    class="fr-px-4v fr-px-md-0v fr-mt-6v fr-col-12"
  >
    <h3 :class="`${track?.info ? 'fr-mb-0' : 'fr-mb-2v'}`">
      {{ track.label[Translation.lang] }}
    </h3>
  </div>
</template>

<script setup lang="ts">
import { useUsedTrackStore } from '@/stores/usedTrack'
import type { Track } from '@/types'
import Translation from '@/utils/translation'

interface Props {
  track: Track
}
defineProps<Props>()
</script>
