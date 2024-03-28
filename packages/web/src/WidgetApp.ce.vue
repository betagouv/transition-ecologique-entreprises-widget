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
            seed : <code>{{ seed }} </code>
          </h6>
        </div>
        <div class="fr-col-4">
          <h6 class="fr-mb-1v">
            tracks.seedTrack : <code>{{ trackStore.currentId }} </code>
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
      v-show="!programs.currentProgram"
      id="widget"
      :class="`fr-container--fluid ${usedTrackStore.currentStep && usedTrackStore.currentStep > 1 ? 'fr-pt-10v' : ''}`"
    >
      <!-- TRACKS INTERFACES -->
      <div
        ref="tee-app-tracks"
        class="fr-grid-row fr-grid-row-gutters fr-p-0 fr-justify-center"
      >
        <!-- SIDEBAR MENU (FIL D'ARIANE)-->
        <div
          v-if="needSidebar && usedTrackStore.currentStep && usedTrackStore.currentStep > 1"
          class="fr-tee-add-padding fr-mt-4v fr-col-3 fr-col-md-4 fr-col-lg-4 fr-col-xl-2 fr-col-sm-hide"
          style="height: 100%"
        >
          <TrackSidebar />
        </div>

        <!-- TRACKS -->
        <div
          id="tee-app-tracks"
          :class="`${usedTrackStore.currentStep && usedTrackStore.currentStep > 1 ? 'fr-tee-add-padding' : ''} ${getColumnsWidth} ${
            debugStore.is ? '' : 'fr-grid-row--center'
          }`"
        >
          <div
            v-for="(track, index) in usedTrackStore.usedTracks"
            :key="track.id"
            :style="`${
              trackStore.getTrackBgColor(track.id as TrackId)
                ? 'padding: 0px; background-color:' + trackStore.getTrackBgColor(track.id as TrackId)
                : ''
            }`"
            :class="`fr-p-0 fr-mb-${debugStore.is ? '12v' : '0'}`"
          >
            <TrackContent
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
    <template v-if="programs.currentProgram">
      <ProgramDetail :program-id="programs.currentProgram.id" />
    </template>
  </div>
</template>

<script setup lang="ts">
// CONSOLE LOG TEMPLATE
// console.log(`WidgetApp > FUNCTION_NAME > MSG_OR_VALUE :`)

// cf : https://stackoverflow.com/questions/71163741/vuejs-script-setup-cannot-contain-es-module-exports

import '@gouvfr/dsfr/dist/core/core.main.min.css'
import { useTrackStore } from '@/stores/track'
import { useUsedTrackStore } from '@/stores/usedTrack'
import { computed, onBeforeMount, ref } from 'vue'
import Translation from '@/utils/translation'
import { useProgramStore } from './stores/program'
import { TrackComponent, TrackId } from './types'
import TeeMatomo from './components/TeeMatomo.vue'
import TrackSidebar from '@/components/track/TrackSidebar.vue'
import ProgramDetail from './components/program/detail/ProgramDetail.vue'
import Widget from '@/utils/widget'
import { useDebugStore } from '@/stores/debug'
import { DsfrToggleSwitch } from '@gouvminint/vue-dsfr'
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

const programs = useProgramStore()
const debugStore = useDebugStore()
const trackStore = useTrackStore()
const usedTrackStore = useUsedTrackStore()

// HTML/Vue3 DOM ref
const trackElement = ref<HTMLElement | null>(null)

const changeDebug = (payload: boolean) => {
  debugStore.is = payload
}

const needSidebar = computed(() => {
  return trackStore.currentId !== TrackId.Results && usedTrackStore.currentStep && (usedTrackStore.currentStep > 1 || !Widget.is)
})

const getColumnsWidth = computed(() => {
  const currentUsedTrack = usedTrackStore.current
  const colsDebug = 'fr-col-7'
  const colsStart = 'fr-col-12 fr-col-xl-12'
  const colsTracks = 'fr-col fr-col-sm-12 fr-col-md-8 fr-col-lg-8 fr-col-xl-6'
  const colsResults = 'fr-col fr-col-sm-12 fr-col-md-8 fr-col-lg-8 fr-col-xl-8'
  if (debugStore.is) {
    return colsDebug
  } else if (trackStore.currentId === TrackId.Results || (usedTrackStore.currentStep === 1 && Widget.is)) {
    return colsStart
  } else if ((currentUsedTrack && (currentUsedTrack.component as TrackComponent)) === TrackComponent.Results) {
    return colsResults
  } else {
    return colsTracks
  }
})

const setupGlobal = () => {
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
    trackStore.setMaxDepth(maxDepthNum)
  }

  // set debug mode
  // no switch for production deployment
  debugStore.hasSwitch = Config.isDebugSwitch && props.debugSwitch
  if (debugStore.hasSwitch && props.debug) {
    debugStore.is = props.debug
  }

  // set first track at mount
  usedTrackStore.add(props.seed, props.seed)
})
</script>

<style lang="scss">
@import '@gouvfr/dsfr/dist/dsfr.min.css';
@import '@gouvfr/dsfr/dist/utility/icons/icons.min.css';
@import '@gouvminint/vue-dsfr/dist/vue-dsfr.css';
@import '@public/css/custom.css';
</style>
