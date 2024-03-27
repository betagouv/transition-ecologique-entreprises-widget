<template>
  <div
    ref="trackElement"
    class="fr-container--fluid"
  >
    <div
      v-if="debugStore.is"
      class="vue-debug"
    >
      <h5>DEBUG - WidgetApp</h5>
      <div class="fr-grid-row fr-grid-row--gutters fr-mb-3v">
        <div class="fr-col-4">
          <h6 class="fr-mb-1v">
            tracks.currentStep : <code>{{ tracks.currentStep }} </code>
          </h6>
          <h6 class="fr-mb-1v">
            seed : <code>{{ seed }} </code>
          </h6>
        </div>
        <div class="fr-col-4">
          <h6 class="fr-mb-1v">
            programs.programDetail : <code>{{ programs.programDetail }} </code>
          </h6>
          <h6 class="fr-mb-1v">
            tracks.seedTrack : <code>{{ tracks.seedTrack }} </code>
          </h6>
        </div>
      </div>
    </div>

    <!-- MESSAGE & DEBUG SWITCH-->
    <div
      v-if="debugStore.hasSwitch"
      class="fr-grid-row fr-grid-row--gutters"
    >
      <!-- DEBUG SWITCH-->
      <div class="fr-col-md-3 fr-col-sm-6">
        <DsfrToggleSwitch
          label="Debug mode"
          hint="Switch to activate / deactivate debugging mode"
          :model-value="debugStore.is"
          @update:model-value="changeDebug"
        />
      </div>
    </div>

    <!-- MATOMO -->
    <TeeMatomo />

    <!-- QUESTIONNAIRE -->
    <div
      v-show="!programs.programDetail"
      id="widget"
      :class="`fr-container--fluid ${tracks.currentStep && tracks.currentStep > 1 ? 'fr-pt-10v' : ''}`"
    >
      <!-- TRACKS INTERFACES -->
      <div
        ref="tee-app-tracks"
        class="fr-grid-row fr-grid-row-gutters fr-p-0 fr-justify-center"
      >
        <!-- SIDEBAR MENU (FIL D'ARIANE)-->
        <div
          v-if="needSidebar && tracks.currentStep && tracks.currentStep > 1"
          class="fr-tee-add-padding fr-mt-4v fr-col-3 fr-col-md-4 fr-col-lg-4 fr-col-xl-2 fr-col-sm-hide"
          style="height: 100%"
        >
          <TeeSidebar />
        </div>

        <!-- TRACKS -->
        <div
          id="tee-app-tracks"
          :class="`${tracks.currentStep && tracks.currentStep > 1 ? 'fr-tee-add-padding' : ''} ${getColumnsWidth} ${
            debugStore.is ? '' : 'fr-grid-row--center'
          }`"
        >
          <div
            v-for="(track, index) in tracks.usedTracks"
            :key="track.id"
            :style="`${
              tracks.getTrackBgColor(track.id as TrackId)
                ? 'padding: 0px; background-color:' + tracks.getTrackBgColor(track.id as TrackId)
                : ''
            }`"
            :class="`fr-p-0 fr-mb-${debugStore.is ? '12v' : '0'}`"
          >
            <TeeTrack
              v-if="trackElement"
              :step="index + 1"
              :used-track="track"
              :track-element="trackElement"
            />
          </div>
        </div>
      </div>
    </div>

    <!-- DETAIL RESULT CARD -->
    <template v-if="programs.programDetail">
      <ProgramDetail
        :program-id="programs.programDetail"
        :track-id="programs.programDetailConfig"
      />
    </template>
  </div>
</template>

<script setup lang="ts">
// CONSOLE LOG TEMPLATE
// console.log(`WidgetApp > FUNCTION_NAME > MSG_OR_VALUE :`)

// cf : https://stackoverflow.com/questions/71163741/vuejs-script-setup-cannot-contain-es-module-exports

import '@gouvfr/dsfr/dist/core/core.main.min.css'

import { computed, onBeforeMount, ref, watch } from 'vue'

import { useTracksStore } from './stores/tracks'
import Translation from '@/utils/translation'
import { useProgramsStore } from './stores/programs'
import { useNavigationStore } from './stores/navigation'
import { type ProgramData, TrackComponents, TrackId } from './types'
import TeeMatomo from './components/TeeMatomo.vue'
import TeeTrack from './components/tracks/TeeTrack.vue'
import TeeSidebar from './components/TeeSidebar.vue'
import ProgramDetail from './components/program/detail/ProgramDetail.vue'
import Widget from '@/utils/widget'
import { useDebugStore } from '@/stores/debug'
import { DsfrToggleSwitch } from '@gouvminint/vue-dsfr'
import jsonDataset from '../public/data/generated/dataset_out.json'
import Config from '@/config'

interface Props {
  locale?: string
  seed: TrackId
  programId?: string
  maxDepth?: string
  debugSwitch?: boolean
  debug?: boolean
}
const props = defineProps<Props>()

const tracks = useTracksStore()
const programs = useProgramsStore()
const nav = useNavigationStore()
const debugStore = useDebugStore()

// HTML/Vue3 DOM ref
const trackElement = ref<HTMLElement | null>(null)

watch(
  () => tracks.usedTracks,
  () => {
    if (nav.routerReady) {
      if (tracks.currentStep) {
        nav.setCurrentStep(tracks.currentStep)
      }
      nav.setCurrentTrackId(tracks.currentTrackId as TrackId)
      nav.updateQueries(tracks.getAllUsedTracksValuesPairs)
    }
  }
)

const changeDebug = (payload: boolean) => {
  debugStore.is = payload
}

const needSidebar = computed(() => {
  return tracks.seedTrack !== TrackId.Results && tracks.currentStep && (tracks.currentStep > 1 || !Widget.is)
})

const getColumnsWidth = computed(() => {
  const currentTrack = tracks.getLastTrack
  const colsDebug = 'fr-col-7'
  const colsStart = 'fr-col-12 fr-col-xl-12'
  const colsTracks = 'fr-col fr-col-sm-12 fr-col-md-8 fr-col-lg-8 fr-col-xl-6'
  const colsResults = 'fr-col fr-col-sm-12 fr-col-md-8 fr-col-lg-8 fr-col-xl-8'
  if (debugStore.is) {
    return colsDebug
  } else if (tracks.seedTrack === TrackId.Results || (tracks.currentStep === 1 && Widget.is)) {
    return colsStart
  } else if ((currentTrack && (currentTrack.component as TrackComponents)) === TrackComponents.Results) {
    return colsResults
  } else {
    return colsTracks
  }
})

const setupGlobal = () => {
  // load dataset to pinia store
  // programs.setDataset(props.datasetUrl, deployMode, deployUrl)
  programs.setDataset(jsonDataset as ProgramData[])

  // set locale and message
  const locale = props.locale ?? 'fr'
  Translation.setLocale(locale)
}
onBeforeMount(() => {
  setupGlobal()

  // inject style link in html head if not present
  const href = Config.isProduction ? `${Config.deployUrl}/style.css` : ''
  let needStyle = Widget.is
  // avoid duplicates
  const styleSheets = document.styleSheets.length
  if (needStyle && styleSheets) {
    for (let i = 0; i < styleSheets; i++) {
      const docStyle = document.styleSheets[i]
      if (docStyle.href == href) {
        needStyle = false
      }
    }
  }
  if (needStyle && Config.isProduction) {
    const head = document.head
    const link = document.createElement('link')
    link.type = 'text/css'
    link.rel = 'stylesheet'
    link.href = href
    head.appendChild(link)
  }

  // set max depth at mount
  if (props.maxDepth) {
    const maxDepthNum = Number(props.maxDepth)
    tracks.setMaxDepth(maxDepthNum)
  }

  // set debug mode
  // no switch for production deployment
  debugStore.hasSwitch = Config.isDebugSwitch && props.debugSwitch
  if (debugStore.hasSwitch && props.debug) {
    debugStore.is = props.debug
  }

  // set first track at mount
  tracks.setSeedTrack(props.seed)
  tracks.addToUsedTracks(props.seed, props.seed)
})
</script>

<style lang="scss">
@import '@gouvfr/dsfr/dist/dsfr.min.css';
@import '@gouvfr/dsfr/dist/utility/icons/icons.min.css';
@import '@gouvminint/vue-dsfr/dist/vue-dsfr.css';
@import '@public/css/custom.css';
</style>
