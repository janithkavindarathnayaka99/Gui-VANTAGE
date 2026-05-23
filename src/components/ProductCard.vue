<script setup lang="ts">
import type { Product } from '../types'

defineProps<{
  product: Product
}>()

const emit = defineEmits<{
  (e: 'viewDetails', id: number): void
  (e: 'addToCart', product: Product): void
}>()
</script>

<template>
  <div class="group cursor-pointer" @click="emit('viewDetails', product.id)">
    <div class="relative aspect-[3/4] overflow-hidden mb-6 bg-[#121212]/60 backdrop-blur-[20px] border border-white/[0.08] rounded-sm">
      <img 
        :src="product.images[0] || product.thumbnail" 
        :alt="product.title" 
        class="w-full h-full object-cover grayscale transition-all duration-500 group-hover:grayscale-0 group-hover:scale-105" 
      />
      
      <!-- Tags / Badges -->
      <div v-if="product.stock < 10 || product.discountPercentage > 10" class="absolute top-4 left-4">
        <span class="bg-[#BDFF00] text-black font-semibold tracking-widest text-[10px] px-2 py-1 uppercase">
          {{ product.stock < 10 ? 'LIMITED' : 'SALE' }}
        </span>
      </div>

      <!-- Hover Overlay -->
      <div class="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/10">
        <button 
          @click.stop="emit('addToCart', product)"
          class="bg-[#BDFF00] text-black px-6 py-3 font-semibold tracking-widest text-xs flex items-center gap-2 transform translate-y-4 group-hover:translate-y-0 transition-transform hover:bg-[#a5e000]"
        >
          <!-- Using inline SVG for the shopping bag icon since external icon fonts might not be loaded yet -->
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/>
            <path d="M3 6h18"/>
            <path d="M16 10a4 4 0 0 1-8 0"/>
          </svg>
          ADD TO BAG
        </button>
      </div>
    </div>
    
    <div class="flex justify-between items-start gap-4">
      <div class="flex-1 overflow-hidden">
        <h4 class="text-lg font-medium text-white mb-1 truncate" :title="product.title">{{ product.title }}</h4>
        <p class="text-white/40 text-sm uppercase truncate">{{ product.brand || product.category }}</p>
      </div>
      <span class="text-white text-lg font-medium">${{ product.price.toFixed(2) }}</span>
    </div>
  </div>
</template>

<style scoped>
/* Glassmorphism properties are handled directly in the template via Tailwind classes */
</style>
