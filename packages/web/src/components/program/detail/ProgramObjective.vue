<template>
  <div class="fr-mb-0v fr-mb-md-12v fr-mr-4v fr-mr-md-0">
    <h3>
      {{ getProgramObjectiveTitle() }}
    </h3>
    <div class="fr-tee-description-list">
      <p
        v-for="(paragraph, idx) in program.objectifs"
        :key="`description-paragraph-${idx}`"
        class="fr-mb-3v"
      >
        <span class="fr-tee-description-paragraph-marker"> {{ idx + 1 }} | </span>
        <span class="fr-tee-description-paragraph-content">
          {{ paragraph }}
        </span>
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
// CONSOLE LOG TEMPLATE
// console.log(`ProgramObjective > FUNCTION_NAME > MSG_OR_VALUE :`)

import Translation from '@/utils/translation'
import type { ProgramData } from '@/types'
import { ProgramAidType } from '@tee/common/src/program/types'

interface Props {
  program: ProgramData
}

const props = defineProps<Props>()

const getProgramObjectiveTitle = () => {
  switch (props.program["nature de l'aide"]) {
    case ProgramAidType.acc:
    case ProgramAidType.train:
    case ProgramAidType.loan:
    case ProgramAidType.tax:
      return Translation.t('program.programObjective.title.inProgram')
    case ProgramAidType.fund:
      return Translation.t('program.programObjective.title.applicationSteps')
  }
}
</script>
