<template>
    <div class="home">
      <!-- 英雄區域 -->
      <section class="hero">
        <div class="hero-content">
          <h1>Welcome to PUIK Store</h1>
          <p>Your one-stop shop for all your needs</p>
          <button class="cta-button">Shop Now</button>
        </div>
      </section>
  
      <!-- 特色產品區域 -->
      <section class="featured-products">
        <h2>Featured Products</h2>
        <div class="products-grid">
          <!-- 假設有多個產品卡片 -->
          <div class="product-card" v-for="product in featuredProducts" :key="product.id">
            <img :src="product.image" :alt="product.name" />
            <h3>{{ product.name }}</h3>
            <p>{{ product.price }}</p>
          </div>
        </div>
      </section>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  
  // 假設我們有一個 featuredProducts 的數據源
  const featuredProducts = ref([
    { id: 1, name: 'Product 1', price: '$29.99', image: 'path-to-image-1.jpg' },
    { id: 2, name: 'Product 2', price: '$39.99', image: 'path-to-image-2.jpg' },
    { id: 3, name: 'Product 3', price: '$49.99', image: 'path-to-image-3.jpg' },
    { id: 4, name: 'Product 4', price: '$59.99', image: 'path-to-image-4.jpg' }
  ]);
  </script>
  
  <style scoped>
  /* 英雄區域的樣式 */
  .hero {
    background-image: url('path-to-hero-image.jpg');
    background-size: cover;
    background-position: center;
    height: 400px;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    color: white;
  }
  
  .hero-content {
    max-width: 600px;
  }
  
  .cta-button {
    background-color: orange;
    color: white;
    padding: 10px 20px;
    border: none;
    cursor: pointer;
    font-size: 18px;
    margin-top: 20px;
    transition: background-color 0.3s ease;
  }
  
  .cta-button:hover {
    background-color: darkorange;
  }
  
  /* 特色產品區域的樣式 */
  .featured-products {
    padding: 50px 20px;
    text-align: center;
  }
  
  .products-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 20px;
  }
  
  .product-card {
    border: 1px solid #eaeaea;
    padding: 20px;
    text-align: center;
    transition: transform 0.3s ease;
  }
  
  .product-card:hover {
    transform: translateY(-5px);
  }
  </style>
  