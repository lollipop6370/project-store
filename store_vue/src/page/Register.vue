<template>
    <div class="register-page">
      <h2>Register</h2>
      <form @submit.prevent="registerUser">
        <div class="form-group">
          <label for="username">Username</label>
          <input type="text" id="username" v-model="regist.username" required />
        </div>
        <div class="form-group">
          <label for="email">Email</label>
          <input type="email" id="email" v-model="regist.email" required />
        </div>
        <div class="form-group">
          <label for="password">Password</label>
          <input type="password" id="password" v-model="regist.password" @input="checkPasswordStrength" required />
          <p class="password-strength" :class="passwordStrength">密碼強度 : {{ passwordStrength }}</p>
        </div>
        <div class="form-group">
          <label for="confirmPassword">Confirm Password</label>
          <input type="password" id="confirmPassword" v-model="confirmPassword" required />
        </div>
        <button type="submit" class="register-button">Register</button>
      </form>
    </div>
</template>
  
<script setup>
  import { ref } from 'vue';
  import { useRouter } from 'vue-router'
  import { userRegister , checkUsername } from '@/api';

  const router = useRouter();
  const confirmPassword = ref('');
  const passwordStrength = ref('weak');  // 密碼強度: weak, medium, strong
  
  const regist = ref(
    {username : "", email : "", password : ""}
  );

  const checkPasswordStrength = () => {
    const strengthCriteria = [
      /[a-z]/.test(regist.value.password),  // 至少有一個小寫字母
      /[A-Z]/.test(regist.value.password),  // 至少有一個大寫字母
      /[0-9]/.test(regist.value.password),  // 至少有一個數字
      /[\W_]/.test(regist.value.password),  // 至少有一個特殊字符
      regist.value.password.length >= 8      // 密碼長度至少8個字符
    ];

    const strength = strengthCriteria.reduce((acc, curr) => acc + curr, 0);

    if (strength <= 2) {
      passwordStrength.value = 'weak';
    } else if (strength === 3 || strength === 4) {
      passwordStrength.value = 'medium';
    } else if (strength === 5) {
      passwordStrength.value = 'strong';
    }
  };

  const registerUser = async () => {
    //確認username有無被占用   
    let result1 = await checkUsername(regist.value.username);
    if(Boolean(result1) === true){
      alert('username is exist!');
      return;
    }
    //確認密碼有無打錯
    if (regist.value.password !== confirmPassword.value) {
      alert('Passwords do not match!');
      return;
    }
  
    // 註冊過程 
    console.log("register:" + regist.value); 
    await userRegister(regist.value);
  
    // 清空表單
    regist.value.username = '';
    regist.value.email = '';
    regist.value.password = '';
    confirmPassword.value = '';

    alert('註冊成功');
    router.push({ name: "login" });
  };
</script>
  
<style scoped>
  .register-page {
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
  
  .password-strength {
    margin-top: 5px;
    font-weight: bold;
    color: red;
  }

  .password-strength.weak {
    color: red;
  }

  .password-strength.medium {
    color: orange;
  }

  .password-strength.strong {
    color: green;
  }

  .register-button {
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
  
  .register-button:hover {
    background-color: darkorange;
  }
</style>
  