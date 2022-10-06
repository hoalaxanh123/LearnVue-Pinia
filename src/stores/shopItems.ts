import { defineStore } from "pinia";
import { ref, Ref } from "vue";
import { Product } from "../classes/Product";

export const useShopItems = defineStore("shopItems", () => {
  const shopItems: Ref<Array<Product>> = ref([]);
  const loading = ref(false);

  const fetchItems = () => {
    loading.value = true;
    fetch("http://localhost:5000/items")
      .then((sm) => {
        const data = sm.json();
        return data;
      })
      .then((data) => {
        shopItems.value = data;
      })
      .finally(() => {
        loading.value = false;
      });
  };

  return { loading, shopItems, fetchItems };
});
