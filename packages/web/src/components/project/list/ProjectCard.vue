<template>
  <DsfrCard
    :title="project.title"
    :description="project.shortDescription"
    :img-src="`${publicPath}${project.image}`"
    :alt-img="`image / ${project.title}`"
    :no-arrow="true"
  >
    <template
      v-if="isPriorityProject"
      #start-details
    >
      <div class="fr-mb-1v">
        <DsfrBadge
          :label="priorityTag"
          :no-icon="true"
          class="fr-badge--success"
        />
      </div>
    </template>
  </DsfrCard>
</template>

<script setup lang="ts">
import { DsfrCard } from '@gouvminint/vue-dsfr'
import { Project } from '@tee/common/src/project/types'
import Config from '@/config'

const publicPath = Config.publicPath

interface Props {
  project: Project
  isPriorityProject?: boolean
}

withDefaults(defineProps<Props>(), {
  isPriorityProject: false
})

const priorityTag: string = 'A FAIRE EN PRIORITÉ'
</script>
