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
          <DsfrButton
            :label="tracks.getTrackTitle(usedTrack.id as TrackId, Translation.lang)"
            :disabled="!usedTrack.completed"
            class="tee-btn-sidebar"
            tertiary
            no-outline
            @click="backToTrack(usedTrack.id)"
          />
        </div>
      </div>
    </div>
  </template>
</template>

<script setup lang="ts">
// CONSOLE LOG TEMPLATE
// console.log(`TeeSidebar > FUNCTION_NAME > MSG_OR_VALUE :`)

import { RouteName } from '@/types/routeType'
import Navigation from '@/utils/navigation'
import { computed } from 'vue'
import { useTracksStore } from '@/stores/tracks'
import Translation from '@/utils/translation'
import { TrackId } from '@/types'
import { groupBy } from '@/utils/helpers'
import { useDebugStore } from '@/stores/debug'
import { DsfrButton } from '@gouvminint/vue-dsfr'
import { useRouter } from 'vue-router'

const tracks = useTracksStore()
const debugStore = useDebugStore()
const router = useRouter()

const usedTracksRegrouped = computed(() => {
  return groupBy(tracks.usedTracks, 'category')
})

const usedCategories = computed(() => {
  return Object.keys(usedTracksRegrouped.value)
})

const backToTrack = async (trackId: TrackId) => {
  tracks.setUsedTracksAsNotCompleted(trackId)
  tracks.removeFurtherUsedTracks(trackId)
  await router.push({ name: RouteName.QuestionnaireFromSidebar, hash: Navigation.hashByRouteName(RouteName.Questionnaire) })
}
</script>
