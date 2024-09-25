<template>
    <div class="login-container">
      <div class="image-section">
        <img src="@/assets/back.jpg" alt="Login Image">
      </div>
      <div class="login-section">
        <div class="title">
          <h1>後臺管理系統</h1>
        </div>
        <h2>登入</h2>
        <form @submit.prevent="handleLogin">
          <div class="input-group">
            <label for="username">用戶名</label>
            <input type="text" id="username" v-model="username" required>
          </div>
          <div class="input-group">
            <label for="password">密碼</label>
            <input type="password" id="password" v-model="password" required>
          </div>
          <button type="submit">登入</button>
        </form>
        <div>測試用帳號:root 密碼:root</div>
      </div>
    </div>
</template>
  
<script setup>
  import { ref } from 'vue';
  import { backendLogin } from '@/api';
  import { useRouter } from 'vue-router';
  import { useRootStore } from '@/stores/rootStore';
  const router = useRouter();
  const username = ref();
  const password = ref();
  const rootStore = useRootStore();

  const handleLogin = async () => {
    // 處理登入邏輯
    let result = await backendLogin(username.value, password.value);
    if(result === true){
      rootStore.isLogin = true;
      rootStore.rootname = username.value;
      router.push({name:"backend-home"});
    }
    else{
      //alert("login false");
    }
  }

</script>
  
<style scoped>
  body, html {
    margin: 0;
    padding: 0;
    height: 100%;
    font-family: Arial, sans-serif;
  }
  
  .login-container {
    display: flex;
    height: 100vh;
  }
  
  .image-section {
    flex: 5;
    background-color: #f5f5f5;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  .image-section img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }
  
  .login-section {
    flex: 3;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 0 40px;
    background-color: #ffffff;
    box-shadow: -2px 0 5px rgba(0, 0, 0, 0.1);
  }

  .title {
    align-self: flex-start; /* 讓這個 div 靠上對齊 */
    margin-top: 0; 
  }
  
  h2 {
    margin-bottom: 20px;
    color: #333333;
  }
  
  .input-group {
    margin-bottom: 15px;
  }
  
  .input-group label {
    display: block;
    margin-bottom: 5px;
    color: #555555;
  }
  
  .input-group input {
    width: 100%;
    padding: 10px;
    border: 1px solid #cccccc;
    border-radius: 4px;
    font-size: 16px;
  }
  
  button {
    width: 100%;
    padding: 10px;
    background-color: #4CAF50;
    color: white;
    border: none;
    border-radius: 4px;
    font-size: 16px;
    cursor: pointer;
  }
  
  button:hover {
    background-color: #45a049;
  }
</style>
  