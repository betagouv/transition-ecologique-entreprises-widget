<template>
  <!-- SELECTOR -->
  <div class="fr-select-group fr-py-4v fr-px-3v">
    <select
      :id="`${track.id}-select`"
      class="fr-select"
      :name="`${track.id}-select`"
      @change="updateLocalSelection"
    >
      <!-- DEFAULT OPTION -->
      <option
        value=""
        selected
      >
        {{ Translation.t('select.selectOption') }}
      </option>

      <!-- VALUES -->
      <option
        v-for="(optionVal, idx) in options"
        :key="`${track.id}-select-option-${idx}`"
        :value="idx"
      >
        {{ optionVal?.label[Translation.lang] }}
      </option>
    </select>
  </div>
</template>

<script setup lang="ts">
// CONSOLE LOG TEMPLATE
// console.log(`TeeTrackSelect > FUNCTION_NAME > MSG_OR_VALUE :`)

import type { Track, TrackOptionsSelect } from '@/types'

import { ref } from 'vue'
import Translation from '@/utils/translation'

interface Props {
  track: Track
}
const props = defineProps<Props>()

const activeOption = ref<TrackOptionsSelect>()

const emit = defineEmits(['updateSelection'])

const options: TrackOptionsSelect[] = props.track.options?.filter((o): o is TrackOptionsSelect => !!o.label) || []

const updateLocalSelection = (event: Event) => {
  const index = (event.target as HTMLSelectElement).value as unknown as number
  const isReset = (event.target as HTMLSelectElement).value === ''
  // set local ref
  activeOption.value = isReset ? undefined : options[index]

  // send signal to parent
  const data = {
    index: event,
    option: activeOption.value,
    reset: isReset
  }
  emit('updateSelection', data)
}
</script>
