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
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  
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
  
  const decreaseQuantity = (item) => {
    if (item.quantity > 1) {
      item.quantity--;
    }
  };
  
  const increaseQuantity = (item) => {
    item.quantity++;
  };
  
  const removeItem = (index) => {
    cartItems.value.splice(index, 1);
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
  
  .cart-table th, .cart-table td {
    padding: 15px;
    text-align: center;
    border: 1px solid #eaeaea;
  }
  
  .cart-table img {
    width: 100px;
    height: auto;
  }
  
  .quantity-control {
    display: flex;
    align-items: center;
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
  </style>
  