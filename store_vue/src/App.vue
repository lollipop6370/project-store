<template>
    <div id="app">
      <NavBar v-if="showNavBar" />
      <BEBar v-if="showBEBar" />
      <router-view />  <!-- 渲染對應的路由組件 -->
    </div>
</template>
  
<script setup>
    import NavBar from './components/NavBar.vue';
    import BEBar from '@/components/backend-topBar.vue'
    import { useRoute } from 'vue-router';
    import { computed } from 'vue';

    const route = useRoute();
    const showNavBar = computed(() => route.meta.showNavBar !== false);
    const showBEBar = computed(() => route.meta.showBEBar !== false);
</script>
  
<style>
  /* 全局樣式可放置在這裡 */
  body {
    margin: 0;
    font-family: 'Helvetica Neue', Arial, sans-serif;
    background-color: #f9f9f9;
  }
</style>
  