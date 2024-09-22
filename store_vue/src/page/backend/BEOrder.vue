<template>
    <div class="order-page">
        <!-- order清單 -->
        <table class="order-table">
            <thead>
                <tr>
                    <th>Order#</th>
                    <th>User#</th>
                    <th>Status</th>
                    <th>Create Time</th>
                    <th>Address</th>
                    <th>Reciver</th>
                    <th>Detail</th>
                    <th>Control</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(item,index) in orderForm" :key="index">
                    <td>{{ item.oid }}</td>
                    <td>{{ item.uid }}</td>
                    <td v-if="item.status === 0"> 處理中 </td>
                    <td v-else-if="item.status === 1"> 運送中 </td>
                    <td v-else-if="item.status === 2"> 已送達 </td>
                    <td>{{ item.createTime }}</td>
                    <td>{{ item.postal + item.city + item.address }}</td>
                    <td>{{ item.receiver }}</td>
                    <td>
                        <button class="btn" @click="btnDetail(item)">詳細</button>
                    </td>
                    <td>
                        <button class="btn" @click="onChangeStatus(item)">變更狀態</button> /
                        <button class="btn" @click="onDelOrder(item.oid)">移除</button>
                    </td>
                </tr>
            </tbody>
        </table>
        <!-- 分頁 -->
        <div class="pagination">
            <button @click="previousPage" :disabled="pageInfo.currentPage === 1">上一頁</button>
            <span>Page {{ pageInfo.currentPage }} of {{ pageInfo.totalPage }}</span>
            <button @click="nextPage" :disabled="pageInfo.currentPage === pageInfo.totalPage">下一頁</button>
        </div>
        <!-- 變更狀態懸浮視窗 -->
        <div v-if="isModalOpen" class="modal-overlay" @click="closeDelModal">
            <div class="modal-content" @click.stop>  <!-- 懸浮視窗區域不會被背景點擊事件影響 -->
            <h2>訂單# {{ orderNumber }}</h2>
            <table class="order-table">
                <thead>
                    <tr>
                        <td>Name</td>
                        <td>Quantity</td>
                        <td>Price</td>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(item,index) in orderItems" :key="index">
                        <td>{{ item.name }}</td>
                        <td>{{ item.quantity }}</td>
                        <td>{{ item.price }}</td>
                    </tr>
                </tbody>
                <tfoot>
                    <tr>
                        <td colspan="2">Total</td>
                        <td>{{ totalPrice }}</td>
                    </tr>
                </tfoot>
            </table>
            <h3>收件人 : {{ receiverName }}</h3>
            <h3>配送地址 : {{ receiverAddress }}</h3>
            <button class="btn-config" @click="closeDelModal">確定</button>
            </div>
        </div>
        <!-- 刪除訂單懸浮視窗 -->
        <div v-if="isDelOrderModalOpen" class="modal-overlay" @click="closeDelOrderModal">
            <div class="modal-content" @click.stop>  <!-- 懸浮視窗區域不會被背景點擊事件影響 -->
            <h2>刪除訂單# {{ onDelSelect }}?</h2>
            <button class="btn-config" @click="delOrderConfirm">確定</button>
            </div>
        </div>
    </div>
</template>

<script setup>
  import { onMounted, ref } from 'vue';
  import { getBEOrder, getBEOrderItems, editBEOrderStatus, getBEOrderCount, backendDelOrder } from '@/api';

  const isModalOpen = ref(false);
  const isDelOrderModalOpen = ref(false);
  const orderForm = ref([
    {
        oid:'',
        uid:'',
        status:'',
        createTime:'',
        address:'555',
        city:'66',
        postal:'',
        receiver:''
    }
  ]);
  const pageInfo = ref({
    currentPage: 1,
    pageSize: 10,
    totalPage: null
  });
  const orderNumber = ref();
  const receiverName = ref();
  const receiverAddress = ref();
  const totalPrice = ref();
  const orderItems = ref([  
    {
        name:'',
        quantity:'',
        price:''
    }
  ]);

  const btnDetail = async (item) => {
    orderItems.value = await getBEOrderItems(item.oid);
    orderNumber.value = item.oid;
    receiverName.value = item.receiver;
    receiverAddress.value = item.postal + item.city + item.address;
    totalPrice.value = orderItems.value.reduce((sum,item) => sum + item.price,0);
    isModalOpen.value = true;
  };
  
  onMounted( async () => {
    orderForm.value = await getBEOrder(pageInfo.value);
    pageInfo.value.totalPage = await getBEOrderCount(pageInfo.value.pageSize);
  });

  const previousPage = async () => {
    pageInfo.value.currentPage--;
    orderForm.value = await getBEOrder(pageInfo.value);
  };
  const nextPage = async () => {
    pageInfo.value.currentPage++;
    orderForm.value = await getBEOrder(pageInfo.value);
  };

  const closeDelModal = () => {
    isModalOpen.value = false;
  };

  const onChangeStatus = async (item) => {
    if(item.status < 2)
        item.status += 1;
    else
        item.status = 0;
    await editBEOrderStatus(item.oid,item.status);
  };

  const onDelSelect = ref();
  const onDelOrder = (oid) => {
    onDelSelect.value = oid;
    isDelOrderModalOpen.value = true;
  };
  const closeDelOrderModal = () => {
    isDelOrderModalOpen.value = false;
  };
  const delOrderConfirm = async () => {
    await backendDelOrder(onDelSelect.value);
    orderForm.value = await getBEOrder(pageInfo.value);
    pageInfo.value.totalPage = await getBEOrderCount(pageInfo.value.pageSize);
    isDelOrderModalOpen.value = false;
  };
</script>

<style scoped>
  .order-page {
    position: relative;
    top: 80px;
    left: 90px;
    max-width: 1300px;
    margin: 0 auto;
    padding: 20px;
  }

  .order-table {
    width: 100%;
    border-collapse: collapse;
  }
  .order-table th {
    padding: 15px;
    text-align: center;
    border: 1px solid #eaeaea;
    background-color: #f2f2f2;
  }
  .order-table td {
    padding: 15px;
    text-align: center; /* 確保所有表格內容居中 */
    vertical-align: middle; /* 垂直居中 */
    border: 1px solid #eaeaea;
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

  .btn-config {
    padding: 10px 20px;
    background-color: #4CAF50;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    margin-left: 10px;
  }
  .btn-config:hover {
    background-color: #45a049;
  }

  .btn {
    padding: 3px 6px;
    background-color: #87b36e;
    color: white;
    border: none;
    border-radius: 2px;
    cursor: pointer;
    margin-left: 5px;
  }
  .btn:hover {
    background-color: #45a049;
  }

  select {
    font-size: 0.9rem;
    padding: 2px 5px;
  }

</style>