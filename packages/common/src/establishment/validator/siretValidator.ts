export default class SiretValidator {
  static readonly validate = (siret?: string): boolean => {
    if (siret === undefined) {
      return false
    }

    const trimmed = this.trimSiret(siret)

    if (!this.isValidSiretFormat(trimmed)) {
      return false
    }

    return this.isValidSiretNumber(trimmed)
  }

  static isValidSiretFormat(siret: string): boolean {
    const trimmed = this.trimSiret(siret)

    return /^[0-9]+$/.test(trimmed) && trimmed.length === 14
  }

  static isValidSiretNumber(siret: string): boolean {
    const trimmed = this.trimSiret(siret)

    let calc,
      calc2,
      total = 0,
      odd = false

    for (let i = trimmed.length; i > 0; i--) {
      calc = parseInt(trimmed.charAt(i - 1))
      if (!odd) {
        total += calc
      } else {
        calc2 = calc * 2

        switch (calc2) {
          case 10:
            calc2 = 1
            break
          case 12:
            calc2 = 3
            break
          case 14:
            calc2 = 5
            break
          case 16:
            calc2 = 7
            break
          case 18:
            calc2 = 9
            break
          default:
            break
        }
        total += calc2
      }
      odd = !odd
    }

    return total !== 0 && total % 10 === 0
  }

  static trimSiret = (siret: string): string => {
    return siret.replace(/\s/g, '')
  }
}
