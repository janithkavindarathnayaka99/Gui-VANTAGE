<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth } from '../composables/useAuth'

const router = useRouter()
const { login } = useAuth()
const email = ref('')
const password = ref('')
const error = ref('')
const submitting = ref(false)

const handleLogin = async () => {
  error.value = ''
  submitting.value = true
  try {
    await login(email.value, password.value)
    await router.push('/')
  } catch (err) {
    error.value = err instanceof Error ? err.message : 'Sign in failed. Please try again.'
  } finally {
    submitting.value = false
  }
}
</script>

<template>
  <div class="font-body-md text-body-md min-h-screen flex flex-col selection:bg-primary-container selection:text-on-primary-container bg-background text-on-background">
    <!-- TopNavBar Shell (Suppressed Nav Links due to Transactional Intent) -->
    <nav class="fixed top-0 w-full z-50 bg-[#050505]/80 backdrop-blur-2xl border-b border-white/10">
      <div class="flex justify-between items-center px-16 py-6 max-w-[1440px] mx-auto">
        <router-link to="/" class="text-2xl font-bold tracking-widest text-white font-headline-md">VANTAGE</router-link>
        <div class="flex gap-8 items-center">
          <!-- Search suppressed for focus -->
          <button @click="router.push('/')" class="text-white/40 hover:text-white transition-all scale-95 active:opacity-80">
            <span class="material-symbols-outlined" data-icon="search">search</span>
          </button>
          <button @click="router.push('/cart')" class="text-white/40 hover:text-white transition-all scale-95 active:opacity-80">
            <span class="material-symbols-outlined" data-icon="shopping_bag">shopping_bag</span>
          </button>
        </div>
      </div>
    </nav>
    
    <!-- Main Content Canvas -->
    <main class="flex-grow flex items-center justify-center pt-32 pb-16 px-6">
      <div class="grid grid-cols-1 lg:grid-cols-2 max-w-[1200px] w-full gap-16 items-center">
        <!-- Branding/Visual Section -->
        <div class="hidden lg:block space-y-12">
          <div class="space-y-4">
            <h1 class="font-display-lg text-display-lg text-white">The Pinnacle of <span class="text-[#BDFF00]">Curation</span>.</h1>
            <p class="text-on-surface-variant max-w-md">Access our exclusive archives and new arrivals. A bespoke experience for the modern collector.</p>
          </div>
          <!-- Atmospheric Product/Brand Image -->
          <div class="relative h-[400px] rounded-xl overflow-hidden border border-white/10 group">
            <img alt="Luxury interior" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAulW58Jdeeg9g0EO0B7Y1cigkFjIVdp6sijIuQBEIA_tDuyLGQMBRlYlA3SvXyeEiFTCKYti-hHdnO4kvAhJ9lM1dfMNn0noMMv3pYV8yv8j4IXwSj0jZ7C7oqZn07TjKzW0Tj_Qh5d3cBfFXIOfe-gcqmLkRewoGH6jVk-1CBw9KNLf4hdXG9NvLRYqyfn2e2ku6PHKSd73zKzY8i999MCfc570Zi1co7KXWBxIo7CaSgtpB9XqZd_0VAumuW6VtHaeLmEqjO1T00"/>
            <div class="absolute inset-0 bg-gradient-to-t from-[#050505] to-transparent opacity-60"></div>
            <div class="absolute bottom-8 left-8">
              <div class="px-3 py-1 bg-[#BDFF00] text-[#050505] font-label-caps text-label-caps mb-2 inline-block">MEMBER ACCESS</div>
              <div class="text-white font-title-sm">ARCHIVE SERIES 01</div>
            </div>
          </div>
        </div>
        <!-- Login Form Section -->
        <div class="w-full max-w-md mx-auto">
          <div class="glass-panel p-10 rounded-xl space-y-8">
            <div class="space-y-2">
              <h2 class="font-headline-md text-headline-md text-white">Sign In</h2>
              <p class="text-on-surface-variant font-body-md">Enter your credentials to continue.</p>
            </div>
            <form class="space-y-6" @submit.prevent="handleLogin">
              <div class="space-y-2">
                <label class="font-label-caps text-label-caps text-on-surface-variant">EMAIL ADDRESS</label>
                <input v-model="email" class="w-full bg-[#0A0A0A] border border-white/10 px-4 py-4 text-white focus:outline-none focus:border-[#BDFF00]/40 transition-colors font-body-md" placeholder="name@vantage.com" type="email" autocomplete="email" required />
              </div>
              <div class="space-y-2">
                <label class="font-label-caps text-label-caps text-on-surface-variant">PASSWORD</label>
                <input v-model="password" class="w-full bg-[#0A0A0A] border border-white/10 px-4 py-4 text-white focus:outline-none focus:border-[#BDFF00]/40 transition-colors font-body-md" placeholder="••••••••" type="password" autocomplete="current-password" required />
              </div>
              <p v-if="error" role="alert" class="text-sm text-red-400">{{ error }}</p>
              <button :disabled="submitting" class="w-full bg-[#BDFF00] text-[#050505] font-label-caps text-label-caps py-5 tracking-widest hover:scale-[1.02] active:scale-95 transition-all disabled:cursor-wait disabled:opacity-60" type="submit">
                {{ submitting ? 'SIGNING IN…' : 'SIGN IN' }}
              </button>
            </form>
            <div class="relative py-4">
              <div class="absolute inset-0 flex items-center">
                <div class="w-full border-t border-white/5"></div>
              </div>
              <div class="relative flex justify-center text-[10px] uppercase tracking-[0.2em]">
                <span class="bg-[#121212] px-4 text-on-surface-variant">New to Vantage?</span>
              </div>
            </div>
            <router-link to="/register" class="w-full block">
              <span class="w-full block text-center bg-transparent border border-white/20 text-white font-label-caps text-label-caps py-5 tracking-widest hover:border-white transition-all">
                CREATE ACCOUNT
              </span>
            </router-link>
          </div>
        </div>
      </div>
    </main>
    
    <!-- Footer Shell -->
    <footer class="bg-[#050505] border-t border-white/5 mt-auto">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8 px-16 py-24 max-w-[1440px] mx-auto">
        <div class="space-y-6">
          <div class="text-xl font-bold text-white font-headline-md">VANTAGE</div>
          <p class="text-white/30 max-w-sm font-body-md">A collective of rare objects and curated fashion for the modern vanguard. Join our newsletter for private release notifications.</p>
        </div>
        <div class="grid grid-cols-2 gap-8">
          <div class="flex flex-col gap-4">
            <span class="font-label-caps text-label-caps text-white mb-2">Legal</span>
            <router-link to="/privacy" class="font-manrope text-[12px] uppercase tracking-widest text-white/30 hover:text-[#BDFF00] transition-colors">Privacy Policy</router-link>
            <router-link to="/terms" class="font-manrope text-[12px] uppercase tracking-widest text-white/30 hover:text-[#BDFF00] transition-colors">Terms of Service</router-link>
          </div>
          <div class="flex flex-col gap-4">
            <span class="font-label-caps text-label-caps text-white mb-2">Company</span>
            <router-link to="/shipping" class="font-manrope text-[12px] uppercase tracking-widest text-white/30 hover:text-[#BDFF00] transition-colors">Shipping &amp; Returns</router-link>
            <router-link to="/contact" class="font-manrope text-[12px] uppercase tracking-widest text-white/30 hover:text-[#BDFF00] transition-colors">Contact</router-link>
          </div>
        </div>
        <div class="md:col-span-2 pt-16 mt-16 border-t border-white/5">
          <p class="font-manrope text-[12px] uppercase tracking-widest text-white/30">© 2024 VANTAGE COLLECTIVE. ALL RIGHTS RESERVED.</p>
        </div>
      </div>
    </footer>
  </div>
</template>
