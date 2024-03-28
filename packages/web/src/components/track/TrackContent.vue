<template>
  <!-- DEBUGGING -->
  <div
    v-if="debugStore.is"
    class="vue-debug"
  >
    <h5>DEBUG - TeeTrack</h5>
    <div class="fr-grid-row fr-grid-row--gutters fr-mb-3v">
      <div class="fr-col-3">
        <h6 class="fr-mb-1v">
          step : <code>{{ usedTrack.step }} </code>
        </h6>
        <h6 class="fr-mb-1v">
          trackId : <code>{{ usedTrack.id }} </code>
        </h6>
        <h6 class="fr-mb-1v">
          isCompleted : <code>{{ usedTrack.completed }} </code>
        </h6>
      </div>
      <div class="fr-col-4">
        <h6 class="fr-mb-1v">
          renderAs : <code>{{ trackStore.currentComponent }} </code>
        </h6>
        <h6 class="fr-mb-1v">
          allowMultiple : <code>{{ allowMultiple }} </code>
        </h6>
        <h6 class="fr-mb-1v">
          colsWidth : <code>{{ currentColumnWidth() }} </code>
        </h6>
        <h6 class="fr-mb-1v">selectionValues :</h6>
        <code>
          <pre>{{ selectionValues }}</pre>
        </code>
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
        <h6 class="fr-mb-1v">selectedOptions :</h6>
        <code>
          <pre>{{ selectedOptions }}</pre>
        </code>
      </div>

      <div
        v-if="false"
        class="fr-col-6"
      >
        <h4>optionsArray (values) :</h4>
        <code>
          <pre>{{ trackStore.currentOptions.map((o) => o.value) }}</pre>
        </code>
      </div>
    </div>
  </div>

  <div
    v-if="track"
    :id="usedTrack.id"
    :key="`track-${usedTrack.step}-${usedTrack.id}`"
    class="fr-grid-row"
  >
    <TrackCallout :track="track" />

    <div class="fr-col">
      <div :class="`fr-px-4v fr-px-md-0v fr-grid-row fr-grid-row--gutters ${track?.bgColor ? 'fr-p-5v fr-p-sm-8v fr-p-md-20v' : ''}`">
        <TrackLabel :track="track" />
        <TrackInfo :track="track" />
        <TrackHint :track="track" />
        <TrackResume :track="track" />

        <!-- TRACK Translation {{ renderAs }} / EXCEPT SELECT-->
        <template v-if="!TrackComponent.isSelect(usedTrack)">
          <div
            v-for="(option, idx) in trackStore.currentOptions"
            :key="`track-${usedTrack.step}-${usedTrack.id}-option-${idx}`"
            :class="`${currentColumnWidth()} tee-track-choice`"
          >
            <TrackCard
              v-if="TrackComponent.isCards(usedTrack)"
              :option="option"
              :is-active="isActiveChoice(idx)"
              @click="updateSelection(option, idx)"
            />

            <TrackButton
              v-if="TrackComponent.isButtons(usedTrack)"
              :option="option"
              :is-active="isActiveChoice(idx)"
              :is-checkbox="allowMultiple"
              @click="updateSelection(option, idx)"
            />

            <TrackButtonInput
              v-if="TrackComponent.isButtonInput(usedTrack, option)"
              :is-active="isActiveChoice(idx)"
              :is-checkbox="allowMultiple"
              :option="option"
              @update-selection="updateSelection($event.option, idx, $event.remove)"
              @update-value="updateSelectionValueFromButtonInput"
            />

            <TrackSimpleButton
              v-if="TrackComponent.isSimpleButtons(usedTrack)"
              :option="option"
              @click="updateAndSave(option, idx)"
            />

            <TrackSiret
              v-if="TrackComponent.isSiret(usedTrack, option)"
              :option="option"
              @update-selection="updateSelection($event.option, idx, $event.remove)"
              @go-to-next-track="updateAndSave($event, idx)"
            />
          </div>
        </template>
      </div>

      <div
        v-if="TrackComponent.isSelect(usedTrack)"
        class="fr-px-4v fr-px-md-0v fr-grid-row fr-grid-row--gutters"
      >
        <TrackSelect
          class="fr-px-2v fr-px-md-3v fr-mt-6v fr-col-12"
          @update-selection="updateSelection($event.option, $event.index, $event.remove)"
        />
      </div>

      <div
        v-if="hasSubmitButton"
        class="fr-grid-row fr-grid-row--gutters fr-pt-8v fr-px-4v fr-px-md-0v"
        style="justify-content: start"
      >
        <!-- BTN PREVIOUS -->
        <TrackSubmitButton
          :selected-options="selectedOptions"
          @previous="backToPreviousTrack"
          @next="saveSelection"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// CONSOLE LOG TEMPLATE
// console.log(`TrackContent > FUNCTION_NAME > MSG_OR_VALUE :`)

import { useDebugStore } from '@/stores/debug'
import { useNavigationStore } from '@/stores/navigation'
import { useTrackStore } from '@/stores/track'
import { useUsedTrackStore } from '@/stores/usedTrack'
import {
  type Track,
  TrackComponent as TrackComponentType,
  TrackId,
  type TrackOptionItem,
  type TrackOptionsInput,
  type TrackOptionsUnion,
  type UsedTrack
} from '@/types'
import { RouteName } from '@/types/routeType'
import { scrollToTop } from '@/utils/helpers'
import Matomo from '@/utils/matomo'
import Navigation from '@/utils/navigation'
import TrackColOption from '@/utils/track/TrackColOption'
import TrackComponent from '@/utils/track/TrackComponent'
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'

interface Props {
  trackElement: Element
}
const props = defineProps<Props>()

const router = useRouter()
const trackStore = useTrackStore()
const debugStore = useDebugStore()
const usedTrackStore = useUsedTrackStore()
const navigationStore = useNavigationStore()

const selectedOptionsIndexes = ref<number[]>([])
const selectedOptions = ref<TrackOptionsUnion[]>([])

const usedTrack = usedTrackStore.current as UsedTrack
const track: Track | undefined = trackStore.getTrack(usedTrack.id)
trackStore.setCurrentTrack(track)

const allowMultiple: boolean = !!track?.behavior?.multipleChoices

const selectionValues = computed(() => {
  if (selectedOptions.value.length === 0) {
    return []
  }
  return selectedOptions.value.map((selectedOption) => selectedOption?.value)
})

const hasSubmitButton = computed(() => {
  return !usedTrackStore.currentIsFirst
})

const currentColumnWidth = () => {
  let divSize: string | number = TrackColOption.default[trackStore.currentComponent]
  let divSizeLarge: string | number = TrackColOption.large[trackStore.currentComponent]
  const columnWidthValue = trackStore.currentColumnWidth
  if (columnWidthValue === 'auto') {
    const rawDiv = Math.round(12 / trackStore.currentOptions.length)
    divSize = rawDiv < 2 ? 3 : rawDiv >= 12 ? divSize : rawDiv
  } else if (columnWidthValue !== 0) {
    divSizeLarge = divSize = columnWidthValue
  }

  return `fr-col-xl-${divSizeLarge} fr-col-lg-${divSize} fr-col-md-${divSize} fr-col-sm-12 fr-col-xs-12`
}

// getters
const isActiveChoice = (index: number) => {
  return selectedOptionsIndexes.value.includes(index)
}

const updateSelection = async (option: TrackOptionsUnion, index: number, forceRemove: boolean = false) => {
  const isActive = isActiveChoice(index)
  let remove = false
  if (!isActive && !forceRemove) {
    selectedOptionsIndexes.value = allowMultiple ? [...selectedOptionsIndexes.value, index] : [index]
    selectedOptions.value = allowMultiple ? [...selectedOptions.value, option] : [option]

    if (option.value) {
      // analytics / track event / only if positive choice
      for (const [key, value] of Object.entries(option.value)) {
        Matomo.sendEvent(usedTrack.id, key, value as string | number)
      }
    }
  } else {
    // remove from selection because is already active
    selectedOptionsIndexes.value = allowMultiple
      ? selectedOptionsIndexes.value.filter((selectedOptionIndex) => selectedOptionIndex !== index)
      : []
    selectedOptions.value = allowMultiple ? selectedOptions.value.filter((selectedOption) => selectedOption.value !== option.value) : []
    remove = !selectedOptions.value.length
  }

  // Direct to next track
  const directToNext: string[] = [TrackComponentType.Cards]
  if (!allowMultiple && directToNext.includes(trackStore.currentComponent)) {
    await saveSelection(remove)
  }
}

const updateSelectionValueFromButtonInput = (trackOptionItem: TrackOptionItem) => {
  const option = trackOptionItem.option as TrackOptionsInput
  const inputField: string = option.inputField as string
  selectedOptions.value = selectedOptions.value.map((selectedOption) => {
    const selectedOptionClone = { ...selectedOption }
    const objValues = { ...(selectedOptionClone.value as object) } as Record<string, unknown>

    if (Object.keys(objValues).includes(inputField)) {
      const value = option.value as Record<string, string | number>
      objValues[inputField] = value[inputField]
    }

    selectedOptionClone.value = objValues
    return selectedOptionClone
  })
}

const updateAndSave = async (option: TrackOptionsUnion, index: number) => {
  await updateSelection(option, index)
  await saveSelection()
}

const saveSelection = async (needRemove = false) => {
  usedTrackStore.updateCurrent(selectedOptions.value)

  const next = usedTrackStore.current?.next

  if (!needRemove && next && next.default !== false) {
    if (next.default === TrackId.Results) {
      return await router.push({
        name: RouteName.QuestionnaireResult,
        hash: Navigation.hashByRouteName(RouteName.QuestionnaireResult),
        query: navigationStore.query
      })
    }

    const canAddTrack = !usedTrackStore.hasUsedTrack(next.default)
    canAddTrack && usedTrackStore.add(usedTrack.id, next.default)
    return await router.push({
      name: RouteName.Questionnaire,
      hash: Navigation.hashByRouteName(RouteName.Questionnaire),
      params: { trackId: next.default },
      query: navigationStore.query
    })
  } else {
    usedTrackStore.removeFurtherUsedTracks(usedTrack.id)
  }

  scrollToTop(props.trackElement)
}

const backToPreviousTrack = async () => {
  const trackId = usedTrackStore.usedTracksIds.slice(-2).reverse().pop()
  usedTrackStore.setCurrentToUncompleted()
  if (trackId) {
    usedTrackStore.removeFurtherUsedTracks(trackId)

    return await router.push(navigationStore.routeByTrackId(trackId))
  }
}
</script>
