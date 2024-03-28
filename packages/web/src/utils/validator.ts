export default class Validator {
  static validateSiret = (siret: string): boolean => {
    const trimmed = String(siret).replace(/[\s]/g, '')
    const length = trimmed.length

    let calc,
      calc2,
      total = 0,
      odd = false

    if (!/^[0-9]+$/.test(trimmed)) {
      return false
    }

    for (let i = length; i > 0; i--) {
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
}
