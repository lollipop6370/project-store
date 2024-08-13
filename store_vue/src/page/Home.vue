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
          <div class="product-card" v-for="product in featuredProducts" :key="product.fpId">
            <img :src="product.image" :alt="product.name" />
            <h3>{{ product.name }}</h3>
            <p>{{ product.price }}</p>
          </div>
        </div>
      </section>

      <!-- 產品過濾區域 -->
      <section class="product-filter">
        <h3>Filter Products</h3>
        <div class="filter-group">
            <label for="category">Category</label>
            <select id="category" v-model="selectedCategory">
            <option value="">All</option>
            <option value="electronics">Electronics</option>
            <option value="fashion">Fashion</option>
            <option value="home">Home</option>
            </select>
        </div>
        <div class="filter-group">
            <label for="price">Price Range</label>
            <input type="range" id="price" v-model="priceRange" min="0" max="100" />
            <span>{{ priceRange }}</span>
        </div>
        <div class="filter-group">
            <button @click="applyFilters">Apply Filters</button>
        </div>
      </section>

       <!-- 過濾後的產品列表 -->
      <section class="filtered-products">
        <h2>Filtered Products</h2>
        <div class="products-grid">
            <div class="product-card" v-for="product in normalProduct" :key="product.npId">
            <img :src="product.image" :alt="product.name" />
            <h3>{{ product.name }}</h3>
            <p>{{ product.price }}</p>
            </div>
        </div>
      </section>

    </div>
  </template>
  
  <script setup>
  import { ref , computed } from 'vue';

  const selectedCategory = ref('');
  const priceRange = ref(100);

  // 假設我們有一個 featuredProducts 的數據源
  const featuredProducts = ref([
    { fpId: 1, name: 'Product 1', price: '$29.99', image: 'path-to-image-1.jpg' ,type: 1},
    { fpId: 2, name: 'Product 2', price: '$39.99', image: 'path-to-image-2.jpg' ,type: 1},
    { fpId: 3, name: 'Product 3', price: '$49.99', image: 'path-to-image-3.jpg' ,type: 2},
    { fpId: 4, name: 'Product 4', price: '$59.99', image: 'path-to-image-4.jpg' ,type: 3}
  ]);

  const normalProduct = ref([
    {npId: 1, name: 'Product a',price: '$9.99', image: 'path-to-image-1.jpg' ,type: 1},
    {npId: 2, name: 'Product b',price: '$209.99', image: 'path-to-image-1.jpg' ,type: 3}
  ]);

  const filteredProducts = computed(() => {
    //讀取過濾器，前往資料庫搜尋
  });

  const applyFilters = () => {
    // Apply filters logic (already handled by computed property)
  };
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
  /* 產品過濾區域的樣式 */
.product-filter {
  padding: 50px 20px;
  background-color: #f7f7f7;
}

.filter-group {
  margin-bottom: 20px;
}

.filter-group label {
  display: block;
  margin-bottom: 8px;
  font-weight: bold;
}

.filter-group select, .filter-group input[type="range"] {
  width: 100%;
}

.filter-group button {
  padding: 10px 20px;
  background-color: orange;
  color: white;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.filter-group button:hover {
  background-color: darkorange;
}

/* 過濾後的產品列表樣式 */
.filtered-products {
  padding: 50px 20px;
}

.filtered-products .products-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}

.filtered-products .product-card {
  border: 1px solid #eaeaea;
  padding: 20px;
  text-align: center;
  transition: transform 0.3s ease;
}

.filtered-products .product-card:hover {
  transform: translateY(-5px);
}
  </style>
  