<template>
  <TeeEligibilityCriteriaBar
    :bg-color="Color.blueLightnessed"
    :bg-bar-color="Color.blueLighted"
    :previous-route="routeToProjects"
    message=""
    message-icon=""
  />
  <div class="fr-container--fluid fr-mb-4v backgroundProjectTitle">
    <img
      :src="`${publicPath}${projectImg}`"
      :alt="`image / ${projectTitle}`"
    />
    <div :class="`fr-grid-row fr-grid-row--bottom fr-px-md-16v fr-gradient--${themeColor} projectTitleGradient`">
      <div class="fr-col-9 fr-col-sm-9 fr-col-xs-12 fr-col-offset-sm-3 fr-h1 fr-text-left fr-pb-8v projectTitle">
        {{ projectTitle }}
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import Config from '@/config'
import { Color } from '@/types'
import { RouteName } from '@/types/routeType'
import { useNavigationStore } from '@/stores/navigation'

interface Props {
  projectTitle: string | undefined
  projectId: string | undefined
  projectImg: string | undefined
  themeColor: string
}
const props = defineProps<Props>()
const publicPath = Config.publicPath
const navigationStore = useNavigationStore()

const routeToProjects = {
  name: RouteName.QuestionnaireResult,
  hash: '#' + props.projectId,
  query: navigationStore.query
}
</script>

<style scoped>
.backgroundProjectTitle {
  position: relative;
  height: 400px;
}
.backgroundProjectTitle img {
  width: 100%;
  height: 100%;
  position: absolute;
  object-fit: cover;
}
.projectTitleGradient {
  height: 100%;
  position: relative;
}
.projectTitle {
  z-index: 100;
}
</style>
