<template>
  <!-- DEBUGGING -->
  <div
    v-if="debugStore.is"
    class="vue-debug"
  >
    <p>
      activeValue: <code>{{ activeValue }}</code>
    </p>
  </div>

  <!-- SELECTOR -->
  <div class="fr-select-group">
    <select
      :id="filter.label"
      class="fr-select"
      :name="filter.label"
      @change="updateLocalFilters"
    >
      <!-- DEFAULT OPTION -->
      <option
        value=""
        selected
      >
        {{ Translation.t('results.filterSelect', { fieldLabel: filter.label }) }}
      </option>

      <!-- FILTER OPTIONS -->
      <option
        v-for="filterVal in filter.values"
        :key="filterVal.value"
        :value="filterVal.value"
      >
        {{ filterVal.label }}
      </option>

      <!-- DEBUGGING -->
      <!-- <option
        value="">
        {{ Translation.t('results.resetSelect') }}
      </option> -->
    </select>
  </div>
</template>

<script setup lang="ts">
// CONSOLE LOG TEMPLATE
// console.log(`TeeResultsFilter > FUNCTION_NAME > MSG_OR_VALUE :`)

import { ref } from 'vue'
import Translation from '@/utils/translation'
import type { TrackFilter, FilterEvent } from '@/types/index'
import { useDebugStore } from '@/stores/debug'

const debugStore = useDebugStore()

const activeValue = ref<any>()

const emit = defineEmits(['updateFilter'])

interface Props {
  filter: TrackFilter
}
const props = defineProps<Props>()

const updateLocalFilters = (event: FilterEvent) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-unsafe-assignment
  const val = event.target.value

  // set local ref
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  activeValue.value = val

  // send signal to parent
  const fIn = {
    label: props.filter.label,
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    value: val
  }
  emit('updateFilter', fIn)
}
</script>
