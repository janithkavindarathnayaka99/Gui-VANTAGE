<script setup lang="ts">
import { onMounted } from 'vue'
import ProductCard from './ProductCard.vue'
import { useProducts } from '../composables/useProducts'
import { useAppState } from '../composables/useAppState'

const { products, loading, error, fetchProducts } = useProducts()
const { addToCart, loadCart } = useAppState()

onMounted(async () => {
  loadCart()
  await fetchProducts(12)
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
      <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-gutter">
        <ProductCard
          v-for="p in products"
          :key="p.id"
          :product="p"
          @addToCart="addToCart"
          @viewDetails="id => $router.push({ name: 'product', params: { id } })"
        />
      </div>
    </div>
  </section>
</template>
