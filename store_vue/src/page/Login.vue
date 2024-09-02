<template>
    <div class="login-page">
      <h2>Login</h2>
      <form @submit.prevent="loginUser">
        <div class="form-group">
          <label for="username">Username or Email</label>
          <input type="text" id="username" v-model="user.username" required />
        </div>
        <div class="form-group">
          <label for="password">Password</label>
          <input type="password" id="password" v-model="user.password" required />
        </div>
        <button type="submit" class="login-button">Login</button>
      </form>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import { useRouter } from 'vue-router'
  import { useUserStore } from '@/stores/userStore';

  const router = useRouter();
  const userStore = useUserStore();
  const user = ref({
    username : "",
    password : ""
  });
  
  const loginUser = async () => {
    // 登入過程
    
      
      await userStore.userStoreLogin(user.value);
      
      // 清空表單
      user.value.username = '';
      user.value.password = '';
      console.log(userStore.getUserStoreToken)
      router.push({ name: "home" });
    
    
  };
  </script>
  
  <style scoped>
  .login-page {
    position: relative;
    top: 200px;
    max-width: 400px;
    margin: 0 auto;
    padding: 20px;
    background-color: #f9f9f9;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  }
  
  h2 {
    text-align: center;
    margin-bottom: 20px;
  }
  
  .form-group {
    margin-bottom: 15px;
  }
  
  label {
    display: block;
    margin-bottom: 5px;
    font-weight: bold;
  }
  
  input {
    width: 100%;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-sizing: border-box;
  }
  
  .login-button {
    width: 100%;
    padding: 10px;
    background-color: orange;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 16px;
    transition: background-color 0.5s ease;
  }
  
  .login-button:hover {
    background-color: darkorange;
  }
  </style>
  