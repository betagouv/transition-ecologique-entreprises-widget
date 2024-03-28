<template>
  <!-- BACK TO FORM BTN -->
  <button
    v-show="formIsSent"
    class="fr-btn fr-btn--tertiary-no-outline inline-flex fr-mb-3v fr-link fr-tee-form-arrow-back"
    tertiary
    noOutline
    @click="formIsSent = !formIsSent"
  >
    <v-icon
      scale="2"
      name="ri-arrow-left-line"
      aria-hidden="true"
    ></v-icon>
  </button>

  <!-- DEBUGGING -->
  <div
    v-if="debugStore.is"
    class="vue-debug"
  >
    <p>
      requiredFields:
      <code>{{ requiredFields }}</code>
    </p>
    <p>
      canSaveFrom:
      <code>{{ canSaveFrom }}</code>
    </p>
    <p>
      formIsSent:
      <code>{{ formIsSent }}</code>
    </p>
    <p>
      hasNoRespError:
      <code>{{ hasNoRespError }}</code>
    </p>
    <p>
      formContainerRef:<br />
      <code>{{ formContainerRef }}</code>
    </p>
  </div>

  <!-- FORM -->
  <div
    v-if="!formIsSent"
    class="fr-tee-form fr-my-4v"
  >
    <!-- FORM LABEL -->
    <h3
      v-if="formOptions.label"
      class="fr-text-center"
    >
      {{
        capitalizeFirstLetter(
          Translation.ti(formOptions.label[Translation.lang], {
            prefixAide: findPrefix(program["nature de l'aide"], 'this'),
            natureAide: program["nature de l'aide"]
          }) || ''
        )
      }}
    </h3>

    <!-- FORM HINT -->
    <p
      v-if="formOptions.hint"
      class="fr-text-center fr-pb-10v"
    >
      <!-- {{ formOptions.hint[Translation.lang] }} -->
      {{ Translation.ti(formOptions.hint[Translation.lang], { operator: program['opérateur de contact'] }) }}
    </p>

    <!-- FIELDS -->
    <div class="fr-grid-row fr-grid-row--gutters fr-mb-2v">
      <div
        v-for="field in formOptions.fields"
        :key="field.id"
        :class="`fr-col-12 fr-col-md-${field.cols ? field.cols : 12}`"
      >
        <!-- DEBUGGING -->
        <div
          v-if="debugStore.is"
          class="vue-debug"
        >
          Field.id:
          <code>
            {{ field.id }}
          </code>
          --- field.type :
          <code>
            {{ field.type }}
          </code>
          --- formData[field.id] :
          <code>
            {{ formData?.[field.id] }}
          </code>
        </div>

        <!-- INPUT GROUP -->
        <DsfrInputGroup v-if="!isCheckbox(field) && formData">
          <DsfrInput
            :type="field.type"
            :is-textarea="isTextarea(field)"
            :rows="isTextarea(field) && (field.rows || 4)"
            :model-value="formData[field.id]"
            label-visible
            :required="field.required"
            :label="field?.label?.[Translation.lang]"
            :placeholder="(field.hint && field.hint[Translation.lang]) || ''"
            @update:model-value="updateFormData($event, field.id)"
          >
          </DsfrInput>
        </DsfrInputGroup>

        <!-- CHECKBOXES -->
        <DsfrCheckbox
          v-if="isCheckbox(field) && formData"
          :model-value="formData[field.id]"
          :name="field.id"
          :required="field.required"
          @update:model-value="updateFormData($event, field.id)"
        >
          <!-- :hint="field.hint[Translation.lang]" -->
          <template #label>
            <span>
              {{ field?.label?.[Translation.lang] }}
            </span>
          </template>
        </DsfrCheckbox>

        <!-- CHECKBOX HINT -->
        <div v-if="isCheckbox(field)">
          <span
            class="fr-hint-text fr-mt-5v"
            v-html="field.hint?.[Translation.lang] || ''"
          >
          </span>
        </div>
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
        <DsfrButton
          :label="Translation.t('send')"
          :disabled="!canSaveFrom"
          icon="ri-arrow-right-line"
          icon-right
          :loading="isLoading"
          @click="saveFormData()"
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
    <div
      v-if="!hasNoRespError"
      class="fr-text-center"
    >
      <p class="tee-form-response tee-form-response-error">
        <v-icon
          name="ri-close-circle-fill"
          aria-hidden="true"
          scale="3"
        ></v-icon>
      </p>
      <h3 class="tee-form-response tee-form-response-error fr-mb-2v">
        {{ Translation.t(`form.sorryError`) }}
      </h3>
      <h3 class="tee-form-response tee-form-response-error">
        {{ Translation.t(`form.notSent`) }}
      </h3>
      <h6 class="tee-form-response-blue fr-mt-15v fr-mb-3v">
        {{ Translation.t('form.nowWhat') }}
      </h6>
      <p class="tee-form-response-blue fr-mb-15v">
        <span v-html="Translation.t('form.errorMsg', { mailto: getMailTo(), email: contactEmail })"></span>
      </p>

      <!-- DEBUGGING -->
      <div
        v-if="debugStore.is && requestResponses?.filter((resp) => resp.status && ![200, 201].includes(resp.status))"
        class="fr-mt-5v fr-highlight"
      >
        <p
          v-for="(resp, i) in requestResponses"
          :key="`resp-${i}`"
        >
          <b> {{ resp.action }} : </b>
          <b> status {{ resp.status }} : </b>
          <b> "{{ resp.code }}" </b>
          <br />
          <i>
            {{ resp.message }}
          </i>
        </p>
      </div>
    </div>

    <!-- MESSAGE IF 200 -->
    <div
      v-if="hasNoRespError"
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
      <p class="fr-mb-15v">
        <span>
          {{ Translation.ti(Translation.t('form.phoneContact'), { operator: program['opérateur de contact'] }) }}
        </span>
      </p>
    </div>
  </div>

  <!-- DEBUGGING -->
  <div
    v-if="debugStore.is"
    class="vue-debug fr-mt-5v"
  >
    <h5>DEBUG - TeeForm</h5>
    <div class="fr-grid-row fr-grid-row--gutters fr-mb-3v">
      <div
        v-if="false"
        class="fr-col-12"
      >
        <h4>formOptions :</h4>
        <code>
          <pre>{{ formOptions }}</pre>
        </code>
      </div>
      <div class="fr-col-12">
        <h4>formData :</h4>
        <code>
          <pre>{{ formData }}</pre>
        </code>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// CONSOLE LOG TEMPLATE
// console.log(`TeeForm > FUNCTION_NAME > MSG_OR_VALUE :`)

import { computed, onBeforeMount, ref, toRaw } from 'vue'
import type { FormCallback, FormField, FormOptions, FormValues, ProgramData, ReqResp } from '@/types'
import { TrackId } from '@/types'
import { CallbackActions, FormFieldTypes } from '@/types'
import { sendApiRequest } from '@/utils/requests'
import { remapItem, scrollToElementCenter } from '@/utils/helpers'
import { tracksStore } from '@/stores/tracks'
import Translation from '@/utils/translation'
import DsfrButton from '@/components/button/DsfrButton.vue'
import Matomo from '@/utils/matomo'
import Config from '@/config'
import { RouteName } from '@/types/routeType'
import { useRoute } from 'vue-router'
import Contact from '@/utils/contact'
import { useDebugStore } from '@/stores/debug'

const route = useRoute()
const tracks = tracksStore()
const debugStore = useDebugStore()

const trackValues: any[] = tracks.getAllUsedTracksValues
const contactEmail = Config.contactEmail

interface DataProps {
  programId: string
}

interface Props {
  trackId: TrackId
  formOptions: FormOptions
  dataProps: DataProps
  program: ProgramData
  formContainerRef?: HTMLElement | null | undefined
}
const props = defineProps<Props>()

let formData = ref<FormValues>()
const requiredFields = ref<string[]>([])
const formIsSent = ref<boolean>(false)
const requestResponses = ref<ReqResp[]>()
const isLoading = ref<boolean>(false)

const canSaveFrom = computed(() => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  const boolArr = requiredFields.value.map((f: string) => formData.value?.[f])
  return boolArr.every((v) => !!v && v !== '')
})

const hasNoRespError = computed(() => {
  return !requestResponses.value || requestResponses.value?.map((r) => r.status).every((s) => s === 200 || s === 201)
})

const findPrefix = (str: string, prefixCode: string = 'of') => {
  return Translation.t(`articles.${str}.${prefixCode}`)
}

const capitalizeFirstLetter = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

const isCheckbox = (field: FormField) => {
  return field.type === FormFieldTypes.Checkbox
}

const isTextarea = (field: FormField) => {
  return field.type === FormFieldTypes.Textarea
}

const getMailTo = (): string => {
  if (props.trackId === TrackId.Results && formData.value) {
    const needsValue = 'needs' in formData.value ? (formData.value.needs as string) : ''
    const nameValue = 'name' in formData.value ? (formData.value.name as string) : ''
    const surnameValue = 'surname' in formData.value ? (formData.value.surname as string) : ''
    const telValue = 'tel' in formData.value ? (formData.value.tel as string) : ''
    const siretValue = 'siret' in formData.value ? (formData.value.siret as string) : ''
    return Contact.getMailtoUrl(
      Translation.t('form.errorEmail.subject', { program: props.program.titre }),
      `${needsValue}

${nameValue} ${surnameValue}
${telValue}
SIRET : ${siretValue}`
    )
  }

  return ''
}

onBeforeMount(() => {
  let initValues: FormValues = {}

  // set up InitValues from formOptions.fields
  props.formOptions.fields?.forEach((field: FormField) => {
    // set field's key
    initValues[field.id] = isCheckbox(field) ? false : ''

    if (field.required) {
      requiredFields.value.push(field.id)
    }

    // set default value if any
    if (field.defaultValue) {
      let defaultVal = field.defaultValue
      if (field.injectInText) {
        const defaultValStr = defaultVal.toString()
        const dataStructure = field.dataStructure || {}
        const dataMapping = field.dataMapping || []
        const values = remapItem(dataStructure, dataMapping, {}, trackValues, props, undefined, [], Translation.lang)
        defaultVal = Translation.ti(defaultValStr, values)
      }
      initValues[field.id] = defaultVal
    }

    // inject value into form from store if any
    if (field.preFillFrom) {
      initValues = remapItem(initValues, [field.preFillFrom], {}, trackValues, props, undefined, [], Translation.lang)
    }
  })
  formData = ref(initValues)
})

const updateFormData = (ev: string, id: string) => {
  if (formData.value) {
    formData.value[id] = ev
  }
}

const saveFormData = async () => {
  try {
    isLoading.value = true

    // Launch call backs if any
    const responses: ReqResp[] = []
    // loop callbacks (only active ones)
    const activeCallbacks = toRaw(props.formOptions.callbacks).filter((cb: FormCallback) => !cb.disabled)
    for (const callback of activeCallbacks) {
      let resp: ReqResp = {}
      switch (callback.action) {
        case CallbackActions.CreateOpportunity:
          if (formData.value) {
            formData.value.programUrl = new URL(route.fullPath, window.location.origin).href
          }
          resp = await sendApiRequest(callback, toRaw(formData.value), trackValues, props.dataProps, Translation.lang)
          break
        case CallbackActions.SendTransactionalEmail:
          resp = await sendApiRequest(callback, toRaw(formData.value))
          break
      }
      responses.push(resp)
    }
    requestResponses.value = responses

    // analytics / send event
    Matomo.sendEvent(props.trackId, route.name === RouteName.CatalogDetail ? 'send_form_catalog' : 'send_form')
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
</script>
