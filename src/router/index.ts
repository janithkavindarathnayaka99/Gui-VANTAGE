import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
// register view will be lazy-loaded
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
    }
    ,
    {
      path: '/register',
      name: 'register',
      component: () => import('../views/RegisterView.vue')
    }
    ,
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
    }
  ]
})

export default router
