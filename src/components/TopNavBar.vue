<script setup lang="ts">
import { computed } from 'vue'
import { useAppState } from '../composables/useAppState'

const { cart, loadCart } = useAppState()
loadCart()

const count = computed(() => cart.value.reduce((s, i) => s + i.quantity, 0))
</script>

<template>
  <nav class="fixed top-0 w-full z-50 bg-[#050505]/80 backdrop-blur-2xl border-b border-white/10">
    <div class="flex justify-between items-center px-16 py-6 max-w-[1440px] mx-auto">
      <div class="text-2xl font-bold tracking-widest text-white font-headline-md">VANTAGE</div>
      <div class="hidden md:flex items-center gap-10 font-manrope font-medium tracking-tight">
        <a class="text-white border-b-2 border-[#BDFF00] pb-1 hover:text-white transition-colors duration-300" href="#">Collections</a>
        <a class="text-white/40 hover:text-white transition-colors duration-300" href="#">New Arrivals</a>
        <a class="text-white/40 hover:text-white transition-colors duration-300" href="#">Archives</a>
        <a class="text-white/40 hover:text-white transition-colors duration-300" href="#">Maison</a>
      </div>
      <div class="flex items-center gap-6">
        <button class="text-white hover:text-[#BDFF00] transition-all scale-95 active:opacity-80">
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
</template>
