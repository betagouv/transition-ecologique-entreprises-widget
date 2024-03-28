<template>
  <div
    ref="trackElement"
    class="fr-container--fluid"
  >
    <div
      :id="RouteName.QuestionnaireResult"
      class="fr-container--fluid"
    >
      <div
        ref="tee-app-tracks"
        class="fr-grid-row fr-grid-row-gutters fr-justify-center"
      >
        <div
          class="fr-tee-add-padding fr-mt-10v fr-col-3 fr-col-md-4 fr-col-lg-3 fr-col-xl-2 fr-col-sm-hide"
          style="height: 100%"
        >
          <TrackSidebar />
        </div>

        <div
          id="tee-app-tracks"
          class="fr-grid-row--center fr-col fr-col-sm-12 fr-col-md-8 fr-col-lg-9 fr-col-xl-8"
        >
          <Suspense>
            <ProgramList />
            <template #fallback>
              <span>Chargement...</span>
            </template>
          </Suspense>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import ProgramList from '@/components/program/list/ProgramList.vue'
import TrackSidebar from '@/components/track/TrackSidebar.vue'
import { RouteName } from '@/types/routeType'
</script>
