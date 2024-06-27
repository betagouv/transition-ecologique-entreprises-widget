<template>
  <TeeDsfrSearchBar
    v-model.trim="queryValue"
    :option="props.option"
    :is-loading="isLoading"
    :error-message="errorMessage"
    :has-hint="hasHint"
    @on-click="processInput"
    @on-clear="resetSelection"
  />

  <!-- RESPONSES -->
  <div
    v-show="requestResponses.establishments.length > 1"
    class="fr-mt-n2w"
  >
    <div v-if="requestResponses.resultCount < 4">
      <span class="result-number">{{ requestResponses.resultCount }} résultats trouvés</span>
      <h6 class="fr-mt-3v">Sélectionnez votre entreprise :</h6>
    </div>
    <div v-else>
      <span class="result-number">3 résultats affichés sur {{ requestResponses.resultCount }} trouvés</span>

      <h6 class="fr-mt-3v">Sélectionnez votre entreprise ou précisez votre recherche</h6>
    </div>
  </div>
  <div
    v-if="requestResponses.establishments.length"
    class="fr-mt-n2w"
  >
    <div
      v-for="(response, i) in requestResponses.establishments"
      :key="`resp-input-${i}`"
      class="fr-card fr-card-result fr-card--no-arrow fr-mb-2v fr-card--shadow custom-border"
      :class="{ 'is-selected': isSelected(i) }"
      @click="selectItem(i)"
    >
      <div class="fr-card__body">
        <div class="fr-card__content fr-py-2v fr-px-4v">
          <div
            class="fr-card__title"
            :class="{ 'is-title-selected': isSelected(i) }"
          >
            <div class="fr-hidden fr-unhidden-md">
              {{ response.denomination || 'Entreprise individuelle' }}
              <span class="thinner-text"> - SIRET {{ response.siret }} </span>
            </div>
            <div class="fr-hidden-md">
              <div>{{ response.denomination || 'Entreprise individuelle' }}</div>
              <div class="thinner-text">SIRET {{ response.siret }}</div>
            </div>
          </div>
          <div class="fr-card__desc tee-resp-info-block">
            <div>
              <span
                class="fr-icon-briefcase-line fr-mr-8v"
                aria-hidden="true"
              >
              </span>
              <span>Secteur d'activité : {{ response.secteur || 'Non Renseigné' }}</span>
            </div>
            <div>
              <span
                class="fr-icon-map-pin-2-line fr-mr-8v"
                aria-hidden="true"
              >
              </span>
              <span>{{ response.codePostal }} {{ response.ville }}</span>
            </div>
            <div>
              <span
                class="fr-icon-time-line fr-mr-8v"
                aria-hidden="true"
              >
              </span>
              <span>Création le {{ new Date(response.creationDate).toLocaleDateString('fr') }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div
    v-if="requestResponses.resultCount > 3"
    class="fr-mt-4v"
  >
    <span>
      Besoin d'aide pour retrouver votre SIRET ?
      <a
        href="https://annuaire-entreprises.data.gouv.fr/"
        target="_blank"
      >
        Cliquez ici
      </a>
    </span>
  </div>
  <!-- WILDCARD -->
  <p
    v-if="option.wildcard"
    class="fr-mt-8v fr-text--sm"
  >
    {{ Translation.t('or') }}
    <a
      class="fr-link tee-input-wildcard fr-text--sm"
      :href="Navigation.hashByRouteName(RouteName.Questionnaire)"
      @click="goToNextTrack"
    >
      {{ option.wildcard.label[Translation.lang] }}
    </a>
  </p>
</template>

<script setup lang="ts">
import { useTrackStore } from '@/stores/track'
import { type TrackOptionItem, type TrackOptionsInput } from '@/types'
import { RouteName } from '@/types/routeType'
import Matomo from '@/utils/matomo'
import Navigation from '@/utils/navigation'
import TrackSiret from '@/utils/track/TrackSiret'
import Translation from '@/utils/translation'
import SiretValidator from '@tee/common/src/establishment/validator/siretValidator'
import { ref, computed } from 'vue'
import { EstablishmentSearch } from '@/types'

// Functionnal note :
// We send data update to the parent component each time the data selection change.
// This is to stay coherent with the rest of the track and more importantly
// because the activation of the nextStep button is computed somewhere in the parents.)

interface Props {
  option: TrackOptionsInput
}
const props = defineProps<Props>()

const defaultSearchValue = {
  establishments: [],
  resultCount: -1
}

const queryValue = ref<string>()
const isLoading = ref<boolean>(false)
const requestResponses = ref<EstablishmentSearch>(defaultSearchValue)
const selection = ref<number>(-1)
const errorMessage = ref<string>()

const emit = defineEmits<{
  updateSelection: [TrackOptionItem]
  goToNextTrack: [TrackOptionsInput]
}>()

const hasHint = computed(() => {
  return Boolean(props.option.hint) && requestResponses.value.resultCount != defaultSearchValue.resultCount
})

const isSelected = (id: number) => {
  return Boolean(id === selection.value)
}

const resetSelection = () => {
  requestResponses.value = defaultSearchValue
  selection.value = -1
  emit('updateSelection', createData())
}

const selectItem = (id: number) => {
  selection.value = id
  emit('updateSelection', createData())
}

const processInput = async () => {
  isLoading.value = true
  errorMessage.value = undefined
  resetSelection()

  if (!queryValue.value || queryValue.value.length < 3) {
    errorMessage.value = Translation.t('enterprise.searchTooShort')
  } else if (SiretValidator.isValidSiretFormat(queryValue.value) && !SiretValidator.isValidSiretNumber(queryValue.value)) {
    errorMessage.value = "Le numéro SIRET n'est pas valide"
  } else {
    const searchResult = await TrackSiret.search(queryValue.value)
    if (searchResult.isErr) {
      errorMessage.value = Translation.t('enterprise.apiError')
    } else if (searchResult.value.resultCount == 0) {
      errorMessage.value = Translation.t('enterprise.noStructureFound')
    } else {
      requestResponses.value = searchResult.value
      selection.value = 0
      emit('updateSelection', createData())
    }
  }
  isLoading.value = false

  // analytics / send event
  const trackId = useTrackStore().currentId
  if (trackId) {
    Matomo.sendEvent(trackId, 'processInput')
  }
}

const goToNextTrack = () => {
  const option = { ...props.option }
  if (props.option.wildcard) {
    option.next = props.option.wildcard.next
    option.value = props.option.wildcard.value
  }
  emit('goToNextTrack', option)
}

function createData(): TrackOptionItem {
  const siretValue = selection.value >= 0 ? requestResponses.value.establishments[selection.value].siret : ''
  const hasSelection = selection.value >= 0
  return TrackSiret.createData(
    props.option,
    siretValue,
    requestResponses.value.establishments[selection.value],
    !hasSelection,
    hasSelection
  )
}
</script>

<style lang="scss" scoped>
@use '@/assets/scss/setting';

.custom-border {
  border: solid thin #c4c4c4;
}

.is-selected {
  border: solid thin setting.$blue-france;
  color: setting.$blue-france;
  background-color: #f5f5f5;
}

.is-title-selected {
  color: setting.$blue-france;
}

.thinner-text {
  font-weight: normal;
}

.result-number {
  font-style: italic;
  color: setting.$blue-france;
}
</style>
