<template>
  <!-- PROGRAMS AS LIST OF CARDS -->
  <div class="fr-container--fluid fr-mt-6v">
    <div class="fr-grid-row fr-grid-row--center">
      <div class="fr-mb-4v fr-pl-2w fr-pl-md-0 fr-col-12 fr-text--blue-france fr-font-style--italic">
        <div v-if="havePrograms && countPrograms > 1">
          {{ countPrograms }}
          {{ countPrograms > 1 ? Translation.t('results.results') : Translation.t('results.result') }}
        </div>
      </div>
      <div class="fr-col-12">
        <div class="fr-grid-row fr-grid-row--center fr-grid-row-lg--left">
          <router-link
            v-for="program in filteredPrograms"
            :id="program.id"
            :key="program.id"
            :to="getRouteToProgramDetail(program.id)"
            class="fr-col-12 fr-card fr-enlarge-link fr-card--horizontal-tier fr-mb-10v"
          >
            <ProgramCard :program="program" />
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import ProgramCard from '@/components/program/list/ProgramCard.vue'
import { useNavigationStore } from '@/stores/navigation'
import { type ProgramData } from '@/types'
import { RouteName } from '@/types/routeType'
import Translation from '@/utils/translation'
import { computed } from 'vue'
import { type RouteLocationRaw } from 'vue-router'

interface ProgramListProps {
  filteredPrograms?: ProgramData[]
}

const props = defineProps<ProgramListProps>()

const navigationStore = useNavigationStore()

const isCatalog = navigationStore.isCatalog()

const havePrograms = computed(() => {
  return countPrograms.value > 0
})

const countPrograms = computed(() => {
  return props.filteredPrograms?.length || 0
})

const getRouteToProgramDetail = (programId: string): RouteLocationRaw => {
  return {
    name: isCatalog ? RouteName.CatalogDetail : RouteName.QuestionnaireResultDetail,
    params: { programId },
    query: isCatalog ? undefined : navigationStore.query
  }
}
</script>
