import { defineStore } from "pinia"

export const useProductStore = defineStore('products', {
  // state: () => {
  //   return {}
  // },
  // shorthand syntax
  state: () => ({
    products: [],
  }),
  actions: {
    // Note: use this keyword to access your store's state e.g. products inside an action
    // No need to call .value e.g. products.value
    async getProducts() {
      console.log('call getProducts() API')
      const response = await fetch('/api/products')
      const returnedProducts = await response.json()
      this.products = returnedProducts
      return returnedProducts
    },
  },
})
