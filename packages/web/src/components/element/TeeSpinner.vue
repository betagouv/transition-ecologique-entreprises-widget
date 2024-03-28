<template>
  <v-icon
    animation="spin"
    :scale="scale"
    name="ri-loader-5-fill"
    fill="#000091"
    label="Chargement en cours..."
  ></v-icon>
</template>

<script setup lang="ts">
interface Props {
  scale: string
}

defineProps<Props>()
</script>
