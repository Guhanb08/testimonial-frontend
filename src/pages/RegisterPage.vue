<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useAuthStore } from "@/stores/authStore";
import { useRoute,useRouter, RouterView } from "vue-router";
const route = useRoute();
const router = useRouter();

const authStore = useAuthStore();
import toastService from "@/plugins/toast";
import { ZodError, set } from "zod";
import { registerSchema } from "@/schemas/authSchema";

const onSubmit = async (values: any) => {
  try {
    /* const validatedValues = registerSchema.parse(values);
    console.log(validatedValues); */
    let response = await authStore.registerUser(values);
    if (response) {
      toastService.default(`🎉 ${response.message}`);
      setTimeout(() => {
        router.push({ name: "signin" });
      }, 1000);
    }
  } catch (error: any) {
    if (error instanceof ZodError) {
      toastService.default(error.errors[0].message);
    } else {
      toastService.default(error.message);
    }
  }
};



</script>

<template>
  <section class="bg-gray-100 min-h-screen">
    <div class="max-w-3xl mx-auto">
      <div class="text-center pt-20">
        <h3 class="text-3xl leading-[1.25] font-bold">Sign up for free 🤗</h3>
        <p class="text-l py-4 text-gray-600">
          You will get 2 video and 10 text testimonial credits for FREE!
        </p>
      </div>

      <div
        class="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8"
      >
        <div class="mt-0 sm:mx-auto sm:w-full sm:max-w-sm">
          <Form class="space-y-6" @submit="onSubmit" v-slot="{ errors }">
            <div>
              <label
                for="user_name"
                class="block text-sm font-medium leading-6 text-gray-900"
                >First Name
              </label>
              <div class="mt-2">
                <Field
                  id="user_name"
                  name="user_name"
                  type="text"
                  placeholder="Your first name"
                  autocomplete="user_name"
                  class="block w-full rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-violet-600 sm:text-sm p-3"
                />
              </div>
            </div>

            <div>
              <label
                for="email"
                class="block text-sm font-medium leading-6 text-gray-900"
                >Email
              </label>
              <div class="mt-2">
                <Field
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
                <Field
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Password"
                  autocomplete="current-password"
                  class="block w-full rounded-md border-0 p-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-violet-600 sm:text-sm"
                />
              </div>
            </div>
            <div>
              <label class="inline-flex items-start">
                <Field
                  type="checkbox"
                  name="terms"
                  :value="true"
                  class="mt-1 rounded border-gray-300 text-violet-600 shadow-sm focus:border-violet-300 focus:ring focus:ring-violet-200 focus:ring-opacity-50"
                />
                <span class="ml-2 text-xs text-gray-600"
                  >I agree to the
                  <a
                    href="#"
                    class="font-semibold leading-5 text-violet-600 hover:text-violet-500"
                    >Testimonial Terms of Service</a
                  >
                  and I'm aware my personal data is processed in accordance with
                  our
                  <a
                    href="#"
                    class="font-semibold leading-5 text-violet-600 hover:text-violet-500"
                    >Privacy Policy</a
                  >. Please read it carefully.
                </span>
              </label>
            </div>

            <div>
              <button
                type="submit"
                class="flex w-full justify-center rounded-md bg-violet-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-violet-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-600"
              >
                Sign Up
              </button>
            </div>
          </Form>

          <p class="mt-10 text-center text-sm text-gray-500">
            Already have an account?
            <router-link
              to="signin"
              class="font-semibold leading-6 text-violet-600 hover:text-violet-500"
              >Sign In</router-link>
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped></style>
