<template>
  <div>
    <TeeHeader />
    <TeeMatomo />

    <router-view v-if="isReady" />
    <template v-else>
      <div class="fr-grid-row--center fr-my-10v">
        <div class="fr-col-12">
          <div class="fr-text-center">
            <TeeSpinner scale="6" />
          </div>
        </div>
      </div>
    </template>

    <div class="fr-mt-0v">
      <TeeFooter />
    </div>
  </div>
</template>

<script setup lang="ts">
// CONSOLE LOG TEMPLATE
//console.log(`WebApp > FUNCTION_NAME > MSG_OR_VALUE :`)

import { onBeforeMount, onMounted, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useNavigationStore } from './stores/navigation'

import TeeHeader from './components/TeeHeader.vue'
import TeeMatomo from './components/TeeMatomo.vue'
import TeeFooter from './components/TeeFooter.vue'
import Translation from '@/utils/translation'

const navigationStore = useNavigationStore()
const router = useRouter()
const route = useRoute()

const isReady = computed<boolean>(() => {
  return navigationStore.isReady
})

onBeforeMount(() => {
  Translation.setLocale('fr')
})

onMounted(async () => {
  // cf: https://stackoverflow.com/questions/69495211/vue3-route-query-empty
  await router.isReady()
  navigationStore.setRouter(router)
  navigationStore.setRoute(route)
})
</script>
