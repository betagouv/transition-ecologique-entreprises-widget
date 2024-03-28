import { addIcons as ovAddIcons, type CustomizeIconType } from 'oh-vue-icons'
import {
  RiArrowLeftLine,
  RiArrowRightLine,
  RiCloseCircleFill,
  RiCheckboxCircleFill,
  RiCheckboxLine,
  RiCheckboxBlankLine,
  RiLoader5Fill,
  RiLoader4Line
} from 'oh-vue-icons/icons/ri'
import { MdRadiobuttonchecked, MdRadiobuttonunchecked } from 'oh-vue-icons/icons'

export function addIcons(): void {
  ovAddIcons(...listIcons())
}

export const listIcons = (): CustomizeIconType[] => {
  return [
    RiArrowLeftLine,
    RiArrowRightLine,
    RiCloseCircleFill,
    RiCheckboxBlankLine,
    RiCheckboxCircleFill,
    RiCheckboxLine,
    RiLoader4Line,
    RiLoader5Fill,
    MdRadiobuttonchecked,
    MdRadiobuttonunchecked
  ] as CustomizeIconType[]
}
