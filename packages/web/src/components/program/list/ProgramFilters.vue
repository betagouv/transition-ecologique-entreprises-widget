<template>
  <div class="fr-grid-row fr-grid-row--gutters fr-mb-4v">
    <div class="fr-col-12 fr-col-sm-6">
      <DsfrSelect
        v-model="programFilters.programAidTypeSelected"
        :options="programAidTypeOptions"
      />
    </div>
    <div class="fr-col-12 fr-col-sm-6">
      <DsfrSelect
        v-model="programFilters.objectifTypeSelected"
        :options="objectifTypeOptions"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useFilterStore } from '@/stores/filter'
import { PublicodeObjective, ProgramAidType, type programFiltersType } from '@/types'
import { DsfrSelect } from '@gouvminint/vue-dsfr'
import type { DsfrSelectProps } from '@gouvminint/vue-dsfr/types/components/DsfrSelect/DsfrSelect.types'

const programFilters: programFiltersType = useFilterStore().programFilters

const programAidTypeOptions: DsfrSelectProps['options'] = [
  {
    text: "Filtrer par nature de l'aide",
    value: ''
  },
  {
    text: 'Accompagnement',
    value: ProgramAidType.acc
  },
  {
    text: 'Financement',
    value: ProgramAidType.fund
  },
  {
    text: 'Prêt',
    value: ProgramAidType.loan
  },
  {
    text: 'Avantage fiscal',
    value: ProgramAidType.tax
  },
  {
    text: 'Formation',
    value: ProgramAidType.train
  }
]

const objectifTypeOptions: DsfrSelectProps['options'] = [
  {
    text: 'Filtrer par objectif',
    value: ''
  },
  {
    text: '🌱 Stratégie environnementale',
    value: PublicodeObjective.EnvironmentalImpact
  },
  {
    text: '⚡️ Énergie',
    value: PublicodeObjective.EnergyPerformance
  },
  {
    text: '💧 Eau',
    value: PublicodeObjective.WaterConsumption
  },
  {
    text: '🏢 Bâtiment',
    value: PublicodeObjective.BuildingRenovation
  },
  {
    text: '🚲 Mobilité',
    value: PublicodeObjective.SustainableMobility
  },
  {
    text: '🗑 Déchets',
    value: PublicodeObjective.WasteManagement
  },
  {
    text: '🏭 Production',
    value: PublicodeObjective.EcoDesign
  },
  {
    text: '🧑‍🎓 RH',
    value: PublicodeObjective.TrainOrRecruit
  }
]
</script>
