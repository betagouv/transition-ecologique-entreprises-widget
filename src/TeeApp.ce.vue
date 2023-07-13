<template>
  <div 
    :id="appId"
    class="fr-container--fluid fr-py-2v">
  
    <!-- HEADER -->
    <p 
      v-if="showHeaderBool"
      class="fr-pb-5v">
      <DsfrHeader
        logo-text="ADEME"
        service-title="Transition écologique des entreprises"
        service-description="Faire rimer écologie avec économies !"
      />
    </p>

    <!-- DEBUGGING -->
    <div
      class="vue-debug"
      v-if="debugBool">
      <h5>DEBUG - TeeApp</h5>
      <div class="fr-grid-row fr-grid-row--gutters fr-mb-3v">
        <div class="fr-col-4">
          <h6 class="fr-mb-1v"> tracks.currentStep : <code>{{ tracks.currentStep }} </code></h6>
        </div>
        <div class="fr-col-4">
          <h6 class="fr-mb-1v"> programs.programDetail : <code>{{ programs.programDetail }} </code></h6>
        </div>
      </div>
    </div>
    
    <!-- MESSAGE & DEBUG SWITCH-->
    <div 
      v-if="showMessageBool || debugSwitchBool"
      class="fr-grid-row fr-grid-row--gutters">
      <!-- MESSAGE-->
      <div 
        v-if="showMessageBool"
        class="fr-col">
        <h3
          v-if="message"
          class="red-color">
          <span v-html="message[choices.lang]"/>
        </h3>
      </div>
      <!-- DEBUG SWITCH-->
      <div
        v-if="debugSwitchBool" 
        class="fr-col-md-3 fr-col-sm-6">
        <DsfrToggleSwitch 
          label="Debug mode" 
          hint="Switch to activate / deactivate debugging mode"
          :modelValue="debugBool"
          @update:modelValue="changeDebug"
          />
      </div>
    </div>

    <!-- MATOMO -->
    <TeeMatomo
      :debug="debugBool"
      />

    <!-- QUESTIONNAIRE -->
    <div
      v-show="!programs.programDetail"
      class="fr-container--fluid">
      <!-- STEPPER -->
      <p
        v-if="showStepperBool" 
        >
        <TeeStepper
          :steps-array="tracks.tracksStepsArray"
          :current-step="tracks.currentStep"
          :debug="debugBool"
        />
      </p>

      <!-- TRACKS INTERFACES -->
      <div class="fr-grid-row fr-grid-row-gutters fr-p-1v">
        
        <!-- SIDEBAR MENU (FIL D'ARIANE)-->
        <div
          v-if="tracks.currentStep > 1"
          class="fr-col-3 fr-col-md-4 fr-col-lg-4 fr-col-xl-2 fr-col-offset-xl-1 fr-col-sm-hide"
          style="height: 100%;">
          <TeeSidebar
            :used-tracks="tracks.usedTracks"
            :debug="debugBool"
          />
        </div>
        <div
          v-if="tracks.currentStep > 1"
          class="fr-col-12 fr-col-sm-show fr-mb-8v">
          <TeeTopbar
            :used-tracks="tracks.usedTracks"
            :debug="debugBool"
          />
        </div>

        <!-- TRACKS -->
        <div 
          :class="`${debugBool ? 'fr-col-7' : tracks.currentStep === 1 ? 'fr-col-12 fr-col-lg-8 fr-col-xl-6' : 'fr-col fr-col-lg-8 fr-col-xl-6' } ${debugBool ? '' : 'fr-grid-row--center'}`">
          <div
            v-for="(track, index) in tracks.usedTracks"
            :key="track.id"
            :class="`fr-py-0 fr-mb-${ debugBool ? '12v' : '0'}`">
            <TeeTrack
              :step="index + 1"
              :track-id="track.id"
              :is-completed="!!tracks.isTrackCompleted(track.id)"
              :debug="debugBool"
            />
          </div>
        </div>

        <!-- DEBUGGING -->
        <div
          v-if="debugBool"
          class="vue-debug fr-col-2 fr-pl-3v">
          <h5>DEBUG - TeeApp</h5>
          <div class="fr-grid-row fr-grid-row--gutters">
            <div class="fr-col-12">
              <h6 class="fr-mb-1v"> seed : <code>{{ seed }} </code></h6>
              <h6 class="fr-mb-1v"> debug : <code>{{ debug }} </code></h6>
              <h6 class="fr-mb-1v"> debugBool : <code>{{ debugBool }} </code></h6>
              <h6 class="fr-mb-1v"> showHeader : <code>{{ showHeader }} </code></h6>
              <h6 class="fr-mb-1v"> choices.lang : <code>{{ choices.lang }} </code></h6>
              <h6 class="fr-mb-1v"> tracks.maxDepth : <code>{{ tracks.maxDepth }} </code></h6>
              <h6 class="fr-mb-1v"> tracks.seedTrack : <code>{{ tracks.seedTrack }} </code></h6>
            </div>

            <div class="fr-col-12">
              <h6 class="fr-mb-1v"> tracks.currentStep : <code>{{ tracks.currentStep }} </code></h6>
              <h6>
                tracks.tracksStepsArray :
              </h6>
              <code><pre>{{ tracks.tracksStepsArray  }}</pre></code>
            </div>

            <div class="fr-col-12">
              <h6>tracks.usedTracks :</h6>
              <code><pre>{{ tracks.usedTracks  }}</pre></code>
              <!-- <h6>tracks.tracksResults :</h6>
              <code><pre>{{ tracks.tracksResults  }}</pre></code> -->
            </div>

            <div
              v-if="false"
              class="fr-col-12">
              <h6>metaEnv :</h6>
              <code><pre>{{ metaEnv }}</pre></code>
            </div>

            <!-- <h4>
              TeeApp debug / programs :
            </h4>
            <code><pre>{{ programsArray  }}</pre></code> -->
          </div>
        </div>

      </div>
    </div>

    <!-- DETAIL RESULT CARD -->
    <div
      v-if="programs.programDetail"
      class="fr-container-fluid">
      <div 
        class="fr-grid-row fr-grid-row-gutters">
        <div class="fr-col">
          <TeeProgramDetail
            :program="programs.getProgramById(programs.programDetail)"
            :track-config="tracks.getTrack(programs.programDetailConfig)"
            :debug="debugBool"
            />
        </div>
      </div>
    </div>

    <!-- FOOTER -->
    <div
      v-if="showFooterBool"
      class="fr-mt-10v">
      <TeeCredits/>
    </div>
  </div>
</template>

<script setup lang="ts">
// cf : https://stackoverflow.com/questions/71163741/vuejs-script-setup-cannot-contain-es-module-exports

import '@gouvfr/dsfr/dist/core/core.main.min.css'               // Le CSS minimal du DSFR
// import '@gouvfr/dsfr/dist/component/component.main.min.css'  // Styles de tous les composants du DSFR
// import '@gouvfr/dsfr/dist/utility/utility.main.min.css'      // Classes utilitaires : les composants de VueDsfr en ont besoin
// import '@gouvminint/vue-dsfr/styles'                         // Les styles propres aux composants de VueDsfr
// import '@gouvfr/dsfr/dist/scheme/scheme.min.css'             // Facultatif : Si les thèmes sont utilisés (thème sombre, thème clair)
// import '@gouvfr/dsfr/dist/utility/icons/icons.min.css'       // Facultatif : Si des icônes sont utilisées avec les classes "fr-icon-..."

// import '@public/css/core.main.min.css'
// import '@public/css/custom.css'

// @ts-ignore
import jsonDataset from '@public/data/output/dataset_out.json'
// console.log('TeeApp > jsonDataset :', jsonDataset)

import { ref, onBeforeMount } from 'vue'

import { tracksStore } from './stores/tracks'
import { choicesStore } from './stores/choices'
import { programsStore } from './stores/programs'

// @ts-ignore
import TeeMatomo from './components/TeeMatomo.vue'
// @ts-ignore
import TeeTrack from './components/TeeTrack.vue'
// @ts-ignore
import TeeStepper from './components/TeeStepper.vue'
// @ts-ignore
import TeeSidebar from './components/TeeSidebar.vue'
// @ts-ignore
import TeeTopbar from './components/TeeTopbar.vue'
// @ts-ignore
import TeeProgramDetail from './components/TeeProgramDetail.vue'
// @ts-ignore
import TeeCredits from './components/TeeCredits.vue'

const appId = 'gov-aid-tree-app'

// @ts-ignore
const metaEnv = import.meta.env
// console.log('TeeApp - metaEnv :', metaEnv)
const deployMode = metaEnv.MODE != 'development'
const deployUrl = metaEnv.VITE_DEPLOY_URL
const noDebugSwitch = metaEnv.VITE_NO_DEBUG_SWITCH === 'true'
const publicPath = `${deployUrl}${metaEnv.BASE_URL}`
// console.log('TeeApp - publicPath :', publicPath)

// @ts-ignore
// console.log('TeeApp - process.env :', process.env)
// @ts-ignore
const yamlPrograms = deployMode ? jsonDataset : process.env.programs
// console.log('TeeApp - yamlPrograms :', yamlPrograms)

interface Props {
  showHeader?: string,
  showMessage?: string,
  showStepper?: string,
  showFooter?: string,
  locale?: string,
  msg?: string,
  seed: string,
  datasetUrl: string,
  maxDepth?: string
  debugSwitch?: string,
  debug?: string,
}
const props = defineProps<Props>()

const tracks = tracksStore()
const choices = choicesStore()
const programs = programsStore()

let showHeaderBool = ref(false)
let showMessageBool = ref(false)
let showStepperBool = ref(false)
let showFooterBool = ref(false)
let message = ref()
let debugSwitchBool = ref(false)
let debugBool = ref(false)

// @ts-ignore
window.stores = { tracks, choices, programs }

const changeDebug = (ev: any) => {
  debugBool.value = ev
}

onBeforeMount(() => {
  // console.log('TeeApp > props.seed :', props.seed)
  // console.log('TeeApp > props.maxDepth :', props.maxDepth)

  choices.setPublicPath(publicPath)

  // load dataset to pinia store
  // programs.setDataset(props.datasetUrl, deployMode, deployUrl)
  programs.setYamlDataset(yamlPrograms)

  // inject style link in html head if not present
  const href = deployMode ? `${deployUrl}/style.css` : ''
  // console.log('TeeApp > href :', href)
  let needStyle = true
  // avoid duplicates
  const styleSheets = document.styleSheets.length
  // console.log('TeeApp > document.styleSheets :', document.styleSheets)
  if (styleSheets) {
    for(let i = 0; i < styleSheets; i++){
      if(document.styleSheets[i].href == href){
        needStyle = false
        return
      }
    }
  }
  if (deployMode && needStyle) {
    const head = document.head
    // console.log('TeeApp > head :', head)
    const link = document.createElement('link')
    link.type = "text/css"
    link.rel = "stylesheet"
    link.href = href
    head.appendChild(link)
  }

  // set header / footer components
  showHeaderBool.value = props.showHeader === 'true'
  showStepperBool.value = props.showStepper === 'true'
  showMessageBool.value = props.showMessage === 'true'
  showFooterBool.value = props.showFooter === 'true'

  // set locale and message
  const locale = props.locale || 'fr'
  choices.setLocale(locale)
  const messageObj = {}
  if (props.msg) {
    props.msg.split(',').forEach((s: string) => {
      const strObj = s.split('|').map((i: string) => i.trim())
      // @ts-ignore
      messageObj[strObj[0]] = strObj[1]
    })
    // console.log('TeeApp > messageObj :', messageObj)
    message.value = messageObj
  }

  // set max depth at mount
  if (props.maxDepth) {
    const maxDepthNum = Number(props.maxDepth)
    tracks.setMaxDepth(maxDepthNum)
  }

  // set debug mode
  // no switch for production deployment

  debugSwitchBool.value = !noDebugSwitch && props.debugSwitch === 'true'
  if (debugSwitchBool.value && props.debug) {
    debugBool.value = props.debug === 'true'
  }

  // set first track at mount
  tracks.setSeedTrack(props.seed)
  tracks.addToUsedTracks(props.seed, props.seed)
})

</script>

<!-- <style lang="scss">
  @import '~@gouvfr/dsfr/dist/core/core.main.min.css';
  @import '~@gouvfr/dsfr/dist/component/component.main.min.css';
  @import '~@gouvfr/dsfr/dist/utility/utility.main.min.css';
  @import '~@gouvfr/dsfr/dist/scheme/scheme.min.css';
  @import '~@gouvfr/dsfr/dist/utility/icons/icons.min.css';
  @import '~@gouvminint/vue-dsfr/dist/vue-dsfr.css';
</style> -->

<style lang="scss">
  @import '~@gouvfr/dsfr/dist/dsfr.min.css'; // ok
  @import '@public/css/custom.css';
  
  // @import '../public/core.main.css';
  // @import '~@gouvfr/dsfr/dist/core/core.main.min.css';

  // @import '~@gouvfr/dsfr/dist/dsfr.legacy.min.css';
  // @import '~@gouvfr/dsfr/dist/dsfr.main.min.css';

  // @import '~@gouvfr/dsfr/dist/component/component.main.min.css';
  // @import '~@gouvfr/dsfr/dist/utility/utility.main.min.css';

  // @import '~@gouvfr/dsfr/dist/scheme/scheme.min.css';
  @import '~@gouvfr/dsfr/dist/utility/icons/icons.min.css'; // ok

  // @import '~@gouvminint/vue-dsfr/styles';
  @import '~@gouvminint/vue-dsfr/dist/vue-dsfr.css'; // ok
</style>

