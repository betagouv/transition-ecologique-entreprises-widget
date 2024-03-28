import { type ColsOptions, TrackComponent } from '@/types'

export default class TrackColOption {
  static default: ColsOptions = {
    [TrackComponent.Buttons]: 12,
    [TrackComponent.SimpleButtons]: 10,
    [TrackComponent.Input]: 12,
    [TrackComponent.Siret]: 12,
    [TrackComponent.Select]: 12,
    [TrackComponent.Cards]: 4,
    [TrackComponent.Form]: 8,
    [TrackComponent.Results]: 10
  }

  static large: ColsOptions = {
    [TrackComponent.Buttons]: 12,
    [TrackComponent.SimpleButtons]: 8,
    [TrackComponent.Input]: 12,
    [TrackComponent.Siret]: 12,
    [TrackComponent.Select]: 12,
    [TrackComponent.Cards]: 6,
    [TrackComponent.Form]: 8,
    [TrackComponent.Results]: 10
  }
}
