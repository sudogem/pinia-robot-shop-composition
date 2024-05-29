import { defineStore } from "pinia"
import { useProductStore } from "./product-options"


export const useCartStore = defineStore('cart', {
  state: () => ({
    productIds: [],
  }),
  getters: {
    // In order to get access to productIds state inside our getter we use the state parameter.
    // This is how you add a getter and how to access another store from inside a getter.
    // Just note that you will need to call the useProductStore call in every getter/action or
    //  inside the state function anywhere where you need to access data from another store.
    //  So you may end up calling your use...Store methods multiple times inside a single store.
    cart: (state) => {
      const productStore = useProductStore()

      return state.productIds.map(id => productStore.products.find(p => p.id === id))
    },
    // Note: Getter functions like cart are not part of this state parameter.
    // So we can't access this cart getter from this state parameter.
    // cartTotal: (state) => {
    //   return state.cart.value.reduce((prev, cur) => prev += cur.price, 0)
    // },
    // In order to access the getter cart functions is to define the cartTotal as a
    //   regular function unlike the cart function it is define as a property not a function.
    cartTotal() {
      return this.cart.reduce((prev, cur) => prev += cur.price, 0)
    },
  },
  actions: {
    // Note: use this keyword to access your store's state e.g. productIds inside an action
    // No need to call .value e.g. productIds.value
    addToCart(product) {
      this.productIds.push(product.id)
    },
    removeFromCart(product) {
      const itemIndex = this.productIds.findIndex(id => id === product.id)
      this.productIds.splice(itemIndex, 1)
    },
  },
})
