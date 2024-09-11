<template>
  <header class="navbar">
    <div class="container">
      <!-- 左側 LOGO -->
      <div class="logo">
        <a href="/">PUIK.</a>
      </div>

      <!-- 右側登錄和圖標 -->
      <div class="nav-icons">
        <div v-if="uislogin">
          歡迎 {{username}} 
        </div>
        <div v-else>
          <router-link to="/login" class="login-link">Login / </router-link>
          <router-link to="/register" class="login-link">Register</router-link>
        </div>
        <div class="icon order-icon" v-if="uislogin" @click="orderClick">
          <i class="i-order"></i>
        </div>
        <div class="icon logout-icon" v-if="uislogin" @click="logoutClick">
          <i class="i-logout"></i>
        </div>
        <router-link to="/cart" class="cart-link">
          <div class="icon cart-icon">
            <i class="i-shopping-cart"></i>
            <span class="icon-count" v-if="uislogin">{{ itemCount }}</span>
          </div>
        </router-link>
      </div>
      
    </div>
  </header>
</template>

<script setup>
  import { computed } from 'vue';
  import { useUserStore } from '@/stores/userStore';
  import { useCartStore } from '@/stores/cartStore';
  import router from '@/router';
  const userStore = useUserStore();
  const cartStore = useCartStore();
  const uislogin = computed(() => userStore.getUserStoreLogin);
  const username = computed(() => userStore.getUsername);
  const itemCount = computed(() => cartStore.cartStoreTotalItemsCount);

  const logoutClick = async()=>{
    await userStore.userStoreLogout();
    console.log(userStore.isLoggedIn)
    console.log(userStore.uid)
    console.log(userStore.getUserStoreToken)
  };
  const orderClick = async () => {
    await userStore.userStoreCheckLogin();
    if(userStore.isLoggedIn === false){
      alert("please login!");
      router.push({name:"login"});
    }
    router.push({name:"order"});
  };
</script>

<style scoped>
  .navbar {
    background-color: white;
    padding: 10px 40px;
    border-bottom: 1px solid #eaeaea;
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 100;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* 添加陰影，使NavBar更突出 */
  }

  .container {
    display: flex;
    max-width: 1800px;
    justify-content: space-between;
    align-items: center;
    width: 100%;
  }

  .logo a {
    font-size: 28px;
    font-weight: bold;
    color: black;
    text-decoration: none;
  }

  .nav-item {
    font-size: 16px;
    color: #333;
    text-decoration: none;
    transition: color 0.5s ease; /* 變色時會花0.5s由黑慢慢變橘 */
  }

  .nav-item:hover {
    color: orange; /* 鼠標璇停時變色 */
  }

  .nav-icons {
    display: flex;
    align-items: center;
    gap: 20px;
  }

  .login-link {
    font-size: 14px;
    color: #333;
  }

  .icon {
    font-size: 20px;
    color: #333;
    position: relative;
  }

  .icon-count {
    position: absolute;
    top: -8px;
    right: -8px;
    background-color: #f56c6c;
    color: white;
    border-radius: 50%;
    padding: 2px 6px;
    font-size: 12px;
  }

  .cart-icon {
    background-color: #f5f5f5;
    background-image: url('@/components/icons/cart.jpg');
    background-size: cover; /* 確保圖標不變形 */
    border-radius: 50%;
    padding: 15px;
  }
  .logout-icon {
    background-color: #f5f5f5;
    background-image: url('@/components/icons/logout.jpg');
    background-size: cover; 
    border-radius: 50%;
    padding: 15px;
    width: auto;
  }
  .order-icon {
    background-color: #f5f5f5;
    background-image: url('@/components/icons/order.jpg');
    background-size: cover; 
    border-radius: 50%;
    padding: 15px;
    width: auto;
  }
</style>
