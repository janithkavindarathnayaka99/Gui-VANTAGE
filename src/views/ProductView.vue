<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { useAppState } from '../composables/useAppState'

const route = useRoute()
const product = ref<any>(null)
const loading = ref(false)
const error = ref<string | null>(null)
const { addToCart } = useAppState()

onMounted(async () => {
  const id = Number(route.params.id)
  if (!id) return
  loading.value = true
  try {
    const res = await fetch(`https://dummyjson.com/products/${id}`)
    product.value = await res.json()
  } catch (err: any) {
    error.value = err?.message || String(err)
  } finally {
    loading.value = false
  }
})
</script>

<template>
  <div class="min-h-screen pt-24 px-16 max-w-[1440px] mx-auto">
    <div v-if="loading" class="text-white">Loading...</div>
    <div v-else-if="error" class="text-red-400">{{ error }}</div>
    <div v-else-if="product" class="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div>
        <img :src="product.images?.[0] || product.thumbnail" class="w-full h-[600px] object-cover glass-panel" />
      </div>
      <div>
        <h1 class="text-4xl font-display-lg text-white mb-4">{{ product.title }}</h1>
        <div class="text-white/40 mb-6">{{ product.brand }} — {{ product.category }}</div>
        <div class="text-2xl text-white mb-6">€{{ product.price }}</div>
        <p class="text-white/60 mb-8">{{ product.description }}</p>
        <div class="flex gap-4">
          <button @click="addToCart(product)" class="bg-primary-container text-on-primary-container py-4 px-6 font-bold">ADD TO BAG</button>
          <button class="py-4 px-6 border border-white/10 text-white">ADD TO WISHLIST</button>
        </div>
      </div>
    </div>
  </div>
</template>
