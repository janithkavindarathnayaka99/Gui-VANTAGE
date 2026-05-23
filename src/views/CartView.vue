<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import TopNavBar from '../components/TopNavBar.vue'
import FooterComponent from '../components/FooterComponent.vue'
import { useAppState } from '../composables/useAppState'

const router = useRouter()
const { cart, removeFromCart, updateQuantity, loadCart } = useAppState()

onMounted(() => {
  loadCart()
})

const subtotal = computed(() => cart.value.reduce((sum, item) => sum + item.product.price * item.quantity, 0))

const decreaseOrRemove = (item: { product: { id: number }, quantity: number }) => {
  if (item.quantity <= 1) {
    removeFromCart(item.product.id)
  } else {
    updateQuantity(item.product.id, item.quantity - 1)
  }
}
</script>

<template>
  <div class="bg-[#050505] min-h-screen text-white">
    <TopNavBar />

    <main class="pt-24 pb-16 px-4 sm:px-6 lg:px-16 max-w-[1440px] mx-auto">
      <div v-if="cart.length === 0" class="flex min-h-[60vh] flex-col items-center justify-center text-center gap-6">
        <h1 class="text-4xl font-display-lg uppercase tracking-[0.25em]">YOUR BAG IS EMPTY</h1>
        <router-link to="/" class="bg-[#BDFF00] text-black px-8 py-4 font-bold rounded-full">Continue Shopping</router-link>
      </div>

      <div v-else class="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div class="lg:col-span-2 space-y-6">
          <div v-for="item in cart" :key="item.product.id" class="flex flex-col gap-4 rounded-3xl bg-surface-container p-6 lg:flex-row lg:items-center lg:justify-between">
            <div class="flex items-start gap-6 lg:gap-8">
              <img :src="item.product.thumbnail || item.product.images[0]" alt="Product thumbnail" class="w-28 h-36 object-cover rounded-2xl" />
              <div class="space-y-3">
                <div>
                  <h3 class="text-xl font-semibold text-white">{{ item.product.title }}</h3>
                  <p class="text-sm text-white/40 uppercase">{{ item.product.brand || item.product.category }}</p>
                </div>
                <div class="flex flex-wrap items-center gap-3">
                  <button
                    @click="decreaseOrRemove(item)"
                    class="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-white/90"
                  >
                    -
                  </button>
                  <div class="min-w-[3rem] text-center text-white">{{ item.quantity }}</div>
                  <button
                    @click="updateQuantity(item.product.id, item.quantity + 1)"
                    class="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-white/90"
                  >
                    +
                  </button>
                </div>
                <button
                  @click="removeFromCart(item.product.id)"
                  class="text-sm text-white/30 hover:text-red-400"
                >
                  REMOVE
                </button>
              </div>
            </div>
            <div class="flex items-center justify-between gap-4 lg:justify-end">
              <span class="text-lg font-semibold text-white">€{{ (item.product.price * item.quantity).toFixed(2) }}</span>
            </div>
          </div>
        </div>

        <aside class="glass-panel rounded-sm p-8">
          <h2 class="text-xl font-semibold text-white mb-6">ORDER SUMMARY</h2>
          <div class="flex justify-between text-white/60 mb-3">
            <span>Subtotal</span>
            <span>€{{ subtotal.toFixed(2) }}</span>
          </div>
          <div class="flex justify-between text-white/40 mb-6">
            <span>Shipping</span>
            <span>Calculated at checkout</span>
          </div>
          <div class="border-t border-white/10 my-6"></div>
          <div class="flex justify-between items-end text-white mb-8">
            <span class="text-sm uppercase tracking-[0.2em] text-white/60">Total</span>
            <span class="text-3xl font-bold">€{{ subtotal.toFixed(2) }}</span>
          </div>
          <button class="w-full bg-[#BDFF00] text-black font-bold py-5 rounded-xl mb-4">PROCEED TO CHECKOUT</button>
          <router-link
            to="/"
            class="w-full block text-center border border-white/20 text-white py-4 rounded-xl hover:border-[#BDFF00] hover:text-[#BDFF00] transition-colors"
          >
            CONTINUE SHOPPING
          </router-link>
        </aside>
      </div>
    </main>

    <FooterComponent />
  </div>
</template>
