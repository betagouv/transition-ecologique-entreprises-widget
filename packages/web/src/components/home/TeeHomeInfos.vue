<template>
  <!-- BLOCKS HEADER -->
  <h2 class="tee-text-blue fr-mb-10v fr-mb-md-0 fr-px-10v fr-px-md-0">On vous aide à atteindre vos objectifs :</h2>

  <!-- CONTENT BLOCKS -->
  <div
    v-for="c in content"
    :key="c.badge"
    class="fr-grid-row fr-grid-row-gutters fr-mb-20v fr-my-md-20v tee-home-info-block"
  >
    <div :class="`fr-col fr-col-sm-12 fr-col-md-4 fr-sm-hide ${c.imgRight ? 'fr-col-offset-1' : ''}`">
      <figure
        class="fr-content-media fr-content-media--md tee-home-img fr-my-0"
        role="group"
        aria-label="© Transition Ecologique des entreprises"
      >
        <div class="fr-content-media__img fr-ratio-32x9">
          <img
            class="fr-responsive-img"
            :src="c.img"
            :alt="`TEE - ${c.badge}`"
          />
        </div>
      </figure>
    </div>

    <div :class="`fr-col fr-col-12 fr-col-md-7 tee-home-info-block-figure ${c.imgRight ? 'inverted-order' : ''}`">
      <div class="figure-center">
        <figure
          class="fr-content-media fr-sm-show fr-md-hide fr-content-media--md tee-home-img fr-my-0"
          role="group"
          aria-label="© Transition Ecologique des entreprises"
        >
          <div class="fr-content-media__img fr-ratio-32x9">
            <img
              class="fr-responsive-img"
              :src="c.imgSolo"
              :alt="`TEE - ${c.badge}`"
            />
          </div>
        </figure>
      </div>

      <div :class="`fr-px-10v ${c.imgRight ? 'fr-pl-md-0' : ''} fr-pt-0 fr-pt-md-6v fr-pb-10v`">
        <p
          class="fr-badge fr-mb-6v fr-mt-4v fr-sm-hide"
          :style="`background-color: ${c.badgeColor}; ${c.badgeTextColor ? 'color: ' + c.badgeTextColor : ''}`"
        >
          {{ c.badge }}
        </p>
        <h1>
          {{ c.title }}
        </h1>
        <p class="fr-sm-hide">
          {{ c.text }}
        </p>
        <router-link
          class="tee-router-link"
          :to="{ name: RouteName.Questionnaire }"
        >
          <button
            class="fr-link fr-text--bold fr-link--icon-right fr-icon-arrow-right-line"
            aria-disabled="false"
          >
            Je me lance
          </button>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { RouteName } from '@/types/routeType'

const content = [
  {
    badge: '⚡️ Gestion énergétique',
    badgeColor: '#FACF35',
    title: ' Diminuer votre facture d’éléctricité',
    img: '/images/home/electric.svg',
    imgSolo: '/images/home/electric-solo.svg',
    imgRight: false,
    text: 'Le prix de l’énergie ne cesse d’augmenter. \
        L’efficacité énergétique est un axe à court terme \
        vous permettant de générer des économies d’énergie, \
        d’optimiser vos consommations énergétiques, \
        de réduire vos émissions carbones et surtout d’assurer \
        votre rentabilité. Des dizaines d’actions rapides \
        peuvent être mises en places dès à présent pour \
        réduire la consommation d’électricité ou de gaz d’une entreprise. '
  },
  {
    badge: '👷‍♀️ Bâtiment durable',
    badgeColor: '#1EBE8E',
    title: 'Rénovez vos locaux pour réduire vos dépenses',
    img: '/images/home/building.svg',
    imgSolo: '/images/home/building-solo.svg',
    imgRight: true,
    text: "Envie de locaux moins énergivores, moins coûteux en chauffage, \
        en climatisation et en éclairage ? Et si vous envisagiez de \
        rénover vos bâtiments pour en diminuer les besoins en énergie ? \
        Les entreprises qui s'engagent dans une démarche de rénovation \
        moins polluante peuvent bénéficier de financements publics."
  },
  {
    badge: '⚡️ Mobilité durable',
    badgeColor: '#6672F8',
    badgeTextColor: 'white',
    title: 'Optez pour des modes de transport moins polluants',
    img: '/images/home/mobility.svg',
    imgSolo: '/images/home/mobility-solo.svg',
    imgRight: false,
    text: 'L’objectif est de mettre en place des solutions \
        pour favoriser le recours à des modes de transport \
        alternatifs et de limiter les déplacements et les \
        émissions de Gaz à Effet de Serre (GES). \
        Pour s’inscrire pleinement dans la transition écologique, \
        il convient à chaque entreprise d’intégrer cette \
        réflexion à sa stratégie. Il existe des aides pour\
        vous accompagner dans sa construction et le financement de sa mise en place ! '
  },
  {
    badge: '👷‍♀️ Gestion de l’eau',
    badgeColor: '#FCA081',
    title: 'Faire des économies sur vos consommations d’eau',
    img: '/images/home/water.png',
    imgSolo: '/images/home/water-solo.svg',
    imgRight: true,
    text: 'L’eau a un coût, qui risque d’augmenter dans les années à venir. \
        La réglementation peut imposer à certaines activités de mettre \
        en place une réutilisation de l’eau, des circuits fermés. \
        Économiser dès maintenant, étudier les alternatives, c’est anticiper l’avenir. '
  }
]
</script>
