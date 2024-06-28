<template>
  <div v-html="htmlWithProps"></div>
</template>

<script setup lang="ts">
import { defineProps, PropType } from 'vue'
import { PrivacyPolicyProps } from '@incubateur-ademe/legal-pages-markdown'
import html from '@incubateur-ademe/legal-pages-markdown/html/PrivacyPolicy.html?raw'

const props = defineProps({
  date: {
    type: String,
    required: true
  },
  siteName: {
    type: String,
    required: true
  },
  thirdParties: {
    type: Array as PropType<PrivacyPolicyProps['thirdParties']>,
    required: false,
    default: () => []
  },
  cookies: {
    type: Array as PropType<PrivacyPolicyProps['cookies']>,
    required: false,
    default: () => []
  },
  cookieConsentButton: {
    type: String,
    required: false,
    default: ''
  }
})

let tableThirdParties = ''
if (props.thirdParties) {
  const tableElement = props.thirdParties.map((thirdParty, index) => {
    return `
      <tr key="${index}-thirdParty">
        <td>${thirdParty.name}</td>
        <td>${thirdParty.country}</td>
        <td>${thirdParty.hostingCountry}</td>
        <td>${thirdParty.serviceType}</td>
        <td>
          <a href=${thirdParty.policyUrl} rel="noopener noreferrer" target="_blank">
            ${thirdParty.policyUrl}
          </a>
        </td>
      </tr>
    `
  })
  tableThirdParties = `
    <div class="fr-table fr-table--no-caption">
      <table>
        <caption>Caption tableau des sous-traitants</caption>
        <thead>
          <tr>
            <th scope="col">Partenaire</th>
            <th scope="col">Pays destinataire</th>
            <th scope="col">Pays d’hébergement</th>
            <th scope="col">Traitement réalisé</th>
            <th scope="col">Garantie</th>
          </tr>
        </thead>
        <tbody>
          ${tableElement.join('')}
        </tbody>
      </table>
    </div>
  `
}

let tableCookies = ''
if (props.cookies) {
  const tableElement = props.cookies.map((thirdParty, index) => {
    return `
      <tr key="${index}-cookie">
        <td>${thirdParty.category}</td>
        <td>${thirdParty.name}</td>
        <td>${thirdParty.expiration}</td>
        <td>${thirdParty.finalities}</td>
        <td>${thirdParty.editor}</td>
        <td>${thirdParty.destination}</td>
      </tr>
    `
  })
  tableCookies = `
    <div class="fr-table fr-table--no-caption">
      <table>
        <caption>Caption tableau des cookies</caption>
        <thead>
          <tr>
            <th scope="col">Catégorie de cookie</th>
            <th scope="col">Nom du cookie</th>
            <th scope="col">Durée de conservation</th>
            <th scope="col">Finalités</th>
            <th scope="col">Éditeur</th>
            <th scope="col">Destination</th>
          </tr>
        </thead>
        <tbody>
          ${tableElement.join('')}
        </tbody>
      </table>
    </div>
  `
}

const htmlWithProps = html
  .replace('{{siteName}}', props.siteName)
  .replace('{{date}}', props.date)
  .replace('{{table_thirdParties}}', tableThirdParties)
  .replace('{{table_cookies}}', tableCookies)
  .replace('{{cookieConsentButton}}', props.cookieConsentButton)

// const render = h({
//   render: compile(html.replace('{{table_thirdParties}}', tableThirdParties).replace('{{table_cookies}}', tableCookies)),
//   setup: () => props
// })
</script>
