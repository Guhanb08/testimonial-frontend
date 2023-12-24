<script setup lang="ts">
import { ref, onMounted } from "vue";
import toastService from "@/plugins/toast";
</script>

<template>
  <section class="padding-x padding-t">
    <div class="max-container max-w-6xl mx-auto">
      <div class="flex  flex-col items-center">
        <h1  class="text-5xl font-semibold">🤦‍♀️</h1>
        <h1 class="text-5xl font-semibold mt-5">Uh oh. That page doesn’t exist.</h1>
        <p class="text-gray-500 mt-5">Head to our 
          <router-link to="/" class="text-violet-500">homepage</router-link>
          that does exist, or try double-checking the URL.</p>
      </div>
    </div>
  </section>
</template>

<style scoped></style>
