<template>
  <TeeEligibilityCriteriaBar
    v-if="!isCatalogDetail"
    :bg-color="Color.greenLightnessed"
    :bg-bar-color="Color.greenLighted"
    :previous-route="routeToPrograms"
    message="Cette aide correspond à vos critères d’éligibilité"
    message-icon="fr-icon-checkbox-circle-fill"
  />
  <div class="fr-container-fluid fr-px-0 fr-px-md-20v fr-mt-3v">
    <div class="fr-grid-row fr-grid-row-gutters">
      <div
        v-if="isCatalogDetail"
        class="fr-col"
      >
        <!-- BACK TO RESULTS BTN -->
        <button
          class="fr-btn fr-btn--lg fr-btn--tertiary-no-outline fr-mb-3v fr-pl-2v"
          @click="goToPrograms"
        >
          <v-icon
            name="ri-arrow-left-line"
            aria-hidden="true"
            class="fr-mr-2v"
          ></v-icon>
          {{ Translation.t('results.backToResults') }}
        </button>
      </div>
      <div
        v-if="!program"
        class="fr-col-12"
      >
        <TeeError
          :mailto="Contact.email"
          :email="Contact.email"
        />
      </div>
    </div>
  </div>

  <!-- ALERT - PROGRAM NOT AVAILABLE ANYMORE -->
  <div
    v-if="!programIsAvailable"
    class="fr-notice fr-tee-program-notice-alert fr-mb-0"
  >
    <div class="fr-container">
      <div class="fr-notice__body fr-text-center">
        <p class="fr-notice__title">
          <span
            class="fr-icon-information-line"
            aria-hidden="true"
          ></span>
          {{ Translation.t('program.programNotAvailable') }}
        </p>
        <p class="fr-notice__subtitle">{{ Translation.t('program.programEndValidity') }} : {{ program?.[`fin de validité`] }}</p>
      </div>
    </div>
  </div>

  <!-- PROGRAM INFOS -->
  <div
    v-if="program"
    class="fr-container-fluid fr-px-0 fr-px-md-20v fr-mt-3v"
  >
    <div class="fr-grid-row fr-grid-row-gutters">
      <div class="fr-col">
        <!-- PROGRAM DETAILS -->
        <div class="fr-grid-row fr-grid-row--gutters fr-mb-12v">
          <!-- IMAGE -->
          <div class="fr-col-md-4 fr-col-lg-3 fr-col-xl-3 fr-col-sm-12 fr-text-right fr-tee-program-detail-img">
            <img
              class="fr-responsive-img"
              :src="`${publicPath}${program?.illustration}`"
              :alt="`image / ${program?.titre}`"
            />

            <!-- PROGRAM TYPE -->
            <ul class="fr-badges-group fr-tee-program-detail-img-badge">
              <p class="fr-badge tee-program-badge-image">
                {{ program?.["nature de l'aide"] }}
              </p>
            </ul>
          </div>

          <!-- TITLE & RESUME -->
          <div class="fr-col fr-pl-10v">
            <!-- PROGRAM TITLE -->
            <p class="tee-program-title fr-mb-5v">
              {{ program?.titre }}
            </p>

            <!-- PROGRAM RESUME / TEXT-->
            <h2
              :style="`color: ${blockColor}`"
              v-html="program?.promesse"
            ></h2>
            <p
              class="fr-mb-12v"
              style="color: #000091"
              v-html="program?.description"
            ></p>
            <ProgramObjective
              v-if="program"
              :program="program"
            ></ProgramObjective>
            <DsfrButton
              v-if="!isProgramAutonomous"
              size="lg"
              icon="fr-icon-mail-line"
              class="fr-ml-md-3v"
              :on-click="scrollToProgramForm"
            >
              {{ Translation.t('program.CTAButton') }}
            </DsfrButton>
          </div>
        </div>

        <!-- PROGRAM INFOS : PROVIDERS / TYPE / START / END -->
        <div class="fr-grid-row fr-grid-row--gutters fr-mb-8v">
          <!-- PROGRAM COST | LOAN | AID -->
          <div
            v-if="programCost"
            :class="columnTiles"
          >
            <ProgramTile
              class="tee-no-hover"
              :title="Translation.t('programCosts.cost')"
              :image-path="`${publicPath}images/TEE-cout-02.svg`"
              :description="`${programCost}`"
            />
          </div>

          <div
            v-if="programAidAmount"
            :class="columnTiles"
          >
            <ProgramTile
              class="tee-no-hover"
              :title="Translation.t('programCosts.aid')"
              :image-path="`${publicPath}images/TEE-cout-02.svg`"
              :description="`${programAidAmount}`"
            />
          </div>

          <div
            v-if="programTaxAdvantage"
            :class="columnTiles"
          >
            <ProgramTile
              class="tee-no-hover"
              :title="Translation.t('programCosts.taxAdvantage')"
              :image-path="`${publicPath}images/TEE-cout-02.svg`"
              :description="`${programTaxAdvantage}`"
            />
          </div>

          <div
            v-if="programLoan"
            :class="columnTiles"
          >
            <ProgramTile
              class="tee-no-hover"
              :title="Translation.t('programCosts.loan')"
              :image-path="`${publicPath}images/TEE-cout-02.svg`"
              :description="`${programLoan}`"
            />
          </div>

          <!-- PROGRAM DURATION -->
          <div
            v-if="programDuration"
            :class="columnTiles"
          >
            <ProgramTile
              class="tee-no-hover"
              :title="Translation.t('program.programDuration')"
              :image-path="`${publicPath}images/TEE-duree.svg`"
              :description="programDuration"
            />
          </div>
          <div
            v-if="programLoanDuration"
            :class="columnTiles"
          >
            <ProgramTile
              class="tee-no-hover"
              :title="Translation.t('program.programLoanDuration')"
              :image-path="`${publicPath}images/TEE-duree.svg`"
              :description="programLoanDuration"
            />
          </div>

          <!-- PROGRAM PROVIDERS -->
          <div :class="columnTiles">
            <ProgramTile
              v-if="programProvider"
              class="tee-no-hover"
              :title="Translation.t('program.programProviders')"
              :image-path="`${publicPath}images/TEE-porteur.svg`"
              :description="Translation.to(programProvider)"
            >
            </ProgramTile>
          </div>

          <!-- PROGRAM END VALIDITY -->
          <div :class="columnTiles">
            <ProgramTile
              class="tee-no-hover"
              :title="Translation.t('program.programEndValidity')"
              :image-path="`${publicPath}images/TEE-date-fin.svg`"
              :description="
                programEndValidity
                  ? Translation.t(Translation.t('program.programAvailableUntil'), { date: programEndValidity })
                  : Translation.t('program.programAvailable')
              "
            />
          </div>
        </div>

        <!-- ELIGIBILITY -->
        <ProgramAccordion
          v-if="program && program['conditions d\'éligibilité']"
          :accordion-id="`${program.id}-eligibility`"
          :title="Translation.t('program.programAmIEligible')"
        >
          <ProgramEligibility :program="program"></ProgramEligibility>
        </ProgramAccordion>

        <!-- LONG DESCRIPTION -->
        <ProgramAccordion
          v-if="program && program['description longue']"
          :accordion-id="`${program.id}-long-description`"
          :title="Translation.t('program.programKnowMore')"
        >
          <ProgramLongDescription :program="program"></ProgramLongDescription>
        </ProgramAccordion>
        <hr class="fr-mb-9v fr-pb-1v" />
      </div>
    </div>

    <!-- PROGRAM FORM -->
    <div
      ref="TeeProgramFormContainer"
      class="fr-tee-form-block"
    >
      <ProgramForm
        v-if="program"
        :program="program"
        :form-container-ref="TeeProgramFormContainer"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
// CONSOLE LOG TEMPLATE
// console.log(`TeeProgramDetail > FUNCTION_NAME > MSG_OR_VALUE :`)

import ProgramAccordion from '@/components/program/detail/ProgramAccordion.vue'
import ProgramEligibility from '@/components/program/detail/ProgramEligibility.vue'
import ProgramForm from '@/components/program/detail/ProgramForm.vue'
import ProgramLongDescription from '@/components/program/detail/ProgramLongDescription.vue'
import ProgramObjective from '@/components/program/detail/ProgramObjective.vue'
import ProgramTile from '@/components/program/detail/ProgramTile.vue'
import Config from '@/config'
import { useNavigationStore } from '@/stores/navigation'
import { useProgramStore } from '@/stores/program'
import { Color, type ProgramData as ProgramType } from '@/types'
import { RouteName } from '@/types/routeType'
import Contact from '@/utils/contact'
import Matomo from '@/utils/matomo'
import Program from '@/utils/program/program'
import Translation from '@/utils/translation'
import { computed, onBeforeMount, ref } from 'vue'
import { useRoute } from 'vue-router'

const programsStore = useProgramStore()
const navigationStore = useNavigationStore()
const route = useRoute()
const router = useRouter()

const program = ref<ProgramType>()
const TeeProgramFormContainer = ref<HTMLElement | null | undefined>(null)

const blockColor = '#000091'
const publicPath = Config.publicPath
const isCatalogDetail = navigationStore.isByRouteName(RouteName.CatalogDetail)

interface Props {
  programId: string
}
const props = defineProps<Props>()

// computed
const programCost = computed(() => program.value?.[`coût de l'accompagnement`])
const programAidAmount = computed(() => program.value?.[`montant du financement`])
const programTaxAdvantage = computed(() => program.value?.[`montant de l'avantage fiscal`])
const programLoan = computed(() => program.value?.[`montant du prêt`])
const programDuration = computed(() => program.value?.[`durée de l'accompagnement`])
const programLoanDuration = computed(() => program.value?.[`durée du prêt`])
const programProvider = computed(() => program.value?.['opérateur de contact'])
const programEndValidity = computed(() => program.value?.[`fin de validité`])
const programPageTitle = computed(() => `Transition écologique des TPE & PME - ${program.value?.[`titre`]}`)
const programPageMeta = computed(() => program.value?.[`description`] || ' ')

const columnTiles = computed(() => {
  const infoBlocks = [
    !!programCost.value,
    !!programAidAmount.value,
    !!programTaxAdvantage.value,
    !!programLoan.value,
    !!programDuration.value,
    !!programLoanDuration.value,
    true, // shortcut for programValidity block (always exists)
    true // shortcut for programProvider block (always exists)
  ].filter(Boolean)
  const colsSize = Math.round(12 / infoBlocks.length)
  return `fr-col fr-col-xs-12 fr-col-sm-12 fr-col-md-${colsSize} fr-tee-detail-info-tile`
})
const isProgramAutonomous = computed(() => {
  if (program.value?.[`activable en autonomie`] == 'oui') {
    return true
  }
  return false
})

const routeToPrograms = {
  name: isCatalogDetail ? RouteName.Catalog : RouteName.QuestionnaireResult,
  hash: '#' + props.programId,
  query: isCatalogDetail ? undefined : navigationStore.query
}

const goToPrograms = async () => {
  await router.push(routeToPrograms)
}

onBeforeMount(() => {
  program.value = programsStore.currentProgram

  // analytics / send event
  Matomo.sendEvent('result_detail', route.name === RouteName.CatalogDetail ? 'show_detail_catalog' : 'show_detail', props.programId)
})

useHead({
  title: programPageTitle,
  meta: [
    {
      name: 'description',
      content: programPageMeta
    }
  ]
})

const programIsAvailable = computed(() => {
  return Program.isAvailable(programsStore.currentProgram)
})

const scrollToProgramForm = () => {
  if (TeeProgramFormContainer.value) {
    TeeProgramFormContainer.value.scrollIntoView({ behavior: 'smooth' })
  }
}
</script>
