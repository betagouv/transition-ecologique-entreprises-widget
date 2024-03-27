<template>
  <DsfrAccordion
    :id="`accordion-${accordionId}`"
    :title="title"
    :expanded-id="expandedId"
    @expand="expandedId = $event"
  >
    <template #title>
      <h3>{{ title }}</h3>
    </template>
    <slot />
  </DsfrAccordion>
</template>

<script setup lang="ts">
import { DsfrAccordion } from '@gouvminint/vue-dsfr'
import { ref, onBeforeMount } from 'vue'
interface Props {
  accordionId: string
  title: string
}
const props = defineProps<Props>()

const expandedId = ref<string>()

onBeforeMount(() => {
  if (window.innerWidth > 767) {
    expandedId.value = `accordion-${props.accordionId}`
  }
})
</script>
