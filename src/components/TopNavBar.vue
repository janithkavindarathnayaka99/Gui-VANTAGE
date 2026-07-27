<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAppState } from '../composables/useAppState'

const router = useRouter()
const { cart, loadCart } = useAppState()
loadCart()

const count = computed(() => cart.value.reduce((s, i) => s + i.quantity, 0))
const searchOpen = ref(false)
const searchQuery = ref('')
const categoryOpen = ref(false)
const mobileOpen = ref(false)
const navRef = ref<HTMLElement | null>(null)

const categories = ['Outerwear', 'Tailoring', 'Knitwear', 'Accessories', 'Footwear']

const handleSearch = () => {
  router.push({ name: 'search', query: { q: searchQuery.value } })
  searchOpen.value = false
  mobileOpen.value = false
}

const closeMenus = () => {
  categoryOpen.value = false
  mobileOpen.value = false
}

const goToCategory = (category: string) => {
  router.push({ path: '/', hash: '#collections', query: { category: category.toLowerCase() } })
  closeMenus()
}

const handleDocumentClick = (event: MouseEvent) => {
  if (!navRef.value?.contains(event.target as Node)) {
    closeMenus()
  }
}

const handleEscape = (event: KeyboardEvent) => {
  if (event.key === 'Escape') {
    closeMenus()
    searchOpen.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', handleDocumentClick)
  document.addEventListener('keydown', handleEscape)
})

onBeforeUnmount(() => {
  document.removeEventListener('click', handleDocumentClick)
  document.removeEventListener('keydown', handleEscape)
})

const navLinkClass = 'relative py-2 text-[13px] font-medium uppercase tracking-[0.16em] text-white/55 transition-colors duration-200 after:absolute after:left-0 after:-bottom-1 after:h-px after:w-0 after:bg-[#C8FF00] after:transition-all after:duration-200 hover:text-white hover:after:w-full'
const mobileLinkClass = 'border-b border-white/[0.08] py-4 text-sm font-medium uppercase tracking-[0.16em] text-white/60 transition-colors hover:text-white'
</script>

<template>
  <nav ref="navRef" class="sticky top-0 z-[100] w-full border-b border-[rgba(255,255,255,0.08)] bg-black/[0.85] backdrop-blur-[12px]">
    <div class="mx-auto flex max-w-[1440px] items-center justify-between px-6 py-5 md:px-16">
      <router-link to="/" class="font-headline-md text-2xl font-bold tracking-widest text-white" @click="closeMenus">
        VANTAGE
      </router-link>

      <div class="hidden items-center gap-10 font-manrope md:flex">
        <router-link to="/#collections" class="relative py-2 text-[13px] font-medium uppercase tracking-[0.16em] text-white transition-colors duration-200 after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-full after:bg-[#C8FF00]">
          Collections
        </router-link>
        <router-link to="/#new-arrivals" :class="navLinkClass">New Arrivals</router-link>
        <router-link to="/#maison" :class="navLinkClass">Archives</router-link>

        <div class="relative" @mouseenter="categoryOpen = true" @mouseleave="categoryOpen = false">
          <button
            type="button"
            class="relative flex items-center gap-1.5 py-2 text-[13px] font-medium uppercase tracking-[0.16em] text-white/55 transition-colors duration-200 after:absolute after:left-0 after:-bottom-1 after:h-px after:w-0 after:bg-[#C8FF00] after:transition-all after:duration-200 hover:text-white hover:after:w-full"
            :aria-expanded="categoryOpen"
            aria-haspopup="true"
            @click.stop="categoryOpen = !categoryOpen"
          >
            Category
            <span class="material-symbols-outlined text-[16px] leading-none transition-transform duration-200" :class="{ 'rotate-180': categoryOpen }">expand_more</span>
          </button>

          <transition
            enter-active-class="transition duration-200 ease-out"
            enter-from-class="opacity-0 -translate-y-2"
            enter-to-class="opacity-100 translate-y-0"
            leave-active-class="transition duration-150 ease-in"
            leave-from-class="opacity-100 translate-y-0"
            leave-to-class="opacity-0 -translate-y-2"
          >
            <div v-if="categoryOpen" class="absolute left-1/2 top-full mt-5 w-64 -translate-x-1/2 border-t border-[#C8FF00] bg-[#111111] p-3 shadow-2xl shadow-black/40">
              <button
                v-for="category in categories"
                :key="category"
                type="button"
                class="flex w-full items-center justify-between px-4 py-3 text-left text-sm font-medium uppercase tracking-[0.12em] text-white transition-colors hover:text-[#C8FF00]"
                @click="goToCategory(category)"
              >
                {{ category }}
                <span class="material-symbols-outlined text-[16px]">arrow_forward</span>
              </button>
            </div>
          </transition>
        </div>
      </div>

      <div class="flex items-center gap-4 md:gap-6">
        <button type="button" @click="searchOpen = !searchOpen" class="text-white/80 opacity-80 transition-opacity hover:opacity-100 active:opacity-70">
          <span class="material-symbols-outlined text-[20px]" data-icon="search">search</span>
        </button>
        <router-link to="/login" class="text-white/80 opacity-80 transition-opacity hover:opacity-100 active:opacity-70">
          <span class="material-symbols-outlined text-[20px]" data-icon="person">person</span>
        </router-link>
        <router-link to="/cart" class="relative text-white/80 opacity-80 transition-opacity hover:opacity-100 active:opacity-70">
          <span class="material-symbols-outlined text-[20px]" data-icon="shopping_bag">shopping_bag</span>
          <span class="absolute -right-2 -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-[#C8FF00] text-[10px] font-bold leading-none text-black">{{ count }}</span>
        </router-link>

        <button type="button" class="text-white/80 opacity-80 transition-opacity hover:opacity-100 md:hidden" :aria-expanded="mobileOpen" @click.stop="mobileOpen = !mobileOpen">
          <span class="material-symbols-outlined text-[22px]">{{ mobileOpen ? 'close' : 'menu' }}</span>
        </button>
      </div>
    </div>

    <transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="opacity-0 -translate-y-2"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 -translate-y-2"
    >
      <div v-if="mobileOpen" class="border-t border-white/[0.08] bg-[#111111] px-6 pb-6 md:hidden">
        <div class="flex flex-col font-manrope">
          <router-link to="/#collections" class="border-b border-white/[0.08] py-4 text-sm font-medium uppercase tracking-[0.16em] text-white" @click="closeMenus">Collections</router-link>
          <router-link to="/#new-arrivals" :class="mobileLinkClass" @click="closeMenus">New Arrivals</router-link>
          <router-link to="/#maison" :class="mobileLinkClass" @click="closeMenus">Archives</router-link>

          <div class="border-b border-[#C8FF00]/70 py-4">
            <button type="button" class="flex w-full items-center justify-between text-sm font-medium uppercase tracking-[0.16em] text-white/70" @click="categoryOpen = !categoryOpen">
              Category
              <span class="material-symbols-outlined text-[18px] transition-transform" :class="{ 'rotate-180': categoryOpen }">expand_more</span>
            </button>
            <div v-if="categoryOpen" class="mt-3 space-y-1">
              <button
                v-for="category in categories"
                :key="category"
                type="button"
                class="flex w-full items-center justify-between py-2 pl-4 text-xs font-medium uppercase tracking-[0.14em] text-white/70 transition-colors hover:text-[#C8FF00]"
                @click="goToCategory(category)"
              >
                {{ category }}
                <span class="material-symbols-outlined text-[15px]">arrow_forward</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </nav>

  <div v-if="searchOpen" class="fixed left-0 top-[73px] z-40 flex w-full items-center gap-4 border-b border-white/10 bg-[#050505]/95 px-6 py-6 backdrop-blur-2xl md:px-16">
    <input
      v-model="searchQuery"
      type="text"
      placeholder="SEARCH PRODUCTS..."
      class="flex-1 bg-transparent border-b border-white/20 pb-2 text-white outline-none font-label-caps tracking-widest placeholder:text-white/20"
      @keyup.enter="handleSearch"
      autofocus
    />
    <button type="button" @click="searchOpen = false" class="text-white/40 transition-colors hover:text-white">x</button>
  </div>
</template>
