<template>
    <div id="backend-bar">
      <header class="header">
        <!-- 上方固定橫條內容 -->
        <h1>後臺管理系統</h1>
        <div class="user-info">用戶名 | 設置 | 登出</div>
      </header>
      <div class="container">
        <aside class="sidebar">
          <!-- 左邊固定橫條內容 -->
          <ul>
            <li>選項1</li>
            <li>選項2</li>
            <li>選項3</li>
          </ul>
        </aside>
      </div>
    </div>
</template>
  
<script setup>

</script>
  
<style scoped>
  body, html {
    margin: 0;
    padding: 0;
    height: 100%;
  }
  
  #app {
    display: flex;
    flex-direction: column;
    height: 100%;
  }
  
  .header {
    background-color: #333;
    color: white;
    display: flex;
    justify-content: space-between;
    padding: 10px 20px;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1000;
  }
  
  .container {
    display: flex;
    margin-top: 60px; /* 根據 header 的高度調整 */
    height: calc(100% - 60px);
  }
  
  .sidebar {
    width: 250px;
    background-color: #444;
    color: white;
    padding: 15px;
    position: fixed;
    top: 60px;
    bottom: 0;
    left: 0;
    z-index: 1000;
  }
  
  .content {
    flex: 1;
    margin-left: 250px; /* 根據 sidebar 的寬度調整 */
    padding: 20px;
    overflow-y: auto;
  }
</style>
  