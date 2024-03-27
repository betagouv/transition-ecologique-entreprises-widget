<template>
  <div class="fr-text-center">
    <p class="tee-form-response tee-form-response-error">
      <v-icon
        name="ri-close-circle-fill"
        aria-hidden="true"
        scale="3"
      />
    </p>
    <h3 class="tee-form-response tee-form-response-error fr-mb-2v">
      {{ Translation.t(`form.sorryError`) }}
    </h3>
    <slot></slot>
    <h6 class="tee-form-response-blue fr-mt-15v fr-mb-3v">
      {{ Translation.t('form.nowWhat') }}
    </h6>
    <p class="tee-form-response-blue fr-mb-15v">
      <span v-html="Translation.ti(Translation.t('form.errorMsg'), { mailto: mailto, email: email })"></span>
    </p>
  </div>
</template>

<script setup lang="ts">
import Translation from '@/utils/translation'

interface Props {
  mailto: string
  email: string
}
defineProps<Props>()
</script>
