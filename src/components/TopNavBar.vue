<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAppState } from '../composables/useAppState'

const router = useRouter()
const { cart, loadCart } = useAppState()
loadCart()

const count = computed(() => cart.value.reduce((s, i) => s + i.quantity, 0))
const searchOpen = ref(false)
const searchQuery = ref('')

const handleSearch = () => {
  router.push({ name: 'search', query: { q: searchQuery.value } })
  searchOpen.value = false
}
</script>

<template>
  <nav class="fixed top-0 w-full z-50 bg-[#050505]/80 backdrop-blur-2xl border-b border-white/10">
    <div class="flex justify-between items-center px-16 py-6 max-w-[1440px] mx-auto">
      <router-link to="/" class="text-2xl font-bold tracking-widest text-white font-headline-md">VANTAGE</router-link>
      <div class="hidden md:flex items-center gap-10 font-manrope font-medium tracking-tight">
        <router-link to="/#collections" class="text-white border-b-2 border-[#BDFF00] pb-1 hover:text-white transition-colors duration-300">Collections</router-link>
        <router-link to="/#new-arrivals" class="text-white/40 hover:text-white transition-colors duration-300">New Arrivals</router-link>
        <router-link to="/#maison" class="text-white/40 hover:text-white transition-colors duration-300">Archives</router-link>
        <router-link to="/#maison" class="text-white/40 hover:text-white transition-colors duration-300">Maison</router-link>
      </div>
      <div class="flex items-center gap-6">
        <button @click="searchOpen = !searchOpen" class="text-white hover:text-[#BDFF00] transition-all scale-95 active:opacity-80">
          <span class="material-symbols-outlined" data-icon="search">search</span>
        </button>
        <router-link to="/login" class="text-white hover:text-[#BDFF00] transition-all scale-95 active:opacity-80">
          <span class="material-symbols-outlined" data-icon="person">person</span>
        </router-link>
        <router-link to="/cart" class="text-white hover:text-[#BDFF00] transition-all scale-95 active:opacity-80 relative">
          <span class="material-symbols-outlined" data-icon="shopping_bag">shopping_bag</span>
          <span class="absolute -top-1 -right-1 bg-primary-container text-on-primary-container text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full">{{ count }}</span>
        </router-link>
      </div>
    </div>
  </nav>
  <div v-if="searchOpen" class="fixed top-[73px] left-0 w-full z-40 bg-[#050505]/95 backdrop-blur-2xl border-b border-white/10 px-16 py-6 flex items-center gap-4">
    <input
      v-model="searchQuery"
      type="text"
      placeholder="SEARCH PRODUCTS..."
      class="flex-1 bg-transparent border-b border-white/20 pb-2 text-white outline-none font-label-caps tracking-widest placeholder:text-white/20"
      @keyup.enter="handleSearch"
      autofocus
    />
    <button @click="searchOpen = false" class="text-white/40 hover:text-white">✕</button>
  </div>
</template>
