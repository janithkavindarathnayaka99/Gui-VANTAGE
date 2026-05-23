<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import TopNavBar from '../components/TopNavBar.vue'
import FooterComponent from '../components/FooterComponent.vue'
import { useAppState } from '../composables/useAppState'

const route = useRoute()
const router = useRouter()
const { addToCart } = useAppState()
const product = ref<any>(null)
const loading = ref(false)
const error = ref<string | null>(null)
const selectedSize = ref('M')
const quantity = ref(1)
const selectedImage = ref('')
const sizes = ['XS', 'S', 'M', 'L', 'XL']

const ratingStars = computed(() => {
  if (!product.value?.rating) return '☆☆☆☆☆'
  const fullStars = Math.min(5, Math.floor(product.value.rating))
  return '★'.repeat(fullStars) + '☆'.repeat(5 - fullStars)
})

const discountedPrice = computed(() => {
  if (!product.value || !product.value.discountPercentage) return product.value?.price
  return ((product.value.price * (100 - product.value.discountPercentage)) / 100).toFixed(2)
})

const shippingText = computed(() => {
  return product.value?.shippingInformation || 'Free worldwide shipping'
})

const updateMainImage = (image: string) => {
  selectedImage.value = image
}

const decrementQuantity = () => {
  quantity.value = Math.max(1, quantity.value - 1)
}

const incrementQuantity = () => {
  quantity.value += 1
}

watch(product, (value) => {
  if (value?.images?.length) {
    selectedImage.value = value.images[0]
  }
})

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
  <div class="bg-[#050505] min-h-screen text-white">
    <TopNavBar />
    <main class="pt-24 pb-16 px-4 sm:px-6 lg:px-16 max-w-[1440px] mx-auto">
      <button @click="router.push('/')" class="mb-8 inline-flex items-center gap-2 text-white/60 hover:text-white">
        <span class="text-xl">←</span>
        Back to Home
      </button>

      <div v-if="loading" class="space-y-6">
        <div class="h-[600px] w-full rounded-3xl bg-white/10 animate-pulse"></div>
        <div class="flex flex-wrap gap-4">
          <div class="h-24 w-24 rounded-2xl bg-white/10 animate-pulse"></div>
          <div class="h-24 w-24 rounded-2xl bg-white/10 animate-pulse"></div>
          <div class="h-24 w-24 rounded-2xl bg-white/10 animate-pulse"></div>
        </div>
        <div class="space-y-4">
          <div class="h-8 w-1/3 rounded-full bg-white/10 animate-pulse"></div>
          <div class="h-6 w-1/2 rounded-full bg-white/10 animate-pulse"></div>
          <div class="h-6 w-full rounded-full bg-white/10 animate-pulse"></div>
        </div>
      </div>

      <div v-else-if="error" class="text-red-400">{{ error }}</div>

      <div v-else-if="product" class="grid gap-12 lg:grid-cols-2">
        <section>
          <div class="relative overflow-hidden rounded-3xl glass-panel">
            <img :src="selectedImage || product.images?.[0] || product.thumbnail" alt="Product image" class="w-full h-[600px] object-cover" />
          </div>
          <div class="mt-6 flex gap-4 overflow-x-auto pb-2">
            <button
              v-for="image in product.images"
              :key="image"
              type="button"
              @click="updateMainImage(image)"
              class="shrink-0 h-24 w-24 rounded-2xl overflow-hidden border transition-all"
              :class="selectedImage === image ? 'border-[#BDFF00]' : 'border-white/10'"
            >
              <img :src="image" alt="Thumbnail" class="w-full h-full object-cover" />
            </button>
          </div>
        </section>

        <section class="space-y-6">
          <div class="text-white/40 uppercase tracking-[0.2em] text-sm">
            {{ product.brand || 'BRAND' }} — {{ product.category || 'CATEGORY' }}
          </div>
          <h1 class="text-4xl font-display-lg text-white">{{ product.title }}</h1>
          <div class="flex items-center gap-4 text-lg">
            <span class="text-[#BDFF00]">{{ ratingStars }}</span>
            <span class="text-white/40">({{ product.rating?.toFixed(1) ?? '0.0' }})</span>
          </div>
          <div class="flex items-center gap-4">
            <span class="text-4xl font-bold text-white">€{{ product.price }}</span>
            <span v-if="product.discountPercentage > 0" class="text-white/40 line-through">€{{ product.price }}</span>
            <span v-if="product.discountPercentage > 0" class="text-[#BDFF00] text-2xl font-bold">€{{ discountedPrice }}</span>
          </div>
          <p class="text-white/60 leading-relaxed">{{ product.description }}</p>

          <div class="space-y-6">
            <div>
              <div class="font-semibold uppercase text-white/60 mb-3 text-sm">Size</div>
              <div class="flex flex-wrap gap-3">
                <button
                  v-for="size in sizes"
                  :key="size"
                  type="button"
                  @click="selectedSize = size"
                  :class="[
                    'px-5 py-3 rounded-xl text-sm font-semibold transition-all',
                    selectedSize === size ? 'bg-[#BDFF00] text-black' : 'border border-white/20 text-white'
                  ]"
                >
                  {{ size }}
                </button>
              </div>
            </div>

            <div>
              <div class="font-semibold uppercase text-white/60 mb-3 text-sm">Quantity</div>
              <div class="inline-flex items-center rounded-xl border border-white/10 overflow-hidden">
                <button type="button" @click="decrementQuantity" class="px-5 py-3 bg-white/5 text-white/80">-</button>
                <div class="px-6 py-3 bg-[#0d0d0d] text-white">{{ quantity }}</div>
                <button type="button" @click="incrementQuantity" class="px-5 py-3 bg-white/5 text-white/80">+</button>
              </div>
            </div>
          </div>

          <div class="space-y-4">
            <button
              type="button"
              @click="addToCart(product)"
              class="w-full bg-[#BDFF00] text-black font-bold py-4 rounded-xl"
            >
              ADD TO BAG
            </button>
            <button type="button" class="w-full border border-white/20 text-white py-4 rounded-xl">
              ADD TO WISHLIST
            </button>
          </div>

          <div class="flex flex-col gap-2 pt-4 border-t border-white/10 text-white/60">
            <span class="font-semibold uppercase text-sm text-white/60">Shipping</span>
            <span>{{ shippingText }}</span>
          </div>
        </section>
      </div>
    </main>
    <FooterComponent />
  </div>
</template>
