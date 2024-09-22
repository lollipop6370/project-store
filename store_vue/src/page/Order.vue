<template>
  <div class="order-page">
    <h2>Your Orders</h2>
    <table class="order-table">
        <thead>
            <tr>
                <th>Order#</th>
                <th>Status</th>
                <th>Price</th>
                <th>Create Time</th>
                <th>Detail</th>
                <th>Pay</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(item, index) in orderItems" :key="index">
                <td>{{ item.oid }}</td>
                <td v-if="item.status === 0"> 處理中 </td>
                <td v-else-if="item.status === 1"> 運送中 </td>
                <td v-else-if="item.status === 2"> 已送達 </td>
                <td>{{ item.totalPrice }}</td>
                <td>{{ item.createTime }}</td>
                <td>
                    <button class="btn" @click="showOrderDetail(item.oid)">詳情</button>
                </td>
                <td v-if="item.pay === 0">
                  <button class="btn" @click="onPay(item)">付款</button>
                  <button class="btn" @click="onOrderDel(item.oid)">刪單</button>
                </td>
                <td v-if="item.pay === 1">付款完成</td>
            </tr>
        </tbody>
    </table>
    <!-- 商品詳細懸浮視窗 -->
    <div v-if="isItemModalOpen" class="modal-overlay" @click="closeItemModal">
      <div class="modal-content" @click.stop>  <!-- 懸浮視窗區域不會被背景點擊事件影響 -->
        <h2>訂單明細</h2>
        <table class="order-table">
            <thead>
                <tr>
                    <th>Product</th>
                    <th>Quantity</th>
                    <th>Price</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(item , index) in orderDetails" :key="index">
                    <td>{{ item.name }}</td>
                    <td>{{ item.quantity }}</td>
                    <td>{{ item.price }}</td>
                </tr>
            </tbody>
            <tfoot>
                <tr>
                    <td colspan="2">Total</td>
                    <td>{{ total }}</td>
                </tr>
            </tfoot>
        </table>
        <button class="btn" @click="closeItemModal">確定</button>
      </div>
    </div>
    <!-- 刪除訂單視窗 -->
    <div v-if="isOrderDelModalOpen" class="modal-overlay" @click="closeOrderDelModal">
      <div class="modal-content" @click.stop>  <!-- 懸浮視窗區域不會被背景點擊事件影響 -->
        <h2>刪除訂單#{{ selectOid }}?</h2>
        <button class="btn" @click="confirmDelOrderModal">確定</button>
      </div>
    </div>
    <!-- 付款按鈕 -->
    <div v-if="isPayModalOpen" class="modal-overlay" @click="closePayModal">
      <div class="modal-content" @click.stop>
        <h2>即將跳轉藍新金流結帳</h2>
        <div>測試卡號 : 4000-2211-1111-1111</div>
        <form method="POST" action="https://ccore.newebpay.com/MPG/mpg_gateway">            
          <input type="hidden" name="MerchantID" :value="myPayment.MerchantID">
          <input type="hidden" name="TradeInfo" :value="myPayment.TradeInfo">
          <input type="hidden" name="TradeSha" :value="myPayment.TradeSha">
          <input type="hidden" name="Version" :value="myPayment.Version">
          <input class="btn" type="submit" value="前往結帳">
        </form>
      </div>
    </div>
    <!-- 分頁 -->
    <div class="pagination">
      <button @click="previousPage" :disabled="pageInfo.currentPage === 1">上一頁</button>
      <span>Page {{ pageInfo.currentPage }} of {{ pageInfo.totalPage }}</span>
      <button @click="nextPage" :disabled="pageInfo.currentPage === pageInfo.totalPage">下一頁</button>
    </div>
  </div>
</template>

<script setup>
  import { onMounted, ref } from 'vue';
  import { readOrder , getOrderDetail, getOrderPageCount, delOrder, createPayment } from '@/api';

  const orderItems = ref([
    {
        oid: 1,
        status: 0,
        totalPrice: 100,
        createTime: '',
        pay: 0
    }
  ]);
  const orderDetails = ref([
    {
        name:'',
        quantity:'',
        price:''
    }
  ]);
  const total = ref();
  const isItemModalOpen = ref(false);
  const isOrderDelModalOpen = ref(false);
  const pageInfo = ref(
    {
      currentPage: 1,
      pageSize: 10,
      totalPage: null
    }
  );
 
  const showOrderDetail = async (oid) => {
    orderDetails.value = await getOrderDetail(oid);
    total.value = orderDetails.value.reduce( (sum, item) => sum + item.price , 0);
    isItemModalOpen.value = true;
  };
  const closeItemModal = () => {
    isItemModalOpen.value = false;
  };
  /* 刪除訂單 */
  const selectOid = ref();
  const onOrderDel = (oid) => {
    selectOid.value = oid;
    isOrderDelModalOpen.value = true;
  };
  const closeOrderDelModal = () => {
    selectOid.value = null;
    isOrderDelModalOpen.value = false;
  };
  const confirmDelOrderModal = async () => {
    await delOrder(selectOid.value);
    selectOid.value = null;
    isOrderDelModalOpen.value = false;
    location.reload();
  };
  /* 前往付款 */
  const myPayment = ref(
    {
      MerchantID: '',
      TradeInfo: '',
      TradeSha: '',
      Version: ''
    }
  );
  const isPayModalOpen = ref(false);
  const onPay = async (order) =>{
    myPayment.value = await createPayment(order);
    isPayModalOpen.value = true;
  };
  const closePayModal = () => {
    isPayModalOpen.value = false;
  };
  /* 分頁 */
  const previousPage = async () => {
    pageInfo.value.currentPage --;
    orderItems.value = await readOrder(pageInfo.value.currentPage,pageInfo.value.pageSize);
  };
  const nextPage = async () => {
    pageInfo.value.currentPage ++;
    orderItems.value = await readOrder(pageInfo.value.currentPage,pageInfo.value.pageSize);
  };
  onMounted( async () => {
    orderItems.value = await readOrder(pageInfo.value.currentPage,pageInfo.value.pageSize);
    pageInfo.value.totalPage = await getOrderPageCount(pageInfo.value.pageSize);
  });
</script>

<style scoped>
  .order-page {
    position: relative;
    top: 40px;
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
  }
  
  h2 {
    text-align: center;
    margin-bottom: 20px;
  }

  .order-table {
    width: 100%;
    border-collapse: collapse;
  }
  .order-table th {
    padding: 15px;
    text-align: center;
    border: 1px solid #eaeaea;
  }
  .order-table td {
    padding: 15px;
    text-align: center; /* 確保所有表格內容居中 */
    vertical-align: middle; /* 垂直居中 */
    border: 1px solid #eaeaea;
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
    padding: 80px;
    border-radius: 8px;
    box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.2);
    width: 400px;
    max-width: 90%;
    text-align: center;
  }

  .btn {
    padding: 10px 20px;
    background-color: #4CAF50;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  .btn:hover {
    background-color: #45a049;
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