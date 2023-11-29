import type { loginInput , registerInput } from "@/models/types";
import { defineStore } from "pinia";
import { inject } from "vue";
export const useAuthStore = defineStore("authStore", () => {
  const $axios: any = inject("$axios");


  const loginUser = async (loginPayload : loginInput) => {
    try {
      const response = await $axios.post("/users/auth", loginPayload);
      return response.data;
    } catch (error: any) {
      return error.response.data;
    }
  };


  const registerUser = async (registerPayload : registerInput) => {
    try {
      const response = await $axios.post("/users/auth", registerPayload);
      return response.data;
    } catch (error: any) {
      return error.response.data;
    }
  };

  

  return {
    loginUser,
    registerUser
  };
});
