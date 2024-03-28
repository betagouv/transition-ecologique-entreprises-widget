// CONSOLE LOG TEMPLATE
// console.log(`utils.navigation > FUNCTION_NAME > MSG_OR_VALUE :`)
export default class Navigation {
  static hashByRouteName = (routeName: string) => {
    return `#${routeName}`
  }
}
