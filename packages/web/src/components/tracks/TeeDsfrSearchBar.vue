<template>
  <!-- DEBUGGING -->
  <div
    v-if="debugStore.is"
    class="vue-debug"
  >
    <h5>DEBUG - TeeDsfrSearchBar</h5>
    <div class="fr-grid-row fr-grid-row--gutters fr-mb-3v">
      <div class="fr-col-3">
        <h6 class="fr-mb-1v">
          inputValue : <code>{{ inputValue }} </code>
        </h6>
        <h6 class="fr-mb-1v">
          hasSelection : <code>{{ hasSelection }} </code>
        </h6>
        <!-- <h6 class="fr-mb-1v"> selection : <code>{{ selection }} </code></h6> -->
      </div>
      <div class="fr-col-9">
        <h6 class="fr-mb-1v">option :</h6>
        <pre><code>{{ option }} </code></pre>
      </div>
    </div>
  </div>

  <!-- INPUT FORM -->
  <label
    v-if="option.label"
    class="fr-label fr-mb-2v"
    :for="`input-${option.id}`"
  >
    {{ option.label[Translation.lang] }}
  </label>
  <div class="tee-form-input-large">
    <!-- TEXT INPUT -->
    <input
      :id="`input-${option.id}`"
      v-model="inputValue"
      :name="`input-${option.id}`"
      :disabled="isLoading"
      :placeholder="option?.placeholder?.[Translation.lang]"
      class="fr-input tee-input-large"
      type="search"
      @keyup.enter="processInput"
    />
    <!-- CLEAR BTN -->
    <button
      v-if="inputValue"
      class="fr-btn fr-icon-close-line fr-btn--tertiary-no-outline tee-btn-input-large tee-btn-input-clear-btn"
      :disabled="isLoading"
      @click="clearInput"
    ></button>
    <!-- SEARCH BTN -->
    <button
      class="fr-btn tee-btn-input-large fr-icon-search-line"
      :disabled="isLoading"
      :title="Translation.t('input.search')"
      @click="processInput"
    ></button>
  </div>

  <!-- HINT -->
  <div
    v-if="option.hint && !requestResponses.length"
    class="tee-input-hint fr-mt-4v"
    :for="`input-${option.id}`"
  >
    <span v-html="option.hint[Translation.lang]"> </span>
  </div>

  <!-- RESPONSE ERRORS -->
  <div
    v-if="requestErrors.length"
    class="fr-mt-6v"
  >
    <p
      class="fr-mb-0 fr-error-text"
      style="display: block"
    >
      <!-- <span class="fr-icon-error-line" aria-hidden="true"></span> -->
      {{ Translation.t('enterprise.noStructureFound') }}

      <!-- DEBUGGING / ERROR CODE -->
      <span v-if="debugStore.is">
        (
        <span
          v-for="(err, i) in requestErrors"
          :key="`resp-error-${i}`"
        >
          {{ Translation.t('errors.error') }} {{ err.status }}
        </span>
        )
      </span>
      <!-- POST RESPONSE HELP MESSAGE (IF ANY) -->
      <br v-if="option.postResponses" />
      <span
        v-if="option.postResponses"
        v-html="option.postResponses[Translation.lang]"
      >
      </span>
    </p>
    <!-- <div
      v-for="(err, i) in requestErrors"
      :key="`resp-error-${i}`"
      class="fr-alert fr-alert--warning">
      <p>
        <b>
          <span class="fr-mr-2v">
            {{ Translation.t('errors.error') }} {{ err.status }}
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
    class="fr-mt-4v"
  >
    <h6 v-show="!hasSelection && requestResponses.length > 1">
      {{ Translation.t('enterprise.select') }}
    </h6>
    <!-- CARDS -->
    <div
      v-for="(resp, i) in requestResponses"
      :key="`resp-input-${i}`"
      :class="`fr-card fr-card-result fr-card--no-arrow ${isSelected(resp) ? 'fr-card--shadow' : ''}`"
      :style="`border: ${isSelected(resp) ? 'solid thin #000091;' : 'solid thin #C4C4C4'};`"
      @click="!disableDeselect && selectItem(resp)"
    >
      <div class="fr-card__body">
        <div class="fr-card__content fr-py-4v fr-px-4v">
          <!-- TITLE -->
          <template
            v-for="(resMap, idx) in resp.resultsMapping"
            :key="`resp-input-${i}-field-title-${idx}`"
          >
            <h3
              v-if="resMap.position === 'title'"
              :class="`fr-card__title ${resMap.class || 'fr-mb-2v'}`"
              :style="`${isSelected(resp) ? 'color: #000091;' : ''}`"
            >
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
                :label="Translation.t('selection.selected')"/> -->
            </h3>
          </template>

          <div class="fr-card__desc tee-resp-info-block">
            <p
              v-for="(resMap, idx) in resp.resultsMapping?.filter((i) => i.position !== 'title')"
              :key="`resp-input-${i}-field-${idx}`"
              :class="resMap.class || 'fr-mb-2v'"
            >
              <!-- ICON -->
              <span
                v-if="resMap.icon"
                :class="`${resMap.icon} fr-mr-8v`"
                aria-hidden="true"
              >
              </span>
              <!-- TITLE -->
              <span
                v-if="resMap.label"
                class="fr-mr-1v"
              >
                {{ resMap.label }}
              </span>
              <span :style="resMap.style">
                {{ getFromFields(resp, resMap) }}
              </span>
            </p>
          </div>
        </div>
      </div>

      <!-- DEBUGGING -->
      <div
        v-if="debugStore.is"
        class="vue-debug"
      >
        <h5>DEBUG - TeeDsfrSearchBar</h5>
        <div class="fr-grid-row fr-grid-row--gutters fr-mb-3v">
          <div class="fr-col-6">
            <h6 class="fr-mb-1v">resp.data :</h6>
            <code>
              <pre>{{ resp.data }}</pre>
            </code>
          </div>
          <div class="fr-col-6">
            <h6 class="fr-mb-1v">resp.resultsMapping :</h6>
            <code>
              <pre>{{ resp.resultsMapping }}</pre>
            </code>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- WILDCARD -->
  <p
    v-if="option.wildcard"
    class="fr-mt-8v"
  >
    {{ Translation.t('or') }}
    <a
      class="fr-link tee-input-wildcard"
      :href="Navigation.hashByRouteName(RouteName.Questionnaire)"
      @click="goToNextTrack"
    >
      {{ option.wildcard.label[Translation.lang] }}
    </a>
  </p>

  <!-- postResponses -->
  <!-- <template
    v-if="option.postResponses && !requestResponses.length">
    <p
      v-if="!requestErrors.length && !hasSelection"
      class="fr-mt-3v fr-hint-text"
      v-html="option.postResponses[Translation.lang]">
    </p>
  </template> -->

  <!-- DEBUGGING -->
  <div
    v-if="debugStore.is && selection"
    class="vue-debug"
  >
    <h5>DEBUG - TeeDsfrSearchBar</h5>
    <div class="fr-grid-row fr-grid-row--gutters fr-mb-3v">
      <div class="fr-col-6">
        <h6 class="fr-mb-1v">selection.data :</h6>
        <code>
          <pre>{{ selection.data }}</pre>
        </code>
      </div>
      <div class="fr-col-6">
        <h6 class="fr-mb-1v">selection.raw :</h6>
        <code>
          <pre>{{ selection.raw }}</pre>
        </code>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// CONSOLE LOG TEMPLATE
// console.log(`TeeDsfrSearchBar > FUNCTION_NAME > MSG_OR_VALUE :`)

import { RouteName } from '@/types/routeType'
import Navigation from '@/utils/navigation'
import { onBeforeMount, ref, toRaw } from 'vue'
import { useTracksStore } from '../../stores/tracks'
import Translation from '@/utils/translation'
import { type TrackOptionsInput, type ReqResp, type ReqError, type FormCallback, type ResultsMapping, TrackId } from '@/types'
import { sendApiRequest } from '../../utils/requests'
import { getFromResp, remapItem, cleanValue } from '../../utils/helpers'
import { CallbackActions } from '@/types'
import { useDebugStore } from '@/stores/debug'
import Matomo from '@/utils/matomo'

interface Props {
  trackId: TrackId
  option: TrackOptionsInput
}
const props = defineProps<Props>()

const tracks = useTracksStore()
const debugStore = useDebugStore()

const inputValue = ref<string | number>()
const isLoading = ref<boolean>(false)

const requestResponses = ref<ReqResp[]>([])
const requestErrors = ref<ReqError[]>([])

const selection = ref<any>()
const disableDeselect = ref<boolean>(false)
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
  const val = rawValues.join(resMap.sep || ' ')
  return val
}

const isSelected = (resp: any) => {
  const bool = Boolean(resp === selection.value)
  return bool
}

// functions
const clearInput = () => {
  inputValue.value = undefined
  resetSelection()
}

const resetSelection = () => {
  requestResponses.value = []
  requestErrors.value = []
  selection.value = undefined
  hasSelection.value = false
}

const processInput = async () => {
  isLoading.value = true
  resetSelection()

  const trackValues: any[] = tracks.getAllUsedTracksValues

  const responses: ReqResp[] = []
  const errors: ReqError[] = []

  if (props.option?.callbacks) {
    const activeCallbacks = toRaw(props.option?.callbacks).filter((cb: FormCallback) => !cb.disabled)

    // loop option's callbacks
    for (const callback of activeCallbacks) {
      let value = inputValue.value
      // Clean input value
      if (callback.inputCleaning) {
        value = cleanValue(value, callback.inputCleaning) as string | number | undefined
      }
      let resp: ReqResp = {}
      if (callback.action === CallbackActions.RequestAPI) {
        resp = await sendApiRequest(callback, { inputValue: value }, trackValues, props)
      }
      if (resp.ok) {
        const item = remapItem(
          callback.dataStructure,
          callback.dataMapping,
          { inputValue: value },
          trackValues,
          props,
          resp,
          [],
          Translation.lang
        )
        responses.push({
          data: item,
          raw: resp,
          resultsMapping: callback.resultsMapping
        })
      } else {
        errors.push(resp)
      }
    }

    // if only one response in list select it
    if (responses.length === 1) {
      selectItem(responses[0])
      disableDeselect.value = true
    }
  }

  requestResponses.value = responses
  requestErrors.value = errors
  isLoading.value = false

  // analytics / send event
  Matomo.sendEvent(props.trackId, 'processInput')

  // send signal to parent if error
  if (requestErrors.value.length) {
    const data = {
      option: {
        ...props.option,
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        value: selection.value
      },
      remove: true
    }
    emit('updateSelection', data)
  }
}

const goToNextTrack = () => {
  const data = {
    option: { ...props.option }
  }
  if (props.option.wildcard) {
    data.option.next = props.option.wildcard.next
  }
  emit('goToNextTrack', data)
}

const selectItem = (item: any) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  selection.value = hasSelection.value ? undefined : item
  hasSelection.value = !hasSelection.value
  const data = {
    option: {
      ...props.option,
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-unsafe-member-access
      value: item.data
    },
    remove: !hasSelection.value
  }
  emit('updateSelection', data)
}
</script>
