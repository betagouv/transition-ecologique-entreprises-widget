<template>
  <DsfrAccordion
    v-if="projectDescription.length > 0"
    id="project-details"
    :expanded-id="expandedId"
    @expand="expandDetails"
  >
    <template #title><div class="fr-h3">❓ Qu'est ce que c'est ?</div></template>
    <div v-html="formatProjectDescription(projectDescription)" />
  </DsfrAccordion>

  <DsfrAccordion
    v-if="projectMoreDescription.length > 0"
    id="project-more-details"
    :expanded-id="expandedMoreId"
    @expand="expandMoreDetails"
  >
    <template #title><div class="fr-h3">📚 Pour aller plus loin</div></template>
    <div v-html="formatProjectDescription(projectMoreDescription)" />
  </DsfrAccordion>
</template>
<script setup lang="ts">
import { marked } from 'marked'

interface Props {
  projectDescription: string
  projectMoreDescription: string
}
defineProps<Props>()
const expandedId = ref<string | undefined>('project-details')
const expandedMoreId = ref<string | undefined>('project-more-details')

const expandDetails = (id: string | undefined) => {
  expandedId.value = id
}

const expandMoreDetails = (id: string | undefined) => {
  expandedMoreId.value = id
}

const formatProjectDescription = (text: string | undefined) => {
  if (text) {
    return marked.parse(text)
  }
  return ''
}
</script>
