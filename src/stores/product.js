import { defineStore } from "pinia"
import { ref } from "vue"

// import productData from '@/catalog/product-data'

export const useProductStore = defineStore('products', () => {
  const products = ref([])

  // private functions listed here
  // actions
  // function getProducts() {
  //   products.value = productData
  // }

// asynchronous call to get products data from our API
async function getProducts() {
    // fetch('http://localhost:8081/api/products') // will return CORS error
    // console.log('FRONTEND_BASEURL:', import.meta.env.VITE_FRONTEND_BASEURL)
    console.log('call getProducts() API')
    const response = await fetch('/api/products')
    const returnedProducts = await response.json()
    products.value = returnedProducts
    return returnedProducts
  }

  return {
    products,
    getProducts,
  }
})
