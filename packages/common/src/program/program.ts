import { ProgramAidType } from './types'
import { Program as ProgramType } from '@tee/data/src/type/program'

export default class Program {
  public static getPrefixedProgramName(program: ProgramType) {
    let prefix = ''
    switch (program["nature de l'aide"]) {
      case ProgramAidType.acc:
        prefix = `l'`
        break
      case ProgramAidType.train:
      case ProgramAidType.tax:
        prefix = `la `
        break
      case ProgramAidType.fund:
      case ProgramAidType.loan:
        prefix = `le `
        break
    }

    return `${prefix}${program["nature de l'aide"]} ${program.titre}`
  }
}
