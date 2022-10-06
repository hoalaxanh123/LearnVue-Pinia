<script setup>
import TheHeader from "@/components/TheHeader.vue";
import ProductCard from "@/components/ProductCard.vue";
// import products from "@/data/products.json";
import { useShopItems } from "./stores/shopItems";
import { useCartItems } from "./stores/cartItems";
const cartStore = useCartItems();
const itemStore = useShopItems();
itemStore.fetchItems();
</script>

<template>
  <div class="container">
    <TheHeader />
    <button @click="itemStore.fetchItems">Load</button>
    <hr />
    <h1 v-if="itemStore.loading">Loading...</h1>
    <ul v-else class="sm:flex flex-wrap lg:flex-nowrap gap-5">
      <ProductCard
        v-for="product in itemStore.shopItems"
        :key="product.name"
        :product="product"
        @addToCart="cartStore.addItem"
      />
    </ul>
  </div>
</template>
