<script setup lang="ts">
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { IconChevronDown, IconAnalyze, IconMenu2, IconShoppingBag , IconUsers, IconBook , IconDeviceMobile} from '@tabler/icons-vue'
</script>

<template>
  <header class="max-container py-5">
    <div class="flex justify-between items-center px-3">
      <div>
        <img class="h-10" src="@/assets/images/logos/logo-dark.svg" alt="header-logo" />
      </div>
      <nav class="hidden lg:block">
        <ul class="flex gap-2 items-center">
          <li>
            <Popover>
              <PopoverTrigger>
                <a
                  href="#"
                  class="flex items-center text-gray-600 hover:text-gray-700 font-medium hover:font-semibold px-4 py-2"
                  >Customers <IconChevronDown color="black" :size="20" stroke-width="2" />
                </a>
              </PopoverTrigger>
              <PopoverContent class="w-80 rounded-2xl shadow-sm hidden lg:block">
                <div class="">
                  <div
                    class="group relative flex items-center gap-x-6 rounded-lg p-4 text-sm leading-6 hover:bg-gray-50"
                  >
                    <div
                      class="flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white"
                    >
                      <IconUsers color="black" :size="20" stroke-width="1" />
                    </div>
                    <div class="flex-auto">
                      <a href="#" class="block font-semibold text-gray-600">
                        Agencies
                        <span class="absolute inset-0"></span>
                      </a>
                    </div>
                  </div>
                  <div
                    class="group relative flex items-center gap-x-6 rounded-lg p-4 text-sm leading-6 hover:bg-gray-50"
                  >
                    <div
                      class="flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white"
                    >
                      <IconShoppingBag color="black" :size="20" stroke-width="1" />
                    </div>
                    <div class="flex-auto">
                      <a href="#" class="block font-semibold text-gray-600">
                        eCommerce & Retails
                        <span class="absolute inset-0"></span>
                      </a>
                    </div>
                  </div>
                  <div
                    class="group relative flex items-center gap-x-6 rounded-lg p-4 text-sm leading-6 hover:bg-gray-50"
                  >
                    <div
                      class="flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white"
                    >
                      <IconBook color="black" :size="20" stroke-width="1" />
                    </div>
                    <div class="flex-auto">
                      <a href="#" class="block font-semibold text-gray-600">
                        Course Creators
                        <span class="absolute inset-0"></span>
                      </a>
                    </div>
                  </div>
                  <div
                    class="group relative flex items-center gap-x-6 rounded-lg p-4 text-sm leading-6 hover:bg-gray-50"
                  >
                    <div
                      class="flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white"
                    >
                      <IconAnalyze color="black" :size="20" stroke-width="1" />
                    </div>
                    <div class="flex-auto">
                      <a href="#" class="block font-semibold text-gray-600">
                        B2B Companies
                        <span class="absolute inset-0"></span>
                      </a>
                    </div>
                  </div>
                  <div
                    class="group relative flex items-center gap-x-6 rounded-lg p-4 text-sm leading-6 hover:bg-gray-50"
                  >
                    <div
                      class="flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white"
                    >
                      <IconDeviceMobile color="black" :size="20" stroke-width="1" />
                    </div>
                    <div class="flex-auto">
                      <a href="#" class="block font-semibold text-gray-600">
                        B2C Apps
                        <span class="absolute inset-0"></span>
                      </a>
                    </div>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          </li>
          <li>
            <a
              href="#"
              class="text-gray-600 hover:text-gray-700 font-medium hover:font-semibold px-4 py-2"
              >Features</a
            >
          </li>
          <li>
            <a
              href="#"
              class="text-gray-600 hover:text-gray-700 font-medium hover:font-semibold px-4 py-2"
              >Intergrations</a
            >
          </li>
          <li>
            <a
              href="#"
              class="text-gray-600 hover:text-gray-700 font-medium hover:font-semibold px-4 py-2"
              >Pricing</a
            >
          </li>
        </ul>
      </nav>
      <div class="hidden lg:block">
        <a href="#" class="px-2 py-4">Sign in</a>
        <a href="#" class="ms-3 px-5 py-3 bg-violet-600 text-white">Sign up</a>
      </div>
      <div class="lg:hidden">
        <IconMenu2 color="black" :size="35" stroke-width="1" />
      </div>
    </div>
  </header>
</template>

<style scoped></style>
