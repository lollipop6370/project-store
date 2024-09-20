<template>
    <div class="checkout-page">
      <h2>Checkout</h2>
  
      <!-- 訂單摘要 -->
      <div class="order-summary">
        <h3>Order Summary</h3>
        <table class="summary-table">
          <thead>
            <tr>
              <th>Product</th>
              <th>Unit Price</th>
              <th>Quantity</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in cartItems" :key="index">
              <td>{{ item.name }}</td>
              <td>{{ item.price }}</td>
              <td>{{ item.quantity }}</td>
              <td>{{ item.price * item.quantity }}</td>
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <td colspan="3">Total</td>
              <td>{{ orderTotal }}</td>
            </tr>
          </tfoot>
        </table>
      </div>
  
      <!-- 配送地址 -->
      <div class="shipping-address">
        <h3>Shipping Address</h3>
        <form @submit.prevent="confirmOrder">
          <div class="form-group">
            <label for="name">Receiver Name</label>
            <input type="text" id="name" v-model="orderForm.receiver" required />
          </div>
          <div class="form-group">
            <label for="address">Address</label>
            <input type="text" id="address" v-model="orderForm.address" required />
          </div>
          <div class="form-group">
            <label for="city">City</label>
            <input type="text" id="city" v-model="orderForm.city" required />
          </div>
          <div class="form-group">
            <label for="postal">Postal Code</label>
            <input type="int" id="postal" v-model="orderForm.postal" required />
          </div>
          <!-- 確認訂單按鈕 -->
          <div class="checkout-section">
            <button class="checkout-button" type="submit">Confirm Order</button>
          </div>
        </form>
      </div>
      

      <!-- form post 請求跳轉藍新金流 -->
      <div v-if="isPayOpen" class="modal-overlay" @click="closePayModal">
        <div class="modal-content" @click.stop>  <!-- 懸浮視窗區域不會被背景點擊事件影響 -->
          <h2>即將跳轉藍新金流結帳</h2>
          <form method="POST" action="https://ccore.newebpay.com/MPG/mpg_gateway">
            <input type="hidden" name="MerchantID" :value="myPayment.MerchantID">
            <input type="hidden" name="TradeInfo" :value="myPayment.TradeInfo">
            <input type="hidden" name="TradeSha" :value="myPayment.TradeSha">
            <input type="hidden" name="Version" :value="myPayment.Version">
            <input type="submit" value="前往結帳">
          </form>
        </div>
      </div>
    </div>
</template>
  
<script setup>
  import axios from "axios";
  import { ref, computed } from 'vue';
  import { useCartStore } from '@/stores/cartStore';
  import { useUserStore } from '@/stores/userStore';
  import { newOrder , newOrderItems , createPayment } from '@/api';
  import router from '@/router';
  
  const cartStore = useCartStore();
  const userStore = useUserStore();

  const cartItems = ref(cartStore.items);
  const isPayOpen = ref(false);
  
  const orderForm = ref({
    receiver: '',
    address: '',
    city: '',
    postal: null,
  });

  const myPayment = ref({
    MerchantID: '',
    TradeInfo: '',
    TradeSha: '',
    Version: ''
  });
  
  const orderTotal = computed(() => {
    return cartItems.value.reduce((total, item) => total + item.price * item.quantity, 0);
  });
  
  const confirmOrder = async () => {    // 處理確認訂單邏輯
    /* 付款 */
    /* new訂單 */
    orderForm.value.uid = userStore.userInfo.uid;
    orderForm.value.totalPrice = cartStore.cartStoreTotalPrice;
    let oid = await newOrder(orderForm.value);
    orderForm.value.oid = oid;
    /* new訂單商品詳細 */
    let itemOjb = [];
    cartStore.items.forEach((item) => {
      let data = {};
      data.oid = oid;
      data.pid = item.pid;
      data.quantity = item.quantity;
      itemOjb.push(data);
    });
    await newOrderItems(itemOjb);
    /* 刪除購物車 */
    await cartStore.cartStoreClearCart();
    /* 加密訂單資訊 */
    myPayment.value = await createPayment(orderForm.value);
    isPayOpen.value = true;
    /* 向金流服務API發送請求 */
    /*const params = new URLSearchParams();
    params.append('MerchantID', myPayment.value.MerchantID);
    params.append('TradeInfo', myPayment.value.TradeInfo);
    params.append('TradeSha', myPayment.value.TradeSha);
    params.append('Version', myPayment.value.Version);
    axios.post('https://cors-anywhere.herokuapp.com/https://ccore.newebpay.com/MPG/mpg_gateway', params, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })
    .then(response => {
      console.log(response.data);
    })
    .catch(error => {
      console.error('API Error:', error);
    });*/
    //alert('Order confirmed!');
    //router.push({name:"home"});
  };

  const closePayModal = () => {
    router.push({name:"home"});
  };
</script>
  
<style scoped>
  .checkout-page {
    position: relative;
    top: 40px;
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
  }
  
  h2 {
    text-align: center;
    margin-bottom: 30px;
  }
  
  .order-summary,
  .shipping-address {
    margin-bottom: 30px;
  }
  
  .summary-table {
    width: 100%;
    border-collapse: collapse;
  }
  
  .summary-table th,
  .summary-table td {
    padding: 10px;
    text-align: center;
    border: 1px solid #eaeaea;
  }
  
  .form-group {
    margin-bottom: 20px;
  }
  
  label {
    display: block;
    margin-bottom: 5px;
  }
  
  input {
    width: 100%;
    padding: 10px;
    border: 1px solid #eaeaea;
    border-radius: 5px;
  }
  
  .checkout-section {
    text-align: center;
  }
  
  .checkout-button {
    padding: 15px 30px;
    background-color: orange;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 16px;
    transition: background-color 0.5s ease;
  }
  
  .checkout-button:hover {
    background-color: darkorange;
  }

  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1100;
  }

  .modal-content {
    background-color: white;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.2);
    width: 400px;
    max-width: 90%;
    text-align: center;
  }
</style>
  