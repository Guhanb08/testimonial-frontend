import type { spaceInput } from "@/models/types";
import { defineStore } from "pinia";
import { inject } from "vue";
import toastService from "@/plugins/toast";

export const useSpaceStore = defineStore("spaceStore", () => {
  const $axios: any = inject("$axios");

  const createSpace = async (spacePayload : any) => {
    try {
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

  const fetchSpaceByUserId = async (id:number) => {
    try {
      const response = await $axios.get(
        `/spaces/master/fetch/user`,
      );
      return response.data;
    } catch (error: any) {
      console.log(error)
    }
  };

  const fetchSpaceBySlug = async (slug:string) => {
    try {
      const response = await $axios.get(
        `/spaces/master/slug/${slug}`,
      );
      return response.data;
    } catch (error: any) {
      console.log(error)
    }
  };
  return {
    createSpace,
    fetchSpaceByUserId,
    fetchSpaceBySlug
  };
});
