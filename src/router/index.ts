import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '../views/Login.vue'
import PwChangeView from '../views/PwChange.vue'
import PwChangeEmailView from '../views/PwChangeEmail.vue'
import PWCheckView from '../views/PwCheck.vue'

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
    },
    {
      path: '/pw-change-email',
      name: 'pwChangeEmail',
      component: PwChangeEmailView,
      meta: { requiresAuth: true }
    },
    {
      path: '/pw-check',
      name: 'PWCheckView',
      component: PWCheckView,
      meta: { requiresAuth: true }
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.path === '/pw-change') {
    if (from.path === '/pw-check' || from.path === '/pw-change-email') {
      next()
    } else {
      alert('비밀번호를 먼저 확인해주세요.')
      next('/login')
      return
    }
  } else {
    next()
  }
})

export default router
