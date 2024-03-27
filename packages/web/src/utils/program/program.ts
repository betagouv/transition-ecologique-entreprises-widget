import type { ProgramData } from '@/types'

export default class Program {
  static getEndDate(program: ProgramData | undefined): Date | undefined {
    if (program === undefined || program['fin de validité'] === undefined) {
      return undefined
    }

    const dateArr: string[] = program['fin de validité'].split('/')
    return new Date(`${dateArr[2]}/${dateArr[1]}/${dateArr[0]}`)
  }

  static isAvailable(program: ProgramData | undefined) {
    const endDate = this.getEndDate(program)

    return endDate !== undefined ? endDate >= new Date() : true
  }
}
