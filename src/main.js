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

router.beforeEach((to, from) => {
  if (to.meta.requiresAuth) {
    console.log('here need to auth')
    // 首頁就需要驗證 怎做??
    return true;
  }
})

createApp(App).use(router).use(store).mount('#app')
