<template>
  <div class="use-table">
    <button class="btnNew" @click="onBtnNew">新增</button>
    <DynamicTable :headers="tableHeaders" :data="tableData" :imgData="tableImgData" @onEdit="onChildEdit" @onDel="onChildDel"></DynamicTable>
    <!-- 分頁導航 -->
    <div class="pagination">
          <button @click="previousPage" :disabled="pageInfo.currentPage === 1">Previous</button>
          <span>Page {{ pageInfo.currentPage }} of {{ pageInfo.totalPage }}</span>
          <button @click="nextPage" :disabled="pageInfo.currentPage === pageInfo.totalPage">Next</button>
    </div>
    <!-- 懸浮視窗(編輯) -->
    <div v-if="isEditModalOpen" class="modal-overlay" @click="closeModal">
      <div class="modal-content" @click.stop>  <!-- 懸浮視窗區域不會被背景點擊事件影響 -->
        <h2>編輯商品資訊</h2>
        <form @submit.prevent="handleSubmit">
            <img :src="formData.image" alt="not found"/>
            <div class="input-group">
                <label for="name">商品名</label>
                <input type="text" id="name" v-model="formData.name" required>
            </div>
            <div class="input-group">
                <label for="price">價格</label>
                <input type="int" id="price" v-model="formData.price" required>
            </div>
            <div class="input-group">
                <label for="type">商品總類</label>
                <select id="dropdown" v-model="formData.type" required>
                  <option v-for="option in options" :key="option.tid" :value="option.tid">
                    {{ option.tname }}
                  </option>
                </select>
            </div>
            <div class="input-group">
                <label for="count">商品數量</label>
                <input type="int" id="count" v-model="formData.count" required>
            </div>
            <button class="btn-config" type="submit">確定</button>
            <button class="btn-cancel" @click="closeModal">取消</button>
        </form>
      </div>
    </div>
    <!-- 懸浮視窗(刪除) -->
    <div v-if="isDelModalOpen" class="modal-overlay" @click="closeDelModal">
      <div class="modal-content" @click.stop>  <!-- 懸浮視窗區域不會被背景點擊事件影響 -->
        <h2>刪除此商品?</h2>
        <button class="btn-config" @click="checkdel">確定</button>
        <button class="btn-cancel" @click="closeDelModal">取消</button>
      </div>
    </div>
    <!-- 懸浮視窗(新增) -->
    <div v-if="isNewModalOpen" class="modal-overlay" @click="closeNewModal">
      <div class="modal-content" @click.stop>  <!-- 懸浮視窗區域不會被背景點擊事件影響 -->
        <h2>新增商品</h2>
        <form @submit.prevent="handleNewSubmit">
            <!-- <img :src="formData.image" alt="not found"/> -->
            <div class="input-group">
                <label for="image">商品圖片</label>
                <input type="file" id="image" accept="image/gif, image/jpeg, image/png" @change="onFileChange" required>
            </div>
            <div class="input-group">
                <label for="name">商品名</label>
                <input type="text" id="name" v-model="formData.name" required>
            </div>
            <div class="input-group">
                <label for="price">價格</label>
                <input type="int" id="price" v-model="formData.price" required>
            </div>
            <div class="input-group">
                <label for="type">商品總類</label>
                <select id="dropdown" v-model="formData.type" required>
                  <option v-for="option in options" :key="option.tid" :value="option.tid">
                    {{ option.tname }}
                  </option>
                </select>
            </div>
            <div class="input-group">
                <label for="count">商品數量</label>
                <input type="int" id="count" v-model="formData.count" required>
            </div>
            <button class="btn-config" type="submit">確定</button>
            <button class="btn-cancel" @click="closeNewModal">取消</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
  import DynamicTable from '@/components/DynamicTable.vue';
  import { backendProduct , backendProductPage , backendProductEdit , backendProductDel , backendProductImg , getTypeName } from '@/api';
  import { onMounted, ref } from 'vue';
  const tableHeaders = ref(['image', 'pid', 'name', 'price', 'type', 'count', 'edit / delete']);
  const tableData = ref([]);
  const tableImgData = ref([]);
  const pageInfo = ref({
    currentPage: 1,
    pageSize: 5,
    totalPage: null
  });
  const isEditModalOpen = ref(false);
  const isDelModalOpen = ref(false);
  const isNewModalOpen = ref(false);
  const selectFile = ref(null);
  const formData = ref({
    pid: null,
    name: "",
    price: null,
    type: null,
    count: null,
    image: ""
  });
  const options = ref([]);
  const init = async() => {  //初始化載入商品
    options.value = await getTypeName();
    let data = await backendProduct(pageInfo.value);
    tableImgData.value = [];
    tableData.value = [];
    for(let i = 0; i < data.length; i++){
        tableImgData.value.push(data[i].image);
        let d = [data[i].pid, data[i].name, data[i].price, data[i].type, data[i].count];
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

  const onChildEdit = (row,image) => {  //按下編輯
    formData.value.image = image;
    formData.value.pid = row[0];
    formData.value.name = row[1];
    formData.value.price = row[2];
    formData.value.type = row[3];
    formData.value.count = row[4];
    isEditModalOpen.value = true;
  };
  const handleSubmit = async () => {    //送出編輯
    await backendProductEdit(formData.value);
    await init();
    isEditModalOpen.value = false;
  };
  const onChildDel = (row,image) => {   //按下刪除
    formData.value.image = image;
    formData.value.pid = row[0];
    formData.value.name = row[1];
    formData.value.price = row[2];
    formData.value.type = row[3];
    formData.value.count = row[4];
    isDelModalOpen.value = true;
  };
  const checkdel = async () => {    //送出刪除
    await backendProductDel(formData.value.pid);
    await init();
    pageInfo.value.totalPage = await backendProductPage(pageInfo.value.pageSize);
    isDelModalOpen.value = false;
  };
  const closeDelModal = () => {   //關閉刪除懸浮視窗
    isDelModalOpen.value = false;
  };
  const closeModal = () => {   //關閉編輯懸浮視窗
    isEditModalOpen.value = false;
  };

  const onBtnNew = () => {  //開啟新增懸浮視窗
    formData.value.image = "";
    formData.value.pid = null;
    formData.value.name = "";
    formData.value.price = null;
    formData.value.type = null;
    formData.value.count = null;
    isNewModalOpen.value = true;
  };
  const onFileChange = (even) => {  //保存選擇的圖片
    selectFile.value = even.target.files[0];
  };
  const handleNewSubmit = async () => {   // 送出新增商品
    const imgFormData = new FormData();
    imgFormData.append("file",selectFile.value);
    imgFormData.append("product",JSON.stringify(formData.value));  //將對象序列化為JSON字符串
    await backendProductImg(imgFormData);
    await init();
    pageInfo.value.totalPage = await backendProductPage(pageInfo.value.pageSize);
    isNewModalOpen.value = false;
  };
  const closeNewModal = () => {  //關閉新增懸浮視窗
    isNewModalOpen.value = false;
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
    z-index: 8000;
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

  .btnNew {
    padding: 5px 10px;
    background-color: #4CAF50;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    margin-bottom: 10px;
  }
  .btnNew:hover {
    background-color: #45a049;
  }
</style>