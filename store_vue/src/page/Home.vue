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
        <div class="featured-products-grid">
          <!-- 假設有多個產品卡片 -->
          <div class="featured-product-card" v-for="product in featuredProducts" :key="product.fpId">
            <img :src="product.image" :alt="product.name" />
            <h3>{{ product.name }}</h3>
            <p>{{ product.price }}</p>
          </div>
        </div>
      </section>

     <!-- 產品過濾區域和過濾後產品列表 -->
    <section class="product-section">
      <!-- 左側過濾器區域 -->
      <aside class="product-filter">
        <h3>Filter Products</h3>

        <!-- 商品類型選擇區域 -->
        <div class="filter-group">
          <label>Product Type</label>
          <div class="checkbox-group">
            <label v-for="type in productTypes" :key="type">
              <input type="checkbox" :value="type" v-model="selectedTypes" />
              {{ type }}
            </label>
          </div>
        </div>

        <!-- 顯示選中的類型 -->
        <div class="selected-types" v-if="selectedTypes.length > 0">
          <h4>Selected Types:</h4>
          <span v-for="type in selectedTypes" :key="type">{{ type }}</span>
        </div>

        <!-- 如果未選擇類型，顯示 "All" -->
        <div class="selected-types" v-else>
          <h4>All Products</h4>
        </div>

        <div class="filter-group">
          <label for="price">Price Range</label>
          <input type="range" id="price" v-model="priceRange" min="0" max="100" />
          <span>{{ priceRange }}</span>
        </div>

        <div class="filter-group">
          <button @click="applyFilters">Apply Filters</button>
        </div>
      </aside>

      <!-- 過濾後的產品列表 -->
      <section class="filtered-products">
        <h2>Filtered Products</h2>
        <div class="products-grid">
          <div class="product-card" v-for="product in normalProduct" :key="product.ppid">
            <img :src="product.image" :alt="product.name" />
            <h3>{{ product.name }}</h3>
            <p>{{ product.price }}</p>
          </div>
        </div>

        <!-- 分頁導航 -->
        <div class="pagination">
          <button @click="previousPage" :disabled="pageInfo.currentPage === 1">Previous</button>
          <span>Page {{ pageInfo.currentPage }} of {{ totalPages }}</span>
          <button @click="nextPage" :disabled="pageInfo.currentPage === totalPages">Next</button>
        </div>
      </section>
    </section>

    </div>
  </template>
  
  <script setup>
  import { ref , computed , onMounted} from 'vue';
  import { getProductCount, getNMProduct } from "../api/index"
  const priceRange = ref(100);

  const selectedTypes = ref([]);  // 追蹤選中的商品類型
  const productTypes = ref(['Electronics', 'Fashion', 'Home', 'Beauty', 'Toys']); // 商品類型選項

  const pageInfo = ref(
    {
        currentPage : 1,
        pageSize : 8
    }
  );

  // 假設我們有一個 featuredProducts 的數據源
  const featuredProducts = ref([
    { fpId: 1, name: 'Product 1', price: '$29.99', image: 'path-to-image-1.jpg' ,type: 1},
    { fpId: 2, name: 'Product 2', price: '$39.99', image: 'path-to-image-2.jpg' ,type: 1},
    { fpId: 3, name: 'Product 3', price: '$49.99', image: 'path-to-image-3.jpg' ,type: 2},
    { fpId: 4, name: 'Product 4', price: '$59.99', image: 'path-to-image-4.jpg' ,type: 3}
  ]);

  const normalProduct = ref([
    {id: 1, name: 'Product a',price: '$9.99', image: 'path-to-image-1.jpg' ,type: 1},
    {id: 2, name: 'Product b',price: '$209.99', image: 'path-to-image-1.jpg' ,type: 3}
  ]);


  const paginatedProducts = async () => { //從後端取出 normal product 列表
    let result = await getNMProduct(pageInfo.value);
    normalProduct.value = result.data;
  };

  const totalProduct = async () => {
    return await getProductCount(); //從後端取出總商品數量
  };

  const totalPages = computed(() => {
    return totalProduct / pageInfo.value.pageSize;
  });

const previousPage = () => {
  if (pageInfo.value.currentPage > 1) {
    pageInfo.value.currentPage--;
    paginatedProducts();
  }
};

const nextPage = () => {
  if (pageInfo.value.currentPage < totalPages.value) {
    pageInfo.value.currentPage++;
    paginatedProducts();
  }
};

  const applyFilters = () => {
    // Apply filters logic (already handled by computed property)
  };

  // 組件掛載時調用(生命週期)
  onMounted(() => {
    paginatedProducts();
  })
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
  
  .featured-products-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 20px;
  }
  
  .featured-product-card {
    border: 1px solid #eaeaea;
    padding: 20px;
    text-align: center;
    transition: transform 0.3s ease;
  }
  
  .featured-product-card:hover {
    transform: translateY(-5px);
  }
  /* 過濾器與過濾後產品列表的佈局 */
.product-section {
  display: flex;
}

.product-filter {
  width: 250px;
  height: 1500px;
  padding: 60px;
  background-color: #f4f4f4;
  border-right: 1px solid #ddd;
}

.filtered-products {
  flex-grow: 1;
  padding: 20px;
}

.products-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 20px;
}

.product-card {
  flex: 1 1 calc(33.333% - 20px);
  background-color: white;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  text-align: center;
  transition: transform 0.3s ease;
  height: 300px;
  width: 300px;
}
.product-card:hover {
    transform: translateY(-5px);
}

.checkbox-group {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.selected-types {
  margin-top: 15px;
}

.selected-types span {
  display: inline-block;
  background-color: #eaeaea;
  padding: 5px 10px;
  margin-right: 5px;
  border-radius: 5px;
}

.pagination {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}

.pagination button {
  padding: 10px 20px;
  margin: 0 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.pagination button:disabled {
  background-color: #cccccc;
  cursor: not-allowed;
}

.pagination span {
  padding: 10px 20px;
  line-height: 20px;
}
</style>
  