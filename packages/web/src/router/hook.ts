import { useTracksStore } from '@/stores/tracks'
import { useProgramsStore } from '@/stores/programs'
import { TrackId } from '@/types'
import { useNavigationStore } from '@/stores/navigation'
import type { NavigationGuardNext, RouteLocationNormalized } from 'vue-router'

export const resetTrackStore = (to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) => {
  const tracks = useTracksStore()
  tracks.resetUsedTracks()
  next()
}

export const resetProgramFilters = (to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) => {
  const programsStore = useProgramsStore()
  programsStore.resetFilters()
  next()
}

export const resetDetailProgram = (to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) => {
  useNavigationStore().resetQueries()
  useProgramsStore().resetDetailResult()
  next()
}
export const setHelpAsTrackSeed = (to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) => {
  const tracks = useTracksStore()
  tracks.setSeedTrack(TrackId.QuestionnaireRoute)
  next()
}
export const setResultsAsTrackSeed = (to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) => {
  const tracks = useTracksStore()
  tracks.setSeedTrack(TrackId.Results)
  next()
}
