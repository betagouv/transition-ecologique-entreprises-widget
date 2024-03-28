// CONSOLE LOG TEMPLATE
// console.log(`store.tracks > FUNCTION_NAME > MSG_OR_VALUE :`)

import { tracks as allTracks } from '@/questionnaire'
import { type Track, TrackComponent, type TrackOptionsUnion, type Translations } from '@/types'
import { TrackId } from '@/types'
// cf : https://stackoverflow.com/questions/64917686/vue-array-converted-to-proxy-object
import { acceptHMRUpdate, defineStore } from 'pinia'
import { computed, ref } from 'vue'

export const useTrackStore = defineStore('track', () => {
  const tracks = ref<Track[]>(allTracks)
  const current = ref<Track | undefined>()
  const maxDepth = ref(4)

  const currentId = computed<TrackId | undefined>(() => {
    return current.value?.id
  })

  const currentOptions = computed<TrackOptionsUnion[]>(() => {
    return current.value?.options?.filter((o): o is TrackOptionsUnion => !o.disabled) ?? []
  })

  const currentComponent = computed<TrackComponent>(() => {
    return current.value?.interface?.component ?? TrackComponent.Buttons
  })

  const currentColumnWidth = computed<number | string>(() => {
    return current.value?.interface?.columnWidth ?? 0
  })

  const tracksStepsArrayDict = computed(() => {
    return tracks.value.map((track: Track) => {
      return {
        id: track.id,
        label: track.label
      }
    })
  })

  const getTrack = (trackId: TrackId): Track | undefined => {
    return tracks.value.find((track) => track.id === trackId)
  }

  const getTrackTitle = (trackId: TrackId, lang: string): string | undefined => {
    const track = getTrack(trackId)
    const trackTitle: Translations | undefined = track?.title
    return trackTitle?.[lang]
  }

  const getTrackBgColor = (trackId: TrackId): string | undefined => {
    const track = getTrack(trackId)
    return track?.bgColor
  }

  // actions
  function setMaxDepth(depth: number) {
    maxDepth.value = depth
  }

  function setCurrentTrack(currentTrack: Track | undefined) {
    current.value = currentTrack
  }

  function setCurrentTrackById(trackId: TrackId) {
    setCurrentTrack(getTrack(trackId))
  }

  return {
    tracks,
    maxDepth,
    current,
    currentId,
    currentComponent,
    currentOptions,
    currentColumnWidth,
    tracksStepsArrayDict,
    setMaxDepth,
    getTrack,
    getTrackTitle,
    getTrackBgColor,
    setCurrentTrack,
    setCurrentTrackById
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useTrackStore, import.meta.hot))
}
