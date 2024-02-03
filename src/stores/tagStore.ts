import { defineStore } from "pinia";
import { inject } from "vue";
import toastService from "@/plugins/toast";

export const useTagStore = defineStore("tagStore", () => {
  const $axios: any = inject("$axios");

  const createTag = async (tagPayload : any) => {
    try {
      const response = await $axios.post(
        "/reviews/tags",
        tagPayload
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

  const fetchTagByUserId = async () => {
    try {
      const response = await $axios.get(
        `/reviews/tags/user/tags`,
      );
      return response.data;
    } catch (error: any) {
      console.log(error)
    }
  };


  return {
    createTag,
    fetchTagByUserId
  };
});
