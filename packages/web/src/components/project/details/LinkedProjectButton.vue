<template>
  <router-link
    :id="id"
    :to="getRouteToProjectDetail(id)"
    class="no-outline"
  >
    <DsfrButton
      :label="label"
      secondary
      :class="`fr-m-4v fr-radius-a--2v fr-btn--secondary--${color}`"
    />
  </router-link>
</template>
<script setup lang="ts">
import { type RouteLocationRaw } from 'vue-router'
import { RouteName } from '@/types/routeType'
import { useNavigationStore } from '@/stores/navigation'
import { ProjectId } from '@tee/common/src/project/types'

interface Props {
  label: string | undefined
  color: string
  id: ProjectId
}
const navigationStore = useNavigationStore()

defineProps<Props>()
const getRouteToProjectDetail = (projectId: ProjectId): RouteLocationRaw => {
  return {
    name: RouteName.ProjectResultDetail,
    params: { projectId },
    query: navigationStore.query
  }
}
</script>
