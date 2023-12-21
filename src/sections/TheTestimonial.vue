<script setup lang="ts">
</script>

<template>
  <div>
    <div class="max-w-6xl mx-auto">
      <div class="bg-yellow-50 rounded-sm px-10 py-8">
        <div class="flex gap-2">
          <IconStarFilled
            class="text-violet-500"
            v-for="i in 5"
            :key="i"
            color="black"
            :size="18"
            stroke-width="2"
          />
        </div>
        <div class="mt-6">
          <h3 class="text-xl md:text-2xl font-bold leading-[1.7]">
            We embedded Testimonial.to on the last page of our Prehireforms (candidates' skills
            assessment forms) and candidates' testimonials started coming in automatically!
            <span class="bg-yellow-100">
              Testimonials collection is now automated and we don't need to ask customers or
              candidates to drop us testimonials anymore!</span
            >
          </h3>
        </div>

        <div class="flex justify-between items-end mt-6">
          <div class="flex items-center gap-2">
            <div>
              <img class="rounded-full h-20" src="@/assets/images/common/avatar.png" alt="" />
            </div>
            <div>
              <h5 class="text-xl font-bold">Kam Ling</h5>
              <p>Co-Founder at Prehireforms.com</p>
            </div>
          </div>
          <div class="hidden md:block">
            <a class="" href="">
              <img class="h-8 mb-3" src="@/assets/images/logos/logo-dark.svg" alt="header-logo" />
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
