import type { loginInput, registerInput } from "@/models/types";
import { defineStore } from "pinia";
import { inject } from "vue";
import toastService from "@/plugins/toast";

export const useAuthStore = defineStore("authStore", () => {
  const $axios: any = inject("$axios");

  const loginUser = async (loginPayload: loginInput) => {
    try {
      const response = await $axios.post(
        "/users/auth/login",
        loginPayload
      );
      return response.data;
    } catch (error: any) {
      if (error.response.data.errors) {
        let errorMessage = `😕 ${error.response.data.errors[0].message}`;
        toastService.default(errorMessage);
      } else {
        let errorMessage = `😕 ${error.response.data.message}`;
        toastService.default(errorMessage);
      }
    }
  };
  const registerUser = async (registerPayload: registerInput) => {
    try {
      const response = await $axios.post(
        "/users/auth/register",
        registerPayload
      );
      return response.data;
    } catch (error: any) {
      if (error.response.data.errors) {
        let errorMessage = `😕 ${error.response.data.errors[0].message}`;
        toastService.default(errorMessage);
      } else {
        let errorMessage = `😕 ${error.response.data.message}`;
        toastService.default(errorMessage);
      }
    }
  };

  return {
    loginUser,
    registerUser,
  };
});
