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
        <form @submit.prevent="submitShipping">
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
        </form>
      </div>
  
      <!-- 付款方式 -->
      <div class="payment-method">
        <h3>Payment Method</h3>
        <form @submit.prevent="submitPayment">
          <div class="form-group">
            <label for="cardNumber">Card Number</label>
            <input type="text" id="cardNumber" v-model="payment.cardNumber" required />
          </div>
          <div class="form-group">
            <label for="expiry">Expiry Date</label>
            <input type="text" id="expiry" v-model="payment.expiry" required />
          </div>
          <div class="form-group">
            <label for="cvv">CVV</label>
            <input type="text" id="cvv" v-model="payment.cvv" required />
          </div>
        </form>
      </div>
  
      <!-- 確認訂單按鈕 -->
      <div class="checkout-section">
        <button class="checkout-button" @click="confirmOrder">Confirm Order</button>
      </div>
    </div>
</template>
  
<script setup>
  import { ref, computed } from 'vue';
  import { useCartStore } from '@/stores/cartStore';
  import { useUserStore } from '@/stores/userStore';
  import { newOrder , newOrderItems } from '@/api';
  import router from '@/router';
  
  const cartStore = useCartStore();
  const userStore = useUserStore();

  const cartItems = ref(cartStore.items);
  
  const orderForm = ref({
    receiver: '',
    address: '',
    city: '',
    postal: null,
  });
  
  const payment = ref({
    cardNumber: '',
    expiry: '',
    cvv: '',
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
    alert('Order confirmed!');
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
  .shipping-address,
  .payment-method {
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
</style>
  