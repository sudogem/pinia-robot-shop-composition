<template>
  <div class="container">
    <h1>Your Cart</h1>
    <div class="empty-cart" v-if="cart.length === 0">
      You have no items in your cart
    </div>
    <ul class="cart" v-if="cart.length > 0">
      <li class="cart-item" v-for="(product, index) in cart" :key="index">
        <ProductInfo :product="product">
          <button @click="removeFromCart(product)">Remove</button>
        </ProductInfo>
      </li>
    </ul>
    <div v-if="cart.length > 0" class="total">Total: {{ toCurrency(cartTotal) }}</div>
  </div>
</template>

<script setup>
import { toCurrency } from '@/shared/formatters'
import ProductInfo from '@/catalog/product-info/ProductInfo.vue'

import { storeToRefs } from 'pinia'
import { useCartStore } from '@/stores/cart-options'
const cartStore = useCartStore()

// Remember this: By declaring this extra variable e.g. cart, cartTotal, we essentially broke the reactivity
// that the pinia store was giving us.
// let cart = cartStore.cart
// let cartTotal = cartStore.cartTotal

// storeToRefs - destructure the cart store while maintaining reactivity.
// Only use storeToRefs for destructuring state, getters or calculated state.
// But actions you can actually destructure directly from the store using plain js destructure
let { cart, cartTotal } = storeToRefs(cartStore) // this 2 variables are actually refs
const { removeFromCart } = cartStore

</script>

<style scoped>
.cart {
  margin: 0 100px;
  border-top: 2px solid #999;
}

.cart-item {
  border-bottom: 2px solid #999;
}

.total {
  margin: 25px 175px 0 0;
  align-self: right;
  font-size: 25px;
  text-align: right;
}

.empty-cart {
  margin-top: 20px;
  font-size: 20px;
}
</style>