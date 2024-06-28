<template>
  <!--  List of project cards-->
  <div class="fr-grid-row fr-grid-row--center">
    <div class="fr-container fr-m-0 fr-p-0">
      <div class="fr-grid-row fr-grid-row--center">
        <div
          class="fr-mb-2v fr-mt-6v fr-pl-2w fr-pl-md-2v fr-col-12 fr-col-md-10 fr-col-offset-md-2 fr-text--blue-france fr-font-style--italic"
        >
          <ProjectCounter
            :sorted-projects="sortedProjects"
            :filtered-programs="filteredPrograms"
          />
        </div>
      </div>
    </div>
  </div>
  <!--      PRIORITY PROJECTS -->
  <div
    v-if="hasPriorityProjects && !hasObjectiveCard && !hasObjectiveSelected"
    class="fr-mt-3v fr-bg-lg--green--lightness fr-hidden fr-unhidden-lg"
  >
    <div class="fr-grid-row fr-grid-row--gutters fr-grid-row--center fr-m-0 fr-p-0">
      <div class="fr-container fr-m-0 fr-p-0">
        <div class="fr-grid-row fr-grid-row--gutters fr-grid-row--center fr-m-0 fr-p-0">
          <div
            v-if="!hasSpinner || !hasError"
            class="fr-col-3 fr-col-lg-2 fr-col-content--bottom fr-pb-6w"
          >
            <img
              :src="`${publicPath}images/TEE_project_priority.svg`"
              alt=""
              class="fr-responsive-img fr-col-12 fr-pt-6w"
            />
          </div>
          <div class="fr-col-12 fr-col-md-10 fr-px-0 fr-pr-md-2v">
            <div class="fr-container fr-p-0 fr-m-0">
              <div class="fr-grid-row fr-grid-row--gutters fr-grid-row--center fr-grid-row-md--left">
                <div class="fr-pt-2w fr-pl-2w fr-text--bold fr-text--blue-france">
                  Voici les actions par lesquelles commencer pour votre TPE du secteur Hôtels et hébergement similaire :
                </div>
                <router-link
                  v-for="project in priorityProjects"
                  :id="project.id"
                  :key="project.id"
                  :to="getRouteToProjectDetail(project.id)"
                  class="fr-col-11 fr-col-sm-12 fr-col-md-6 fr-col-lg-4 no-outline"
                >
                  <ProjectCard
                    :project="project"
                    :is-priority-project="true"
                    class="fr-radius-a--1v fr-card--shadow fr-card-priority fr-px-0"
                  />
                </router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div
    v-if="hasPriorityProjects && !hasObjectiveCard && !hasObjectiveSelected"
    class="fr-mt-3v fr-hidden fr-unhidden-lg"
  >
    <div class="fr-grid-row fr-grid-row--gutters fr-grid-row--center fr-m-0 fr-p-0">
      <div class="fr-container fr-m-0 fr-p-0">
        <div class="fr-col-12 fr-col-md-10 fr-col-offset-md-2 fr-px-0 fr-pr-md-2v">
          <div class="fr-container fr-p-0 fr-m-0">
            <div class="fr-grid-row fr-grid-row--gutters fr-grid-row--center fr-grid-row-md--left">
              <router-link
                v-for="project in nonPriorityProjects"
                :id="project.id"
                :key="project.id"
                :to="getRouteToProjectDetail(project.id)"
                class="fr-col-11 fr-col-sm-12 fr-col-md-6 fr-col-lg-4 no-outline"
              >
                <ProjectCard
                  :project="project"
                  class="fr-radius-a--1v fr-card--shadow"
                />
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- LIST DISPLAY FOR MD SIZE -->

  <div class="fr-grid-row fr-grid-row--gutters fr-grid-row--center fr-m-0 fr-p-0">
    <div class="fr-container fr-m-0 fr-p-0 fr-pl-md-2v">
      <div class="fr-grid-row fr-grid-row--center">
        <div class="fr-container fr-m-0 fr-p-0">
          <div class="fr-grid-row fr-grid-row--center">
            <div
              class="fr-col-12 fr-col-md-10 fr-col-offset-md-2 fr-pr-md-2v"
              :class="{ 'fr-hidden-lg': !hasObjectiveCard && !hasObjectiveSelected }"
            >
              <div class="fr-grid-row fr-grid-row--gutters fr-grid-row--center fr-grid-row-md--left">
                <router-link
                  v-for="project in sortedProjects"
                  :id="project.id"
                  :key="project.id"
                  :to="getRouteToProjectDetail(project.id)"
                  class="fr-col-11 fr-col-sm-12 fr-col-md-6 fr-col-lg-4 no-outline"
                >
                  <ProjectCard
                    :project="project"
                    :is-priority-project="isPriorityProject(project)"
                    class="fr-radius-a--1v fr-card--shadow"
                    :class="{ 'fr-card-priority': isPriorityProject(project) }"
                  />
                </router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { type ProgramData } from '@/types'
import UsedTrack from '@/utils/track/usedTrack'
import { useProgramStore } from '@/stores/program'
import Config from '@/config'
import { RouteName } from '@/types/routeType'
import { Project, ProjectId } from '@tee/common/src/project/types'
import { useNavigationStore } from '@/stores/navigation'
import { type RouteLocationRaw } from 'vue-router'

interface ProjectListProps {
  sortedProjects?: Project[]
  filteredPrograms?: ProgramData[]
}

const props = defineProps<ProjectListProps>()

const navigationStore = useNavigationStore()
const programStore = useProgramStore()

const publicPath = Config.publicPath

const hasError = ref<boolean>(false)

const hasSpinner = computed(() => {
  return props.sortedProjects === undefined && !hasError.value
})

const hasPriorityProjects = computed(() => {
  return priorityProjects.value ? priorityProjects.value?.length > 0 : false
})

const isPriorityProject = (project: Project) => {
  return !UsedTrack.isSpecificGoal() ? priorityProjects.value!.includes(project) : false
}

const priorityProjects = computed(() => {
  const projectQty = hasObjectiveSelected.value ? 1 : 3
  return props.sortedProjects ? props.sortedProjects.slice(0, projectQty) : undefined
})

const nonPriorityProjects = computed(() => {
  return props.sortedProjects ? props.sortedProjects.slice(3) : undefined
})

const hasObjectiveCard = computed(() => {
  return programStore.hasObjectiveTypeSelected() || (UsedTrack.isSpecificGoal() && UsedTrack.hasPriorityObjective())
})

const hasObjectiveSelected = computed(() => {
  return programStore.hasObjectiveTypeSelected()
})

const getRouteToProjectDetail = (projectId: ProjectId): RouteLocationRaw => {
  return {
    name: RouteName.ProjectResultDetail,
    params: { projectId },
    query: navigationStore.query
  }
}
</script>
