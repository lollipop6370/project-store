import { createRouter, createWebHistory } from 'vue-router';
import Home from '../page/Home.vue';

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/product/:id',
    name: 'product-details',
    // 這裡的懶加載有助於優化應用性能
    //component: () => import('../views/ProductDetailsView.vue')
  },
  {
    path: '/cart',
    name: 'cart',
    //component: () => import('../views/CartView.vue')
  },
  {
    path: '/checkout',
    name: 'checkout',
    //component: () => import('../views/CheckoutView.vue')
  },
  {
    path: '/user',
    name: 'user',
    //component: () => import('../views/UserProfileView.vue')
  }
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
});

export default router;
