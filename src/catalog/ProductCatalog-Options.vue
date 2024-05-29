<template>
  <div>
    <h1>Catalog</h1>
    <span>Total Products: {{ products.length }} </span>
    <ul class="products">
      <li class="product-item" v-for="(product, index) in products" :key="index">
        <ProductInfo :product="product">
          <button class="cta" @click="addToCart(product)">Buy</button>
        </ProductInfo>
      </li>
    </ul>
  </div>
</template>

<!-- Options API -->
<script>
import ProductInfo from './product-info/ProductInfo.vue'
import { useProductStore } from '@/stores/product-options.js' // load data by using synchronous action
import { useCartStore } from '@/stores/cart-options.js'

export default {
  components: {
    ProductInfo,
  },
  setup() {
    const cartStore = useCartStore()
    const productStore = useProductStore()
    return {
      cartStore,
      productStore,
    }
  },
  // To access the productStore by using this.productStore
  created() {
    this.productStore.getProducts()
  },
  // When you want to expose products state from a store to your components template,
  //  you do that as a computed property on your component.
  computed: {
    products() {
      return this.productStore.products
    },
  },
  // You can either access your stores directly in your template, or you can expose state as computed properties
  //  and actions as methods on your component.
  methods: {
    addToCart(product) {
      this.cartStore.addToCart(product)
      console.log('cartStore.cart.length:', this.cartStore.cart.length)
    },
  },
}

</script>

<style scoped>
.products {
  margin: 0 100px;
}

.product-item {
  border-bottom: 2px solid #999;
}
</style>