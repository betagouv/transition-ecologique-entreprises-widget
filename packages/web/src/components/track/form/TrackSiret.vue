<template>
  <TeeDsfrSearchBar
    v-model.trim="siretValue"
    :option="props.option"
    :is-loading="isLoading"
    :error-message="errorMessage"
    :has-hint="hasHint"
    @on-click="processInput"
    @on-clear="resetSelection"
  />

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
      v-for="(response, i) in requestResponses"
      :key="`resp-input-${i}`"
      class="fr-card fr-card-result fr-card--no-arrow fr-card--shadow"
      :style="`border: ${isSelected(response) ? 'solid thin #000091;' : 'solid thin #C4C4C4'};`"
      @click="canSelect && selectItem(response)"
    >
      <div class="fr-card__body">
        <div class="fr-card__content fr-py-4v fr-px-4v">
          <!-- TITLE -->
          <template
            v-for="(resultMapping, idx) in response.resultsMapping"
            :key="`resp-input-${i}-field-title-${idx}`"
          >
            <h3
              v-if="resultMapping.position === 'title'"
              :class="`fr-card__title ${resultMapping.class || 'fr-mb-2v'}`"
              :style="`${isSelected(response) ? 'color: #000091;' : ''}`"
            >
              <span>
                {{ getFromFields(response, resultMapping) }}
              </span>
            </h3>
          </template>

          <div class="fr-card__desc tee-resp-info-block">
            <p
              v-for="(resultMapping, idx) in response.resultsMapping?.filter((i) => i.position !== 'title')"
              :key="`resp-input-${i}-field-${idx}`"
              :class="resultMapping.class || 'fr-mb-2v'"
            >
              <!-- ICON -->
              <span
                v-if="resultMapping.icon"
                :class="`${resultMapping.icon} fr-mr-8v`"
                aria-hidden="true"
              >
              </span>
              <!-- TITLE -->
              <span
                v-if="resultMapping.label"
                class="fr-mr-1v"
              >
                {{ resultMapping.label }}
              </span>
              <span :style="resultMapping.style">
                {{ getFromFields(response, resultMapping) }}
              </span>
            </p>
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
</template>

<script setup lang="ts">
// CONSOLE LOG TEMPLATE
// console.log(`TeeDsfrSearchBar > FUNCTION_NAME > MSG_OR_VALUE :`)

import { useTrackStore } from '@/stores/track'
import { type ReqResp, type ResultsMapping, type TrackOptionItem, type TrackOptionsInput } from '@/types'
import type EstablishmentType from '@/types/establishmentType'
import { RouteName } from '@/types/routeType'
import { getFromResp } from '@/utils/helpers'
import Matomo from '@/utils/matomo'
import Navigation from '@/utils/navigation'
import TrackCallback from '@/utils/track/TrackCallback'
import TrackSiret from '@/utils/track/TrackSiret'
import Translation from '@/utils/translation'
import { ref, computed } from 'vue'

interface Props {
  option: TrackOptionsInput
}
const props = defineProps<Props>()

const siretValue = ref<string>()
const isLoading = ref<boolean>(false)
const requestResponses = ref<ReqResp[]>([])
const selection = ref<any>()
const errorMessage = ref<string>()

const emit = defineEmits<{
  updateSelection: [TrackOptionItem]
  goToNextTrack: [TrackOptionsInput]
}>()

const hasSelection = computed(() => {
  return Boolean(selection.value)
})

const canSelect = computed(() => {
  return requestResponses.value.length !== 1
})

const hasHint = computed(() => {
  return Boolean(props.option.hint) && !requestResponses.value.length
})

// getters
const getFromFields = (resp: ReqResp, resMap: ResultsMapping) => {
  const rawValues = getFromResp(resp, resMap)
  return rawValues.join(resMap.sep || ' ')
}

const isSelected = (item: ReqResp) => {
  return Boolean(item === selection.value)
}

const resetSelection = () => {
  requestResponses.value = []
  selection.value = undefined
  emit('updateSelection', createData())
}

const processInput = async () => {
  isLoading.value = true
  errorMessage.value = undefined
  resetSelection()

  if (props.option?.validation) {
    // const isValid = false
    if (!props.option.validation(siretValue.value)) {
      errorMessage.value = "Le numéro SIRET n'est pas valide"
      isLoading.value = false
      return
    }
  }

  const { responses, errors } = await TrackCallback.applies(siretValue.value as string, props.option?.callbacks)

  if (responses.length === 1) {
    selectItem(responses[0])
  }

  requestResponses.value = responses

  if (errors.length) {
    errorMessage.value = Translation.t('enterprise.noStructureFound')
  }

  isLoading.value = false

  // analytics / send event
  const trackId = useTrackStore().currentId
  if (trackId) {
    Matomo.sendEvent(trackId, 'processInput')
  }
}

const goToNextTrack = () => {
  const option = { ...props.option }
  if (props.option.wildcard) {
    option.next = props.option.wildcard.next
    option.value = props.option.wildcard.value
  }
  emit('goToNextTrack', option)
}

const selectItem = (item: ReqResp) => {
  selection.value = hasSelection.value ? undefined : item
  emit('updateSelection', createData(item.data as EstablishmentType))
}

function createData(questionnaireData?: EstablishmentType): TrackOptionItem {
  return TrackSiret.createData(props.option, siretValue.value, questionnaireData, !hasSelection.value)
}
</script>
