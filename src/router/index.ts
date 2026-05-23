import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import CartView from '../views/CartView.vue'
import ProductView from '../views/ProductView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView
    },
    {
      path: '/register',
      name: 'register',
      component: LoginView
    },
    {
      path: '/forgot-password',
      name: 'forgot-password',
      component: LoginView
    },
    {
      path: '/cart',
      name: 'cart',
      component: CartView
    },
    {
      path: '/product/:id',
      name: 'product',
      component: ProductView,
      props: true
    },
    {
      path: '/privacy',
      name: 'privacy',
      component: HomeView
    },
    {
      path: '/terms',
      name: 'terms',
      component: HomeView
    },
    {
      path: '/shipping',
      name: 'shipping',
      component: HomeView
    },
    {
      path: '/contact',
      name: 'contact',
      component: HomeView
    },
    {
      path: '/search',
      name: 'search',
      component: HomeView
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: HomeView
    }
  ],
  scrollBehavior(to) {
    if (to.hash) {
      return { el: to.hash, behavior: 'smooth', top: 96 }
    }

    return { top: 0 }
  }
})

export default router
