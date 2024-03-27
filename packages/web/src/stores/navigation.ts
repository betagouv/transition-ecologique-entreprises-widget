// CONSOLE LOG TEMPLATE
// console.log(`store.navigation > FUNCTION_NAME > MSG_OR_VALUE :`)

import { computed, ref } from 'vue'
import { acceptHMRUpdate, defineStore } from 'pinia'
import type { TrackId, UsedTrackValuePair } from '@/types'
import type { RouteLocationNormalizedLoaded, RouteLocationRaw, Router } from 'vue-router'
import { RouteName } from '@/types/routeType'
import Widget from '@/utils/widget'

export const useNavigationStore = defineStore('navigation', () => {
  // State objects
  const routerReady = ref<boolean>(false)
  const routerRef = ref<Router>()
  const routeRef = ref<RouteLocationNormalizedLoaded>()
  const userQueries = ref<Partial<UsedTrackValuePair>[]>([])
  const currentTrackId = ref<TrackId>()
  const currentStep = ref<number>()
  const currentDetailId = ref<string | number>('')

  // getters
  const route = computed(() => {
    return routeRef.value
  })

  const isCatalog = () => {
    return isByRouteName(RouteName.Catalog)
  }

  const isByRouteName = (routeName: string) => {
    return routeRef.value?.name === routeName
  }

  // actions
  function setRouterReady(bool: boolean) {
    routerReady.value = bool
  }
  function setRouter(router: Router) {
    // cf : https://stackoverflow.com/questions/70681667/cant-use-vue-router-and-pinia-inside-a-single-store
    routerRef.value = router
    setRouterReady(true)
  }
  function setRoute(routeObj: RouteLocationNormalizedLoaded) {
    routeRef.value = routeObj
  }
  function setCurrentTrackId(id: TrackId) {
    currentTrackId.value = id
  }
  function setCurrentStep(step: number) {
    currentStep.value = step
  }
  async function setCurrentDetailId(id: string | number) {
    currentDetailId.value = id
    await updateUrl(!Widget.is)
  }
  function addQuery(query: Partial<UsedTrackValuePair>) {
    const existingTrackIds = userQueries.value.map((q) => q.trackId)
    if (!existingTrackIds.includes(query.trackId)) {
      userQueries.value.push(query)
    }
  }
  // function removeQuery(trackId: string) {
  //   userQueries.value = userQueries.value.filter(q => q.trackId !== trackId)
  // }
  async function updateUrl(noWidget: boolean, forcePath: string | boolean = false) {
    // existing query

    // loop userQueries and remap as <trackId>: `<selectionKey1>:<selectionValue1>|<selectionKey2>:<selectionValue2>`
    const trackQueries: Record<string, string> = {}
    userQueries.value.map((q) => {
      const selection: any[] = []
      q.selection?.forEach((s) => {
        for (const [key, value] of Object.entries(s)) {
          selection.push(`${key}:${value}`)
        }
      })
      const resString = selection.join('|')
      trackQueries[`teetrack_${q.trackId}`] = resString
    })

    const allQueries = {
      teeStep: currentStep.value,
      teeActiveTrack: currentTrackId.value,
      ...trackQueries,
      teeDetail: currentDetailId.value
    }

    // adapt path
    let routePath = routeRef.value?.path
    const routeName = forcePath || (routeRef.value?.name as string)
    if (noWidget) {
      routePath = `/${routeName}`
      // if (!!currentDetailId.value) {
      //   routeName = `${routeName}-detail`
      //   routePath = `/${routeName}/${currentDetailId.value}`
      // } else {
      //   routeName = `${forcePath || routeName.replace(/\d-detail/, '')}`
      //   routePath = `/${routeName}/${currentDetailId.value}`
      // }
    }

    // routerRef.value.replace({ query: allQueries })
    const newRoute = {
      // fullPath: routeRef.value.fullPath,
      // path: routeRef.value.path,
      path: routePath,
      // hash: routeRef.value.hash,
      // params: routeRef.value.params,
      // meta: routeRef.value.meta,
      name: routeName,
      // name: routeRef.value.name,
      // matched: routeRef.value.matched,
      query: allQueries
    } as RouteLocationRaw

    // update browser
    await routerRef.value?.push(newRoute)
  }
  function updateQuery(q: Partial<UsedTrackValuePair>) {
    // update ref
    if (typeof q !== 'undefined') {
      userQueries.value = userQueries.value.map((i) => {
        const iCopy = { ...i }
        if (i.trackId === q.trackId) {
          iCopy.selection = q.selection
        }
        return iCopy
      })
    }
  }

  function updateQueries(usedTracks: UsedTrackValuePair[]) {
    // reset userQueries
    userQueries.value = []
    const queries = usedTracks.map((usedTrack) => {
      const selection = usedTrack.completed ? usedTrack.selection : []
      return {
        trackId: usedTrack.trackId,
        selection: selection
      } as Partial<UsedTrackValuePair>
    })
    queries.forEach((query) => {
      addQuery(query)
      if (query.selection?.length) {
        updateQuery(query)
      }
    })
  }

  function resetQueries() {
    userQueries.value = []
  }

  return {
    routerReady,
    routerRef,
    routeRef,
    route,
    userQueries,
    currentTrackId,
    currentStep,
    currentDetailId,
    isCatalog,
    isByRouteName,
    resetQueries,
    setRouter,
    setRoute,
    setCurrentTrackId,
    setCurrentStep,
    setCurrentDetailId,
    updateUrl,
    updateQueries
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useNavigationStore, import.meta.hot))
}
