import type { Component } from 'vue'
import TeeHomePage from '../pages/TeeHomePage.vue'
import TeeQuestionnairePage from '../pages/TeeQuestionnairePage.vue'
import TeeCatalogPage from '../pages/TeeCatalogPage.vue'
import TeeAddProgram from '../pages/TeeAddProgram.vue'
import TeeLegalPage from '../pages/TeeLegalPage.vue'
import TeeAccessibilityPage from '../pages/TeeAccessibilityPage.vue'
import TeePersonalDataPage from '../pages/TeePersonalDataPage.vue'
import ChatAdvisorPage from '@/pages/ChatAdvisorPage.vue'
import { RouteName } from '@/types/routeType'
import { redirections } from '@/router/redirection'
import { TrackId } from '@/types'
import Hook from '@/router/hook'
import TeeQuestionnaire from '@/components/questionnaire/TeeQuestionnaire.vue'
import TeeQuestionnaireResult from '@/components/questionnaire/TeeQuestionnaireResult.vue'
import ProgramDetail from '@/components/program/detail/ProgramDetail.vue'
import TeeStatPage from '@/pages/TeeStatPage.vue'
import CatalogList from '@/components/catalog/CatalogList.vue'
import ProjectDetail from '@/components/project/details/ProjectDetail.vue'

// please edit the sitemap.ts file if you add any path starting with /
// that you don't want to be listed in the sitemap

export const routes = [
  {
    path: '/',
    name: RouteName.Homepage,
    component: TeeHomePage as Component
  },
  {
    path: '/questionnaire',
    component: TeeQuestionnairePage as Component,
    children: [
      {
        path: '',
        name: RouteName.QuestionnaireStart,
        component: TeeQuestionnaire as Component,
        beforeEnter: [Hook.resetUsedTrackStore, Hook.resetQueries],
        props: { trackId: TrackId.QuestionnaireRoute }
      },
      {
        path: ':trackId',
        name: RouteName.Questionnaire,
        component: TeeQuestionnaire as Component,
        beforeEnter: [Hook.setUsedTracks, Hook.hasUsedTracks],
        props: true
      },
      {
        path: 'resultat',
        name: RouteName.QuestionnaireResult,
        component: TeeQuestionnaireResult as Component,
        beforeEnter: [Hook.setUsedTracks, Hook.hasUsedTracks]
      },
      {
        path: 'resultat/:programId',
        name: RouteName.QuestionnaireResultDetail,
        component: ProgramDetail as Component,
        beforeEnter: [Hook.hasProgram, Hook.setUsedTracks, Hook.hasUsedTracks],
        props: true
      },
      {
        path: 'resultat/projets/:projectId',
        component: ProjectDetail as Component,
        name: RouteName.ProjectResultDetail,
        beforeEnter: [Hook.hasProject, Hook.setUsedTracks, Hook.hasUsedTracks],
        props: true
      }
    ]
  },
  {
    path: '/aides-entreprise',
    component: TeeCatalogPage as Component,
    beforeEnter: [Hook.resetUsedTrackStore, Hook.resetQueries, Hook.resetProgramFilters],
    children: [
      {
        path: '',
        name: RouteName.Catalog,
        component: CatalogList as Component
      },
      {
        path: ':programId',
        name: RouteName.CatalogDetail,
        component: ProgramDetail as Component,
        beforeEnter: [Hook.hasProgram],
        props: true
      }
    ]
  },
  {
    path: '/ajouter-une-aide-entreprises',
    name: RouteName.AddProgram,
    component: TeeAddProgram as Component
  },
  {
    path: '/echanger-avec-un-conseiller',
    name: RouteName.ChatAdvisor,
    component: ChatAdvisorPage as Component
  },
  {
    path: '/mentions-legales',
    name: RouteName.Legal,
    component: TeeLegalPage as Component
  },
  {
    path: '/accessibilite',
    name: 'accessibility',
    component: TeeAccessibilityPage as Component
  },
  {
    path: '/donnees-personnelles',
    name: RouteName.PersonalData,
    component: TeePersonalDataPage as Component
  },
  {
    path: '/stats',
    name: RouteName.Statistiques,
    component: TeeStatPage as Component
  },
  {
    path: '/:pathMatch(.*)*',
    name: '404',
    redirect: () => {
      return { name: RouteName.Homepage }
    }
  },
  ...redirections
]
