<template>
  <!-- QUESTIONNAIRE -->
  <div
    ref="trackElement"
    class="fr-container--fluid"
  >
    <div
      :id="RouteName.Questionnaire"
      :class="`fr-container--fluid ${needSidebar ? 'fr-pt-0v' : ''}`"
    >
      <!-- TRACKS INTERFACES -->
      <div
        ref="tee-app-tracks"
        class="fr-grid-row fr-grid-row-gutters fr-justify-center"
      >
        <!-- SIDEBAR MENU (FIL D'ARIANE)-->
        <div
          v-if="needSidebar"
          class="fr-tee-add-padding fr-mt-10v fr-col-3 fr-col-md-4 fr-col-lg-4 fr-col-xl-2 fr-col-sm-hide"
          style="height: 100%"
        >
          <TrackSidebar />
        </div>

        <!-- TRACKS -->
        <div
          id="tee-app-tracks"
          class="fr-grid-row--center fr-col fr-col-sm-12 fr-col-md-8 fr-col-lg-8 fr-col-xl-6"
        >
          <div
            v-if="trackElement && usedTrackStore.current && trackStore.current"
            :style="`${trackStore.current.bgColor ? 'padding: 0px; background-color:' + trackStore.current.bgColor : ''}`"
            :class="`fr-p-0 fr-mb-${debugStore.is ? '12v' : '0'}`"
          >
            <TrackContent :track-element="trackElement" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import TrackContent from '@/components/track/TrackContent.vue'
import TrackSidebar from '@/components/track/TrackSidebar.vue'
import { useDebugStore } from '@/stores/debug'
// import { useNavigationStore } from '@/stores/navigation'
import { useTrackStore } from '@/stores/track'
import { useUsedTrackStore } from '@/stores/usedTrack'
import { TrackId } from '@/types'
import { RouteName } from '@/types/routeType'
import { computed, onBeforeMount, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'

interface Props {
  trackId: TrackId
}
const props = defineProps<Props>()

const trackElement = ref<HTMLElement | null>(null)

const trackStore = useTrackStore()
const usedTrackStore = useUsedTrackStore()
// const nav = useNavigationStore()
const debugStore = useDebugStore()
const router = useRouter()

const needSidebar = computed(() => {
  return trackStore.currentId !== TrackId.QuestionnaireRoute
})

// const setupFromUrl = async () => {
//   await nav.updateQueries(usedTrackStore.usedTracksValuesPairs)
// }

onBeforeMount(() => {
  usedTrackStore.add(props.trackId, props.trackId)
})

onMounted(async () => {
  // cf: https://stackoverflow.com/questions/69495211/vue3-route-query-empty
  await router.isReady()
  // await setupFromUrl()
})
</script>
