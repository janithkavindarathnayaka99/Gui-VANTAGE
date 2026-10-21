<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import TopNavBar from '../components/TopNavBar.vue'
import FooterComponent from '../components/FooterComponent.vue'
import { useAuth } from '../composables/useAuth'

const router = useRouter()
const { register } = useAuth()
const fullName = ref('')
const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const error = ref('')

const submitting = ref(false)

const submit = async () => {
  error.value = ''
  if (!fullName.value.trim()) {
    error.value = 'Enter your full name.'
    return
  }
  if (password.value.length < 8) {
    error.value = 'Password must be at least 8 characters.'
    return
  }
  if (password.value !== confirmPassword.value) {
    error.value = 'Passwords do not match'
    return
  }

  submitting.value = true
  try {
    await register(fullName.value, email.value, password.value)
    await router.push('/')
  } catch (err) {
    error.value = err instanceof Error ? err.message : 'Account creation failed. Please try again.'
  } finally {
    submitting.value = false
  }
}
</script>

<template>
  <div class="bg-[#050505] min-h-screen text-white">
    <TopNavBar />
    <main class="pt-24 pb-16 px-4 sm:px-6 lg:px-16 max-w-[720px] mx-auto">
      <div class="glass-panel p-8 rounded-xl mt-12">
        <h1 class="text-2xl font-headline-md mb-4">Create account</h1>
        <p class="text-white/40 mb-6">Join the VANTAGE collective — curated design and technical craft. This demo saves your account in this browser only.</p>

        <form class="space-y-4" @submit.prevent="submit">
          <div>
            <label class="block text-sm text-white/60 mb-2">Full Name</label>
            <input v-model="fullName" autocomplete="name" required class="w-full p-3 bg-[#0a0a0a] border border-white/10 rounded-md text-white" />
          </div>
          <div>
            <label class="block text-sm text-white/60 mb-2">Email Address</label>
            <input v-model="email" type="email" autocomplete="email" required class="w-full p-3 bg-[#0a0a0a] border border-white/10 rounded-md text-white" />
          </div>
          <div>
            <label class="block text-sm text-white/60 mb-2">Password</label>
            <input v-model="password" type="password" autocomplete="new-password" minlength="8" required class="w-full p-3 bg-[#0a0a0a] border border-white/10 rounded-md text-white" />
          </div>
          <div>
            <label class="block text-sm text-white/60 mb-2">Confirm Password</label>
            <input v-model="confirmPassword" type="password" autocomplete="new-password" required class="w-full p-3 bg-[#0a0a0a] border border-white/10 rounded-md text-white" />
          </div>
          <div v-if="error" role="alert" class="text-red-400">{{ error }}</div>
          <div class="pt-4">
            <button :disabled="submitting" type="submit" class="w-full bg-[#BDFF00] text-black font-bold py-3 rounded-md disabled:cursor-wait disabled:opacity-60">{{ submitting ? 'Creating account…' : 'Create Account' }}</button>
          </div>
        </form>

        <div class="mt-6 text-center text-white/60">
          Already have an account? <router-link to="/login" class="text-white hover:text-[#BDFF00]">Sign In</router-link>
        </div>
      </div>
    </main>
    <FooterComponent />
  </div>
</template>
