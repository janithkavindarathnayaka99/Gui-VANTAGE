import { ref } from 'vue'
import type { ProductResponse, Product } from '../types'

const products = ref<Product[]>([])
const loading = ref(false)
const error = ref<string | null>(null)
const total = ref(0)

export function useProducts() {
  const fetchProducts = async (limit = 12, skip = 0, append = false, query = '', category = '') => {
    loading.value = true
    error.value = null
    try {
      const normalizedQuery = typeof query === 'string' ? query.trim() : ''
      const normalizedCategory = typeof category === 'string' ? category.trim().toLowerCase() : ''
      let endpoint = `https://dummyjson.com/products?limit=${limit}&skip=${skip}`

      if (normalizedQuery) {
        endpoint = `https://dummyjson.com/products/search?q=${encodeURIComponent(normalizedQuery)}&limit=${limit}&skip=${skip}`
      }
      const res = await fetch(endpoint)
      const data = (await res.json()) as ProductResponse
      // Map dummyjson fields into our Product shape where possible
      const mapped = data.products.map(p => ({
        id: p.id,
        title: p.title,
        description: p.description || '',
        category: p.category || '',
        price: p.price || 0,
        discountPercentage: (p as any).discountPercentage || 0,
        rating: p.rating || 0,
        stock: (p as any).stock ?? 100,
        tags: [],
        brand: p.brand || '',
        sku: String(p.id),
        weight: 0,
        dimensions: { width: 0, height: 0, depth: 0 },
        warrantyInformation: '',
        shippingInformation: '',
        availabilityStatus: 'in_stock',
        reviews: [],
        returnPolicy: '',
        minimumOrderQuantity: 1,
        meta: { createdAt: '', updatedAt: '', barcode: '', qrCode: '' },
        images: (p as any).images || [(p as any).thumbnail].filter(Boolean),
        thumbnail: (p as any).thumbnail || ((p as any).images && (p as any).images[0]) || '',
      }))
      products.value = append ? [...products.value, ...mapped] : mapped
      total.value = data.total ?? 0
      return data.total
    } catch (err: any) {
      error.value = err?.message || String(err)
      return 0
    } finally {
      loading.value = false
    }
  }

  return { products, loading, error, total, fetchProducts }
}
