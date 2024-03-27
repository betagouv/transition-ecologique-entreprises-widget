import { createPinia } from 'pinia'
import { defineCustomElement } from './defineCustomElementWithStyles'
import WidgetApp from '@/WidgetApp.ce.vue'
import VueDsfr from '@gouvminint/vue-dsfr'
// Styles imports
import '@/assets/main.scss'
import { listIcons } from '@/plugin/icons'
import Widget from '../src/utils/widget'
import type { Component } from 'vue'

const store = createPinia()

Widget.is = true

const WidgetAppComponent = defineCustomElement(WidgetApp as Component, {
  plugins: [{ plugin: VueDsfr, options: { icons: listIcons() } }, { plugin: store }]
})

customElements.define('gov-aid-tree-app', WidgetAppComponent)
