<template>
  <div class="fr-container--fluid">
    <div class="fr-grid-row">
      <div class="fr-h3 fr-col-12 fr-text-center">Contactez un conseiller</div>
      <div class="fr-col-12 fr-text-center">
        👋 Expliquez nous votre projet, nous vous mettrons en relation avec un conseiller compétent pour votre demande sur votre territoire.
      </div>
      <div class="fr-col-12">
        <!-- BACK TO FORM BTN -->
        <TeeDsfrButton
          v-show="formIsSent"
          class="fr-btn fr-btn--tertiary-no-outline inline-flex fr-mb-3v fr-link fr-tee-form-arrow-back"
          tertiary
          no-outline
          icon="ri-arrow-left-line"
          @click="formIsSent = !formIsSent"
        />
        <!-- FORM -->
        <div
          v-if="!formIsSent"
          class="fr-tee-form fr-m-auto fr-mt-4v"
        >
          <!-- FIELDS -->
          <div class="fr-grid-row fr-grid-row--gutters fr-mb-2v">
            <div class="fr-col-12 fr-col-md-12">
              <DsfrInputGroup
                :error-message="getErrorMessage(projectForm.project)"
                :valid-message="getValidMessage(projectForm.project)"
              >
                <DsfrInput
                  type="text"
                  :model-value="projectForm.project.value"
                  label-visible
                  :is-valid="projectForm.project.isValid"
                  :required="projectForm.project.required"
                  :label="projectForm.project.label"
                  :disabled="projectForm.project.disabled"
                  @update:model-value="updateProjectForm($event, 'project')"
                  @focusout="validateFormField(projectForm.project)"
                />
              </DsfrInputGroup>
            </div>
            <div class="fr-col-12 fr-col-md-6">
              <DsfrInputGroup
                :error-message="getErrorMessage(projectForm.name)"
                :valid-message="getValidMessage(projectForm.name)"
              >
                <DsfrInput
                  type="text"
                  :model-value="projectForm.name.value"
                  label-visible
                  :is-valid="projectForm.name.isValid"
                  :required="projectForm.name.required"
                  :label="projectForm.name.label"
                  @update:model-value="updateProjectForm($event, 'name')"
                  @focusout="validateFormField(projectForm.name)"
                >
                </DsfrInput>
              </DsfrInputGroup>
            </div>
            <div class="fr-col-12 fr-col-md-6">
              <DsfrInputGroup
                :error-message="getErrorMessage(projectForm.surname)"
                :valid-message="getValidMessage(projectForm.surname)"
              >
                <DsfrInput
                  type="text"
                  :model-value="projectForm.surname.value"
                  label-visible
                  :is-valid="projectForm.surname.isValid"
                  :required="projectForm.surname.required"
                  :label="projectForm.surname.label"
                  @update:model-value="updateProjectForm($event, 'surname')"
                  @focusout="validateFormField(projectForm.surname)"
                >
                </DsfrInput>
              </DsfrInputGroup>
            </div>
            <div class="fr-col-12 fr-col-md-12">
              <DsfrInputGroup
                :error-message="getErrorMessage(projectForm.email)"
                :valid-message="getValidMessage(projectForm.email)"
              >
                <DsfrInput
                  type="email"
                  :model-value="projectForm.email.value"
                  label-visible
                  :is-valid="projectForm.email.isValid"
                  :required="projectForm.email.required"
                  :label="projectForm.email.label"
                  :hint="projectForm.email.hint"
                  @update:model-value="updateProjectForm($event, 'email')"
                  @focusout="validateFormField(projectForm.email)"
                >
                </DsfrInput>
              </DsfrInputGroup>
            </div>
            <div class="fr-col-12 fr-col-md-12">
              <DsfrInputGroup
                :error-message="getErrorMessage(projectForm.tel)"
                :valid-message="getValidMessage(projectForm.tel)"
              >
                <DsfrInput
                  type="tel"
                  :model-value="projectForm.tel.value"
                  label-visible
                  :is-valid="projectForm.tel.isValid"
                  :required="projectForm.tel.required"
                  :label="projectForm.tel.label"
                  :hint="projectForm.tel.hint"
                  @update:model-value="updateProjectForm($event, 'tel')"
                  @focusout="validateFormField(projectForm.tel)"
                >
                </DsfrInput>
              </DsfrInputGroup>
            </div>
            <div class="fr-col-12 fr-col-md-12">
              <DsfrInputGroup
                :error-message="getErrorMessage(projectForm.siret)"
                :valid-message="getValidMessage(projectForm.siret)"
              >
                <DsfrInput
                  type="text"
                  :model-value="projectForm.siret.value"
                  label-visible
                  :is-valid="projectForm.siret.isValid"
                  :required="projectForm.siret.required"
                  :label="projectForm.siret.label"
                  :hint="projectForm.siret.hint"
                  @update:model-value="updateProjectForm($event, 'siret')"
                  @focusout="validateFormField(projectForm.siret)"
                >
                </DsfrInput>
              </DsfrInputGroup>
            </div>
            <div class="fr-col-12 fr-col-md-12">
              <DsfrInputGroup
                :error-message="getErrorMessage(projectForm.needs)"
                :valid-message="getValidMessage(projectForm.needs)"
              >
                <DsfrInput
                  type="textarea"
                  is-textarea
                  rows="8"
                  :model-value="projectForm.needs.value"
                  label-visible
                  :is-valid="projectForm.needs.isValid"
                  :required="projectForm.needs.required"
                  :label="projectForm.needs.label"
                  @update:model-value="updateProjectForm($event, 'needs')"
                  @focusout="validateFormField(projectForm.needs)"
                >
                </DsfrInput>
              </DsfrInputGroup>
            </div>
            <div class="fr-col-12 fr-col-md-12">
              <DsfrCheckbox
                :model-value="projectForm.cgu.value"
                name="cgu"
                :is-valid="projectForm.cgu.isValid"
                :required="projectForm.cgu.required"
                @update:model-value="updateProjectForm($event, 'cgu')"
                @focusout="validateFormField(projectForm.cgu)"
              >
                <template #label>
                  <span> {{ projectForm.cgu.label }} <code>*</code></span>
                </template>
              </DsfrCheckbox>

              <!-- CHECKBOX HINT -->
              <span class="fr-hint-text fr-mt-5v">
                Vos données à caractère personnel seront uniquement utilisées à des fins légitimes et nécessaires par l'équipe de Transition
                Écologique des Entreprises dans le respect du RGPD, c'est-à-dire pour vous recontacter par email ou par téléphone afin de
                vous aider à vous orienter et à vous conseiller dans votre recherche d'aides à la transition écologique de votre entreprise.
                Voir également nos
                <a
                  href="https://mission-transition-ecologique.beta.gouv.fr/donnees-personnelles"
                  target="_blank"
                >
                  Conditions Générales d'Utilisation </a
                >.
              </span>
            </div>
          </div>

          <!-- FORM HELPER -->
          <h6
            class="fr-mb-0"
            style="font-size: 0.7em"
          >
            <code>*</code>
            &nbsp;
            {{ Translation.t('form.mandatory') }}
          </h6>

          <!-- SEND / NEXT BUTTON -->
          <div class="fr-grid-row fr-grid-row--gutters fr-grid-row--center fr-mt-5v">
            <div
              class="fr-col-12"
              style="display: grid; justify-content: right"
            >
              <TeeDsfrButton
                :label="Translation.t('send')"
                :disabled="!isFormFilled"
                icon="ri-arrow-right-line"
                icon-right
                :loading="isLoading"
                @click="saveProjectForm()"
              />
            </div>
          </div>
        </div>

        <!-- FORM CALLBACK -->
        <div
          v-if="formIsSent"
          class="fr-mt-5v fr-tee-form"
        >
          <!-- MESSAGE IF ERROR-->
          <TeeError
            v-if="!hasValidResponse"
            :mailto="getMailTo()"
            :email="Contact.email"
          >
            <h3 class="tee-form-response tee-form-response-error">
              {{ Translation.t(`form.notSent`) }}
            </h3>
          </TeeError>

          <!-- MESSAGE IF 200 -->
          <div
            v-if="hasValidResponse"
            class="fr-text-center"
          >
            <p class="tee-form-response tee-form-response-blue">
              <v-icon
                name="ri-checkbox-circle-fill"
                aria-hidden="true"
                scale="3"
              ></v-icon>
            </p>
            <h3 class="tee-form-response tee-form-response-blue">
              {{ Translation.t(`form.sent`) }}
            </h3>
            <h6 class="fr-mt-15v fr-mb-3v">
              {{ Translation.t('form.nowWhat') }}
            </h6>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { scrollToElementCenter } from '@/utils/helpers'
import TrackStructure from '@/utils/track/trackStructure'
import { computed, ref } from 'vue'
import { InputFieldUnionType, isValidatedStringFieldInputType, type ReqResp, TrackId } from '@/types'
import Translation from '@/utils/translation'
import TeeDsfrButton from '@/components/element/button/TeeDsfrButton.vue'
import { DsfrInput, DsfrInputGroup, DsfrCheckbox } from '@gouvminint/vue-dsfr'
import Matomo from '@/utils/matomo'
import { RouteName } from '@/types/routeType'
import { useRoute } from 'vue-router'
import ProjectApi from '@/service/api/projectApi'
import type { ProjectFormType } from '@/types/formsType'
import Contact from '@/utils/contact'
import PhoneValidator from '@tee/common/src/establishment/validator/phoneValidator'
import EmailValidator from '@tee/common/src/establishment/validator/emailValidator'
import SiretValidator from '@tee/common/src/establishment/validator/siretValidator'
import { Project } from '@tee/common/src/project/types'

const route = useRoute()

interface Props {
  project: Project
  formContainerRef: HTMLElement | null | undefined
}

const props = defineProps<Props>()
const projectForm = ref<ProjectFormType>({
  project: { required: true, value: props.project.title, label: 'Quel est votre projet?', isValid: true },
  name: { required: true, value: undefined, label: 'Prénom', isValid: undefined },
  surname: { required: true, value: undefined, label: 'Nom', isValid: undefined },
  tel: {
    required: true,
    isValid: undefined,
    value: undefined,
    label: 'Téléphone',
    hint: 'Format attendu : 01 22 33 44 55',
    validation: PhoneValidator.validate,
    errorMessage: "Le numéro de téléphone n'est pas valide."
  },
  email: {
    required: true,
    isValid: undefined,
    value: undefined,
    label: 'Email',
    hint: 'Format attendu : nom@domaine.fr',
    validation: EmailValidator.validate,
    errorMessage: "L'adresse email n'est pas valide."
  },
  siret: {
    required: true,
    isValid: undefined,
    value: TrackStructure.getSiret(),
    label: 'SIRET de votre entreprise',
    hint: 'Format attendu : 14 chiffres',
    validation: SiretValidator.validate,
    errorMessage: "Le numéro SIRET n'est pas valide."
  },
  needs: {
    required: true,
    isValid: undefined,
    value: Translation.t('project.form.needs', {
      secteur: TrackStructure.getSector()
    }),
    label: 'Quel est votre besoin ?'
  },
  cgu: {
    required: true,
    isValid: undefined,
    value: false,
    label: "J'accepte d'être recontacté par l'équipe de Transition Écologique des Entreprises"
  },
  linkToProjectPage: {
    required: true,
    isValid: undefined,
    value: new URL(route.fullPath, window.location.origin).href
  }
})
const formIsSent = ref<boolean>(false)
const requestResponse = ref<ReqResp>()
const isLoading = ref<boolean>(false)

const isFormFilled = computed(() => {
  const isFilled = []
  for (const key in projectForm.value) {
    if (projectForm.value[key].required) {
      isFilled.push(isFieldValid(projectForm.value[key]))
    }
  }
  return isFilled.every((v) => v)
})

const hasValidResponse = computed(() => {
  return !requestResponse.value || requestResponse.value.status === 200 || requestResponse.value.status === 201
})

const getMailTo = (): string => {
  if (projectForm.value) {
    const needsValue = projectForm.value.needs.value ? projectForm.value.needs.value : ''
    const nameValue = projectForm.value.name.value ? projectForm.value.name.value : ''
    const surnameValue = projectForm.value.surname.value ? projectForm.value.surname.value : ''
    const telValue = projectForm.value.tel.value ? projectForm.value.tel.value : ''
    const siretValue = projectForm.value.siret.value ? projectForm.value.siret.value : ''
    return Contact.getMailtoUrl(
      Translation.t('form.errorEmail.subject', { project: props.project.title }),
      `${needsValue}

${nameValue} ${surnameValue}
${telValue}
SIRET : ${siretValue}`
    )
  }

  return ''
}

const updateProjectForm = (ev: string | boolean, id: string) => {
  if (projectForm.value) {
    projectForm.value[id].value = ev
  }
}

const isFieldValid = (field: InputFieldUnionType): boolean => {
  return field.value !== undefined && field.value !== '' && field.value !== false
}

const validateFormField = (field: InputFieldUnionType): void => {
  if (isValidatedStringFieldInputType(field)) {
    field.isValid = field.validation(field.value, !!field.label?.includes('SIRET')) as boolean
  } else {
    field.isValid = isFieldValid(field)
  }
}

const saveProjectForm = async () => {
  try {
    isLoading.value = true
    const project = new ProjectApi(projectForm.value, props.project.id)
    requestResponse.value = await project.fetch()

    // analytics / send event
    Matomo.sendEvent(TrackId.Results, route.name === RouteName.CatalogDetail ? 'send_form_catalog' : 'send_form')
  } finally {
    isLoading.value = false
    formIsSent.value = true
    scrollToFormContainer()
  }
}

const scrollToFormContainer = () => {
  const element = props.formContainerRef
  if (element) {
    scrollToElementCenter(element)
  }
}

const getErrorMessage = (field: InputFieldUnionType): string => {
  if (!isValidatedStringFieldInputType(field) || !isFieldValid(field)) {
    return field.isValid === false ? 'Ce champ est obligatoire.' : ''
  }
  return field.isValid === false ? field.errorMessage : ''
}

const getValidMessage = (field: InputFieldUnionType): string => {
  return field.isValid === true ? ' ' : ''
}
</script>
<style scoped lang="scss">
@import 'src/assets/scss/input.scss';
</style>
