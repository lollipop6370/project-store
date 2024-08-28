<template>
  <div class="use-table">
    <DynamicTable :headers="tableHeaders" :data="tableData" :imgData="tableImgData" @onEdit="onChildEdit" @onDel="onChildDel"></DynamicTable>
    
  </div>
</template>

<script setup>
  import DynamicTable from '@/components/DynamicTable.vue';
  import { backendProduct } from '@/api';
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
    pageSize: 10,
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

  onMounted( async () => {
    await init();
  });
</script>

<style scoped>
.use-table {
    position: relative;
    width: 1500px;
    top: 100px;
    left: 300px;
}
</style>