// CONSOLE LOG TEMPLATE
//console.log(`router.index > FUNCTION_NAME > MSG_OR_VALUE :`)

import TeeQuestionnaireResult from '@/components/questionnaire/TeeQuestionnaireResult.vue'
import { createRouter, createWebHistory, type RouteLocationNormalized, type RouteLocationNormalizedLoaded } from 'vue-router'
import TeeHomePage from '../pages/TeeHomePage.vue'
import TeeQuestionnairePage from '../pages/TeeQuestionnairePage.vue'
import TeeCatalogPage from '../pages/TeeCatalogPage.vue'
import TeeAddProgram from '../pages/TeeAddProgram.vue'
import TeeLegalPage from '../pages/TeeLegalPage.vue'
import TeeAccessibilityPage from '../pages/TeeAccessibilityPage.vue'
import TeePersonalDataPage from '../pages/TeePersonalDataPage.vue'
import ChatAdvisorPage from '@/pages/ChatAdvisorPage.vue'
import TeeQuestionnaire from '@/components/questionnaire/TeeQuestionnaire.vue'
import ProgramDetail from '@/components/program/detail/ProgramDetail.vue'
import { RouteName } from '@/types/routeType'
import { redirections } from '@/router/redirection'
import { TrackId } from '@/types'
import type { Component } from 'vue'
import { resetDetailProgram, resetProgramFilters, resetTrackStore, setHelpAsTrackSeed, setResultsAsTrackSeed } from '@/router/hook'
import ProgramList from '@/components/program/list/ProgramList.vue'

export const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  scrollBehavior(to: RouteLocationNormalized, from: RouteLocationNormalizedLoaded, savedPosition) {
    if (savedPosition) {
      return savedPosition
    }
    if (to.hash) {
      return { el: to.hash }
    }
    return { top: 0 }
  },
  routes: [
    {
      path: '/',
      name: RouteName.Homepage,
      component: TeeHomePage as Component
    },
    {
      path: '/questionnaire',
      component: TeeQuestionnairePage as Component,
      beforeEnter: [resetTrackStore, resetDetailProgram, setHelpAsTrackSeed],
      children: [
        {
          path: '',
          name: RouteName.Questionnaire,
          component: TeeQuestionnaire as Component,
          props: {
            seed: TrackId.QuestionnaireRoute
          }
        },
        {
          path: '',
          name: RouteName.QuestionnaireFromSidebar,
          component: TeeQuestionnaire as Component,
          beforeEnter: []
        },
        {
          path: 'resultat',
          name: RouteName.QuestionnaireResult,
          component: TeeQuestionnaireResult as Component
        },
        {
          path: 'resultat/:programId',
          name: RouteName.QuestionnaireResultDetail,
          component: ProgramDetail as Component,
          props: true
        }
      ]
    },
    {
      path: '/aides-entreprise',
      component: TeeCatalogPage as Component,
      beforeEnter: [resetDetailProgram, resetTrackStore, setResultsAsTrackSeed, resetProgramFilters],
      children: [
        {
          path: '',
          name: RouteName.Catalog,
          component: ProgramList as Component
        },
        {
          path: ':programId',
          name: RouteName.CatalogDetail,
          component: ProgramDetail as Component,
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
      path: '/:pathMatch(.*)*',
      name: '404',
      redirect: () => {
        return { name: RouteName.Homepage }
      }
    },
    ...redirections
  ]
})
