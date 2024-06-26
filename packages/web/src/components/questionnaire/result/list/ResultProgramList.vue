<template>
  <!-- PROGRAMS AS LIST OF CARDS -->
  <div class="fr-container--fluid fr-container--fluid--no-overflow fr-mt-2v">
    <div class="fr-grid-row fr-grid-row--center">
      <ResultListNoResults
        :has-error="hasError"
        :has-spinner="hasSpinner"
        :count-items="countPrograms"
      />
    </div>
    <div class="fr-grid-row fr-grid-row--center fr-mt-1w">
      <div class="fr-container fr-m-0 fr-p-0 fr-pl-md-2v">
        <div
          v-if="(!hasObjectiveCard || hasObjectiveSelected) && !hasSpinner"
          class="fr-col-12 fr-col-md-10 fr-col-offset-md-2 fr-pl-3v fr-mt-3w"
        >
          <ProgramFilterByTheme v-if="havePrograms && countPrograms > 1" />
        </div>
      </div>
    </div>
    <div
      v-if="hasObjectiveCard && !hasSpinner"
      class="fr-grid-row fr-grid-row--center"
    >
      <div class="fr-container fr-m-0 fr-p-0 fr-px-md-2v fr-mt-3v">
        <div class="fr-col-12 fr-col-md-10 fr-col-offset-md-2">
          <TeeObjectiveCard
            :objective="objective as PublicodeObjective"
            radius-corner="tr"
            radius-size="2-5v"
          />
        </div>
      </div>
    </div>
    <div class="fr-grid-row fr-grid-row--center">
      <div class="fr-container fr-m-0 fr-p-0 fr-pl-md-2v">
        <div class="fr-grid-row fr-grid-row--center">
          <div
            v-if="!hasSpinner"
            class="fr-col-2 fr-col-hidden fr-col-unhidden-md"
          >
            <div class="fr-sidemenu fr-pr-0 fr-mx-3v">
              <div class="fr-text--bold fr-text-left fr-mb-3v fr-mt-6w">Filtres</div>
              <ProgramFiltersAccordion />
            </div>
          </div>
          <div class="fr-col-12 fr-col-md-10 fr-pr-md-2v">
            <ProgramList :filtered-programs="filteredPrograms" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { type ProgramData, PublicodeObjective } from '@/types'
import { computed } from 'vue'
import ProgramFilterByTheme from '@/components/program/list/filters/ProgramFilterByTheme.vue'
import ProgramFiltersAccordion from '@/components/program/list/filters/ProgramFiltersAccordion.vue'
import UsedTrack from '@/utils/track/usedTrack'
import Theme from '@/utils/theme'
import { useProgramStore } from '@/stores/program'

interface ProgramListProps {
  filteredPrograms?: ProgramData[]
}

const props = defineProps<ProgramListProps>()

const programStore = useProgramStore()

const hasError = ref<boolean>(false)

const havePrograms = computed(() => {
  return countPrograms.value > 0
})

const countPrograms = computed(() => {
  return props.filteredPrograms?.length || 0
})

const hasSpinner = computed(() => {
  return props.filteredPrograms === undefined && !hasError.value
})

const hasObjectiveCard = computed(() => {
  return programStore.hasObjectiveTypeSelected() || (UsedTrack.isSpecificGoal() && UsedTrack.hasPriorityObjective())
})

const hasObjectiveSelected = computed(() => {
  return programStore.hasObjectiveTypeSelected()
})

const objective = computed(() => {
  if (programStore.hasObjectiveTypeSelected()) {
    return programStore.programFilters.objectiveTypeSelected
  }

  if (UsedTrack.isSpecificGoal() && UsedTrack.hasPriorityObjective()) {
    return Theme.getPublicodeObjectiveByObjective(UsedTrack.getPriorityObjective())
  }

  return ''
})
</script>
