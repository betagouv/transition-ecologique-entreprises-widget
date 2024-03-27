export default class Format {
  static capitalize(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1)
  }
}
