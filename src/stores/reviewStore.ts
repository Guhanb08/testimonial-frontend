import { defineStore } from "pinia";
import { inject } from "vue";
import toastService from "@/plugins/toast";

export const useReviewStore = defineStore("reviewStore", () => {
  const $axios: any = inject("$axios");

  const createReview = async (reviewPayload : any) => {
    try {
      const response = await $axios.post(
        "/reviews/master",
        reviewPayload
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
    createReview
  };
});
