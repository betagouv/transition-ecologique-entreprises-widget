<template>
  <!-- SELECTOR -->
  <div class="fr-select-group">
    <DsfrSelect
      :id="`${currentTrack?.id}-select`"
      v-model="value"
      :name="`${currentTrack?.id}-select`"
      :options="options"
    />
  </div>
</template>

<script setup lang="ts">
// CONSOLE LOG TEMPLATE
// console.log(`TrackSelect > FUNCTION_NAME > MSG_OR_VALUE :`)

import { useTrackStore } from '@/stores/track'
import { useUsedTrackStore } from '@/stores/usedTrack'
import type { TrackOptionItem } from '@/types'
import Translation from '@/utils/translation'
import { computed } from 'vue'

const currentUsedTrack = useUsedTrackStore().current
const currentTrack = useTrackStore().current

const emit = defineEmits(['updateSelection'])

const options = computed<(string | { value: string; text: string; disabled?: boolean | undefined })[]>(() => {
  const options: (string | { value: string; text: string; disabled?: boolean | undefined })[] = []
  if (!currentTrack?.options) {
    return options
  }

  for (const option of currentTrack.options) {
    if (option.label) {
      options.push({
        value: option.label[Translation.lang],
        text: option.label[Translation.lang]
      })
    }
  }

  return options
})

const value = computed({
  get() {
    return currentUsedTrack?.selected.find(() => true)?.value as string | undefined
  },
  set(value: string | undefined) {
    const selectedOptionIndex = currentTrack?.options?.findIndex((option) => option.value === value)
    const selectedOption =
      selectedOptionIndex !== undefined && selectedOptionIndex !== -1 ? currentTrack?.options?.[selectedOptionIndex] : undefined

    if (selectedOption) {
      useUsedTrackStore().setCurrentSelectedOptions([selectedOption])
    }

    const data = {
      option: selectedOption,
      index: selectedOptionIndex,
      remove: selectedOption === undefined
    } as TrackOptionItem
    emit('updateSelection', data)
  }
})
</script>
