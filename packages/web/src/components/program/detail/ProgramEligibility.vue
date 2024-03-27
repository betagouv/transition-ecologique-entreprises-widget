<template>
  <div class="fr-grid-row fr-grid-row--gutters">
    <div
      v-for="partIdx in 2"
      :key="`part-${partIdx}`"
      class="fr-col-6 fr-col-xs-12"
    >
      <div
        v-for="(field, idx) in getFieldsForColumn(partIdx)"
        :key="`elegibility-field-part1-${idx}`"
        class="fr-mb-4v fr-tee-eligigility"
      >
        <p class="fr-tee-eligigility-title fr-mb-1v">
          <span class="fr-mr-1v">{{ eligilityEmojis[field] }}</span>
          {{ field.toString()[0].toUpperCase() + field.toString().slice(1) }}
        </p>
        <ul class="fr-tee-eligigility-list fr-mt-1v">
          <li
            v-for="(value, i) in programEligibility[field]"
            :key="`elegibility-field-${idx}-value-${i}`"
          >
            {{ value }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// CONSOLE LOG TEMPLATE
// console.log(`ProgramEligibility > FUNCTION_NAME > MSG_OR_VALUE :`)

import { computed } from 'vue'
import type { ProgramData } from '@/types'

type EligibilityCategory = keyof ProgramData["conditions d'éligibilité"]

type Emojis = Record<EligibilityCategory, string>

const eligilityEmojis: Emojis = {
  "taille de l'entreprise": '👫',
  'secteur géographique': '📍',
  "nombre d'années d'activité": '🗓',
  "secteur d'activité": '🏢',
  "autres critères d'éligibilité": '💡'
}

const order: EligibilityCategory[] = [
  "taille de l'entreprise",
  'secteur géographique',
  "nombre d'années d'activité",
  "secteur d'activité",
  "autres critères d'éligibilité"
]

const splitInTwo = (fields: EligibilityCategory[]): [EligibilityCategory[], EligibilityCategory[]] => {
  const mid: number = Math.ceil(fields.length / 2)
  return [fields.slice(0, mid), fields.slice(mid)]
}

const getFieldsForColumn = (columnNumber: number): EligibilityCategory[] => {
  const columns = splitInTwo(order.filter((field) => !!programEligibility.value[field]))
  return columns[columnNumber - 1]
}

interface Props {
  program: ProgramData
}

const props = defineProps<Props>()

const programEligibility = computed(() => {
  return props.program["conditions d'éligibilité"]
})
</script>
