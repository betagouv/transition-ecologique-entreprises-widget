<template>
  <div
    v-if="track?.callout"
    :class="`fr-col-12 ${track.callout.bigTitle ? 'fr-mx-0' : ''} fr-px-0v fr-px-md-4v fr-mb-4v`"
  >
    <div
      :class="`${track.callout.bigTitle ? 'fr-px-2v' : 'fr-py-4v fr-px-4v'}`"
      :style="`background-color: ${track.callout.bgColor || 'transparent'}`"
    >
      <div class="tee-track-callout fr-grid-row fr-grid-row--gutters">
        <!-- CALLOUT IMAGE LEFT -->
        <div
          v-if="track.callout.imageLeft"
          class="fr-col-4 fr-col-sm-4 fr-col-md-5 tee-track-callout-img fr-pl-0 fr-p-2v fr-pr-0"
          style="align-self: center"
        >
          <img
            class="fr-responsive-img"
            :src="`${publicPath}${track.callout.imageLeft}`"
            :alt="`image / callout`"
          />
        </div>
        <!-- CALLOUT TEXT -->
        <div :class="`${track.callout.bigTitle ? 'fr-col-8 fr-col-sm-8 fr-col-md-7' : 'fr-col fr-col-md-7 tee-track-callout-texts'}`">
          <!-- CALLOUT HEADER -->
          <h2
            v-if="track.callout.header"
            :style="`${track.callout.headerStyle || 'color: var(--text-default-info);'}`"
            class="tee-track-callout-header fr-sm-hide"
          >
            {{ track.callout.header[Translation.lang] }}
          </h2>
          <!-- CALLOUT TITLE / BIG TITLE -->
          <h1
            v-if="track.callout.bigTitle"
            class="tee-track-callout-big-title tee-mb-none"
            :style="`${track.callout.titleStyle || ''}`"
          >
            {{ track.callout.title[Translation.lang] }}
          </h1>
          <h3
            v-else
            class="fr-callout__title tee-track-callout-title"
            :style="`${track.callout.titleStyle || ''}`"
          >
            {{ track.callout.title[Translation.lang] }}
          </h3>
          <!-- CALLOUT DESCRIPTION -->
          <p
            v-if="track.callout.description"
            class="fr-callout__text tee-track-callout-description fr-mb-2v"
            :style="`${track.callout.descriptionStyle || ''}`"
          >
            {{ track.callout.description[Translation.lang] }}
          </p>
          <!-- CALLOUT HINT -->
          <p
            v-if="track.callout.hint"
            class="fr-mt-2v fr-mb-1v tee-track-callout-hint"
            style="color: var(--text-active-blue-france)"
          >
            <i>
              <span
                v-if="track.callout.hintIcon"
                :class="track.callout.hintIcon"
                aria-hidden="true"
              >
              </span>
              {{ track.callout.hint[Translation.lang] }}
            </i>
          </p>
        </div>
        <!-- CALLOUT IMAGE RIGHT -->
        <div
          v-if="track.callout.imageRight"
          class="fr-col-3"
          style="align-self: center"
        >
          <img
            class="fr-responsive-img"
            :src="`${publicPath}${track.callout.imageRight}`"
            :alt="`image / callout`"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Config from '@/config'
import type { Track } from '@/types'
import Translation from '@/utils/translation'

interface Props {
  track: Track
}
defineProps<Props>()

const publicPath = Config.publicPath
</script>
