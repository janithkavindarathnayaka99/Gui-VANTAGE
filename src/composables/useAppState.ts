import { ref } from 'vue'
import type { Product } from '../types'

interface CartItem {
  product: Product;
  quantity: number;
}

const cart = ref<CartItem[]>([])
const isDarkMode = ref<boolean>(true) // Matches your dark cold mystic aesthetic preference

export function useAppState() {
  // --- Cart Management Logic ---
  const addToCart = (product: Product) => {
    const existingIndex = cart.value.findIndex(item => item.product.id === product.id)
    if (existingIndex > -1) {
      cart.value[existingIndex].quantity++
    } else {
      cart.value.push({ product, quantity: 1 })
    }
    saveCart()
  }

  const removeFromCart = (productId: number) => {
    cart.value = cart.value.filter(item => item.product.id !== productId)
    saveCart()
  }

  const updateQuantity = (productId: number, qty: number) => {
    const idx = cart.value.findIndex(i => i.product.id === productId)
    if (idx > -1) {
      cart.value[idx].quantity = Math.max(1, qty)
      saveCart()
    }
  }

  const saveCart = () => {
    localStorage.setItem('stitch_cart', JSON.stringify(cart.value))
  }

  const loadCart = () => {
    const saved = localStorage.getItem('stitch_cart')
    if (saved) cart.value = JSON.parse(saved)
  }

  // --- Dark Mode Logic ---
  const toggleDarkMode = () => {
    isDarkMode.value = !isDarkMode.value
    updateDOMTheme()
  }

  const updateDOMTheme = () => {
    if (isDarkMode.value) {
      document.documentElement.classList.add('dark')
      localStorage.setItem('theme', 'dark')
    } else {
      document.documentElement.classList.remove('dark')
      localStorage.setItem('theme', 'light')
    }
  }

  return {
    cart,
    isDarkMode,
    addToCart,
    removeFromCart,
    updateQuantity,
    loadCart,
    toggleDarkMode,
    updateDOMTheme
  }
}
