<template>
  <div style="height: 99%">
    <div class="fr-card fr-enlarge-link">
      <div
        v-if="option.imageTop"
        class="fr-card__header"
      >
        <div class="fr-card__img">
          <img
            class="fr-responsive-img"
            :src="`${Config.publicPath}${option.imageTop}`"
            :alt="`image / ${option.label}`"
          />
        </div>
      </div>
      <div class="fr-card__body">
        <div class="fr-card__content">
          <p
            v-if="option.hintImage"
            class="fr-card__desc fr-mt-0 fr-mb-2v"
            style="order: 2"
          >
            <span
              v-if="option.hintImageIcon"
              :class="option.hintImageIcon"
              aria-hidden="true"
            >
            </span>
            {{ option.hintImage[Translation.lang] }}
          </p>
          <h3 class="fr-card__title">
            <!-- <a href="#"> -->
            {{ option.label?.[Translation.lang] }}
            <!-- </a> -->
          </h3>
          <div
            v-if="isActive"
            class="fr-card__start"
          >
            <p class="fr-badge fr-badge--info fr-badge--no-icon fr-mb-4v">
              {{ Translation.t('selection.selected') }}
            </p>
          </div>
        </div>
        <p
          v-if="option.hint"
          class="fr-card__desc"
        >
          <span
            v-if="option.hintIcon"
            :class="option.hintIcon"
            aria-hidden="true"
          >
          </span>
          {{ option.hint[Translation.lang] }}
        </p>
        <p
          v-if="option.resume"
          class="fr-card__desc"
        >
          {{ option.resume[Translation.lang] }}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Config from '@/config'
import { type TrackOptionsUnion } from '@/types'
import Translation from '@/utils/translation'

interface Props {
  option: TrackOptionsUnion
  isActive: boolean
}
defineProps<Props>()
</script>
