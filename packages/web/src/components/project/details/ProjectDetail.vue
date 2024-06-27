<template>
  <ProjectHeader
    class="fr-col-12"
    :project-title="projectTitle"
    :project-id="projectId"
    :project-img="projectImg"
    :theme-color="themeColor"
  />
  <div
    v-if="project"
    class="fr-col-12 fr-px-md-16v"
  >
    <div class="fr-grid-row fr-pt-4v">
      <div class="fr-col-3 fr-col-sm-3 fr-hidden-xs">
        <DsfrButton
          :label="buttonLabel"
          size="sm"
          :class="`fr-m-4v fr-radius-a--2v ${linkCopied ? `fr-bg--green` : ''}`"
          icon="fr-icon-link"
          @click="copyUrl"
        />
        <ProjectSideNav :project="project" />
      </div>
      <div class="fr-col-8 fr-col-xs-12 fr-col-sm-9">
        <DsfrAccordionsGroup>
          <ProjectDescription
            :project-description="projectDescription"
            :project-more-description="projectMoreDescription"
          />
          <ProjectPrograms
            :objective="themeObjective"
            :project="project"
          />
          <LinkedProjects
            v-if="relatedProjects.length > 0"
            id="project-linked-projects"
            :related-projects="relatedProjects"
            :color="themeColor"
          />
        </DsfrAccordionsGroup>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { Project, ProjectId } from '@tee/common/src/project/types'
import { Theme as ThemeType } from '@/types'
import Theme from '@tee/common/src/theme/theme'
import { DsfrButton } from '@gouvminint/vue-dsfr'
import { useProjectStore } from '@/stores/project'

const projectStore = useProjectStore()

interface Props {
  projectId: ProjectId
}

const props = defineProps<Props>()
const linkCopied = ref<boolean>(false)

const copyUrl = async () => {
  const pageUrl = window.location.href
  await navigator.clipboard.writeText(pageUrl)
  linkCopied.value = true
  setTimeout(() => {
    linkCopied.value = false
  }, 2000)
}
const project = ref<Project>()
const theme = ref<ThemeType>()
const relatedProjects = ref()
const projectTitle = computed(() => project.value?.title)
const projectImg = computed(() => project.value?.image)
const projectDescription = computed(() => project.value?.longDescription || '')
const projectMoreDescription = computed(() => project.value?.moreDescription || '')
const themeObjective = computed(() => theme.value?.value)
const themeColor = computed<string>(() => theme.value?.color || '')
const buttonLabel = computed<string>(() => {
  if (linkCopied.value) {
    return 'Lien copié'
  }
  return 'Copier le lien'
})
onBeforeMount(async () => {
  const projectResult = await projectStore.projects
  if (projectResult.isOk) {
    const selectedProject = projectStore.getProjectById(projectResult.value, props.projectId)
    if (selectedProject) {
      project.value = selectedProject
    }
    const themeProject = Theme.getById(project.value?.mainTheme)
    if (themeProject) {
      theme.value = Theme.getById(project.value?.mainTheme)
    }

    relatedProjects.value = project.value?.linkedProjects.map((projectId: ProjectId) =>
      projectStore.getProjectById(projectResult.value, projectId)
    )
  }
})
</script>
