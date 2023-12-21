<script setup lang="ts">
import { ref, onMounted } from "vue";
import TheHero from "@/sections/TheHero.vue";
import toastService from "@/plugins/toast";


onMounted(() => {
toastService.default("👋 Welcome Back");
});
</script>

<template>
  <section class="padding-x padding-t">
    <div class="max-container max-w-6xl mx-auto">
      <div class="">
        <div class="mb-6">
          <h3 class="text-3xl font-semibold">Overview</h3>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          <div class="flex items-center border rounded-xl shadow-sm px-5 py-4">
            <div class="">
              <IconVideo color="gray" :size="25" stroke-width="2" />
            </div>
            <div class="ml-5">
              <p class="text-gray-600">Videos</p>
              <p class="font-semibold mt-1">0</p>
            </div>
          </div>
          <div class="flex items-center border rounded-xl shadow-sm px-5 py-4">
            <div class="">
              <IconBriefcase color="gray" :size="25" stroke-width="2" />
            </div>
            <div class="ml-5">
              <p class="text-gray-600">Videos credits</p>
              <p class="font-semibold mt-1">0</p>
            </div>
          </div>
          <div class="flex items-center border rounded-xl shadow-sm px-5 py-4">
            <div class="">
              <IconMoodSmile color="gray" :size="25" stroke-width="2" />
            </div>
            <div class="ml-5">
              <div class="">
                <p class="text-gray-600">Plan</p>
                <p class="font-semibold mt-1">
                  Free Plan 🥁
                  <a
                    href="/pricing"
                    class="ml-4 inline-flex items-center px-2.5 py-0.5 rounded-md border text-sm font-semibold bg-purple-100 text-purple-800 hover:bg-purple-200 border-purple-300"
                    >Upgrade</a
                  >
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="my-20">
        <div class="mb-6 flex justify-between">
          <h3 class="text-3xl font-semibold">Spaces</h3>
          <router-link to="/space">
            <button class="flex items-center bg-violet-500 hover:bg-violet-600 text-white px-4 py-2">
            <IconPlus color="white" :size="20" stroke-width="2" />
            <span class="ms-1">Create a new space</span>
          </button>
          </router-link>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          <div class="flex items-center border rounded-xl shadow-sm pe-5">
            <div class="border-r-2 border-gray-100">
              <img
                loading="lazy"
                class="bg-white object-contain inline-flex items-center justify-center w-20 h-20 rounded-xl cursor-pointer"
                src="https://firebasestorage.googleapis.com/v0/b/testimonialto.appspot.com/o/spaces%2Fkamalayurveda%2Flogo?alt=media&amp;token=34d44403-aeb8-4c4e-abd8-9cbd5f901c8e"
              />
            </div>
            <div class="ml-5 flex justify-between w-full items-center">
              <div class="w-full">
                <p class="text-gray-600">Testie</p>
                <div class="flex">
                  <p class="text-sm text-gray-500 w-1/2">
                    Video : <span>1</span>
                  </p>
                  <p class="text-sm text-gray-500 w-1/2">
                    Video : <span>1</span>
                  </p>
                </div>
              </div>
              <div class="">
                <IconSettings color="gray" :size="20" stroke-width="2" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped></style>
