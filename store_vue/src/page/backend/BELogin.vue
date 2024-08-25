<template>
    <div class="login-container">
      <div class="image-section">
        <img src="" alt="Login Image">
      </div>
      <div class="login-section">
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
      </div>
    </div>
</template>
  
<script>
  export default {
    name: 'LoginPage',
    data() {
      return {
        username: '',
        password: ''
      };
    },
    methods: {
      handleLogin() {
        // 處理登入邏輯
        console.log('用戶名:', this.username);
        console.log('密碼:', this.password);
      }
    }
  };
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
    flex: 1;
    background-color: #f5f5f5;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  .image-section img {
    max-width: 100%;
    max-height: 100%;
    object-fit: cover;
  }
  
  .login-section {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 0 40px;
    background-color: #ffffff;
    box-shadow: -2px 0 5px rgba(0, 0, 0, 0.1);
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
  