<template>
    <div class="cart-page">
      <h2>Your Shopping Cart</h2>
      <table class="cart-table">
        <thead>
          <tr>
            <th>Images</th>
            <th>Product</th>
            <th>Unit Price</th>
            <th>Quantity</th>
            <th>Total</th>
            <th>Remove</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in cartItems" :key="index">
            <td>
              <img :src="item.image" alt="Product Image" />
            </td>
            <td>{{ item.name }}</td>
            <td>{{ item.price | currency }}</td>
            <td>
              <div class="quantity-control">
                <button @click="decreaseQuantity(item)">-</button>
                <span>{{ item.quantity }}</span>
                <button @click="increaseQuantity(item)">+</button>
              </div>
            </td>
            <td>{{ item.price * item.quantity | currency }}</td>
            <td>
              <button @click="removeItem(index)">🗑️</button>
            </td>
          </tr>
        </tbody>
      </table>
  
      <!-- 結帳按鈕 -->
      <div class="checkout-section">
        <button class="checkout-button" @click="checkout">Proceed to Checkout</button>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref , onMounted } from 'vue';
  import { getUserCart } from '@/api';
  
  const cartItems = ref([
    {
      image: 'path-to-image1.jpg',
      name: 'T Shirt For Men',
      price: 130.0,
      quantity: 1,
    },
    {
      image: 'path-to-image2.jpg',
      name: 'Red Scarf For Women',
      price: 120.5,
      quantity: 1,
    },
  ]);
  
  onMounted(()=>{
    //checkCart();
  });

  const checkCart = async () => {
    //先取得用戶資訊
    let user;
    //後端搜尋該用戶購物車
    let result = await getUserCart(user);
    cartItems = result.data;
  }

  const decreaseQuantity = (item,index) => {
    if (item.quantity > 1) {
      item.quantity--;
      //後端資料庫刪除數量
    }else{
      cartItems.value.splice(index, 1);
      //後端資料庫刪除項目
    }

  };
  
  const increaseQuantity = (item) => {
    item.quantity++;

    //後端資料庫新增數量
  };
  
  const removeItem = (index) => {
    //後端資料庫刪除該購買項目

    cartItems.value.splice(index, 1);
  };
  
  const checkout = () => {
    alert('Proceeding to checkout...');
    // 這裡可以添加結帳邏輯
  };
  </script>
  
  <style scoped>
  .cart-page {
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
  }
  
  h2 {
    text-align: center;
    margin-bottom: 20px;
  }
  
  .cart-table {
    width: 100%;
    border-collapse: collapse;
  }
  
  .cart-table th {
    padding: 15px;
    text-align: center;
    border: 1px solid #eaeaea;
  }

  .cart-table td {
    padding: 15px;
    text-align: center; /* 確保所有表格內容居中 */
    vertical-align: middle; /* 垂直居中 */
    border: 1px solid #eaeaea;
  }
  
  .cart-table img {
    width: 100px;
    height: auto;
  }
  
  .quantity-control {
    display: inline-flex; /* 將 inline-flex 替換為 flex，並使其元素不會超出表格邊界 */
    justify-content: center; /* 水平居中 */
    align-items: center; /* 垂直居中 */
    gap: 10px; /* 調整按鈕與數量之間的間距 */
  }
  
  .quantity-control button {
    width: 30px;
    height: 30px;
    border: 1px solid #eaeaea;
    background-color: white;
    cursor: pointer;
  }
  
  .quantity-control span {
    margin: 0 10px;
  }
  
  button {
    background-color: transparent;
    border: none;
    cursor: pointer;
    font-size: 18px;
  }
  
  button:hover {
    color: red;
  }
  
  .checkout-section {
    display: flex;
    justify-content: flex-end;
    margin-top: 20px;
  }
  
  .checkout-button {
    padding: 15px 30px;
    background-color: orange;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 16px;
    transition: color 0.5s ease;
  }
  
  .checkout-button:hover {
    background-color: darkorange;
  }
  </style>
  