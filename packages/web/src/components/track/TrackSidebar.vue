<template>
  <!-- DEBUGGING -->
  <div
    v-if="debugStore.is"
    class="vue-debug"
  >
    <h5>DEBUG - TeeSidebar</h5>
    <div class="fr-grid-row fr-grid-row--gutters fr-mb-3v">
      <div class="fr-col-12">
        <h6 class="fr-mb-1v">usedTracksRegrouped :</h6>
        <pre><code>{{ usedTracksRegrouped }} </code></pre>
      </div>
    </div>
  </div>

  <template
    v-for="category in usedCategories"
    :key="category"
  >
    <div class="fr-mb-6v">
      <div class="fr-mb-2v">
        {{ Translation.t(`categories.${category}`) }}
      </div>
      <div
        v-for="usedTrack in usedTracksRegrouped[category]"
        :key="usedTrack.id"
      >
        <div class="fr-mb-1v">
          <router-link
            v-if="usedTrack.completed"
            class="tee-btn-sidebar fr-btn fr-btn--tertiary-no-outline"
            :to="navigationStore.routeByTrackId(usedTrack.id)"
          >
            {{ trackStore.getTrackTitle(usedTrack.id as TrackId, Translation.lang) }}
          </router-link>
          <DsfrButton
            v-else
            :label="trackStore.getTrackTitle(usedTrack.id as TrackId, Translation.lang)"
            :disabled="true"
            tertiary
            no-outline
            class="tee-btn-sidebar"
          />
        </div>
      </div>
    </div>
  </template>
</template>

<script setup lang="ts">
// CONSOLE LOG TEMPLATE
// console.log(`TeeSidebar > FUNCTION_NAME > MSG_OR_VALUE :`)

import { useDebugStore } from '@/stores/debug'
import { useNavigationStore } from '@/stores/navigation'
import { useTrackStore } from '@/stores/track'
import { useUsedTrackStore } from '@/stores/usedTrack'
import { TrackId } from '@/types'
import { groupBy } from '@/utils/helpers'
import Translation from '@/utils/translation'
import { computed } from 'vue'

const trackStore = useTrackStore()
const debugStore = useDebugStore()
// const router = useRouter()
const navigationStore = useNavigationStore()
const usedTrackStore = useUsedTrackStore()

const usedTracksRegrouped = computed(() => {
  return groupBy(usedTrackStore.usedTracks, 'category')
})

const usedCategories = computed(() => {
  return Object.keys(usedTracksRegrouped.value)
})
</script>
