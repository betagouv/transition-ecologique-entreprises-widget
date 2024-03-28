export default class Button {
  static getIcon(isActive: boolean, isCheckbox: boolean) {
    if (isCheckbox) {
      return isActive ? 'ri-checkbox-line' : 'ri-checkbox-blank-line'
    } else {
      return isActive ? 'md-radiobuttonchecked' : 'md-radiobuttonunchecked'
    }
  }
}
