import { defineStore } from "pinia";
import { ref, Ref, computed } from "vue";
import { Product } from "../classes/Product";
import { groupBy } from "lodash";

export const useCartItems = defineStore("cartItems", () => {
  const cartItems: Ref<Array<Product>> = ref([]);
  const quantity = computed(() => {
    return cartItems.value.length || 0;
  });
  const isEmpty = computed(() => {
    return cartItems.value.length == 0;
  });
  const groupItems = computed(() => {
    return groupBy(cartItems.value, (item) => item.name);
  });
  const groupItemByName = computed(() => (name) => {
    const test = groupBy(cartItems.value, (item) => item.name);
    return test[name].length;
  });
  const addItem = (product: Product, quantity: number) => {
    for (let index = 0; index < quantity; index++) {
      cartItems.value.push({ ...product });
    }
  };

  return { cartItems, isEmpty, groupItems, groupItemByName, quantity, addItem };
});
