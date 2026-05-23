<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import ProductCard from './ProductCard.vue'
import { useProducts } from '../composables/useProducts'
import { useAppState } from '../composables/useAppState'

const { products, loading, error, total, fetchProducts } = useProducts()
const { addToCart, loadCart } = useAppState()

const skip = ref(0)
const LIMIT = 8
const loadingMore = ref(false)
const hasMore = computed(() => products.value.length < total.value)

const loadMore = async () => {
  if (!hasMore.value) return
  skip.value += LIMIT
  loadingMore.value = true
  await fetchProducts(LIMIT, skip.value, true)
  loadingMore.value = false
}

onMounted(async () => {
  loadCart()
  skip.value = 0
  await fetchProducts(LIMIT, 0, false)
})
</script>

<template>
  <section class="bg-surface-container-low py-32 px-16">
    <div class="max-w-[1440px] mx-auto">
      <div class="flex items-center gap-4 mb-6">
        <h2 class="font-headline-md text-headline-md text-white">NEW ARRIVALS</h2>
        <div class="h-px flex-grow bg-white/10"></div>
        <div class="text-white/30 text-sm">({{ products.length }} items)</div>
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
            v-for="p in products"
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
