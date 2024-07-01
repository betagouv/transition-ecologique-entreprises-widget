import axios from 'axios'
import dotenv from 'dotenv'
import fs from 'fs'
import path from 'path'
import sharp from 'sharp'
import { BaserowImageTable, BaserowLinkedObject, BaserowProject, BaserowTheme, RawProject } from './types'

dotenv.config()

export class Baserow {
  private readonly _apiToken = this._setBaserowToken()
  private readonly _baseUrl = 'https://api.baserow.io/api'
  private readonly _projectTableId = 305253
  private readonly _themeTableId = 305258
  private readonly _imageTableId = 315189
  private readonly _axiosHeader = {
    headers: {
      Authorization: `Token ${this._apiToken}`
    }
  }
  private readonly _defaultImageName = 'plan-transition-bas-carbone.webp'

  constructor(private readonly _imageDirectory: string) {}

  async getValidProjects(): Promise<RawProject[]> {
    const baserowProjects = await this._getTableData<BaserowProject>(this._projectTableId)
    const validBaserawProjects = baserowProjects.filter((value) => {
      return value.Publié || true // TODO delete or true when there will be real data in baserow !
    })

    const baserawThemes = await this._getTableData<BaserowTheme>(this._themeTableId)

    const projects: RawProject[] = []
    for (const project of validBaserawProjects) {
      try {
        const result = await this._convertToRawProjectType(project, baserawThemes)
        projects.push(result)
        console.info(`successfully loaded project ${project.id}`)
        await this._delay(300)
      } catch (error) {
        console.error(`Error processing project ${project.id}:`, error)
      }
    }
    return projects
  }

  private async _getTableData<T>(tableId: number): Promise<T[]> {
    try {
      const response = await axios.get(`${this._baseUrl}/database/rows/table/${tableId}/?user_field_names=true`, this._axiosHeader)

      // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-member-access
      return response.data.results
    } catch (error) {
      console.error('Error fetching project data from baserow:', error)
      return []
    }
  }

  private async _getRowData<T>(tableId: number, rowId: number): Promise<T | null> {
    try {
      const response = await axios.get(`${this._baseUrl}/database/rows/table/${tableId}/${rowId}/?user_field_names=true`, this._axiosHeader)

      // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-member-access
      return response.data
    } catch (error) {
      console.error('Error fetching a specific row of data from baserow :', error)
      return null
    }
  }

  private async _convertToRawProjectType(baserowProject: BaserowProject, baserawThemes: BaserowTheme[]): Promise<RawProject> {
    const imageName = await this._handleImage(baserowProject.Image)

    return {
      id: baserowProject.id,
      title: baserowProject.Titre,
      nameTag: baserowProject.NameTag,
      shortDescription: baserowProject['Description courte'],
      image: 'images/projects/' + imageName,
      longDescription: baserowProject['Qu’est-ce que c’est ?'],
      moreDescription: baserowProject['Pour aller plus loin'],
      themes: this._generateThemeList(baserowProject['Thématique principale'], baserowProject['Thématiques secondaires'], baserawThemes),
      mainTheme: this._generateMainTheme(baserowProject['Thématique principale'], baserawThemes),
      programs: this._generateProgramList(baserowProject.Dispositifs),
      linkedProjects: this._generateLinkedProjectList(baserowProject['Projets complémentaires']),
      priority: baserowProject.Prio
    }
  }

  private async _handleImage(baserowImage: BaserowLinkedObject[]): Promise<string> {
    if (!baserowImage.length) {
      console.log('No image found, defaulting to plan-transition-bas-carbone.webp')
      return this._defaultImageName
    }
    // request the image url in the image table
    const imageId = baserowImage[0].id
    const imageInfos = (await this._getRowData<BaserowImageTable>(this._imageTableId, imageId)) as BaserowImageTable
    let imageDownloadResponse
    try {
      imageDownloadResponse = await axios.get(imageInfos.Image[0].url, { responseType: 'arraybuffer' })
    } catch {
      console.error('Error while trying to download the image ' + imageId)
      console.log('Defaulting to the default image : ' + this._defaultImageName)
      return this._defaultImageName
    }
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    const imageBuffer = Buffer.from(imageDownloadResponse.data, 'binary')
    const webpBuffer = await sharp(imageBuffer).webp().toBuffer()

    const fileName = `${imageInfos['Image URL TEE']}.webp`
    const filePath = path.join(this._imageDirectory, fileName)
    fs.writeFileSync(filePath, webpBuffer)

    return fileName
  }

  private _generateMainTheme(mainTheme: BaserowLinkedObject[], baserawThemes: BaserowTheme[]): string {
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

  private _generateThemeList(
    mainTheme: BaserowLinkedObject[],
    secondaryThemes: BaserowLinkedObject[],
    baserawThemes: BaserowTheme[]
  ): string[] {
    const themeList = [this._generateMainTheme(mainTheme, baserawThemes)]
    secondaryThemes.forEach((secondaryTheme) => {
      const themeId = secondaryTheme.id
      const matchingTheme = baserawThemes.find((theme) => theme.id === themeId)
      if (matchingTheme) {
        themeList.push(matchingTheme['Nom (Tech)'])
      } else {
        console.warn('theme not found in baserow data (should not happen!)')
      }
    })
    return themeList
  }

  private _generateProgramList(programs: BaserowLinkedObject[]): string[] {
    return programs.map((program) => {
      return program.value
    })
  }

  private _generateLinkedProjectList(projects: BaserowLinkedObject[]): number[] {
    return projects.map((project) => {
      return project.id
    })
  }

  private async _delay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms))
  }

  private _setBaserowToken(): string {
    if (process.env['BASEROW_TOKEN']) {
      return process.env['BASEROW_TOKEN']
    }
    throw Error('Baserow token not found.')
  }
}
