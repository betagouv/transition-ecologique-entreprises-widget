<template>
  <div v-html="htmlWithProps"></div>
</template>
<script setup lang="ts">
import { defineProps, PropType } from 'vue'
import { LegalNoticeProps } from '@incubateur-ademe/legal-pages-markdown'
import html from '@incubateur-ademe/legal-pages-markdown/html/LegalNotice.html?raw'

const props = defineProps({
  date: {
    type: String,
    required: true
  },
  licenceUrl: {
    type: String,
    required: true
  },
  privacyPolicyUrl: {
    type: String,
    required: true
  },
  siteUrl: {
    type: String,
    required: true
  },
  siteName: {
    type: String,
    required: true
  },
  thirdParties: {
    type: Array as PropType<LegalNoticeProps['thirdParties']>,
    required: false,
    default: () => []
  },
  siteHost: {
    type: Object as PropType<LegalNoticeProps['siteHost']>,
    required: false,
    default: () => ({})
  },
  contactEmail: {
    type: String,
    required: true
  }
})

let element_thirdParties = ''
if (props.thirdParties) {
  for (const { name, url, text } of props.thirdParties) {
    element_thirdParties += `
    <p>
      ${text} <a href="${url}" target="_blank" rel="noopener noreferrer">${name}</a>
    </p>
  `
  }
}

const htmlWithProps = html
  .replace('{{contactEmail}}', props.contactEmail)
  .replace('{{siteName}}', props.siteName)
  .replaceAll('{{siteUrl}}', props.siteUrl)
  .replaceAll('{{licenceUrl}}', props.licenceUrl)
  .replaceAll('{{privacyPolicyUrl}}', props.privacyPolicyUrl)
  .replace('{{date}}', props.date)
  .replace('{{siteHost.name}}', props.siteHost.name)
  .replaceAll('{{siteHost.email}}', props.siteHost?.email ?? '')
  .replace('{{siteHost.address}}', props.siteHost.address)
  .replace('{{siteHost.country}}', props.siteHost.country)
  .replace('{{element_thirdParties}}', element_thirdParties)

// const render = h({
//   render: compile(html.replace('{{element_thirdParties}}', element_thirdParties).replace('{{contactEmail}}', props.contactEmail)),
//   setup: () => props
// })
// console.log(render)
</script>
