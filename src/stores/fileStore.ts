import { defineStore } from "pinia";
import { inject } from "vue";
import toastService from "@/plugins/toast";

export const useFileStore = defineStore("fileStore", () => {
  const $axios: any = inject("$axios");
  const uploadFile = async (formData : any) => {
    try {
      const response = await $axios.post(
        "/common/file/upload",
        formData
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
    uploadFile,
  };
});
