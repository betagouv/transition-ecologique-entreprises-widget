/* eslint-disable @typescript-eslint/no-unsafe-call */

import RequestApi from '@/service/api/requestApi'
import type { QuestionnaireData } from '@/types'
import projectData from '@tee/data/static/project.json'
import { Result } from 'true-myth'

import { Project } from '@tee/common/src/project/types'

export default class ProjectApi extends RequestApi<Project> {
  protected readonly url = '/api/projects'
  protected query: string = ''

  constructor(private questionnaireData: QuestionnaireData = {}) {
    super()
    this.query = this.buildQuery
  }

  async get(): Promise<Result<Project[], Error>> {
    //TODO replace with api call once the endpoint is available
    return new Promise((resolve, reject) => {
      if (!projectData) reject(new Error('No project data'))
      else resolve(Result.ok(projectData as unknown as Project[]))
    })
  }

  getOne(id: string) {
    // TO DO : api to get projects when backend is ready
    const url: string = this.url + '/' + id
    console.log('REQUESTED URL', url)
  }

  get buildQuery(): string {
    const queryString: { [key: string]: string } = {}
    Object.entries(this.questionnaireData).forEach(([key, value]: [string, string | string[] | undefined | null]) => {
      if (value !== undefined && value !== null) {
        queryString[key] = value.toString()
      }
    })

    return new URLSearchParams(queryString).toString()
  }
}
