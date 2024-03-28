<template>
  <div
    class="fr-div-fixed-height"
    @click="selectItem"
  >
    <!-- INPUT CANVAS -->
    <div
      class="fr-btn-fullwidth fr-btn-fixed-height fr-btn-sm-align-left fr-btn-grey tee-btn-input"
      :style="`outline-color: #929292; font-weight: 500; ${isActive ? 'background-color: #eeeeee' : ''}`"
    >
      <v-icon :name="Button.getIcon(isActive, isCheckbox)"> </v-icon>
      <span
        v-if="isTextInput"
        class="fr-pr-3v"
        style="width: auto; white-space: nowrap"
      >
        {{ option.label?.[Translation.lang] }}
      </span>
      <input
        :id="`track-input-${option.hasInput}`"
        v-model="inputValue"
        class="fr-input"
        :type="option.hasInput"
        :name="`track-input-${option.hasInput}`"
        :min="(!isTextInput && option.inputMin) || undefined"
        :max="(!isTextInput && option.inputMax) || undefined"
        :style="`${isTextInput ? 'width: 100%;' : ''}`"
        @input="sendValueUpdate"
      />
      <span
        v-if="isNumberInput"
        class="fr-ml-3v"
      >
        {{ option.label?.[Translation.lang] }}
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
// CONSOLE LOG TEMPLATE
// console.log(`TeeTrackButtonInput > FUNCTION_NAME > MSG_OR_VALUE :`)

import { HasInputOptions, type TrackOptionItem, type TrackOptionsInput } from '@/types'
import Button from '@/utils/button'
import Translation from '@/utils/translation'
import { computed, onBeforeMount, ref } from 'vue'

interface Props {
  option: TrackOptionsInput
  isActive: boolean
  isCheckbox: boolean
}
const props = defineProps<Props>()

const inputValue = ref<string | number>()

const emit = defineEmits<{
  updateSelection: [TrackOptionItem]
  updateValue: [TrackOptionItem]
}>()

onBeforeMount(() => {
  if (props.option.hasInput === HasInputOptions.Number) {
    inputValue.value = 0
  }
  if (props.option.defaultInput) {
    inputValue.value = props.option.defaultInput
  }
})

const isTextInput = computed(() => {
  return props.option.hasInput === HasInputOptions.Text
})

const isNumberInput = computed(() => {
  return props.option.hasInput === HasInputOptions.Number
})

// computed
const trackOptionItem = computed<TrackOptionItem>(() => {
  const inputObject = props.option.value as Record<string, unknown>
  if (props.option.inputField) {
    inputObject[props.option.inputField] = inputValue.value
  }
  return {
    option: {
      ...props.option,
      value: inputObject
    },
    remove: false
  }
})

const sendValueUpdate = () => {
  emit('updateValue', trackOptionItem.value)
}

const selectItem = () => {
  if (!props.isActive) {
    emit('updateSelection', trackOptionItem.value)
  }
}
</script>
