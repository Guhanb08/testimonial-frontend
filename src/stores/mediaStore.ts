import { defineStore } from "pinia";
import { ref } from "vue";

export const useMediaStore = defineStore("mediaStore", () => {
  const counter = ref<number>(0);
  const selectedVideoDevice = ref<string | undefined>(undefined);
  const selectedAudioDevice = ref<string | undefined>(undefined);
  const increment = () => {
    counter.value++;
  };
  const decrement = () => {
    counter.value--;
  };
  return {
    selectedVideoDevice,
    selectedAudioDevice,
    counter,
    increment,
    decrement,
  };
});
