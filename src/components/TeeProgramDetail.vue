<template>
  <!-- PROGRAM INFOS -->
  <div class="">

    <!-- BACK TO RESULTS BTN -->
    <DsfrButton
      class="fr-mb-3v fr-link"
      :label="choices.t('results.backToResults')" 
      icon="ri-arrow-left-line"
      tertiary
      noOutline
      @click="resetDetailResult"
    />
    <div class="fr-grid-row fr-grid-row--gutters fr-mb-10v">
      <!-- IMAGE -->
      <div class="fr-col-4 fr-col-sm-hide">
        <img 
          class="fr-responsive-img"
          :src="`${choices.publicPath}images/TEE_illustration.png`"
          :alt="`image / ${program.title}`"
          />
      </div>
      
      <!-- TITLE & RESUME -->
      <div class="fr-col fr-col-offset-md-1 fr-col-offset-sm-0">
        <!-- PROGRAM TITLE -->
        <!-- <h1>
          {{ program.title }}
        </h1> -->
        <p class="fr-badge fr-badge--info fr-badge--no-icon fr-mb-5v">
          {{ program.title }}
        </p>

        <!-- PROGRAM RESUME -->
        <h6
          v-if="trackConfig.config?.showProgramSubtitles"
          :style="`color: ${blockColor}`">
          {{ choices.t('program.programResume') }}
        </h6>
        <h2
          v-if="program.resume"
          :style="`color: ${blockColor}`"
          v-html="program.resume">
        </h2>

        <!-- PROGRAM DESCRIPTION -->
        <h6
          v-if="trackConfig.config?.showProgramSubtitles"
          :style="`color: ${blockColor}`">
          {{ choices.t('program.programDescription') }}
        </h6>
        <p 
          v-if="program.description"
          v-html="program.description">
        </p>

        <!-- OPEN MODAL -> FORM -->
        <!-- :label="choices.t('results.showForm', {title: program.title})" -->
        <DsfrButton 
          class="fr-mb-3v fr-btn-sm-fullwidth"
          :label="choices.t('results.knowMore')"
          secondary
          @click="toggleShowForm"
          ref="modalOrigin"/>
      </div>
    </div>

    <!-- PROGRAM INFOS : PROVIDERS / TYPE / START / END -->
    <div
      v-if="trackConfig.config?.showProgramInfos" 
      class="fr-grid-row fr-grid-row--gutters fr-mb-5v">
      <!-- PROGRAM PROVIDERS -->
      <div
        v-if="program.program_providers" 
        class="fr-col-3">
        <TeeTile
          :title="choices.t('program.programProviders')">
          <template #description>
            <ul style="list-style-type: none; margin: 0 ; padding: 0;">
              <li
                v-for="(provider, index) in program.program_providers"
                :key="`provider-${index}-${provider.code || provider}`">
                <a 
                  v-if="provider.href"
                  :href="provider.href">
                  {{ provider.code || provider }}
                </a>
                <span v-else>
                  {{ provider.code || provider }}
                </span>
              </li>
            </ul>
          </template>
        </TeeTile>
      </div>

      <!-- PROGRAM TYPE -->
      <div
        v-if="program.program_type" 
        class="fr-col-3">
        <TeeTile
          :title="choices.t('program.programType')"
          :description="choices.t(`programTypes.${program.program_type}`)"
        />
      </div>

      <!-- PROGRAM GEO ZONES -->
      <div
        v-if="program.geo_zones" 
        class="fr-col-3">
        <TeeTile
          :title="choices.t('program.programGeoZones')"
          :description="'...'"
        />
      </div>

      <!-- PROGRAM START -->
      <div
        v-if="program.date_start" 
        class="fr-col-3">
        <TeeTile
          :title="choices.t('program.programStartDate')"
          :description="'...'"
        />
      </div>

      <!-- PROGRAM END -->
      <div
        v-if="program.date_end" 
        class="fr-col-3">
        <TeeTile
          :title="choices.t('program.programEndDate')"
          :description="'...'"
        />
      </div>
    </div>
  </div>

  <!-- MODAL DIALOG -->
  <dialog 
    aria-labelledby="fr-modal-title-modal-1" 
    role="dialog" 
    id="fr-modal-1" 
    :class="`fr-modal fr-modal-custom ${showForm ? 'fr-modal--opened' : ''}`">
    <div class="fr-container fr-container--fluid fr-container-md">
      <div class="fr-grid-row fr-grid-row--center">
        <div class="fr-col-12 fr-col-md-11 fr-col-lg-10">
          <div 
            class="fr-modal__body fr-modal__body-custom"
            >
            <div class="fr-modal__header">
              <button 
                class="fr-link--close fr-link" 
                aria-controls="fr-modal-1"
                style="align-items: center;"
                @click="toggleShowForm"
                >
                <span class="fr-sm-hide">
                  {{ choices.t('close') }}
                </span>
              </button>
            </div>
            <div class="fr-modal__content">
              <!-- <h1 id="fr-modal-title-modal-1" class="fr-modal__title">
                <span class="fr-fi-arrow-right-line fr-fi--lg"></span>
                Titre de la modale
              </h1> -->
              <div class="fr-grid-row fr-grid-row--gutters">
                <!-- MODAL INFOS -->
                <div class="fr-col-md-5 fr-col-sm-12 align">
                  <h4 
                    class=""
                    style="text-align: center;">
                    {{ choices.ti(trackConfig?.form.label[choices.lang], { title: program.title }) || '' }}
                  </h4>
                  <p
                    class=""
                    style="text-align: center;">
                    {{ trackConfig?.form.hint[choices.lang] || '' }}
                  </p>
                  <img 
                    class="fr-responsive-img fr-sm-hide"
                    :src="`${choices.publicPath}images/TEE_illustration.png`"
                    :alt="`image / ${program.title}`"
                    />
                </div>
                <!-- MODAL FORM -->
                <div class="fr-col">
                  <TeeForm
                    :track-id="trackConfig.id"
                    :form-options="trackConfig.form"
                    :data-props="{ programId: program.id }"
                    :debug="debug"/>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </dialog>

</template>


<script setup lang="ts">

import { ref, onBeforeMount } from 'vue'

// @ts-ignore
import type { ProgramData, Track } from '@/types/index'

// @ts-ignore
import TeeTile from './TeeTile.vue'
// @ts-ignore
import TeeForm from './TeeForm.vue'

import { choicesStore } from '../stores/choices'
import { programsStore } from '../stores/programs'
import { analyticsStore } from '../stores/analytics'

const choices = choicesStore()
const programs = programsStore()
const analytics = analyticsStore()

const blockColor = 'var(--text-default-info)'

const showForm = ref<boolean>(false)

interface Props {
  program: ProgramData,
  trackConfig: Track | any,
  debug?: boolean,
}
const props = defineProps<Props>()

// functions
const resetDetailResult = () => {
  // console.log('TeeProgramDetail > resetDetailResult > trackConfig : ', props.trackConfig )
  programs.resetDetailResult()
}
const toggleShowForm = () => {
  // console.log('TeeProgramDetail > toggleShowForm > trackConfig : ', props.trackConfig )
  showForm.value = !showForm.value
  if (showForm.value) {
    analytics.sendEvent('result_detail', 'show_form', props.program.id)
  }
}

onBeforeMount(() => {
  // console.log('TeeProgramDetail > onBeforeMount > resultsProgs :', resultsProgs )
  // analytics / send event
  analytics.sendEvent('result_detail', 'show_detail', props.program.id)
})
</script>