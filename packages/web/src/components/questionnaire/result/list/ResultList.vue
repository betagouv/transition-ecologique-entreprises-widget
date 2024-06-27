<template>
  <div class="fr-container--fluid fr-container--fluid--no-overflow fr-px-0 fr-mb-0 fr-mt-6v fr-mr-lg-6v">
    <div class="fr-grid-row fr-grid-row--center fr-justify-center">
      <div class="fr-container fr-m-0 fr-p-0 fr-pl-md-2v">
        <div class="fr-col-9 fr-col-offset-md-3 fr-col-offset-lg-2 fr-mb-3v fr-col-xs-12">
          <ResultHeader v-if="!navigationStore.isCatalog()" />
        </div>
      </div>
      <TeeTabs
        ref="tabs"
        class="fr-col-12 fr-px-0"
        :class="!hasSpinner || !hasError"
        :tab-list-name="tabListName"
        :tab-titles="tabTitles"
        :initial-selected-index="initialSelectedIndex"
        @select-tab="selectTab"
      >
        <DsfrTabContent
          class="fr-px-0"
          panel-id="tab-content-0"
          tab-id="tab-0"
          :selected="selectedTabIndex === 0"
          :asc="asc"
        >
          <ResultProjectList
            :filtered-projects="filteredProjects"
            :filtered-programs="filteredPrograms"
          />
        </DsfrTabContent>

        <DsfrTabContent
          class="fr-px-0"
          panel-id="tab-content-1"
          tab-id="tab-1"
          :selected="selectedTabIndex === 1"
          :asc="asc"
        >
          <ResultProgramList :filtered-programs="filteredPrograms" />
        </DsfrTabContent>
      </TeeTabs>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useNavigationStore } from '@/stores/navigation'
import { useUsedTrackStore } from '@/stores/usedTrack'
import { useProgramStore } from '@/stores/program'
import { ProgramData, TrackId } from '@/types'
import { computed, onBeforeMount } from 'vue'
import Matomo from '@/utils/matomo'
import { useProjectStore } from '@/stores/project'
import { Project } from '@tee/common/src/project/types'

const navigationStore = useNavigationStore()
const programStore = useProgramStore()
const projectStore = useProjectStore()

const programs = ref<ProgramData[]>()
const projects = ref<Project[]>()
const hasError = ref<boolean>(false)

const hasSpinner = computed(() => {
  return (programs.value === undefined || projects.value === undefined) && !hasError.value
})

const filteredPrograms = computed(() => {
  return programs.value ? programStore.getProgramsByFilters(programs.value) : undefined
})

const filteredProjects = computed(() => {
  //TODO : add filter by filteredPrograms
  return projects.value ? projectStore.getProjectsByObjective(projects.value, programStore.programFilters.objectiveTypeSelected) : undefined
})

const initialSelectedIndex = 0
const tabListName = 'Liste d’onglet'
const tabTitles = [{ title: "Des idées d'actions à mettre en place" }, { title: 'Vos aides financières' }]
const asc = ref(true)
const selectedTabIndex = ref(initialSelectedIndex)

const selectTab = (idx: number) => {
  asc.value = selectedTabIndex.value < idx
  selectedTabIndex.value = idx
}

onBeforeMount(async () => {
  const programResult = useUsedTrackStore().hasUsedTracks() ? await programStore.programsByUsedTracks : await programStore.programs
  const projectResult = await projectStore.projects
  if (programResult.isOk && projectResult.isOk) {
    programs.value = programResult.value
    projects.value = projectResult.value
  } else {
    hasError.value = true
  }

  // analytics / send event
  Matomo.sendEvent(TrackId.Results, navigationStore.isCatalog() ? 'show_results_catalog' : 'show_results')
})
</script>
