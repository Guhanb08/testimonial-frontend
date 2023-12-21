import type { spaceInput } from "@/models/types";
import { defineStore } from "pinia";
import { inject } from "vue";
import toastService from "@/plugins/toast";

export const useSpaceStore = defineStore("spaceStore", () => {
  const $axios: any = inject("$axios");

  const createSpace = async (spacePayload : any) => {
    try {
      spacePayload.user_id = 1;
      const response = await $axios.post(
        "/spaces/master",
        spacePayload
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
    createSpace,
  };
});
