// CONSOLE LOG TEMPLATE
// console.log(`store.tracks > FUNCTION_NAME > MSG_OR_VALUE :`)

import { computed, ref, toRaw } from 'vue'
// cf : https://stackoverflow.com/questions/64917686/vue-array-converted-to-proxy-object
import { defineStore } from 'pinia'
import { tracks } from '@/questionnaire'
import type { Track, TrackOptions, Translations, UsedTrack, UsedTrackValuePair } from '@/types'
import { TrackComponents, TrackId, type FlatObject } from '@/types'

const allTracks = ref<Track[]>(tracks)
const seedTrack = ref<TrackId | undefined>()

export const tracksStore = defineStore('tracks', () => {
  const trackResultString = TrackId.Results

  const maxDepth = ref(4)

  const usedTracks = ref<UsedTrack[]>([])

  // computed
  const tracksStepsArrayDict = computed(() => {
    const dict = allTracks.value.map((track: Track) => {
      return {
        id: track.id,
        label: track.label
      }
    })
    return dict
  })
  const tracksStepsArray = computed(() => {
    const tracksArray = usedTracks.value.map((t: UsedTrack) => t.id)
    const lastTrack = tracksArray[tracksArray.length - 1]
    if (lastTrack !== trackResultString) {
      tracksArray.push(trackResultString)
    }
    return tracksArray
  })
  const getLastTrack = computed(() => {
    const tracksArray = usedTracks.value //.slice(-1)
    return tracksArray[tracksArray.length - 1] as UsedTrack | undefined
  })
  const currentTrackId = computed(() => {
    const tracksArray = usedTracks.value.slice(-1)
    const track: UsedTrack = tracksArray[0]
    return track?.id
  })
  const currentStep = computed(() => {
    const track = getLastTrack.value
    return track?.step
  })
  const getAllUsedTracks = computed(() => {
    const res = usedTracks.value.filter((i: UsedTrack) => i?.completed).map((i: UsedTrack) => toRaw(i))
    return res
  })
  const getAllUsedTracksValues = computed<(string | number | object)[]>(() => {
    const usedTrackValues = getAllUsedTracks.value
      .map((usedTrack: UsedTrack) => {
        const values = usedTrack.selected?.map((s) => s.value)
        return toRaw(values.map((i) => toRaw(i)))
      })
      .filter((i) => i?.length)

    return usedTrackValues.flat(1)
  })
  const getAllUsedTracksValuesPairs = computed<UsedTrackValuePair[]>(() => {
    return usedTracks.value.map((usedTrack: UsedTrack) => {
      const values = usedTrack.selected?.map((s) => s.value)
      return {
        trackId: usedTrack.id,
        completed: usedTrack.completed,
        selection: toRaw(values.map((i) => toRaw(i)))
      }
    })
  })
  const getAllUsedTracksValuesSingleObject = computed<object>(() => {
    const allTracksValues = getAllUsedTracksValues.value as FlatObject[]
    const result: FlatObject = {}
    allTracksValues.forEach((obj) => {
      Object.entries(obj).forEach(([key, value]) => {
        result[key] = value
      })
    })
    return result
  })

  // getters
  const getTrack = (trackId: TrackId): Track | undefined => {
    return allTracks.value.find((track) => track.id === trackId)
  }
  const getTrackCategory = (trackId: TrackId): string | undefined => {
    const track = getTrack(trackId)
    return track?.category
  }
  const getTrackTitle = (trackId: TrackId, lang: string): string | undefined => {
    const track = getTrack(trackId)
    const trackTitle: Translations | undefined = track?.title
    return trackTitle?.[lang]
  }
  const getTrackLabel = (trackId: TrackId, lang: string): string | undefined => {
    const track = getTrack(trackId)
    const trackLabel: Translations | undefined = track?.label
    return trackLabel?.[lang]
  }
  const getTrackBgColor = (trackId: TrackId): string | undefined => {
    const track = getTrack(trackId)
    return track?.bgColor
  }
  const getTrackImageRight = (trackId: TrackId): string | undefined => {
    const track = getTrack(trackId)
    return track?.imageRight
  }
  function trackExistsInUsed(trackId: TrackId) {
    const exists = usedTracks.value.find((usedTrack) => (usedTrack.id as TrackId) === trackId)
    return !!exists
  }
  const isTrackCompleted = (trackId: TrackId) => {
    const track = usedTracks.value.find((usedTrack) => (usedTrack.id as TrackId) === trackId)
    return track?.completed || false
  }

  // actions
  function setMaxDepth(depth: number) {
    maxDepth.value = depth
  }

  function setSeedTrack(seed: TrackId) {
    const track = getTrack(seed)
    seedTrack.value = track?.id
  }

  function addToUsedTracks(srcTrackId: TrackId, newTrackId: TrackId) {
    const nextTrack = getTrack(newTrackId)

    removeFurtherUsedTracks(srcTrackId)

    // add newTrackId
    const trackInfos: UsedTrack = {
      id: newTrackId,
      component: nextTrack?.interface?.component ?? TrackComponents.Buttons,
      category: nextTrack?.category,
      completed: false,
      step: usedTracks.value.length + 1,
      selected: [],
      next: null
    }

    usedTracks.value.push(trackInfos)
  }

  function updateUsedTracks(trackId: TrackId, step: number, next: any, selectedOptions: TrackOptions[]) {
    usedTracks.value.map((usedTrack: UsedTrack) => {
      if (usedTrack.id === trackId) {
        const hasValues = Boolean(selectedOptions.length)
        usedTrack.selected = selectedOptions
        usedTrack.completed = hasValues
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        usedTrack.next = hasValues ? next : null
      }
    })
  }

  function setUsedTracksAsNotCompleted(trackId: TrackId) {
    usedTracks.value.map((trackInfo: UsedTrack) => {
      if (trackInfo.id === trackId) {
        trackInfo.completed = false
      }
      return trackInfo
    })
  }

  function removeFurtherUsedTracks(srcTrackId: TrackId) {
    const lastTrack: UsedTrack | undefined = usedTracks.value.find((t: UsedTrack) => t.id === srcTrackId)
    if (lastTrack) {
      usedTracks.value = usedTracks.value.filter((t: UsedTrack) => t.step <= lastTrack?.step)
    }
  }

  function resetUsedTracks() {
    usedTracks.value = []
  }

  return {
    maxDepth,
    allTracks,
    tracksStepsArrayDict,
    seedTrack,
    usedTracks,
    tracksStepsArray,
    getLastTrack,
    currentTrackId,
    currentStep,
    setMaxDepth,
    getTrack,
    getTrackCategory,
    getTrackTitle,
    getTrackLabel,
    getTrackBgColor,
    getTrackImageRight,
    isTrackCompleted,
    getAllUsedTracks,
    getAllUsedTracksValues,
    getAllUsedTracksValuesPairs,
    getAllUsedTracksValuesSingleObject,
    trackExistsInUsed,
    setSeedTrack,
    addToUsedTracks,
    updateUsedTracks,
    setUsedTracksAsNotCompleted,
    removeFurtherUsedTracks,
    resetUsedTracks
  }
})
