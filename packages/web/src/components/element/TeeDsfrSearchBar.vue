<template>
  <DsfrInputGroup :error-message="errorMessage">
    <label
      v-if="option.label"
      class="fr-label fr-mb-2v"
      :for="`input-${option.id}`"
    >
      {{ option.label[Translation.lang] }}
    </label>
    <div
      id="header-search"
      class="fr-search-bar"
      role="search"
    >
      <DsfrInput
        :id="`input-${option.id}`"
        v-model="model"
        :name="`input-${option.id}`"
        :disabled="isLoading"
        :placeholder="option?.placeholder?.[Translation.lang]"
        class="fr-input tee-input-large"
        type="search"
        @keyup.enter="onClick"
      />
      <DsfrButton
        v-if="model"
        class="tee-btn-input-large tee-btn-input-clear-btn"
        icon="fr-icon-close-line"
        icon-only
        no-outline
        tertiary
        :disabled="isLoading"
        @click="onClear"
      />
      <DsfrButton
        class="tee-btn-input-large"
        :disabled="isLoading"
        :title="Translation.t('input.search')"
        @click="onClick"
      />
    </div>
    <div
      v-if="hasHint && option.hint"
      class="tee-input-hint fr-mt-4v"
    >
      <span v-html="option.hint[Translation.lang]" />
    </div>
  </DsfrInputGroup>
</template>

<script setup lang="ts">
// CONSOLE LOG TEMPLATE
// console.log(`TeeDsfrSearchBar > FUNCTION_NAME > MSG_OR_VALUE :`)

import { type TrackOptionsInput } from '@/types'
import Translation from '@/utils/translation'
import { DsfrInputGroup, DsfrInput, DsfrButton } from '@gouvminint/vue-dsfr'

interface Props {
  option: TrackOptionsInput
  isLoading?: boolean
  errorMessage?: string
  hasHint?: boolean
}
withDefaults(defineProps<Props>(), {
  isLoading: false,
  errorMessage: undefined,
  hasHint: false
})

const model = defineModel<string | undefined>()

const emit = defineEmits<{
  onClick: []
  onClear: []
}>()

const onClick = () => {
  emit('onClick')
}

// functions
const onClear = () => {
  model.value = undefined
  emit('onClear')
}
</script>
