<script setup lang="ts">
import { ref, onMounted, computed, watch } from 'vue'
import { useRoute } from 'vue-router'
import ProductCard from './ProductCard.vue'
import { useProducts } from '../composables/useProducts'
import { useAppState } from '../composables/useAppState'

const route = useRoute()
const { products, loading, error, total, fetchProducts } = useProducts()
const { addToCart, loadCart } = useAppState()

const skip = ref(0)
const LIMIT = 100
const loadingMore = ref(false)
const searchQuery = computed(() => {
  const q = route.query.q
  return typeof q === 'string' ? q.trim() : ''
})
const selectedCategory = computed(() => {
  const category = route.query.category
  return typeof category === 'string' ? category.trim().toLowerCase() : ''
})

const categoryMatches = (product: any, category: string) => {
  if (!category) return true
  const text = `${product.title} ${product.description} ${product.category}`.toLowerCase()
  return text.includes(category)
}

const filteredProducts = computed(() => {
  const q = searchQuery.value.toLowerCase()
  const category = selectedCategory.value
  return products.value.filter(product => {
    const text = `${product.title} ${product.description} ${product.category}`.toLowerCase()
    const matchesCategory = category ? categoryMatches(product, category) : true
    const matchesQuery = q ? text.includes(q) : true
    return matchesCategory && matchesQuery
  })
})

const hasMore = computed(() => false)

const loadProducts = async () => {
  skip.value = 0
  await fetchProducts(LIMIT, 0, false, searchQuery.value, selectedCategory.value)
}

onMounted(async () => {
  loadCart()
  await loadProducts()
})

watch([searchQuery, selectedCategory], async () => {
  await loadProducts()
})
</script>

<template>
  <section class="bg-surface-container-low py-32 px-16">
    <div class="max-w-[1440px] mx-auto">
      <div class="flex items-center gap-4 mb-6">
        <div>
          <h2 class="font-headline-md text-headline-md text-white">
            {{ selectedCategory ? `${selectedCategory.toUpperCase()} COLLECTION` : (searchQuery ? `SEARCH RESULTS` : 'NEW ARRIVALS') }}
          </h2>
          <p v-if="selectedCategory" class="text-white/40 text-sm uppercase tracking-[0.16em] mt-1">Category: {{ selectedCategory }}</p>
          <p v-else-if="searchQuery" class="text-white/40 text-sm uppercase tracking-[0.16em] mt-1">Search query: "{{ searchQuery }}"</p>
        </div>
        <div class="h-px flex-grow bg-white/10"></div>
        <div class="text-white/30 text-sm">({{ filteredProducts.length }} items)</div>
      </div>

      <!-- Loading skeleton when first load -->
      <div v-if="loading && products.length === 0" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div v-for="n in 8" :key="n" class="animate-pulse">
          <div class="aspect-[3/4] bg-white/5 mb-4 rounded-sm"></div>
          <div class="h-4 bg-white/5 rounded mb-2 w-3/4"></div>
          <div class="h-4 bg-white/5 rounded w-1/2"></div>
        </div>
      </div>

      <div v-else-if="error" class="text-red-400 text-center py-12">Failed to load products: {{ error }}</div>

      <div v-else>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-gutter">
          <ProductCard
            v-for="p in filteredProducts"
            :key="p.id"
            :product="p"
            @addToCart="addToCart"
            @viewDetails="id => $router.push({ name: 'product', params: { id } })"
          />
        </div>

        <div v-if="hasMore" class="mt-16 flex justify-center">
          <button
            @click="loadMore"
            class="border border-white/20 text-white px-16 py-4 font-label-caps tracking-widest hover:border-[#BDFF00] hover:text-[#BDFF00] transition-all duration-300 mt-16 mx-auto block"
          >
            <span v-if="loadingMore" class="flex items-center gap-3">
              <span class="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin"></span>
              LOADING...
            </span>
            <span v-else>LOAD MORE</span>
          </button>
        </div>

        <div v-if="!hasMore && products.length > 0" class="text-center mt-16 text-white/20 font-label-caps tracking-widest text-sm">
          — END OF CATALOGUE —
        </div>
      </div>
    </div>
  </section>
</template>
