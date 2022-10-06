import { defineStore } from "pinia";
import { ref } from "vue";
export const useUserAuth = defineStore("userAuth", () => {
  const username = ref("Vuong Nguyen");
  return { username };
});
