<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRoute, RouterView } from "vue-router";
import TheHeader from "@/sections/TheHeader.vue";
import TheFooter from "@/sections/TheFooter.vue";

const route = useRoute();
/* 
const hideFooter = ref(route.meta);

console.log("hideFooter", hideFooter.value); */


</script>

<template>
  <TheHeader></TheHeader>
  <RouterView />
  <!-- <TheFooter ></TheFooter> -->
</template>

<style scoped></style>
