<template>
    <div>
      <table>
        <thead>
          <tr>
            <th v-for="(header, index) in headers" :key="index">{{ header }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(row, rowIndex) in data" :key="rowIndex">
            <td v-if="imgData && imgData.length > 0">
              <img :src="imgData[rowIndex]" alt="not find"/>
            </td>
            <td v-for="(cell, cellIndex) in row" :key="cellIndex">{{ cell }}</td>
            <td>
              <button class="btn" @click="edit(row,imgData[rowIndex])">編輯</button>
              <button class="btn" @click="del(row)">刪除</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
</template>
  
<script>
  export default {
    name: 'DynamicTable',
    props: {
      data: {
        type: Array,
        required: true
      },
      headers: {
        type: Array,
        required: true
      },
      imgData: {
        type: Array,
        required: false,
        default: () => []
      }
    },
    methods: {
      edit(row,image){
        this.$emit('onEdit',row,image); //發射事件及該row資料給父組件
      },
      del(row){
        this.$emit('onDel',row); //發射事件及該row資料給父組件
      }
    }
  }
</script>
  
<style scoped>
  table {
    width: 100%;
    border-collapse: collapse;
  }
  
  th, td {
    border: 1px solid #ddd;
    padding: 8px;
    text-align: center;
  }
  
  th {
    background-color: #f2f2f2;
  }

  button{
    padding: 3px 6px;
    background-color: #87b36e;
    color: white;
    border: none;
    border-radius: 2px;
    cursor: pointer;
    margin-left: 5px;
  }
  button:hover {
    background-color: #45a049;
  }
</style>
  