<template>
    <div id="backend-bar">
      <header class="header">
        <!-- 上方固定橫條內容 -->
        <h1>後臺管理系統</h1>
        <div class="user-info">登出</div>
      </header>
      <div class="container">
        <div class="sidebar">
          <!-- 左邊固定橫條內容 -->
          <ul>
            <li :class="{active: selectUser}" @click="clickUser">用戶管理</li>
            <li :class="{active: selectProduct}" @click="clickProduct">商品管理</li>
            <li :class="{active: selectOrder}" @click="clickOrder">訂單管理</li>
          </ul>
        </div>
      </div>
    </div>
</template>
  
<script setup>
  import { ref } from 'vue';
  import { useRouter } from 'vue-router';
  const router = useRouter();
  const selectUser = ref(false);
  const selectProduct = ref(false);
  const selectOrder = ref(false);
  const clickUser = () => {
    selectUser.value = true;
    selectProduct.value = false;
    selectOrder.value = false;
    router.push({ name:"backend-user" });
  }
  const clickProduct = () => {
    selectUser.value = false;
    selectProduct.value = true;
    selectOrder.value = false;
    router.push({name:"backend-product"});
  };
  const clickOrder = () => {
    selectUser.value = false;
    selectProduct.value = false;
    selectOrder.value = true;
    router.push({name:"backend-order"});
  };
</script>
  
<style scoped>
  body, html {
    margin: 0;
    padding: 0;
    height: 100%;
  }
  
  #app {
    display: flex;
    flex-direction: column;
    height: 100%;
  }
  
  .header {
    background-color: #333;
    color: white;
    display: flex;
    justify-content: space-between;
    padding: 10px 20px;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 5000;
  }
  
  .container {
    display: flex;
    margin-top: 60px; /* 根據 header 的高度調整 */
    height: calc(100% - 60px);
  }
  
  .sidebar {
    width: 220px;
    background-color: #161616;
    color: white;
    padding: 15px;
    position: fixed;
    top: 100px;
    bottom: 0;
    left: 0;
    z-index: 1000;
  }

  .sidebar ul{
    list-style-type: none;
    padding: 0%;
  }
  .sidebar li {
    margin: 10px 0;
    text-decoration: none;
    display: block;
    border-radius: 5px;
    padding: 10px;

  }

  .sidebar li:hover{
    background-color: #505050;
  }
  .sidebar li:active{
    background-color: #333333;
  }
  .sidebar li.active{
    background-color: #404040;
  }
  
</style>
  