<template>
  <header class="navbar">
    <div class="container">
      <!-- 左側 LOGO -->
      <div class="logo">
        <a href="/">PUIK.</a>
      </div>

      <!-- 中間導航鏈接 -->
      <nav class="nav-menu">
        <router-link to="/" class="nav-item">HOME</router-link>
        <router-link to="/shop" class="nav-item">SHOP</router-link>
        <router-link to="/pages" class="nav-item">PAGES</router-link>
        <router-link to="/blog" class="nav-item">BLOG</router-link>
        <router-link to="/about" class="nav-item">ABOUT US</router-link>
        <router-link to="/contact" class="nav-item">CONTACT US</router-link>
      </nav>

      <!-- 右側登錄和圖標 -->
      <div class="nav-icons">
        <div v-if="uislogin">

        </div>
        <div v-else>
          <router-link to="/login" class="login-link">Login / </router-link>
          <router-link to="/register" class="login-link">Register</router-link>
        </div>
        <div class="icon">
          <i class="fas fa-search"></i>
        </div>
        <div class="icon">
          <i class="fas fa-heart"></i>
          <span class="icon-count">2</span>
        </div>
        <router-link to="/cart" class="cart-link">
          <div class="icon cart-icon">
            <i class="fas fa-shopping-cart"></i>
            <span class="icon-count">2</span>
          </div>
        </router-link>
      </div>
      
    </div>
  </header>
</template>

<script setup>
import { ref , onUpdated } from 'vue';
import { useUserStore } from '@/stores/userStore';
const userStore = useUserStore();
const uislogin = ref(false);

onUpdated(() => {
  uislogin.value = userStore.getUserStoreLogin;
})

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

.nav-menu {
  display: flex;
  gap: 20px;
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
  background-image: url('@/components/icons/cart.png');
  background-size: cover; /* 確保圖標不變形 */
  border-radius: 50%;
  padding: 10px;
}
</style>
