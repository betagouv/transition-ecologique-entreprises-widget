import { HasInputOptions, isTrackOptionsInput, type TrackOptionsUnion, type UsedTrack } from '@/types'
import { TrackComponent as TrackComponentType } from '@/types'

export default class TrackComponent {
  static isSiret(usedTrack: UsedTrack, option: TrackOptionsUnion) {
    return usedTrack.component === TrackComponentType.Siret && isTrackOptionsInput(option) && option.hasInput === HasInputOptions.Search
  }

  static isSelect(usedTrack: UsedTrack) {
    return usedTrack.component === TrackComponentType.Select
  }

  static isCards(usedTrack: UsedTrack) {
    return usedTrack.component === TrackComponentType.Cards
  }

  static isButtons(usedTrack: UsedTrack) {
    return usedTrack.component === TrackComponentType.Buttons
  }

  static isButtonInput(usedTrack: UsedTrack, option: TrackOptionsUnion) {
    return usedTrack.component === TrackComponentType.Buttons && isTrackOptionsInput(option)
  }

  static isSimpleButtons(usedTrack: UsedTrack) {
    return usedTrack.component === TrackComponentType.SimpleButtons
  }
}
