import { createRouter, createWebHistory } from 'vue-router';
import Home from '../page/Home.vue';
import { checkLogin } from '@/api';
import { useUserStore } from '@/stores/userStore';

const routes = [
  {
    path: '/',
    name: 'home',
    meta: {showNavBar: true, showBEBar: false},
    component: Home
  },
  {
    path: '/product/:id',
    name: 'product-details',
    // 這裡的懶加載有助於優化應用性能
    //component: () => import('../views/ProductDetailsView.vue')
  },
  {
    path: '/productDetail',
    name: 'productDetail',
    meta: {showNavBar: true, showBEBar: false},
    component: () => import('@/page/ProductDetail.vue')
  },
  {
    path: '/cart',
    name: 'cart',
    meta: {showNavBar: true, showBEBar: false},
    component: () => import('../page/Cart.vue')
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
  },
  {
    path: '/register',
    name: 'register',
    meta: {showNavBar: false, showBEBar: false},
    component: () => import('../page/Register.vue')
  },
  {
    path: '/login',
    name: 'login',
    meta: {showNavBar: false, showBEBar: false},
    component: () => import('../page/Login.vue')
  },
  {
    path: '/order',
    name: 'order',
    meta: {showNavBar: true, showBEBar: false},
    component: () => import('@/page/Order.vue')
  },
  {
    path: '/backend/home',
    name: 'backend-home',
    meta: {showNavBar: false, showBEBar: false},
    component: () => import('@/page/backend/BEHome.vue')
  }
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
});

router.beforeEach(async (to, from) => {    //全局守衛
  let userStore = useUserStore();
  if (to.name === 'cart' | to.name === 'order'){   //檢查是否登入、token是否過期
    if(userStore.getUserStoreToken !== null && userStore.getUserStoreLogin === true){
      if(await checkLogin()){
        return true;
      }
      else{
        alert("please login!")
        return {name:"login"};
      }
    }
    else{
      alert("please login!")
      return {name:"login"};
    }
  }
});

export default router;
