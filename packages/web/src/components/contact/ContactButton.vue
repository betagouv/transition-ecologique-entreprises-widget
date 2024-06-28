<template>
  <router-link
    v-if="iframe"
    class="fr-btn fr-btn--secondary fr-btn--lg fr-btn--icon-right fr-icon-chat-3-line"
    :to="{ name: RouteName.ChatAdvisor }"
  >
    Nous contacter
  </router-link>
  <a
    v-else
    class="fr-btn fr-btn--secondary fr-btn--lg fr-btn--icon-right fr-icon-mail-line"
    :href="Contact.mailTo"
  >
    Nous contacter
  </a>
</template>

<script setup lang="ts">
import { RouteName } from '@/types/routeType'
import Contact from '@/utils/contact'

interface Props {
  iframe?: boolean
}
withDefaults(defineProps<Props>(), {
  iframe: false
})
</script>
