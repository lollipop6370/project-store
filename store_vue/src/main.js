//import './assets/styles.scss'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import router from './router'
import App from './App.vue'

import ElementPlus from 'element-plus';

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
