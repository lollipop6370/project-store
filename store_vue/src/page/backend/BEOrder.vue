<template>
    <div class="order-page">
        <!-- order清單 -->
        <table class="order-table">
            <thead>
                <tr>
                    <th>Order#</th>
                    <th>uid</th>
                    <th>Status</th>
                    <th>Create Time</th>
                    <th>Address</th>
                    <th>Reciver</th>
                    <th>Detail</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(item,index) in orderForm" :key="index">
                    <td>{{ item.oid }}</td>
                    <th>{{ item.uid }}</th>
                    <td v-if="item.status === 0"> 處理中 </td>
                    <td v-else-if="item.status === 1"> 運送中 </td>
                    <td v-else-if="item.status === 2"> 已送達 </td>
                    <td>{{ item.createTime }}</td>
                    <td>{{ item.postal + item.city + item.address }}</td>
                    <td>{{ item.receiver }}</td>
                    <td>
                        <button class="btn-detail" @click="btnDetail(item)">詳細</button>
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
    </div>
</template>

<script setup>
  import { onMounted, ref } from 'vue';
  import { getBEOrder } from '@/api';

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

  const btnDetail = (item) => {

  };
  
  onMounted( async () => {
    orderForm.value = await getBEOrder(pageInfo.value);
    pageInfo.value.totalPage = Math.ceil(orderForm.value.length / pageInfo.value.pageSize);
  });

  const previousPage = async () => {
    pageInfo.value.currentPage--;
    orderForm.value = await getBEOrder(pageInfo.value);
  };
  const nextPage = async () => {
    pageInfo.value.currentPage++;
    orderForm.value = await getBEOrder(pageInfo.value);
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
</style>