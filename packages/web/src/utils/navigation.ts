// CONSOLE LOG TEMPLATE
// console.log(`utils.navigation > FUNCTION_NAME > MSG_OR_VALUE :`)
export default class Navigation {
  static hashByRouteName = (routeName: string) => {
    return `#${routeName}`
  }

  static unfoldQueries = (query: any) => {
    const prefix = 'teetrack_'
    const sepValues = '|'
    const sepPairs = ':'
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    const queryTracksRaw = Object.fromEntries(Object.entries(query).filter(([key]) => key.startsWith(prefix)))

    const queryTracks = Object.keys(queryTracksRaw)

    const tracksArray: any[] = queryTracks.map((key) => {
      const trackId = key.replace(prefix, '')
      const obj = {
        id: trackId,
        step: '',
        selected: []
      }
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-assignment
      const strParts = query[key].split(sepValues)
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-assignment
      const pairs = strParts.map((i: any) => {
        const o: any = {}
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-assignment
        const split = i.split(sepPairs)
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        if (split[0].length) {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-unsafe-assignment
          o[split[0]] = split[1]
          // eslint-disable-next-line @typescript-eslint/no-unsafe-return
          return o
        }
      })
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-assignment
      obj.selected = pairs.filter((i: any) => !!i)
      return obj
    })
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return tracksArray
  }
}
