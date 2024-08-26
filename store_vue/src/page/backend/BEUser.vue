<template>
  <div class="use-table">
    <DynamicTable :headers="tableHeaders" :data="tableData" @onEdit="onChildEdit" @onDel="onChildDel"></DynamicTable>

  </div>
</template>

<script setup>
  import DynamicTable from '@/components/DynamicTable.vue';
  import { backendUser } from '@/api';
  import { onMounted, ref } from 'vue';

  const tableHeaders = ref(['uid', 'username', 'password', 'email', 'edit / delete']);
  const tableData = ref([
        ['John', 28, '工程師'],
        ['Jane', 32, '設計師'],
        ['Mike', 36, '產品經理']
  ]);

  const onChildEdit = (row)=> {   //編輯用戶
    console.log(row);//做一個懸浮視窗編輯用戶

  };
  const onChildDel = (row)=> {   //刪除用戶
    //確認要刪除?
  };

  onMounted( async () => {
    let data = await backendUser();
    tableData.value = [];
    for(let i = 0; i < data.length; i++){
        let d = [data[i].uid, data[i].username, data[i].password, data[i].email];
        tableData.value.push(d);
    }
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