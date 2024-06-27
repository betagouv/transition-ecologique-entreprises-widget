<template>
  <div class="fr-container fr-my-8w">
    <div class="fr-mb-5w">
      <h1 class="fr-mb-3w">Statistiques d'usage</h1>
      <p>
        Vous trouverez ici les statistiques d'utilisation du site Transition écologique des entreprises. Ces données nous permettent de
        suivre les évolutions d'usage de la plateforme dans le temps mais également de mieux comprendre vos besoins et d'orienter nos
        actions pour améliorer ce service.
      </p>
      <p>
        Ces données étant en cours de construction, elles peuvent, dans certains cas, être incomplètes. Nous vous remercions de votre
        compréhension.
      </p>
    </div>

    <h2>Nombre de mises en relation</h2>
    <div class="fr-grid-row fr-grid-row--center">
      <div class="fr-col-md-6">
        <h4>Depuis le lancement</h4>
        <TeeCallout
          :title="statsData ? statsData.countOpportunitiesTotal || undefined : undefined"
          class="fr-mr-md-3v"
        >
          Demandes d'entreprises mises en relations avec un opérateur public sur un sujet de transition écologique depuis le lancement (été
          2023).
        </TeeCallout>
      </div>
      <div class="fr-col-md-6 fr-mt-3w fr-mt-md-0 extendShorterContentContainer">
        <h4 class="fr-ml-md-3v">Sur les 30 derniers jours</h4>
        <TeeCallout
          :title="statsData ? statsData.countOpportunities30Days || undefined : undefined"
          class="fr-ml-md-3v extendVertically"
        >
          Demandes d'entreprises mises en relations avec un opérateur public sur un sujet de transition écologique sur les 30 derniers
          jours.
        </TeeCallout>
      </div>
    </div>
    <div class="fr-col-12 fr-mt-3w fr-mt-md-4w fr-mb-md-8w">
      <h4>Demandes cumulées ces derniers mois</h4>
      <canvas
        ref="chartCanvas"
        width="1200"
        :height="isSmallScreen ? 700 : 450"
      ></canvas>
    </div>
    <div class="fr-mt-5w fr-mt-md-0 fr-mb-5w">
      <h2>Nombre de dispositifs d'aide activés</h2>
      <div class="fr-col-md-6">
        <TeeCallout
          :type="CalloutType.Warning"
          img="/images/TEE-missingData.svg"
          class="fr-mr-md-3v"
        >
          Nous travaillons actuellement sur cette mesure.<br /><br />
          Cette information sera disponible prochainement.
        </TeeCallout>
      </div>
    </div>
    <div class="fr-mb-5w">
      <h2>Nombre de dispositifs d'aide listés sur la plateforme</h2>
      <div class="fr-grid-row fr-grid-row--center fr-mb-5w">
        <div class="fr-col-md-6">
          <h4>Depuis le lancement</h4>
          <TeeCallout
            :title="statsData ? statsData.countProgramsTotal || undefined : undefined"
            class="fr-mr-md-3v"
          >
            Dispositifs d’aides référencés sur la plateforme depuis le lancement (été 2023).
          </TeeCallout>
        </div>
        <div class="fr-col-12 fr-col-md-6 fr-mt-3w fr-mt-md-0 extendShorterContentContainer">
          <h4 class="fr-ml-md-3v">Actifs</h4>
          <TeeCallout
            :title="statsData ? statsData.countProgramsNow || undefined : undefined"
            class="fr-ml-md-3v extendVertically extendHor"
          >
            Dispositifs d’aides actuellement référencés sur la plateforme.
          </TeeCallout>
        </div>
      </div>
    </div>
    <div class="fr-mb-5w">
      <h2>Trafic web</h2>
      <div class="fr-col-md-6">
        <TeeCallout
          class="fr-mr-md-3v"
          link="https://stats.beta.gouv.fr/index.php?module=CoreHome&action=index&idSite=23&period=day&date=yesterday#?period=day&date=yesterday&category=Dashboard_Dashboard&subcategory=1&idSite=23"
          link-text="Tableau de bord Matomo"
        >
          Consultez toutes les statistiques de notre site sur le tableau de bord de notre outil de suivi Matomo.
        </TeeCallout>
      </div>
    </div>
  </div>
  <ContactMail></ContactMail>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import Chart from 'chart.js/auto'
import type StatsData from '@tee/common/src/stats/types'
import StatsApi from '@/service/api/statsApi'
import { CalloutType } from '@/types/elementsPropsTypes'

const statsData = ref<StatsData | null>(null)
const chartCanvas = ref<HTMLCanvasElement | null>(null)

const isSmallScreen = computed(() => window.innerWidth < 768)

const drawChart = () => {
  if (statsData.value && statsData.value.demandsTimeSeries) {
    const labels = statsData.value.demandsTimeSeries.map((item) => `${item.month}/${item.year}`)
    const data = statsData.value.demandsTimeSeries.map((item) => item.nDemands)

    if (!chartCanvas.value) return
    const chartContext = chartCanvas.value.getContext('2d')
    if (!chartContext) return
    new Chart(chartContext, {
      type: 'line',
      data: {
        labels: labels,
        datasets: [
          {
            label: 'Nombre de mises en relation',
            data: data,
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 3
          }
        ]
      },
      options: {
        plugins: {
          legend: {
            display: false
          }
        }
      }
    })
  }
}

onMounted(async () => {
  const result = await new StatsApi().get()
  if (result.isOk) {
    statsData.value = result.value
  } else {
    console.error('Error calling the stat API', result.error)
  }
  drawChart()
})
</script>

<style scoped>
h1 {
  color: var(--light-background-action-high-blue-france, #000091);
  font-size: 2.5rem;
  font-style: normal;
  line-height: 3rem; /* 120% */
}

p {
  color: #000;
  font-size: 1rem;
  font-style: normal;
  font-weight: 400;
  line-height: 1.5rem; /* 150% */
}

h2 {
  color: var(--light-text-title-grey, #161616);
  font-style: normal;
  margin-bottom: 1rem;
}

h4 {
  color: #6a6af4;
  font-size: 1.25rem;
  font-style: normal;
  font-weight: 700;
  line-height: 2rem; /* 160% */
  margin-bottom: 0.75rem;
}

.extendShorterContentContainer {
  display: flex;
  flex-direction: column;
  align-items: stretch; /* Make flex items stretch vertically */
}
.extendVertically {
  flex: 1;
}

.extendHor {
  width: 100%;
}
</style>
