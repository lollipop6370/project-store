<template>
    <div id="app">
      <NavBar />
      <router-view />  <!-- 渲染對應的路由組件 -->
    </div>
</template>
  
<script setup>
    import NavBar from './components/NavBar.vue';
</script>
  
<style>
  /* 全局樣式可放置在這裡 */
  body {
    margin: 0;
    font-family: 'Helvetica Neue', Arial, sans-serif;
    background-color: #f9f9f9;
  }
</style>
  