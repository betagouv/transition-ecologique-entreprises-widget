<template>
  <div
    class="fr-tile fr-tile--no-border fr-tile--horizontal fr-tile--vertical@md fr-enlarge-link fr-mx-4v fr-mx-md-0 fr-px-0v fr-py-4v fr-pt-md-10v fr-pb-md-0v"
  >
    <!-- TITLE -->
    <div class="fr-tile__body fr-pb-md-0v fr-pt-0">
      <span class="fr-tile__title fr-pb-0v fr-mb-0 fr-text-lead">
        {{ title }}
      </span>
      <p class="fr-tile__desc fr-pb-2v fr-pt-md-4v">
        <span v-if="description">
          {{ description }}
        </span>
        <slot name="description"></slot>
      </p>
    </div>

    <!-- ILLUSTRATION -->
    <div
      v-if="imagePath"
      class="fr-tile__header"
    >
      <div class="fr-tile__pictogram">
        <img
          class="fr-responsive-img fr-p-0 fr-md-p-5v"
          :src="imagePath"
          :alt="`image / ${title}`"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// CONSOLE LOG TEMPLATE
// console.log(`TeeTile > FUNCTION_NAME > MSG_OR_VALUE :`)

defineProps<{
  title: string
  imagePath?: string
  description?: string
  debug?: boolean
}>()
</script>
