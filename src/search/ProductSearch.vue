<template>
  <div class="container">
    <div>
      <input placeholder="Enter Search Term" v-model="term" @input="searchTerm = $event.target.value" />
    </div>
    <div class="filters">
      <div class="filters-text">Filters:</div>
      <div><button @click="filter('All')" :class="getClass('All')">All</button></div>
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
      <button @click="prevPage()" v-show="checkPrevPage(resultCount, currentStartIndex, currentEndIndex)" class="button-link">Previous Page</button>
      Showing {{ currentStartIndex }} to {{ currentEndIndex }} of {{ resultCount }} results

      <button @click="nextPage()" v-show="checkNextPage(resultCount, currentEndIndex)" class="button-link">Next Page</button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUpdated } from 'vue'
import "@/assets/common/style.css"
import ProductInfo from '@/catalog/product-info/ProductInfo.vue'

import useSearch from './useSearch'
import useFilters from './useFilters'
import usePagination from './usePagination'

import { useCartStore } from '@/stores/cart-options'
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
  currentPage,
  currentStartIndex,
  currentEndIndex,
  pagedResults,
} = usePagination(filteredResults)

const { addToCart } = cartStore

function filter(category) {
  // always set currentPage=1 to avoid pagination error
  currentPage.value = 1
  const filtersObj = { category }
  applyFilters(filtersObj)
}

function clearSearchbox() {
  term.value = ''
  searchTerm.value = ''
}

function getClass(category) {
  return filters.value.some(f => f['category'] === category)
    ? 'cta-tab'
    : ''
}

const resultCount = computed(() => filteredResults.value.length)

// function addToCart(product) {
//   cartStore.cart.push({ ...product })
//   console.log('dd cartStore.cart.length:', cartStore.cart.length)
// }

function checkPrevPage(resultCount, currentStartIndex, currentEndIndex) {
  if (currentStartIndex == 1 || (currentEndIndex < currentStartIndex)) {
    return false
  } else {
    return true
  }
}

function checkNextPage(resultCount, currentEndIndex) {
  return (resultCount == currentEndIndex) ? false : true
}

onMounted(async () => {
  console.log('aa onMounted resultCount:', resultCount.value)
})

onUpdated(() => {
  console.log('aa onUpdated resultCount:', resultCount.value)
})
</script>
