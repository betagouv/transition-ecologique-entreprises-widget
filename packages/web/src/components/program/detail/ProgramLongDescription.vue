<template>
  <p
    v-for="(paragraph, idx) in descriptionParagraphs"
    :key="`long-description-paragraph-${idx}`"
    :class="`fr-mb-0 fr-pb-${descriptionParagraphs.length - 1 === idx ? '3v' : '0'}`"
  >
    {{ paragraph || '&nbsp;' }}
  </p>
</template>

<script setup lang="ts">
// CONSOLE LOG TEMPLATE
// console.log(`ProgramLongdescription > FUNCTION_NAME > MSG_OR_VALUE :`)

import { computed } from 'vue'
import type { ProgramData } from '@/types'

interface Props {
  program: ProgramData
}
const props = defineProps<Props>()

const descriptionParagraphs = computed(() => {
  const textRaw = props.program['description longue']
  return textRaw?.split('\n') || []
})
</script>
