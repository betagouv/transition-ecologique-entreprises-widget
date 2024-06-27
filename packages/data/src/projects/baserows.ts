import axios from 'axios'
import dotenv from 'dotenv'
import fs from 'fs'
import path from 'path'

import { BaserowImage, BaserowLinkedObject, BaserowProject, BaserowTheme, RawProject } from './types'

dotenv.config()

export class Baserow {
  private API_TOKEN = process.env.BASEROW_TOKEN
  private BASE_URL = 'https://api.baserow.io/api'
  private databaseId = 114839
  private projectTableId = 305253
  private themeTableId = 305258
  private _outputDirectory: string
  private _imageSubDirectory: string = 'projectImages'

  constructor(outputDirectory: string) {
    this._outputDirectory = outputDirectory
  }

  async getValidProjects(): Promise<RawProject[]> {
    const allBaserowProjects = await this._getTableData<BaserowProject>(this.projectTableId)
    const validBaserawProjects = allBaserowProjects.filter((value) => {
      return value.Publié || true // TODO delete or true when there will be real data in baserow !
    })

    const baserawThemes = await this._getTableData<BaserowTheme>(this.themeTableId)

    return await Promise.all(
      validBaserawProjects.map(async (project) => {
        return await this._convertToRawProjectType(project, baserawThemes)
      })
    )
  }

  private async _getTableData<T>(tableId: number): Promise<T[]> {
    try {
      const response = await axios.get(`${this.BASE_URL}/database/rows/table/${tableId}/?user_field_names=true`, {
        headers: {
          Authorization: `Token ${this.API_TOKEN}`
        },
        params: {
          database_id: this.databaseId
        }
      })
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-member-access
      return response.data.results
    } catch (error) {
      console.error('Error fetching project data from baserow:', error)
      return []
    }
  }

  private async _convertToRawProjectType(baserowProject: BaserowProject, baserawThemes: BaserowTheme[]): Promise<RawProject> {
    return {
      id: baserowProject.id,
      title: baserowProject.Titre,
      nameTag: baserowProject.NameTag,
      shortDescription: baserowProject['Description courte'],
      image: await this._handleImage(baserowProject.Image, baserowProject.id)
        .then(() => {
          return 'data/' + path.relative(process.cwd(), this._imagePath(baserowProject.id))
        }) // not sure about this.
        // I wanted to avoid using relative path from the source file but is it really better ?
        .catch(() => {
          return ''
        }),
      longDescription: baserowProject['Qu’est-ce que c’est ?'],
      moreDescription: baserowProject['Pour aller plus loin'],
      themes: this.generateThemeList(baserowProject['Thématique principale'], baserowProject['Thématiques secondaires'], baserawThemes),
      mainTheme: this.generateMainTheme(baserowProject['Thématique principale'], baserawThemes),
      programs: this.generateProgramList(baserowProject.Dispositifs),
      linkedProjects: this.generateLinkedProjectList(baserowProject['Projets complémentaires']),
      priority: baserowProject.Prio
    }
  }

  private _imagePath(projectId: number) {
    return path.join(this._outputDirectory, this._imageSubDirectory, projectId.toString())
  }

  private async _handleImage(baserowImage: BaserowImage[], projectId: number): Promise<string> {
    if (!baserowImage.length) {
      throw new Error('No image in baserow data')
    }
    const url = baserowImage[0].url

    try {
      const filePath = this._imagePath(projectId)
      const directoryPath = path.dirname(filePath)
      if (!fs.existsSync(directoryPath)) {
        fs.mkdirSync(directoryPath, { recursive: true })
      }
      await this.downloadImage(url, filePath)
      return filePath
    } catch (error) {
      console.error('Error downloading the image:', error)
      throw error
    }
  }

  async downloadImage(url: string, filename: string) {
    const response = await axios.get(url, { responseType: 'arraybuffer' })
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    fs.writeFile(filename, response.data, (err) => {
      if (err) throw err
      console.log('Image downloaded successfully!', filename)
    })
  }

  generateMainTheme(mainTheme: BaserowLinkedObject[], baserawThemes: BaserowTheme[]): string {
    if (mainTheme.length != 1) {
      console.warn('Missing mainTheme Or mainTheme not unique in a field')
    }
    const themeId = mainTheme[0].id
    const matchingTheme = baserawThemes.find((theme) => theme.id === themeId)
    if (matchingTheme === undefined) {
      console.warn('theme not found in baserow data (should not happen!)')
      return ''
    }
    return matchingTheme['Nom (Tech)']
  }

  generateThemeList(mainTheme: BaserowLinkedObject[], secondaryThemes: BaserowLinkedObject[], baserawThemes: BaserowTheme[]): string[] {
    const themeList = [this.generateMainTheme(mainTheme, baserawThemes)]
    secondaryThemes.forEach((element) => {
      const themeId = element.id
      const matchingTheme = baserawThemes.find((theme) => theme.id === themeId)
      if (matchingTheme) {
        themeList.push(matchingTheme['Nom (Tech)'])
      } else {
        console.warn('theme not found in baserow data (should not happen!)')
      }
    })
    return themeList
  }

  generateProgramList(programs: BaserowLinkedObject[]): string[] {
    return programs.map((value) => {
      return value.value
    })
  }

  generateLinkedProjectList(projects: BaserowLinkedObject[]): number[] {
    return projects.map((value) => {
      return value.id
    })
  }
}
