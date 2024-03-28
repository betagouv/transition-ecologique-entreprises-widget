<template>
  <div
    v-if="!useUsedTrackStore().currentIsFirst && track?.resume"
    class="fr-px-4v fr-px-md-0v fr-col-12"
  >
    <p class="fr-mb-0">
      {{ track.resume[Translation.lang] }}
    </p>
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
