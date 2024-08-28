<template>
  <div class="use-table">
    <DynamicTable :headers="tableHeaders" :data="tableData" :imgData="tableImgData" @onEdit="onChildEdit" @onDel="onChildDel"></DynamicTable>
    <!-- 分頁導航 -->
    <div class="pagination">
          <button @click="previousPage" :disabled="pageInfo.currentPage === 1">Previous</button>
          <span>Page {{ pageInfo.currentPage }} of {{ pageInfo.totalPage }}</span>
          <button @click="nextPage" :disabled="pageInfo.currentPage === pageInfo.totalPage">Next</button>
    </div>
  </div>
</template>

<script setup>
  import DynamicTable from '@/components/DynamicTable.vue';
  import { backendProduct , backendProductPage } from '@/api';
  import { onMounted, ref } from 'vue';
  const tableHeaders = ref(['image', 'id', 'name', 'price', 'type', 'edit / delete']);
  const tableData = ref([
        ['John', 28, '工程師'],
        ['Jane', 32, '設計師'],
        ['Mike', 36, '產品經理']
  ]);
  const tableImgData = ref([]);
  const pageInfo = ref({
    currentPage: 1,
    pageSize: 5,
    totalPage: null
  });
  const init = async() => {  //初始化載入商品
    let data = await backendProduct(pageInfo.value);
    tableImgData.value = [];
    tableData.value = [];
    for(let i = 0; i < data.length; i++){
        tableImgData.value.push(data[i].image);
        let d = [data[i].id, data[i].name, data[i].price, data[i].type];
        tableData.value.push(d);
    }
  };
  const previousPage = () => {   //上一頁
    pageInfo.value.currentPage -= 1;
    init();
  };
  const nextPage = () => {    //下一頁
    pageInfo.value.currentPage += 1;
    init();
  };

  onMounted( async () => {
    await init();
    pageInfo.value.totalPage = await backendProductPage(pageInfo.value.pageSize);
  });
</script>

<style scoped>
.use-table {
    position: relative;
    width: 1500px;
    top: 100px;
    left: 300px;
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