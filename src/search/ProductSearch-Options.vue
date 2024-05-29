<template>
  <div class="container">
    <div>
      <input placeholder="Enter Search Term" v-model="term" @input="searchTerm = $event.target.value" />
    </div>
    <div class="filters">
      <div class="filters-text">Filters:</div>
      <div><button @click="filter('Heads')" :class="getClass('Heads')">Heads</button></div>
      <div><button @click="filter('Arms')" :class="getClass('Arms')">Arms</button></div>
      <div><button @click="filter('Torsos')" :class="getClass('Torsos')">Torsos</button></div>
      <div><button @click="filter('Bases')" :class="getClass('Bases')">Bases</button></div>
      <div><button @click="clearFilters()" class="clearbtn">Clear Filters</button></div>
      <div><button @click="clearSearchbox()" class="clearbtn">Clear text</button></div>
    </div>
    <div>
      <ul class="products">
        <li class="product-item" v-for="(product, index) in pagedResults" :key="index">
          <ProductInfo :product="product">
            <button class="cta" @click="addToCart(product)">Buy</button>
          </ProductInfo>
        </li>
      </ul>
    </div>
    <div>
      <button @click="prevPage()" class="button-link">Previous Page</button>
      Showing {{ currentStartIndex }} to {{ currentEndIndex }} of {{ resultCount }} results
      <button @click="nextPage()" class="button-link">Next Page</button>
    </div>
  </div>
</template>

<!-- Options API -->
<script>
import { ref } from 'vue'
import "@/assets/common/style.css"
import ProductInfo from '@/catalog/product-info/ProductInfo.vue'

import useSearch from './useSearch'
import useFilters from './useFilters'
import usePagination from './usePagination'

import { useCartStore } from '@/stores/cart-options'

export default {
  components: {
    ProductInfo,
  },
  setup() {
    const cartStore = useCartStore()
    const searchTerm = ref('')
    const term = ref('')
    const { searchResults } = useSearch(searchTerm)

    const {
      filters,
      applyFilters,
      clearFilters,
      filteredResults,
    } = useFilters(searchResults)

    const {
      nextPage,
      prevPage,
      currentStartIndex,
      currentEndIndex,
      pagedResults,
    } = usePagination(filteredResults)

    return {
      cartStore,
      searchTerm,
      term,
      searchResults,
      filters,
      filteredResults,
      applyFilters,
      clearFilters,
      pagedResults,
      nextPage,
      prevPage,
      currentStartIndex,
      currentEndIndex,
    }
  },
  computed: {
    pagedResults1() {
      return this.pagedResults
    },
    resultCount() {
      return this.filteredResults.length
    },
  },
  methods: {
    filter(category) {
      const filtersObj = { category }
      this.applyFilters(filtersObj)
    },
    getClass(category) {
      return this.filters.some(f => f['category'] === category)
          ? 'cta' : ''
    },
    addToCart(product) {
      // this.cartStore.cart.push({ ...product })
      this.cartStore.addToCart(product)
      console.log('cartStore.cart.length:', this.cartStore.cart.length)
    },
    clearSearchbox() {
      this.term = ''
      this.searchTerm = ''
    },
  },
}
</script>
