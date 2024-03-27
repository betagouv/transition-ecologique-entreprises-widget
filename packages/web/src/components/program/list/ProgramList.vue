<template>
  <!-- PROGRAMS AS LIST OF CARDS -->
  <div class="fr-container fr-px-4v fr-mb-0 fr-mt-6v fr-px-md-4w">
    <ProgramListHeaderResult v-if="!navigation.isCatalog()" />
    <div class="fr-grid-row">
      <div class="fr-mt-4v fr-mb-2v fr-col-12">
        <div
          v-if="havePrograms && countPrograms > 1"
          class="tee-text-light"
        >
          {{ countFilteredPrograms }}
          {{ countFilteredPrograms > 1 ? Translation.t('results.results') : Translation.t('results.result') }}
        </div>
      </div>
      <div class="fr-col-12">
        <ProgramFilters v-if="havePrograms && countPrograms > 1" />
      </div>

      <div class="fr-col-12">
        <span v-if="programs === undefined && !hasError">Chargement...</span>
        <ProgramListNoResults
          v-else-if="!countFilteredPrograms && !hasError"
          image="images/tracks/no-results.svg"
          :message="{ fr: 'Aucune aide n\'a pu être identifiée avec les critères choisis...' }"
        />
        <TeeError
          v-else-if="hasError"
          :mailto="Contact.email"
          :email="Contact.email"
        />
      </div>

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
</template>

<script setup lang="ts">
import ProgramCard from '@/components/program/list/ProgramCard.vue'
import ProgramListHeaderResult from '@/components/program/list/ProgramListHeaderResult.vue'
import Contact from '@/utils/contact'
import { computed, onBeforeMount } from 'vue'
import Translation from '@/utils/translation'
import { useProgramsStore } from '@/stores/programs'
import { type ProgramData, TrackId } from '@/types'
import { useNavigationStore } from '@/stores/navigation'
import { RouteName } from '@/types/routeType'
import Matomo from '@/utils/matomo'
import ProgramListNoResults from '@/components/program/list/ProgramListNoResults.vue'
import ProgramFilters from '@/components/program/list/ProgramFilters.vue'

const programsStore = useProgramsStore()
const navigation = useNavigationStore()

const programs = ref<ProgramData[]>()
const hasError = ref<boolean>(false)

const filteredPrograms = computed(() => {
  return programs.value ? programsStore.getProgramsByFilters(programs.value) : undefined
})

const countPrograms = computed(() => {
  return programs.value?.length || 0
})

const havePrograms = computed(() => {
  return countPrograms.value > 0
})

const countFilteredPrograms = computed(() => {
  return filteredPrograms.value?.length || 0
})

const getRouteToProgramDetail = (programId: string) => {
  const routeName = navigation.isCatalog() ? RouteName.CatalogDetail : RouteName.QuestionnaireResultDetail
  return { name: routeName, params: { programId } }
}

onBeforeMount(async () => {
  const result = await programsStore.getProgramsByUsedTracks()
  if (result.isOk) {
    programs.value = result.value
  } else {
    hasError.value = true
  }

  // analytics / send event
  Matomo.sendEvent(TrackId.Results, navigation.isCatalog() ? 'show_results_catalog' : 'show_results')
})
</script>
