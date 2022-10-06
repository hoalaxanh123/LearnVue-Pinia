import { defineStore } from "pinia";
import { ref, Ref, computed } from "vue";
import { Product } from "../classes/Product";
import { groupBy } from "lodash";
import { useUserAuth } from "./userAuthen";
import { useLocalStorage } from "@vueuse/core";

export const useCartItems = defineStore("cartItems", () => {
  const cartItems: Ref<Array<Product>> = ref(useLocalStorage("cartItems", []));
  const quantity = computed(() => {
    return cartItems.value.length || 0;
  });
  const isEmpty = computed(() => {
    return cartItems.value.length == 0;
  });
  const groupItems = computed(() => {
    const group = groupBy(cartItems.value, (item) => item.name);
    console.log("group :>> ", group);

    const keys = Object.keys(group);
    console.log("keys :>> ", keys);
    keys.sort();

    let result = {};
    keys.forEach((key) => {
      result[key] = group[key];
    });
    console.log("result :>> ", result);
    return result;
  });
  const getTotalMoney = computed(() => {
    return cartItems.value.reduce(
      (previous, currentElement) => previous + currentElement.price,
      0
    );
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
  const deleteItems = (itemName: string) => {
    cartItems.value = cartItems.value.filter(
      (item: Product) => item.name !== itemName
    );
  };

  const updateCount = (item: Product, quantity: number): void => {
    deleteItems(item.name);
    addItem(item, quantity);
  };

  const checkout = () => {
    const authStore = useUserAuth();
    alert(
      `User ${authStore.username} just bought ${quantity.value} items, total $${getTotalMoney.value}!`
    );
  };

  return {
    cartItems,
    isEmpty,
    groupItems,
    groupItemByName,
    getTotalMoney,
    quantity,
    addItem,
    deleteItems,
    updateCount,
    checkout,
  };
});
