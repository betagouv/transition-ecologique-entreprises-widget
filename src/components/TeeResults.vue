<template>

  <!-- DEBUGGING -->
  <div 
    v-if="debug"
    class="vue-debug">
    <h5>DEBUG - TeeResults</h5>
    <!-- <h6>
      programs.programDetail : <code>{{ programs.programDetail || 'undefined' }}</code>
    </h6> -->
  </div>

  <!-- RESULTS ALERT -->
  <DsfrAlert
    v-if="trackConfig && trackConfig.showAlertResults && resultsProgsLen"
    :title="choices.t('results.alertTitle')"
    :description="choices.t('results.alertDescription')"
    type="success">
  </DsfrAlert>
  <DsfrAlert
    v-if="trackConfig && trackConfig.showAlertNoResults && !resultsProgsLen"
    :title="choices.t('results.alertTitleNoResults')"
    :description="choices.t('results.alertNoResults')"
    type="warning">
  </DsfrAlert>

  <!-- DEBUGGING -->
  <h4
    v-if="trackConfig && trackConfig.showResultsTitle && resultsProgsLen"
    class="fr-pt-12v">
    {{ choices.t('results.fittingPrograms') }}
    ({{ resultsProgsLen }})
  </h4>

  <!-- PROGRAMS AS LIST OF CARDS -->
  <div 
    v-if="resultsProgsLen"
    class="fr-container fr-px-0 fr-pt-6v">

    <!-- PROGRAM CARD -->
    <div
      v-for="prog in resultsProgs"
      :key="prog.index"
      class="fr-card fr-enlarge-link fr-card--horizontal-tier fr-mb-10v"
      @click="updateDetailResult(prog.id)">
      <div class="fr-card__body">
        <div class="fr-card__content">
          <h3 class="fr-card__title">
            {{ prog.resume }} 
          </h3>
          <!-- <p
            class="fr-card__desc"
            v-html="prog.description">
          </p> -->
          <p
            v-if="debug"
            class="vue-debug fr-card__desc">
            <br> choices.publicPath : <code>{{ choices.publicPath }}</code>
            <br> prog.cover : <code>{{ prog.cover }}</code>
          </p>
          <div class="fr-card__start">
            <ul class="fr-badges-group">
              <li>
                <p class="fr-badge fr-badge--info fr-badge--no-icon">
                  {{ prog.title }}
                </p>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div
        v-if="prog.cover"
        class="fr-card__header">
        <div class="fr-card__img">
          <!-- :src="`${choices.publicPath}${prog.cover}`" -->
          <img 
            class="fr-responsive-img"
            :src="`${choices.publicPath}images/TEE_illustration.png`"
            :alt="`image / ${prog.title}`"
            />
          <!-- L’alternative de l’image (attribut alt) doit toujours être présente, sa valeur peut-être vide (image n’apportant pas de sens supplémentaire au contexte) ou non (porteuse de texte ou apportant du sens) selon votre contexte -->
        </div>
        <ul class="fr-badges-group">
          <li
            v-for="(provider, i) in prog.program_providers"
            :key="`provider-${i}`"
            >
            <p class="fr-badge">
              {{ provider.code }}
            </p>
          </li>
        </ul>
      </div>
    </div>
  </div>

  <!-- DEBUGGING -->
  <div 
    v-if="debug"
    class="vue-debug">
    <h5>DEBUG - TeeResults</h5>
    <div class="fr-grid-row fr-grid-row--gutters fr-mb-3v">
      <div class="fr-col-6">
        <h6>resultsProgs</h6>
        <code><pre>{{ resultsProgs }}</pre></code>
      </div>
      <div class="fr-col-6">
        <h6>tracksResults</h6>
        <code><pre>{{ tracksResults }}</pre></code>
        <h6>programs.progs</h6>
        <code><pre>{{ programs.progs }}</pre></code>
      </div>
    </div>
  </div>


</template>

<script setup lang="ts">

import { onBeforeMount, computed } from 'vue'
import { choicesStore } from '../stores/choices'
import { programsStore } from '../stores/programs'
import { analyticsStore } from '../stores/analytics'

// @ts-ignore
import type { TrackChoice, TrackResultsConfig, ProgramData } from '@/types/index'

const choices = choicesStore()
const programs = programsStore()
const analytics = analyticsStore()

interface Props {
  trackId: string,
  trackConfig?: TrackResultsConfig,
  trackOptions?: any,
  trackForm?: any,
  tracksResults: TrackChoice[] | any[],
  debug?: boolean,
}
const props = defineProps<Props>()

// const blockColor = 'var(--text-default-info)'

const resultsProgs: ProgramData[] = programs.filterPrograms(props.tracksResults)

const resultsProgsLen = computed(() => {
  return resultsProgs.length
})

const updateDetailResult = (id: string | number) => {
  // console.log(`TeeResults > updateDetailResult >  id : ${id}`)
  programs.setDetailResult(id, props.trackId)
}


onBeforeMount(() => {
  // console.log('TeeResults > onBeforeMount > resultsProgs :', resultsProgs )
  // analytics / send event
  analytics.sendEvent(props.trackId, 'show_results')
})
</script>