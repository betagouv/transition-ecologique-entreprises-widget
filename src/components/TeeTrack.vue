<template>
  <!-- DEBUGGING -->
  <div
    class="vue-debug"
    v-if="debug">
    <h5>DEBUG - TeeTrack</h5>
    <div class="fr-grid-row fr-grid-row--gutters fr-mb-3v">
      <div class="fr-col-3">
        <h6 class="fr-mb-1v"> step : <code>{{ step }} </code></h6>
        <h6 class="fr-mb-1v"> trackId : <code>{{ trackId }} </code></h6>
        <h6 class="fr-mb-1v"> isCompleted : <code>{{ isCompleted }} </code></h6>
        <!-- <h6 class="fr-mb-1v"> tracks.isTrackCompleted(trackId) : <code>{{ tracks.isTrackCompleted(trackId) }} </code></h6> -->
        <h6 class="fr-mb-1v"> needRemove : <code>{{ needRemove }} </code></h6>
      </div>
      <div class="fr-col-4">
        <h6 class="fr-mb-1v"> renderAs : <code>{{ renderAs }} </code></h6>
        <h6 class="fr-mb-1v"> allowMultiple : <code>{{ allowMultiple }} </code></h6>
        <h6 class="fr-mb-1v"> trackOperator : <code>{{ trackOperator }} </code></h6>
        <h6 class="fr-mb-1v"> colsWidth : <code>{{ colsWidth }} </code></h6>
        <h6 class="fr-mb-1v"> selectionValues : </h6>
        <code><pre>{{ selectionValues }}</pre> </code>
      </div>
      <!-- <div class="fr-col-3"> -->
        <!-- <h6 class="fr-mb-1v"> selection : </h6>
        <code>{{ selection }} </code> -->
        <!-- <h6 class="fr-mb-1v"> selectionTitles : </h6>
        <code>{{ selectionTitles }} </code> -->
      <!-- </div> -->
      <div class="fr-col-5">
        <!-- <h6 class="fr-mb-1v"> selectedOption : </h6>
        <code>{{ selectedOption }} </code> -->
        <h6 class="fr-mb-1v"> selectedOptions : </h6>
        <code><pre>{{ selectedOptions }}</pre></code>
      </div>

      <div
        v-if="false" 
        class="fr-col-6">
        <h4>optionsArray (values) :</h4>
        <code><pre>{{ optionsArray.map(o => o.value) }}</pre></code>
      </div>
    </div>
  </div>

  <!-- UNCOMPLETED QUESTIONNAIRE -->
  <div
    v-if="!isCompleted"
    class="fr-grid-row fr-grid-row--gutters"
    >
  
    <!-- TRACK LABEL -->
    <div
      v-if="step !== 1"
      :class="`${isTrackResults ? 'fr-col-10 fr-col-offset-1' : 'fr-col-12'}`">
      <h3>
        {{ tracks.getTrackLabel(trackId, choices.lang) }}
      </h3>
    </div>

    <!-- TRACK CHOICES -->
    <div
      v-for="option in optionsArray"
      :key="option.value"
      :class="`fr-col-${colsWidth} ${isTrackResults ? 'fr-col-offset-1' : ''} fr-py-1v`"
      >
      
      <!-- AS CARDS -->
      <div
        v-if="renderAs === 'cards'"
        style="height: 100%;"
        >
        <div 
          class="fr-card fr-enlarge-link"
          @click="updateSelection(option)">
          <div class="fr-card__body">
            <div class="fr-card__content">
              <h3 class="fr-card__title">
                <!-- <a href="#"> -->
                  {{ option.label[choices.lang] }}
                <!-- </a> -->
              </h3>
              <div
                v-if="isActiveChoice(option.value)" 
                class="fr-card__start">
                <!-- <p>
                  <DsfrBadge 
                    type="info" 
                    :label="choices.t('selection.selected')" />
                </p> -->
                <p class="fr-badge fr-badge--info fr-badge--no-icon fr-mb-4v">
                  {{ choices.t('selection.selected') }}
                </p>
                <!-- <ul class="fr-tags-group">
                  <li>
                    <p class="fr-tag">
                      {{ choices.t('selection.selected') }}
                    </p>
                  </li>
                </ul> -->
            </div>
              <p class="fr-card__desc">
                {{ option.hint[choices.lang] }}
              </p>
            </div>
          </div>
          <!-- <div class="fr-card__header">
            <div class="fr-card__img">
              <img 
                class="fr-responsive-img" 
                src="/img/placeholder.16x9.png" 
                alt="[À MODIFIER - vide ou texte alternatif de l’image]">
            </div>
          </div> -->
        </div>
      </div>
      
      <!-- AS BUTTONS -->
      <div 
        v-if="renderAs === 'buttons' && !allowMultiple"
        >
        <DsfrButton
          style="width: -moz-available !important; width: 100%;"
          :label="option.label[choices.lang]" 
          :icon="`${isActiveChoice(option.value) ? 'md-radiobuttonchecked' : 'md-radiobuttonunchecked'}`"
          :secondary="!isActiveChoice(option.value)"
          @click="updateSelection(option)"
        />
      </div>
      <div 
        v-if="renderAs === 'buttons' && allowMultiple"
        >
        <DsfrButton
          style="width: -moz-available !important;"
          :label="option.label[choices.lang]" 
          :icon="`${isActiveChoice(option.value) ? 'ri-checkbox-line' : 'ri-checkbox-blank-line'}`"
          :secondary="!isActiveChoice(option.value)"
          @click="updateSelection(option)"
        />
      </div>

      <!-- AS FORM -->
      <!-- <div 
        v-show="renderAs === 'form'"
        >
        <TeeForm
          :form-options="option"
          :debug="debug"
          @saveData="updateSelectionFromForm"/>
      </div> -->

      <!-- AS RESULT -->
      <div 
        v-if="isTrackResults"
        >
        <TeeResults
          :track-id="trackId"
          :track-config="track.config"
          :track-options="track.options"
          :track-form="track.form"
          :tracks-results="tracks.usedTracks"
          :debug="debug"
        />
      </div>
    </div>

  </div>
  
  <!-- SEND / NEXT BUTTON -->
  <div 
    v-if="renderAs !== 'cards' && !isCompleted && !isTrackResults"
    class="fr-grid-row fr-grid-row--gutters fr-pt-8v">
    <div
      v-if="step > 1"
      class="fr-col-3 fr-col-offset-6">
      <DsfrButton
        style="width: -moz-available !important; width: 100%"
        :label="choices.t('previous')"
        icon="ri-arrow-left-line"
        secondary
        @click="backToPreviousTrack"
      />
    </div>
    <div 
      :class="`fr-col-3 ${step === 1 ? 'fr-col-offset-9' : ''}`">
      <DsfrButton
        style="width: -moz-available !important; width: 100%"
        :label="choices.t('next')"
        :disabled="!selectedOptions.length"
        icon="ri-arrow-right-line"
        @click="saveSelection"
      />
    </div>
  </div>

</template>

<script setup lang="ts">

import { ref, computed, watch } from 'vue'

import { tracksStore } from '../stores/tracks'
import { choicesStore } from '../stores/choices'
import { analyticsStore } from '../stores/analytics'
// import type { DsfrButton } from '@gouvminint/vue-dsfr/types'

// @ts-ignore
import type { Track, TrackOptions, ColsOptions } from '@/types/index'

// // @ts-ignore
// import TeeForm from './TeeForm.vue'
// @ts-ignore
import TeeResults from './TeeResults.vue'

interface Props {
  step: number,
  trackId: string,
  isCompleted: boolean,
  debug?: boolean,
}
const props = defineProps<Props>()

const colsOptions: ColsOptions = {
  buttons: 12,
  cards: 4,
  form: 8,
  modify: 2,
  results: 10,
}

const tracks = tracksStore()
const choices = choicesStore()
const analytics = analyticsStore()

const selectedOptions = ref<any[]>([])
const needRemove = ref<boolean>(false)

const track: Track | any = tracks.getTrack(props.trackId)
// console.log('TeeTrack > track :', track)
const renderAs: string = track?.interface.component || 'buttons'
const customColWidth: number | string = track?.interface.columnWidth || 0
// console.log('TeeTrack > track :', track)

// @ts-ignore
const allowMultiple: boolean = !!track?.behavior?.multipleChoices

// @ts-ignore
const trackOperator: boolean = track?.behavior?.operator || false
const optionsArray: any[] = track?.options.filter( (o: TrackOptions) => !o.disabled) || []

// Computed
const isTrackResults = computed(() => {
  return track?.interface.component === 'results'
})
const selectionValues = computed(() => {
  // console.log('TeeTrack > selectionValues > selectedOptions.value :', selectedOptions.value)
  const values = selectedOptions.value.length && selectedOptions.value.map(o => o?.value)
  // console.log('TeeTrack > selectionValues > values :', values)
  return values || []
})

const colsWidth = computed(() => {
  if (props.isCompleted) {
    // full width of 10 if completed track
    return colsOptions[renderAs]
  } else if (customColWidth === 'auto') {
    // auto columns width
    const rawDiv = Math.round(12 / optionsArray.length)
    return rawDiv < 2 ? 3 : rawDiv
  } else {
    if (customColWidth) {
      // if defined in choices*.ts
      return customColWidth
    } else {
      // default values hard written 
      return colsOptions[renderAs]
    }
  }
})

// Getters
const isActiveChoice = (value: string | number) => {
  // console.log('TeeTrack > isActiveChoice > selectionValues :', selectionValues)
  return selectionValues.value.includes(value)
}

const updateSelection = (option: any) => {
  // console.log('TeeTrack > updateSelection > option :', option)
  const isActive = isActiveChoice(option.value)
  let remove = false
  if (!isActive) {
    if (allowMultiple) {
      selectedOptions.value.push(option)
    } else {
      selectedOptions.value = [option]
    }

    // analytics / track event / only if positive choice
    // @ts-ignore
    for(const [key, val] of Object.entries(option.value)) {
      analytics.sendEvent(props.trackId, key, val)
    }
  } else {
    selectedOptions.value = selectedOptions.value.filter(i => i.value !== option.value)
    remove = !selectedOptions.value.length
  }
  needRemove.value = remove
  // selectedOptions.value = option
  
  // Direc
  if (!allowMultiple && renderAs !== 'buttons'  ) {
    saveSelection()
  }
}

// watchers
watch(() => props.isCompleted, ( next ) => {
  // console.log('TeeTrack > watch > isCompleted :', next )
  if (!next) {
    selectedOptions.value = []
    tracks.updateUsedTracks(props.trackId, props.step, next, selectedOptions.value)
  }
})

// Actions
const saveSelection = () => {
  // console.log()
  // console.log('TeeTrack > updateStore > option :', option)

  const optionNext = selectedOptions.value[0].next
  const defaultNext = track?.next

  // @ts-ignore
  const next = !optionNext || allowMultiple ? defaultNext : optionNext

  tracks.updateUsedTracks(props.trackId, props.step, next, selectedOptions.value)
  
  // console.log('TeeTrack > updateStore > needRemove.value :', needRemove.value)
  if (!needRemove.value) {
    // console.log('TeeTrack > updateStore > addToUsedTracks...')
    const canAddTrack = !tracks.trackExistsInUsed(next.default)
    canAddTrack && tracks.addToUsedTracks(props.trackId, next.default)
  } else {
    // console.log('TeeTrack > updateStore > removeFromUsedTracks...')
    tracks.removeFurtherUsedTracks(props.trackId)
  }
}

const backToPreviousTrack = async () => {
  // console.log()
  // console.log('TeeTrack > backToTrack > props.trackId :', props.trackId)
  const indexOfTrack = tracks.tracksStepsArray.indexOf(props.trackId)
  // console.log('TeeTrack > backToTrack > indexOfTrack :', indexOfTrack)
  const TrackToGoBackTo = tracks.tracksStepsArray[indexOfTrack - 1]
  // console.log('TeeTrack > backToTrack > TrackToGoBackTo :', TrackToGoBackTo)
  await tracks.setUsedTracksAsNotCompleted(TrackToGoBackTo)
  tracks.removeFurtherUsedTracks(TrackToGoBackTo)
}
</script>