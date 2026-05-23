<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import TopNavBar from '../components/TopNavBar.vue'
import FooterComponent from '../components/FooterComponent.vue'

const router = useRouter()
const fullName = ref('')
const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const error = ref('')

const submit = () => {
  error.value = ''
  if (password.value !== confirmPassword.value) {
    error.value = 'Passwords do not match'
    return
  }
  // simple client-side validation passed — navigate home
  router.push('/')
}
</script>

<template>
  <div class="bg-[#050505] min-h-screen text-white">
    <TopNavBar />
    <main class="pt-24 pb-16 px-4 sm:px-6 lg:px-16 max-w-[720px] mx-auto">
      <div class="glass-panel p-8 rounded-xl mt-12">
        <h1 class="text-2xl font-headline-md mb-4">Create account</h1>
        <p class="text-white/40 mb-6">Join the VANTAGE collective — curated design and technical craft.</p>

        <div class="space-y-4">
          <div>
            <label class="block text-sm text-white/60 mb-2">Full Name</label>
            <input v-model="fullName" class="w-full p-3 bg-[#0a0a0a] border border-white/10 rounded-md text-white" />
          </div>
          <div>
            <label class="block text-sm text-white/60 mb-2">Email Address</label>
            <input v-model="email" type="email" class="w-full p-3 bg-[#0a0a0a] border border-white/10 rounded-md text-white" />
          </div>
          <div>
            <label class="block text-sm text-white/60 mb-2">Password</label>
            <input v-model="password" type="password" class="w-full p-3 bg-[#0a0a0a] border border-white/10 rounded-md text-white" />
          </div>
          <div>
            <label class="block text-sm text-white/60 mb-2">Confirm Password</label>
            <input v-model="confirmPassword" type="password" class="w-full p-3 bg-[#0a0a0a] border border-white/10 rounded-md text-white" />
          </div>
          <div v-if="error" class="text-red-400">{{ error }}</div>
          <div class="pt-4">
            <button @click.prevent="submit" class="w-full bg-[#BDFF00] text-black font-bold py-3 rounded-md">Create Account</button>
          </div>
        </div>

        <div class="mt-6 text-center text-white/60">
          Already have an account? <router-link to="/login" class="text-white hover:text-[#BDFF00]">Sign In</router-link>
        </div>
      </div>
    </main>
    <FooterComponent />
  </div>
</template>
