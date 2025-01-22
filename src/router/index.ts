import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '../views/Login.vue'
import PwChangeView from '../views/PwChange.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: LoginView
    },
    {
      path: '/pw-change',
      name: 'pwChange',
      component: PwChangeView
    }
  ]
})

export default router
