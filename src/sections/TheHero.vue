<script setup lang="ts">
import TrustedCustomer from '@/sections/TrustedCustomer.vue'
</script>

<template>
  <div class="max-container max-w-6xl mx-auto">
    <div class="relative">
      <div class="max-w-3xl mx-auto text-center">
        <div class="text-center">
          <h3 class="text-4xl md:text-5xl leading-[1.25] font-bold">
            Get testimonials from your customers with ease
          </h3>
          <p class="text-l md:text-xl py-8 text-gray-600">
            Collecting testimonials is hard, we get it! So we built Testimonial. In minutes, you can
            collect text and video testimonials from your customers with no need for a developer or
            website hosting.
          </p>
        </div>
        <div class="mt-3 mb-12">
          <div class="flex flex-col sm:flex-row justify-center gap-4">
            <button class="bg-violet-600 text-white px-7 py-3 rounded">Try Free Now</button>
            <button
              class="border border-violet-600 px-7 py-3 rounded flex items-center justify-center"
            >
              Talk to us
              <div class="flex items-center -space-x-1 ms-3">
             
                <img
                  class="w-[25px] rounded-full"
                  src="@/assets/images/common/ttous2.jpg"
                  alt=""
                />
                <img
                  class="w-[25px] rounded-full"
                  src="@/assets/images/common/ttous3.png"
                  alt=""
                />
                <img
                  class="w-[25px] rounded-full"
                  src="@/assets/images/common/ttous4.png"
                  alt=""
                />
                <img
                  class="w-[25px] rounded-full"
                  src="@/assets/images/common/ttous1.png"
                  alt=""
                />
              </div>
            </button>
          </div>
          <div class="text-center flex  flex-col sm:flex-row items-center justify-center mt-4">
            <p class="text-gray-500 text-sm">Get started with free credits on us.</p>
            <a
              class="flex align-center justify-center text-gray-800 font-medium ms-2 underline text-sm"
              href=""
              >See our pricing <IconArrowRight color="black" :size="20" stroke-width="1"
            /></a>
          </div>
        </div>
        <div class=" hidden lg:block absolute bottom-0 right-0">
          <div class="text-center flex items-center justify-center mt-4">
            <p class="text-gray-500 text-sm">Our customer</p>
            <a
              class="flex align-center justify-center text-gray-800 font-medium ms-2 underline text-sm"
              href=""
              >Chris Lema
            </a>
          </div>
        </div>
      </div>
    </div>
    <div class="shadow-xl">
      <img class="w-full rounded-lg" src="@/assets/images/heroVideoImage.jpeg" alt="" />
    </div>
    <div class="py-10"></div>
    <TrustedCustomer></TrustedCustomer>
  </div>
</template>

<style scoped></style>
