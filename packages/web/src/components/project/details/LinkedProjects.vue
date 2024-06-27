<template>
  <DsfrAccordion
    v-if="relatedProjects.length > 0"
    id="project-linked-projects"
    :expanded-id="expandedId"
    @expand="expandRelatedProjects"
  >
    <template #title>
      <div
        id="project-linked-projects-title"
        class="fr-h3"
      >
        Projets complémentaires
      </div>
    </template>
    <LinkedProjectButton
      v-for="project in relatedProjectsTags"
      :id="project.id"
      :key="project.label"
      :label="project.label"
      :color="color"
    />
  </DsfrAccordion>
</template>
<script setup lang="ts">
import { Project } from '@tee/common/src/project/types'

interface Props {
  relatedProjects: Project[]
  color: string
}
const props = defineProps<Props>()
const expandedId = ref<string | undefined>('project-linked-projects')
const expandRelatedProjects = (id: string | undefined) => {
  expandedId.value = id
}
const relatedProjectsTags = props.relatedProjects.map((project: Project) => {
  return { label: project.nameTag || project.title, id: project.id }
})
</script>
