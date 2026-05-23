<script setup lang="ts">
import { computed } from 'vue'
import { useAppState } from '../composables/useAppState'

const { cart, addToCart, removeFromCart, updateQuantity } = useAppState()

const subtotal = computed(() => cart.value.reduce((sum, item) => sum + item.product.price * item.quantity, 0))
</script>

<template>
  <div class="min-h-screen pt-24 px-16 max-w-[1440px] mx-auto">
    <h1 class="font-display-lg text-white mb-6">Your Bag</h1>
    <div v-if="cart.length === 0" class="text-white/60">Your bag is empty.</div>
    <div v-else class="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div class="lg:col-span-2 space-y-6">
        <div v-for="item in cart" :key="item.product.id" class="flex gap-6 items-start bg-surface-container p-4 rounded-sm">
          <img :src="item.product.thumbnail || item.product.images[0]" class="w-32 h-40 object-cover" />
          <div class="flex-1">
            <h3 class="text-white font-medium">{{ item.product.title }}</h3>
            <p class="text-white/40 text-sm">{{ item.product.brand || item.product.category }}</p>
            <div class="flex items-center gap-4 mt-4">
              <div class="flex items-center border border-white/10">
                <button @click="updateQuantity(item.product.id, item.quantity - 1)" class="px-3 py-2">-</button>
                <div class="px-4 py-2">{{ item.quantity }}</div>
                <button @click="updateQuantity(item.product.id, item.quantity + 1)" class="px-3 py-2">+</button>
              </div>
              <button @click="removeFromCart(item.product.id)" class="text-white/40 hover:text-error">Remove</button>
            </div>
          </div>
          <div class="text-white">€{{ (item.product.price * item.quantity).toFixed(2) }}</div>
        </div>
      </div>

      <aside class="glass-panel p-6 rounded-sm">
        <div class="flex justify-between items-center mb-4">
          <span class="text-white/60">Subtotal</span>
          <span class="text-white">€{{ subtotal.toFixed(2) }}</span>
        </div>
        <button class="w-full py-4 bg-primary-container text-on-primary-container font-bold mb-4">Proceed to Checkout</button>
        <router-link to="/" class="w-full block text-center py-4 border border-white/10 text-white hover:border-[#BDFF00] hover:text-[#BDFF00] transition-colors rounded-sm">Continue Shopping</router-link>
      </aside>
    </div>
  </div>
</template>
