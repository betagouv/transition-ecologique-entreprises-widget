<template>
  <!-- DEBUGGING -->
  <div
    v-if="debug"
    class="vue-debug" 
    >
    <h5>DEBUG - TeeTopbar</h5>
    <div class="fr-grid-row fr-grid-row--gutters fr-mb-3v">
      <div class="fr-col-12">
        <h6 class="fr-mb-1v"> usedTracks :</h6>
        <pre><code>{{ usedTracks }} </code></pre>
      </div>
    </div>
  </div>

  <!-- LIST OF USED TRACKS + MODIFY CHOICE -->
  <!-- fr-ri-check-fill -->
  <div class="fr-grid-row">
    <div
      v-for="usedTrack in usedTracks"
      :key="usedTrack.id"
      @click="backToTrack(usedTrack.id)">
      <!-- <code>
        {{ usedTrack.completed }}
      </code> -->
      <p 
        :class="`fr-tag fr-tag--sm ${usedTrack.completed ?  'fr-tag-clickable' : 'fr-tag-selected'} fr-mr-1v fr-mb-1v`">
        {{ tracks.getTrackTitle(usedTrack.id, choices.lang) }}
      </p>
      <!-- <div
        v-show="usedTrack.step > 1"
        class="fr-mb-1v">
        <DsfrButton
          :label="tracks.getTrackTitle(usedTrack.id, choices.lang)"
          :disabled="!usedTrack.completed"
          tertiary
          no-outline
          @click="backToTrack(usedTrack.id)"/>
        <template
          v-if="usedTrack.completed && usedTrack.selected.length">
          <p
            v-for="(vt, idx) in usedTrack.selected"
            :key="`${usedTrack.id}-${idx}`"
            class="fr-pl-10v fr-mb-2v">
            <span class="fr-icon-check-line fr-icon--sm" aria-hidden="true"></span>
            {{ vt.title[choices.lang] }}
          </p>
        </template>
      </div> -->
    </div>
  </div>
</template>

<script setup lang="ts">

// import { computed } from 'vue'

import { tracksStore } from '../stores/tracks'
import { choicesStore } from '../stores/choices'

// @ts-ignore
import type { UsedTrack } from '@/types/index'

interface Props {
  usedTracks: UsedTrack[],
  debug?: boolean,
}
const props = defineProps<Props>()

const tracks = tracksStore()
const choices = choicesStore()

// const onlyCompletedTracks = computed(() => {
//   const completedTracks = tracks.usedTracks.filter(usedTrack => usedTrack.completed)
//   return completedTracks
// })

const backToTrack = async (trackId: string) => {
  // console.log()
  // console.log('TeeTopbar > backToTrack > trackId :', trackId)
  await tracks.setUsedTracksAsNotCompleted(trackId)
  tracks.removeFurtherUsedTracks(trackId)
}
</script>
