<template>
  <DsfrCard
    v-if="Theme.isPublicodeObjective(objective) || !isResultPage"
    horizontal
    title="Thématique"
    :description="Theme.getTitleByValue(objective as PublicodeObjective)"
    :img-src="Theme.getImageByValue(objective as PublicodeObjective)"
    :class="classes"
    size="sm"
    no-arrow
  />
</template>

<script setup lang="ts">
import Theme from '@/utils/theme'
import { DsfrCard } from '@gouvminint/vue-dsfr'
import { PublicodeObjective } from '@/types'
import { useNavigationStore } from '@/stores/navigation'
import { RouteName } from '@/types/routeType'

interface Props {
  objective: PublicodeObjective | ''
  radiusCorner?: 'tl' | 'tr' | 'bl' | 'br' | 't' | 'r' | 'b' | 'l' | 'a'
  radiusSize?: '0' | '0-5v' | '1v' | '2v' | '2-5v'
}
const props = defineProps<Props>()

const navigationStore = useNavigationStore()
const isResultPage = navigationStore.isByRouteName(RouteName.QuestionnaireResult)

function getRadiusClass() {
  const { radiusCorner, radiusSize } = props
  if (!radiusCorner) {
    return null
  }
  if (radiusSize) {
    return `fr-radius-${radiusCorner}--${radiusSize}`
  }

  return `fr-radius-${radiusCorner}`
}

const classes = computed(() => {
  if (!Theme.isPublicodeObjective(props.objective)) {
    return []
  }

  return [
    'fr-card-banner',
    'fr-card--' + Theme.getColorByValue(props.objective),
    'fr-card--horizontal-tier',
    'fr-card--no-border',
    getRadiusClass()
  ]
})
</script>
