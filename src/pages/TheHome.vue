<script setup lang="ts">
import TheHero from "@/sections/TheHero.vue";
import TestimonialWall from "@/sections/TestimonialWall.vue";
import CodeSnippet from "@/sections/CodeSnippet.vue";
import TestimonialFeatures from "@/sections/TestimonialFeatures.vue";
import IntegrationPlatforms from "@/sections/IntegrationPlatforms.vue";
import TheTestimonial from "@/sections/TheTestimonial.vue";
import TheContact from "@/sections/TheContact.vue";




</script>

<template>
  <section class="padding-x  padding-t">
    <TheHero></TheHero>
  </section>
  <section class="w-full " >
    <TestimonialWall></TestimonialWall>
  </section>
  <section class="pt-5 padding-b " >
    <CodeSnippet></CodeSnippet>
  </section>

  <section class="padding bg-gradient-to-b from-yellow-50 via-yellow to-white" >
    <TestimonialFeatures></TestimonialFeatures>
  </section>

  <section class="padding bg-gray-100"> 
    <IntegrationPlatforms></IntegrationPlatforms>
  </section>


  <section class="padding 0"> 
    <TheTestimonial></TheTestimonial>
  </section>


  <section class="padding bg-violet-50"> 
    <TheContact></TheContact>
  </section>



</template>

<style scoped></style>
