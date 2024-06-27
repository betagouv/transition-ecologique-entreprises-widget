<template>
  <DsfrSideMenu class="fr-ml-4v fr-pt-8v fr-sticky">
    <template #default>
      <button
        v-for="item in menuItems"
        :key="item.id"
        :href="item.href"
        class="router-link-active router-link-exact-active fr-sidemenu__link"
        @click="scrollTo(item.to)"
      >
        {{ item.text }}
      </button>
    </template>
  </DsfrSideMenu>
</template>
<script setup lang="ts">
import { Project } from '@tee/common/src/project/types'

interface Props {
  project: Project
}
const props = defineProps<Props>()
const scrollTo = (id: string) => {
  const element = document.getElementById(id)
  if (element) {
    setTimeout(() => {
      element.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }, 100)
  }
}
const menuItems = computed(() => allMenuItems.filter((item) => item.condition !== false))
const allMenuItems = [
  {
    id: 'project',
    href: '#project-details-title',
    to: `project-details-title`,
    text: "Qu'est ce que c'est ?",
    condition: props.project.longDescription.length > 0
  },
  {
    id: 'project-more',
    href: '#project-more-details-title',
    to: `project-more-details-title`,
    text: 'Pour aller plus loin',
    condition: props.project.moreDescription.length > 0
  },
  { id: 'aids', href: '#project-aids-title', to: `project-aids-title`, text: 'Mes aides' },
  { id: 'contact', href: '#project-form-title', to: `project-form-title`, text: 'Contact' },
  {
    id: 'linked-project',
    href: '#project-linked-projects-title',
    to: `project-linked-projects-title`,
    text: 'Projets complémentaires',
    condition: props.project.linkedProjects.length > 0
  }
]
</script>
