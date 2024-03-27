<template>
  <div>
    <!-- HEADER -->
    <TeeHeader />

    <!-- MATOMO -->
    <TeeMatomo />

    <router-view />

    <!-- FOOTER -->
    <div class="fr-mt-0v">
      <TeeFooter />
    </div>
  </div>
</template>

<script setup lang="ts">
// cf : https://github.com/betagouv/transition-ecologique-entreprises-widget/commit/845f2cd7c31b16aa7bbeecf8533a9d72bb557c38#diff-11f3012b2f722ad4a8671a5c6dbb44f832deb7b4064388325f824ac0e958837c

// CONSOLE LOG TEMPLATE
//console.log(`WebApp > FUNCTION_NAME > MSG_OR_VALUE :`)

import { onBeforeMount, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useProgramsStore } from './stores/programs'
import { useNavigationStore } from './stores/navigation'

import TeeHeader from './components/TeeHeader.vue'
import TeeMatomo from './components/TeeMatomo.vue'
import TeeFooter from './components/TeeFooter.vue'
import type { ProgramData } from '@/types'
import jsonDataset from '../public/data/generated/dataset_out.json'
import Translation from '@/utils/translation'

const programs = useProgramsStore()
const nav = useNavigationStore()

const router = useRouter()
const route = useRoute()

interface Props {
  needTracksReset?: boolean
}
defineProps<Props>()

onBeforeMount(() => {
  programs.setDataset(jsonDataset as ProgramData[])
  Translation.setLocale('fr')
})

onMounted(async () => {
  // cf: https://stackoverflow.com/questions/69495211/vue3-route-query-empty
  await router.isReady()
  nav.setRouter(router)
  nav.setRoute(route)
})
</script>
