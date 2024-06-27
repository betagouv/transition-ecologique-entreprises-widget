<template>
  <div
    ref="$el"
    class="fr-tabs"
  >
    <div class="fr-col-12 fr-col-justify--center">
      <div class="fr-container fr-m-0 fr-p-0">
        <div class="fr-col-12 fr-col-md-10 fr-col-offset-md-2">
          <ul
            ref="tablist"
            class="fr-tabs__list fr-px-0 fr-mx-0"
            role="tablist"
            :aria-label="tabListName"
          >
            <!-- @slot Slot nommé `tab-items` pour y mettre des Titres d’onglets personnalisés. S’il est rempli, la props `tabTitles° n’aura aucun effet -->
            <slot name="tab-items">
              <DsfrTabItem
                v-for="(tabTitle, index) in tabTitles"
                :key="index"
                :icon="tabTitle.icon"
                :panel-id="tabTitle.panelId || `${getIdFromIndex(index)}-panel`"
                :tab-id="tabTitle.tabId || getIdFromIndex(index)"
                :selected="isSelected(index)"
                @click="selectIndex(index)"
                @next="selectNext()"
                @previous="selectPrevious()"
                @first="selectFirst()"
                @last="selectLast()"
              >
                {{ tabTitle.title }}
              </DsfrTabItem>
            </slot>
          </ul>
        </div>
      </div>
    </div>

    <DsfrTabContent
      v-for="(tabContent, index) in tabContents"
      :key="index"
      :panel-id="tabTitles?.[index]?.panelId || `${getIdFromIndex(index)}-panel`"
      :tab-id="tabTitles?.[index]?.tabId || getIdFromIndex(index)"
      :selected="isSelected(index)"
      :asc="asc"
    >
      <p>
        {{ tabContent }}
      </p>
    </DsfrTabContent>

    <!-- @slot Slot par défaut pour le contenu des onglets -->
    <slot />
  </div>
</template>
<script lang="ts" setup>
import { ref, onMounted, onUnmounted, reactive } from 'vue'

import { DsfrTabItem, DsfrTabContent, type DsfrTabsProps, getRandomId } from '@gouvminint/vue-dsfr'

export type { DsfrTabsProps }

const props = withDefaults(defineProps<DsfrTabsProps>(), {
  tabContents: () => [],
  tabTitles: () => [],
  initialSelectedIndex: 0
})

const emit = defineEmits<{ (e: 'selectTab', payload: number): void }>()

const selectedIndex = ref(props.initialSelectedIndex || 0)
const generatedIds: Record<string, string> = reactive({})
const asc = ref(true)
const resizeObserver = ref<ResizeObserver | null>(null)
const $el = ref<HTMLElement | null>(null)
const tablist = ref<HTMLUListElement | null>(null)

const isSelected = (idx: number) => {
  return selectedIndex.value === idx
}

/*
 * Need to reimplement tab-height calc
 * @see https://github.com/GouvernementFR/dsfr/blob/main/src/component/tab/script/tab/tabs-group.js#L117
 */
const renderTabs = () => {
  if (selectedIndex.value < 0) {
    return
  }
  if (!tablist.value || !tablist.value.offsetHeight) {
    return
  }
  const tablistHeight = tablist.value.offsetHeight
  // Need to manually select tabs-content in case of manual slot filling
  const selectedTab = $el.value?.querySelectorAll('.fr-tabs__panel')[selectedIndex.value]
  if (!selectedTab || !(selectedTab as HTMLElement).offsetHeight) {
    return
  }
  const selectedTabHeight = (selectedTab as HTMLElement).offsetHeight

  $el.value?.style.setProperty('--tabs-height', `${tablistHeight + selectedTabHeight}px`)
}

const getIdFromIndex = (idx: number) => {
  if (generatedIds[idx]) {
    return generatedIds[idx]
  }
  const id = getRandomId('tab')
  generatedIds[idx] = id
  return id
}

const selectIndex = (idx: number) => {
  asc.value = idx > selectedIndex.value
  selectedIndex.value = idx
  emit('selectTab', idx)
}
const selectPrevious = () => {
  const newIndex = selectedIndex.value === 0 ? props.tabTitles.length - 1 : selectedIndex.value - 1
  selectIndex(newIndex)
}
const selectNext = () => {
  const newIndex = selectedIndex.value === props.tabTitles.length - 1 ? 0 : selectedIndex.value + 1
  selectIndex(newIndex)
}
const selectFirst = () => {
  selectIndex(0)
}
const selectLast = () => {
  selectIndex(props.tabTitles.length - 1)
}

onMounted(() => {
  /*
   * Need to use a resize-observer as tab-content height can
   * change according to its inner components.
   */
  if (window.ResizeObserver) {
    resizeObserver.value = new window.ResizeObserver(() => {
      renderTabs()
    })
  }

  $el.value?.querySelectorAll('.fr-tabs__panel').forEach((element) => {
    if (element) {
      resizeObserver.value?.observe(element)
    }
  })
})

onUnmounted(() => {
  $el.value?.querySelectorAll('.fr-tabs__panel').forEach((element) => {
    if (element) {
      resizeObserver.value?.unobserve(element)
    }
  })
})

defineExpose({
  renderTabs,
  selectIndex,
  selectFirst,
  selectLast
})
</script>
