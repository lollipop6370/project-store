<template>
  <div class="outer-container">
    <div class="product-container">
      <!-- 商品圖片部分 -->
      <div class="product-image">
        <img :src="product.image" alt="Product Image" />
      </div>

      <!-- 商品詳情部分 -->
      <div class="product-details">
        <h1 class="product-title">{{ product.name }}</h1>
        <p class="product-price">price : {{ product.price }}</p>
        <p class="product-reviews">
          ★★★★★
          <span>{{ product.reviews }} Customer Reviews</span>
        </p>
        <p class="product-description">{{ product.description }}</p>

        <!-- 顏色選項 -->
        <div class="product-colors">
          <label>Color:</label>
          <div class="color-options">
            <span
              v-for="color in product.colors"
              :key="color"
              :style="{ backgroundColor: color }"
              class="color-box"
              @click="selectColor(color)"
            ></span>
          </div>
        </div>

        <!-- 尺寸選項 -->
        <div class="product-sizes">
          <label>Size:</label>
          <select v-model="selectedSize">
            <option v-for="size in product.sizes" :key="size" :value="size">
              {{ size }}
            </option>
          </select>
        </div>

        <!-- 數量選項 -->
        <div class="product-quantity">
          <label>Quantity:</label>
          <button @click="decreaseQuantity">-</button>
          <span>{{ quantity }}</span>
          <button @click="increaseQuantity">+</button>
        </div>

        <!-- 添加到購物車 -->
        <button class="add-to-cart" @click="addToCart">Add to Cart</button>

        <!-- 願望清單與比較選項 -->
        <div class="wishlist-compare">
          <button @click="addToWishlist">Add to Wishlist</button>
          <button @click="addToCompare">Add to Compare</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref , onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { loadProductDetail } from '@/api';
const route = useRoute();
const product = ref({
  image: 'https://drive.google.com/thumbnail?id=1bXtZBDnDkMZVHV28rxAvDzIRuEdEvL9e', 
  name: 'Simple Stylish Women Backpack',
  price: 555,
  reviews: 4,
  description: 'Typi non habent claritatem insitam est usus...',
  colors: ['#000000', '#FFFFFF', '#FF0000', '#0000FF', '#00FF00'], // 替換為實際顏色
  sizes: ['S', 'M', 'L', 'XL', '2XL', '3XL'], // 替換為實際尺寸
});
const selectedSize = ref('M'); // 預設選擇的尺寸
const quantity = ref(1); // 預設選擇的數量
const decreaseQuantity = () => {
  if (quantity.value > 1) {
    quantity.value--;
  }
};
const increaseQuantity = () => {
  quantity.value++;
};
const addToWishlist = () => {
  // 添加到願望清單邏輯
};
const addToCart = () => {
  // 添加到購物車邏輯
};
const addToCompare = () => {
  // 添加到比較列表邏輯
};
onMounted(() => {
  loadDetail();
});
const loadDetail = async () =>{
  let itemId = route.query.id;
  product.value = await loadProductDetail(itemId);
}
</script>

<style scoped>
body, html {
  margin: 0;
  padding: 0;
  height: 100%;
  width: 100%;
}

.outer-container {
  display: flex;
  justify-content: center; /* 水平置中 */
  align-items: center; /* 垂直置中 */
  height: 100vh; /* 設置為視窗高度，確保內容居中 */
}

.product-container {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 40px; /* 內邊距 */
  font-family: Arial, sans-serif;
}

.product-image img {
  width: auto; /* 圖片寬度 */
  height: auto;
}

.product-details {
  max-width: 600px; /* 詳情區域的寬度 */
  margin-left: 130px; /* 增加與圖片之間的間距 */
}

.product-title {
  font-size: 32px; /* 標題字體大小 */
  margin-bottom: 15px;
}

.product-price {
  font-size: 28px; /* 價格字體大小 */
  color: #b12704;
  margin-bottom: 15px;
}

.product-reviews {
  font-size: 18px; /* 評論字體大小 */
  color: #555;
  margin-bottom: 25px;
}

.product-description {
  font-size: 18px; /* 描述字體大小 */
  margin-bottom: 25px;
}

.product-colors {
  margin-bottom: 25px;
}

.color-options {
  display: flex;
  gap: 15px; /* 顏色選項之間的間距 */
}

.color-box {
  width: 40px; /* 顏色框尺寸 */
  height: 40px;
  border: 1px solid #ccc;
  cursor: pointer;
}

.product-sizes {
  margin-bottom: 25px;
}

.product-sizes select {
  padding: 10px; /* 下拉框的填充 */
  font-size: 18px; /* 字體 */
}

.product-quantity {
  display: flex;
  align-items: center;
  gap: 15px; /* 增加數量調整按鈕之間的間距 */
  margin-bottom: 25px;
}

.product-quantity button {
  width: 40px; /* 增大按鈕尺寸 */
  height: 40px;
  font-size: 18px; /* 增大按鈕內文字體 */
  cursor: pointer;
}

.add-to-cart {
  background-color: #000;
  color: #fff;
  padding: 15px 30px; /* 增大按鈕填充 */
  font-size: 18px; /* 增大按鈕文字字體 */
  border: none;
  cursor: pointer;
}

.wishlist-compare {
  display: flex;
  gap: 15px; /* 增加按鈕之間的間距 */
  margin-top: 25px;
}

.wishlist-compare button {
  background-color: #f5f5f5;
  padding: 15px;
  font-size: 18px; /* 增大按鈕文字字體 */
  border: none;
  cursor: pointer;
}
</style>
