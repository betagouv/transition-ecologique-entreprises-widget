<template>
  <div class="fr-card__body">
    <div class="fr-card__content">
      <!-- TITLE -->
      <div class="fr-card__start fr-mb-2v">
        <p class="tee-program-title">
          {{ program.titre }}
        </p>
      </div>
      <!-- CONTENT -->
      <h2 class="fr-card__title tee-program-resume fr-mb-3v">
        {{ program.promesse }}
      </h2>
      <!-- END -->
      <div class="fr-card__end">
        <p class="fr-mb-0 tee-program-info">
          <span
            class="fr-icon-money-euro-circle-line"
            aria-hidden="true"
          >
          </span>
          {{ getCostInfos() }}
        </p>
      </div>
    </div>
  </div>
  <div
    v-if="program.illustration"
    class="fr-card__header"
  >
    <div class="fr-card__img">
      <img
        class="fr-responsive-img"
        :src="`${publicPath}${program.illustration}`"
        :alt="`image / ${program.titre}`"
      />
    </div>
    <ul class="fr-badges-group">
      <p class="fr-badge tee-program-badge-image">
        {{ program["nature de l'aide"] }}
      </p>
    </ul>
  </div>
</template>

<script setup lang="ts">
import Config from '@/config'
import { ProgramAidType, type ProgramData } from '@/types'
import { consolidateAmounts } from '@/utils/helpers'
import Translation from '@/utils/translation'

const { program } = defineProps<{ program: ProgramData }>()

const publicPath = Config.publicPath

const getCostInfos = () => {
  let prefix: string = ''
  let text: string | undefined = ''

  switch (program["nature de l'aide"]) {
    case ProgramAidType.acc:
    case ProgramAidType.train:
      prefix = 'programCosts.costPrefix'
      text = program["coût de l'accompagnement"]
      break
    case ProgramAidType.fund:
      prefix = 'programCosts.aidPrefix'
      text = program['montant du financement']
      break
    case ProgramAidType.loan:
      prefix = 'programCosts.loan'
      text = program['montant du prêt']
      break
    case ProgramAidType.tax:
      prefix = 'programCosts.taxAdvantage'
      text = program["montant de l'avantage fiscal"]
      break
  }
  // Translate prefix
  prefix = Translation.t(prefix)

  text = consolidateAmounts(text)

  return `${prefix} : ${text}`
}
</script>
