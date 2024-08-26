<template>
  <div class="use-table">
    <DynamicTable :headers="tableHeaders" :data="tableData"></DynamicTable>
  </div>
</template>

<script setup>
  import DynamicTable from '@/components/DynamicTable.vue';
  import { ref } from 'vue';

  const tableHeaders = ref(['名稱', '年齡', '職業']);
  const tableData = ref([
        ['John', 28, '工程師'],
        ['Jane', 32, '設計師'],
        ['Mike', 36, '產品經理']
  ]);
</script>

<style scoped>
.use-table {
    position: relative;
    width: 1500px;
    top: 100px;
    left: 300px;
    
}
</style>