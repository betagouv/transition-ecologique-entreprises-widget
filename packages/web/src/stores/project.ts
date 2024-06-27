import ProjectApi from '@/service/api/projectApi'
import ProjectFilters from '@/utils/project/projectFilters'
import { defineStore } from 'pinia'
import { computed } from 'vue'
import { PublicodeObjective } from '@/types'
import { Project, ProjectId } from '@tee/common/src/project/types'

export const useProjectStore = defineStore('project', () => {
  const projects = computed(async () => {
    return await getProjects()
  })

  async function getProjects() {
    return await new ProjectApi().get()
  }

  function getProjectsByObjective(projects: Project[], objectiveType: string): Project[] {
    return projects.filter((project: Project) => {
      return ProjectFilters.filterProgramsByTheme(project, objectiveType as PublicodeObjective)
    })
  }
  function getProjectById(projects: Project[], projectId: string | ProjectId): Project | undefined {
    return projects.find((project: Project) => project.id.toString() === projectId.toString())
  }

  return {
    projects,
    getProjectsByObjective,
    getProjectById
  }
})
