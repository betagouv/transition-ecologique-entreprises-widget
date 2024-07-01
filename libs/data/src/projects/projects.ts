import path from 'path'
import fs from 'fs'
import { Baserow } from './baserow'
import { RawProject } from './types'
import { jsonPrograms } from '../../generated/index'
import { ProgramType } from '../index'
import { ThemeId } from '../../../common/src/theme/types'
// import { ThemeId } from '@tee/common'

export class ProjectFeatures {
  private readonly _outputDirectory: string = path.join(__dirname, '../../static/')
  private readonly _outputImageDirectory: string = path.join(__dirname, '../../../../apps/web/public/images/projects')
  private _programs: ProgramType[] = []

  constructor() {
    this._programs = jsonPrograms as unknown as ProgramType[]
  }

  async buildProjectsJSONOutputs(): Promise<void> {
    this._resetImageFolder()

    console.log(`Start loading Baserow data and creating the project images`)
    const projects = await new Baserow(this._outputImageDirectory).getValidProjects()

    console.log(`Baserow Data sucessfully downloaded.\nStarting to validate the project data and generating the project JSON.`)
    this._validateData(projects)
    this._writeJson(projects)
    return
  }

  private _resetImageFolder() {
    const projectDir = this._outputImageDirectory

    if (fs.existsSync(projectDir)) {
      fs.rmSync(projectDir, { recursive: true, force: true })
    }
    fs.mkdirSync(projectDir, { recursive: true })
    console.log(`Created a fresh image directory : ${projectDir}.`)
  }

  private _validateData(rawProjects: RawProject[]) {
    rawProjects.forEach((project) => {
      this._validateThemes(project)
      this._validateLinkedProjects(project, rawProjects)
      this._validatePrograms(project, this._programs)
    })
  }

  private _validateThemes(project: RawProject) {
    const validThemeIds = Object.values(ThemeId)

    project.themes.forEach((themeId) => {
      if (!validThemeIds.includes(themeId as ThemeId)) {
        console.warn(`In Project "${project['title']}", id ${project['id']}, unknown theme-id: ${themeId}`)
      }
    })
  }

  private _validateLinkedProjects(project: RawProject, rawProjects: RawProject[]) {
    project.linkedProjects.forEach((projectId) => {
      const projectFound = rawProjects.some((proj) => proj['id'] === projectId)
      if (!projectFound) {
        console.warn(`In Project "${project['title']}", id ${project['id']}, unknown project-id: ${projectId}`)
      }
    })
  }

  private _validatePrograms(project: RawProject, programs: ProgramType[]) {
    project.programs.forEach((programId) => {
      const programFound = programs.some((program) => program.id === programId)
      if (!programFound) {
        console.warn(`In Project "${project['title']}", id ${project['id']}, unknown program-id: ${programId}`)
      }
    })
  }

  private _writeJson(rawProjects: RawProject[]) {
    const projectJson = JSON.stringify(rawProjects)
    const fullPath = path.join(this._outputDirectory, 'projects.json')
    fs.writeFile(fullPath, projectJson, (err) => {
      if (err) {
        console.log('Error writing file:', err)
      } else {
        console.log('Successfully wrote file')
      }
    })
  }
}
