<template>
  <!-- DEBUGGING -->
  <div
    class="vue-debug"
    v-if="debug">
    <h5>DEBUG - TeeTrackInput</h5>
    <div class="fr-grid-row fr-grid-row--gutters fr-mb-3v">
      <div class="fr-col-3">
        <h6 class="fr-mb-1v"> inputValue : <code>{{ inputValue }} </code></h6>
        <h6 class="fr-mb-1v"> hasSelection : <code>{{ hasSelection }} </code></h6>
        <!-- <h6 class="fr-mb-1v"> selection : <code>{{ selection }} </code></h6> -->
      </div>
      <div class="fr-col-9">
        <h6 class="fr-mb-1v"> option :</h6>
        <pre><code>{{ option }} </code></pre>
      </div>
    </div>
  </div>

  <!-- INPUT -->
  <label 
    class="fr-label fr-mb-2v"
    :for="`input-${option.id}`">
    {{ option.label[choices.lang] }}
  </label>
  <div
    class="fr-search-bar" 
    id="header-search"
    role="search">
    <input 
      :id="`input-${option.id}`"
      :name="`input-${option.id}`"
      :disabled="isLoading"
      :placeholder="option.placeholder[choices.lang]" 
      class="fr-input" 
      type="search" 
      v-model="inputValue"
      @keyup.enter="processInput">
    <button 
      class="fr-btn"
      :disabled="isLoading"
      :title="choices.t('input.search')"
      @click="processInput">
      {{ choices.t('input.search') }}
    </button>
  </div>

  <!-- RESPONSE ERRORS -->
  <div
    v-if="requestErrors.length"
    class="fr-mt-6v">
    <p class="fr-mb-0 fr-error-text" style="display: block;">
      <!-- <span class="fr-icon-error-line" aria-hidden="true"></span> -->
      {{ choices.t('enterprise.noStructureFound') }}
      
      <!-- DEBUGGING / ERROR CODE -->
      <span v-if="debug">
        (
        <span
          v-for="(err, i) in requestErrors"
          :key="`resp-error-${i}`">
          {{ choices.t('errors.error') }} {{ err.status }}
        </span>
        )
      </span>
      <!-- postResponses -->
      <br v-if="option.postResponses">
      <span 
        v-if="option.postResponses"
        v-html="option.postResponses[choices.lang]">
      </span>
    </p>
    <!-- <div 
      v-for="(err, i) in requestErrors"
      :key="`resp-error-${i}`"
      class="fr-alert fr-alert--warning">
      <p>
        <b>
          <span class="fr-mr-2v">
            {{ choices.t('errors.error') }} {{ err.status }}
          </span>
        </b>
        <code>
          {{ err.statusText }}
        </code>
      </p>
    </div> -->
  </div>
  


  <!-- RESPONSES -->
  <div
    v-if="requestResponses.length"
    class="fr-mt-4v">
    <h6
      v-show="!hasSelection && requestResponses.length > 1">
      {{ choices.t('enterprise.select') }}
    </h6>
    <!-- CARDS -->
    <div
      v-for="(resp, i) in requestResponses"
      :key="`resp-input-${i}`"
      :class="`fr-card fr-card-result fr-card--no-arrow ${isSelected(resp) ? 'fr-card--shadow' : ''}`"
      :style="`border: ${isSelected(resp) ? 'solid thin #000091;' : 'solid thin #C4C4C4'};`"
      @click="selectItem(resp)">
      <div class="fr-card__body">
        <div class="fr-card__content fr-py-4v fr-px-4v">
          
          <!-- TITLE -->
          <template 
            v-for="(resMap, idx) in resp.resultsMapping"
            :key="`resp-input-${i}-field-title-${idx}`">
            <h3 
              v-if="resMap.position === 'title'"
              :class="`fr-card__title ${resMap.class || 'fr-mb-2v'}`"
              :style="`${isSelected(resp) ? 'color: #000091;' : ''}`">
              <!-- IF SELECTED -->
              <!-- <span 
                v-if="hasSelection"
                class="fr-icon-success-fill fr-mr-6v" 
                aria-hidden="true">
              </span> -->
              <span>
                {{ getFromFields(resp, resMap) }}
              </span>
              <!-- <DsfrBadge 
                v-if="isSelected(resp)"
                class="fr-ml-4v"
                type="success"
                :label="choices.t('selection.selected')"/> -->
            </h3>
          </template>
          
          <div class="fr-card__desc">
            <p 
              v-for="(resMap, idx) in resp.resultsMapping?.filter(i => i.position !== 'title')"
              :key="`resp-input-${i}-field-${idx}`"
              :class="resMap.class || 'fr-mb-2v'">
              <!-- ICON -->
              <span
                v-if="resMap.icon"
                :class="`${resMap.icon} fr-mr-6v`" 
                aria-hidden="true">
              </span>
              <!-- TITLE -->
              <span
                v-if="resMap.label"
                class="fr-mr-1v">
                {{ resMap.label }}
              </span>
              <span
                :style="resMap.style">
                {{ getFromFields(resp, resMap) }}
              </span>
            </p>
          </div>
        </div>
      </div>

      <!-- DEBUGGING -->
      <div
        class="vue-debug"
        v-if="debug">
        <h5>DEBUG - TeeTrackInput</h5>
        <div class="fr-grid-row fr-grid-row--gutters fr-mb-3v">
          <div class="fr-col-6">
            <h6 class="fr-mb-1v"> resp.data :</h6>
            <code><pre>{{ resp.data }}</pre></code>
          </div>
          <div class="fr-col-6">
            <h6 class="fr-mb-1v"> resp.resultsMapping :</h6>
            <code>
              <pre>{{ resp.resultsMapping }}</pre>
            </code>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- WILDCARD -->
  <!-- icon="ri-ball-pen-fill" -->
  <!-- <DsfrButton 
    v-if="option.wildcard && !requestResponses.length"
    class="fr-mt-4v fr-hint-text fr-pl-0"
    tertiary
    no-outline
    @click="goToNextTrack">
    {{ option.wildcard.label[choices.lang] }}
  </DsfrButton> -->
  <p
    v-if="option.wildcard"
    class="fr-mt-6v">
    {{ choices.t('or') }}
    <a
      class="fr-link"
      href="#"
      @click="goToNextTrack">
      {{ option.wildcard.label[choices.lang] }}
    </a>
  </p>

  <!-- postResponses -->
  <!-- <template
    v-if="option.postResponses && !requestResponses.length">
    <p 
      v-if="!requestErrors.length && !hasSelection"
      class="fr-mt-3v fr-hint-text"
      v-html="option.postResponses[choices.lang]">
    </p>
  </template> -->

  <!-- DEBUGGING -->
  <div
    class="vue-debug"
    v-if="debug && selection">
    <h5>DEBUG - TeeTrackInput</h5>
    <div class="fr-grid-row fr-grid-row--gutters fr-mb-3v">
      <div class="fr-col-6">
        <h6 class="fr-mb-1v"> selection.data :</h6>
        <code><pre>{{ selection.data }}</pre></code>
      </div>
      <div class="fr-col-6">
        <h6 class="fr-mb-1v"> selection.raw :</h6>
        <code><pre>{{ selection.raw }}</pre></code>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">

import { onBeforeMount, ref, toRaw } from 'vue'

import { tracksStore } from '../stores/tracks'
import { choicesStore } from '../stores/choices'
import { analyticsStore } from '../stores/analytics'

// @ts-ignore
import type { TrackOptionsInput, ReqResp, ReqError, FormCallback, ResultsMapping } from '@/types/index'

import { sendApiRequest } from '../utils/requests'
import { getFromResp, remapItem, cleanValue } from '../utils/helpers'

interface Props {
  trackId: string,
  option: TrackOptionsInput,
  debug?: boolean,
}
const props = defineProps<Props>()

const tracks = tracksStore()
const choices = choicesStore()
const analytics = analyticsStore()

const inputValue = ref<string | number>()
const isLoading = ref<boolean>(false)

const requestResponses = ref<ReqResp[]>([])
const requestErrors = ref<ReqError[]>([])

const selection = ref<any>()
const hasSelection = ref<boolean>(false)

const emit = defineEmits(['updateSelection', 'goToNextTrack'])

onBeforeMount(() => {
  if (props.option.defaultInput) {
    inputValue.value = props.option.defaultInput
  }
})

// getters
const getFromFields = (resp: any, resMap: ResultsMapping) => {
  const rawValues = getFromResp(resp, resMap)
  const val = rawValues.join( resMap.sep || ' ')
  return val
}

const isSelected = (resp: any) => {
  const bool = Boolean(resp === selection.value)
  return bool
}

// functions
const resetSelection = () => {
  // console.log('TeeTrackInput > resetSelection > ...')
  requestResponses.value = []
  requestErrors.value = []
  selection.value = undefined
  hasSelection.value = false
}

const processInput = async () => {
  // console.log('TeeTrackInput > processInput > track :', track)
  // console.log('TeeTrackInput > processInput > props.option :', props.option)
  
  isLoading.value = true
  resetSelection()

  // const usedTracks: UsedTrack[] | any[] = tracks.getAllUsedTracks
  const trackValues: any[] = tracks.getAllUsedTracksValues

  const responses: ReqResp[] = []
  const errors: ReqError[] = []
  const activeCallbacks = toRaw(props.option.callbacks).filter((cb: FormCallback) => !cb.disabled)

  // loop option's callbacks
  for (const callback of activeCallbacks) {
    console.log()
    // console.log('TeeTrackInput > processInput >  callback :', callback)
    let value = inputValue.value
    // Clean input value
    if (callback.inputCleaning) {
      value = cleanValue(value, callback.inputCleaning)
    }
    // console.log('TeeTrackInput > processInput > value :', value)
    let resp: ReqResp = {}
    switch (callback.action) {
      case 'requestAPI':
        resp = await sendApiRequest(callback, {inputValue: value}, trackValues, props, choices.lang)
        break
    }
    console.log('TeeTrackInput > processInput >  resp :', resp)
    if (resp.ok) {
      let item = remapItem(callback.dataStructure, callback.dataMapping, {inputValue: value}, trackValues, props, resp, choices.lang)
      // console.log('TeeTrackInput > processInput >  item :', item)
      responses.push({
        data: item,
        raw: resp,
        resultsMapping: callback.resultsMapping
      })
    } else {
      errors.push(resp)
    }
  }
  requestResponses.value = responses
  requestErrors.value = errors
  isLoading.value = false

  // analytics / send event
  analytics.sendEvent(props.trackId, 'processInput')

  // if only one result select it immediatly
  // if (requestResponses.value.length === 1) {
  //   const item = requestResponses.value[0]
  //   selectItem(item)
  // }

  // send signal to parent if error
  if (requestErrors.value.length) {
    const data = {
      option: {
        ...props.option,
        value: selection.value
      },
      remove: true
    }
    emit('updateSelection', data)
  } 
}

const goToNextTrack = () => {
  console.log
  const data = {
    option: { ...props.option },
  }
  data.option.next = props.option.wildcard.next
  // console.log('TeeTrackInput > goToNextTrack > data :', data)
  emit('goToNextTrack', data)
}

const selectItem = (item: any) => {
  // console.log()
  // console.log('TeeTrackInput > selectItem > hasSelection.value (A) :', hasSelection.value)
  // console.log('TeeTrackInput > selectItem > item :', item)

  selection.value = hasSelection.value ? undefined : item
  // console.log('TeeTrackInput > selectItem > hasSelection.value (B) :', hasSelection.value)
  
  hasSelection.value = !hasSelection.value
  // console.log('TeeTrackInput > selectItem > selection.value (C) :', selection.value)
  const data = {
    option: {
      ...props.option,
      value: item.data
    },
    remove: !hasSelection.value
  }
  // console.log('TeeTrackInput > selectItem > data :', data)
  emit('updateSelection', data)
}
</script>