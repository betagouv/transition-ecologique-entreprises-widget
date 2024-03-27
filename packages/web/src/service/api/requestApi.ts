export default class RequestApi {
  public static buildUrl(url: string, dataPath?: Record<string, string>): string {
    if (!dataPath) {
      return url
    }

    for (const datumPathKey in dataPath) {
      url = this.buildPath(url, datumPathKey, dataPath[datumPathKey])
    }

    return url
  }

  protected static buildPath(url: string, placeholderName: string, placeholderData: string): string {
    return url.replace('{' + placeholderName + '}', placeholderData)
  }
}
