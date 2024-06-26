<template>
  <DsfrSideMenu class="fr-ml-4v">
    <template #default>
      <a
        v-for="item in menuItems"
        :key="item.id"
        :href="item.href"
        class="router-link-active router-link-exact-active fr-sidemenu__link"
        @click="scrollTo(item.to)"
      >
        {{ item.text }}
      </a>
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
    href: '#project-details',
    to: `project-details`,
    text: 'Le projet',
    condition: props.project.longDescription.length > 0
  },
  {
    id: 'project-more',
    href: '#project-more-details',
    to: `project-more-details`,
    text: 'Pour aller plus loin',
    condition: props.project.moreDescription.length > 0
  },
  { id: 'aids', href: '#project-aids', to: `project-aids`, text: 'Mes aides' },
  { id: 'contact', href: '#project-contact', to: `project-contact`, text: 'Contact' },
  {
    id: 'linked-project',
    href: '#project-linked-projects',
    to: `project-linked-projects`,
    text: 'Projets complémentaires',
    condition: props.project.linkedProjects.length > 0
  }
]
</script>
