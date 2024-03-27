<template>
  <div class="fr-grid-row fr-my-10v">
    <div
      v-if="image"
      class="fr-col fr-col-6 fr-col-offset-3"
    >
      <img
        class="fr-responsive-img"
        :src="`${publicPath}${image}`"
        :alt="`image / no-results`"
      />
    </div>
    <div
      v-if="message"
      class="fr-col fr-col-12"
    >
      <p class="fr-text-center tee-text-no-result fr-mt-6v">
        {{ message[Translation.lang] }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
// CONSOLE LOG TEMPLATE
// console.log(`TeeNoResults > FUNCTION_NAME > MSG_OR_VALUE :`)

import Translation from '@/utils/translation'
import type { Translations } from '@/types'
import Config from '@/config'

const publicPath = Config.publicPath

interface Props {
  image?: string
  message?: Translations
}
defineProps<Props>()
</script>
