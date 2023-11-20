<script setup lang="ts">
import { RouterView } from 'vue-router'
import TheHeader from "@/sections/TheHeader.vue";
import TheFooter from "@/sections/TheFooter.vue";

</script>

<template>
  <TheHeader></TheHeader>
  <RouterView />
  <TheFooter></TheFooter>

</template>

<style scoped></style>
