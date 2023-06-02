import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import routes from './router'
import { createRouter, createWebHashHistory } from 'vue-router'
import store from './store'

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

createApp(App).use(router).use(store).mount('#app')
