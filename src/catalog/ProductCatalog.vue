<template>
  <div>
    <h1>Catalog</h1>
    <span>Total Products: {{ productStore.products.length }} </span>
    <ul class="products">
      <li class="product-item" v-for="(product, index) in productStore.products" :key="index">
        <ProductInfo :product="product">
          <button class="cta" @click="addToCart(product)">Buy</button>
        </ProductInfo>
      </li>
    </ul>
  </div>
</template>

<!-- Composition API -->
<script setup>
import ProductInfo from './product-info/ProductInfo.vue'

import { useProductStore } from '@/stores/product-options.js' // load data by using synchronous action
import { useCartStore } from '@/stores/cart-options.js'

const cartStore = useCartStore()
const productStore = useProductStore()

productStore.getProducts()

const { addToCart } = cartStore // or by calling cartStore.addToCart(product)

</script>

<style scoped>
.products {
  margin: 0 100px;
}

.product-item {
  border-bottom: 2px solid #999;
}
</style>