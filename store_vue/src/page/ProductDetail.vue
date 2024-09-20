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
        <p class="product-reviews">剩餘 : {{ product.count }}</p>
        <p class="product-description">{{ product.description }}</p>

        <!-- 數量選項 -->
        <div class="product-quantity">
          <label>Quantity:</label>
          <button @click="decreaseQuantity" :disabled="quantity === 1">-</button>
          <span>{{ quantity }}</span>
          <button @click="increaseQuantity" :disabled="quantity === product.count">+</button>
        </div>

        <!-- 添加到購物車 -->
        <button class="add-to-cart" @click="addToCart">Add to Cart</button>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { ref , onMounted } from 'vue';
  import { useRoute , useRouter } from 'vue-router';
  import { loadProductDetail , checkLogin } from '@/api';
  import { useCartStore } from '@/stores/cartStore';
  import { useUserStore } from '@/stores/userStore';
  const userStore = useUserStore();
  const cartStore = useCartStore();
  const route = useRoute();
  const router = useRouter();
  const product = ref({
    image: 'https://drive.google.com/thumbnail?id=1bXtZBDnDkMZVHV28rxAvDzIRuEdEvL9e', 
    name: 'Simple Stylish Women Backpack',
    price: 555,
    reviews: 4,
    description: '',
  });
  const quantity = ref(1); // 預設選擇的數量
  const itemId = route.query.pid;
  const decreaseQuantity = () => {
    if (quantity.value > 1) {
      quantity.value--;
    }
  };
  const increaseQuantity = () => {
    quantity.value++;
  };

  const addToCart = async () => { // 添加到購物車邏輯
    //驗證是否登入
    if(userStore.getUserStoreLogin){
      if(await checkLogin()){  //驗證token是否過期
        await cartStore.cartStoreAddItem(itemId,quantity.value);
        alert("已添加進購物車");
        router.push({name:"home"});
      }
      else{//去登入
        router.push({name:"login"});
      }
    }
    else{//去登入
      router.push({name:"login"});
    }
  };
  onMounted(() => {
    loadDetail();
  });
  const loadDetail = async () =>{
    product.value = await loadProductDetail(itemId);
  };
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
</style>
