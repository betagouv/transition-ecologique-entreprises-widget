<template>
  <div
    :id="RouteName.QuestionnaireResult"
    class="fr-container--fluid fr-container--fluid--no-overflow"
  >
    <TeeEligibilityCriteriaBar
      v-if="linkToPreviousButton"
      :bg-color="Color.blueLight"
      :bg-bar-color="Color.blueLight"
      :previous-route="linkToPreviousButton"
    />
    <ResultList />
  </div>
</template>

<script setup lang="ts">
import { RouteName } from '@/types/routeType'
import { useUsedTrackStore } from '@/stores/usedTrack'
import { useNavigationStore } from '@/stores/navigation'
import { computed } from 'vue'
import TeeEligibilityCriteriaBar from '@/components/program/eligibilityCriteria/TeeEligibilityCriteriaBar.vue'
import { Color } from '@/types'

const navigationStore = useNavigationStore()
const usedTrackStore = useUsedTrackStore()

const linkToPreviousButton = computed(() => {
  const trackId = usedTrackStore.getPreviousCompletedUsedTrackId()
  if (trackId) {
    return navigationStore.routeByTrackId(trackId)
  }
  return null
})
</script>
