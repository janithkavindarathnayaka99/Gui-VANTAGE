<script setup lang="ts">
import { onMounted, ref } from 'vue'
import ProductCard from './ProductCard.vue'
import { useProducts } from '../composables/useProducts'
import { useAppState } from '../composables/useAppState'

const { products, loading, error, fetchProducts } = useProducts()
const { addToCart, loadCart } = useAppState()
const skip = ref(0)
const hasMore = ref(true)
const limit = 8

const loadProducts = async (append = false) => {
  const total = await fetchProducts(limit, skip.value, append)
  hasMore.value = products.value.length < total
}

const loadMore = async () => {
  if (!hasMore.value) return
  skip.value += limit
  await loadProducts(true)
}

onMounted(async () => {
  loadCart()
  skip.value = 0
  await loadProducts(false)
})
</script>

<template>
  <section class="bg-surface-container-low py-32 px-16">
    <div class="max-w-[1440px] mx-auto">
      <div class="flex items-center gap-4 mb-16">
        <h2 class="font-headline-md text-headline-md text-white">NEW ARRIVALS</h2>
        <div class="h-px flex-grow bg-white/10"></div>
      </div>

      <div v-if="loading" class="text-white">Loading...</div>
      <div v-else-if="error" class="text-red-400">{{ error }}</div>
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

        <div v-if="hasMore" class="mt-12 flex justify-center">
          <button
            @click="loadMore"
            class="border border-white/20 text-white px-12 py-4 font-label-caps hover:border-[#BDFF00] hover:text-[#BDFF00] transition-colors"
          >
            <div v-if="loading" class="mx-auto h-5 w-5 rounded-full border-2 border-white/20 border-t-white animate-spin"></div>
            <span v-else>LOAD MORE</span>
          </button>
        </div>
      </div>
    </div>
  </section>
</template>
