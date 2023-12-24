<script setup lang="ts">
import { ref, onMounted } from "vue";
import toastService from "@/plugins/toast";
import { useRoute,useRouter, RouterView } from "vue-router";
const route = useRoute();
const router = useRouter();

const slug = ref(route.params.slug);



</script>

<template>
  <section class="padding-x padding-t">
    <div class="max-container max-w-6xl mx-auto">
   {{ slug }}
    </div>
  </section>
</template>

<style scoped></style>
