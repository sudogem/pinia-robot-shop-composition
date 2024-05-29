import { ref, computed, onMounted, onUpdated } from 'vue'

// for multiple filter
// function filterResults(results, filters) {
//   const result = []
//   console.log('cc filters:', filters.value)
//   results.value.filter(product => {
//     for (const filter of filters.value) {
//       const field = 'category'
//       if (product[field] == filter[field]) result.push(product)
//     }
//   })
//   return result
// }

export default function useFilters(searchResults) {
  const filters = ref([{ category: 'All' }])

  const applyFilters = (filter) => {
    clearFilters()
    filters.value.push(filter)
  }
  const clearFilters = () => {
    filters.value = []
  }

  onMounted(() => console.log('useFilters onMounted() searchResults:', searchResults.value))
  onUpdated(() => {
    console.log('useFilters onUpdated() filters:', filters.value)
  })
  const filteredResults = computed(() => filterResults(searchResults, filters))

  function filterResults(results, filters) {
    return results.value.filter((product) => filters.value.every(
      (filter) => {
        const filterField = Object.keys(filter)[0]
        const filterValue = filter[filterField]
        if (filterValue.toLowerCase() !== 'all') {
          return product[filterField] === filterValue
        } else {
          return product
        }
      },
    ))
  }

  return {
    filters,
    applyFilters,
    clearFilters,
    filteredResults,
  }
}
