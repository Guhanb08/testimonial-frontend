<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useAuthStore} from '@/stores/authStore';

import { useRoute, RouterView } from "vue-router";
const route = useRoute();
const articleStore = useAuthStore();

const hideFooter = ref(route.meta);

console.log("hideFooter", hideFooter.value);


const onRegister = async () => {
  const res = await articleStore.registerUser(
    
  );
  console.log("res", res);
};

</script>

<template>
  <section class="bg-gray-100 min-h-screen">
    <div class="max-w-3xl mx-auto">
      <div class="text-center">
        <h3 class="text-3xl leading-[1.25] font-bold">Sign up for free 🤗</h3>
        <p class="text-l py-4 text-gray-600">
          You will get 2 video and 10 text testimonial credits for FREE!
        </p>
      </div>

      <div
        class="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8"
      >
        <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form class="space-y-6" action="#" method="POST">
            <div>
              <label
                for="email"
                class="block text-sm font-medium leading-6 text-gray-900"
                >Email
              </label>
              <div class="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Your Email"
                  autocomplete="email"
                  class="block w-full rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-violet-600 sm:text-sm p-3"
                />
              </div>
            </div>

            <div>
              <div class="flex items-center justify-between">
                <label
                  for="password"
                  class="block text-sm font-medium leading-6 text-gray-900"
                  >Password</label
                >
              </div>
              <div class="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Password"
                  autocomplete="current-password"
                  class="block w-full rounded-md border-0 p-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-violet-600 sm:text-sm"
                />
              </div>
              <div class="text-sm mt-2">
                <router-link
                  to="#"
                  class="text-violet-600 hover:text-violet-600"
                  >Forgot password?
                </router-link>
              </div>
            </div>

            <div>
              <button
                type="submit"
                class="flex w-full justify-center rounded-md bg-violet-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-violet-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-600"
              >
                Sign in
              </button>
            </div>
          </form>

          <p class="mt-10 text-center text-sm text-gray-500">
            Don't have an account?
            <a
              href="#"
              class="font-semibold leading-6 text-violet-600 hover:text-violet-500"
              >Sign Up</a
            >
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped></style>
