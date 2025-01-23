import { createRouter, createWebHistory } from 'vue-router'
import MyRequestView from '@/views/MyRequestView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/my-request',
      name: 'MyRequest',
      component: MyRequestView
    },
    {
      path: '/icon',
      name: 'icon',
      component: () => import('../views/IconView.vue')
    }
  ]
})

export default router
