import { defineStore } from "pinia"
import { ref, computed } from "vue"
import { useProductStore } from "./product"

// using setup store approach
export const useCartStore = defineStore('cart', () => {
  // we can optimize the memory by storing a list of product ids in the cart
  // instead of the product object
  const productStore = useProductStore()
  const productIds = ref([])
  // const cart = ref([])

  const cart = computed(() => productIds.value.map(id => productStore.products.find(p => p.id === id)))
  const cartTotal = computed(() => cart.value.reduce((prev, cur) => prev += cur.price, 0))

  // actions
  function removeFromCart(product) {
    // productIds.value = productIds.value.filter((p) => p !== product.id)
    const itemIndex = productIds.value.findIndex(id => id === product.id)
    productIds.value.splice(itemIndex, 1)
  }

  function addToCart(product) {
    productIds.value.push(product.id)
  }

  return {
    cart,
    cartTotal,
    removeFromCart,
    addToCart,
  }
})