<template>
  <div class="use-table">
    <DynamicTable :headers="tableHeaders" :data="tableData" @onEdit="onChildEdit" @onDel="onChildDel"></DynamicTable>
    <!-- 分頁導航 -->
    <div class="pagination">
          <button @click="previousPage" :disabled="pageInfo.currentPage === 1">Previous</button>
          <span>Page {{ pageInfo.currentPage }} of {{ pageInfo.totalPage }}</span>
          <button @click="nextPage" :disabled="pageInfo.currentPage === pageInfo.totalPage">Next</button>
    </div>
    <!-- 懸浮視窗 -->
    <div v-if="isEditModalOpen" class="modal-overlay" @click="closeModal">
      <div class="modal-content" @click.stop>  <!-- 懸浮視窗區域不會被背景點擊事件影響 -->
        <h2>編輯用戶資訊</h2>
        <form @submit.prevent="handleSubmit">
            <div class="input-group">
                <label for="username">姓名</label>
                <input type="text" id="username" v-model="formData.username" required>
            </div>
            <div class="input-group">
                <label for="password">密碼</label>
                <input type="text" id="password" v-model="formData.password" required>
            </div>
            <div class="input-group">
                <label for="email">電子郵件</label>
                <input type="email" id="email" v-model="formData.email" required>
            </div>
            
            <button class="btn-config" type="submit">確定</button>
            <button class="btn-cancel" @click="closeModal">取消</button>
        </form>
      </div>
    </div>
    <div v-if="isDelModalOpen" class="modal-overlay" @click="closeDelModal">
      <div class="modal-content" @click.stop>  <!-- 懸浮視窗區域不會被背景點擊事件影響 -->
        <h2>刪除此用戶?</h2>
        <button class="btn-config" @click="checkdel">確定</button>
        <button class="btn-cancel" @click="closeDelModal">取消</button>
      </div>
    </div>
  </div>
</template>

<script setup>
  import DynamicTable from '@/components/DynamicTable.vue';
  import { backendUser, userEdit, userDel, userPageCount } from '@/api';
  import { onMounted, ref } from 'vue';

  const tableHeaders = ref(['uid', 'username', 'password', 'email', 'edit / delete']);
  const tableData = ref([
        ['John', 28, '工程師'],
        ['Jane', 32, '設計師'],
        ['Mike', 36, '產品經理']
  ]);
  const isEditModalOpen = ref(false);
  const isDelModalOpen = ref(false);
  const formData = ref({
    uid:null,
    username:"",
    password:"",
    email:""
  });
  const pageInfo = ref({
    currentPage: 1,
    pageSize: 10,
    totalPage: null
  });
  const previousPage = () =>{  //上一頁
    pageInfo.value.currentPage -= 1;
    init();
  };
  const nextPage = () => {  //下一頁
    pageInfo.value.currentPage += 1;
    init();
  };

  const resetForm = () => {   //清空表單
    formData.value.uid = null;
    formData.value.username = '';
    formData.value.password = '';
    formData.value.email = '';
  };

  const onChildEdit = (row)=> {   //編輯用戶
    console.log(row);//做一個懸浮視窗編輯用戶
    isEditModalOpen.value = true;
    formData.value.uid = row[0];
    formData.value.username = row[1];
    formData.value.password = row[2];
    formData.value.email = row[3];
  };

  const handleSubmit = async () =>{   //確定編輯
    await userEdit(formData.value);
    resetForm();
    await init();
    isEditModalOpen.value = false;
  };
  const closeModal = () =>{   //關閉懸浮視窗
    isEditModalOpen.value = false;
  };

  const init = async() => {
    let data = await backendUser(pageInfo.value);
    tableData.value = [];
    for(let i = 0; i < data.length; i++){
        let d = [data[i].uid, data[i].username, data[i].password, data[i].email];
        tableData.value.push(d);
    }
  };

  const delUid = ref();
  const onChildDel = (row)=> {   //刪除用戶
    //確認要刪除?
    delUid.value = row[0];
    isDelModalOpen.value = true;
  };
  const checkdel = async () => {  //確定刪除
    await userDel(delUid.value);
    isDelModalOpen.value = false;
    await init();
  };
  const closeDelModal = () => {    //取消刪除
    isDelModalOpen.value = false;
  };

  onMounted( async () => {
    await init();
    pageInfo.value.totalPage = await userPageCount(pageInfo.value.pageSize);
  });

</script>

<style scoped>
  .use-table {
    position: relative;
    width: 1500px;
    top: 100px;
    left: 300px;
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

  .input-group {
    margin-bottom: 15px;
  }

  .input-group label {
    display: block;
    margin-bottom: 5px;
  }

  .input-group input {
    width: 100%;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
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

  .btn-cancel {
    padding: 10px 20px;
    background-color: #b8bdb5;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    margin-left: 10px;
  }
  .btn-cancel:hover {
    background-color: #cdd6c7;
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