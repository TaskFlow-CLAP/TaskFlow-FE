import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/Login.vue')
    },

    {
      path: '/pw-change',
      name: 'pwChange',
      component: () => import('../views/PwChange.vue')
    },
    {
      path: '/pw-change-email',
      name: 'pwChangeEmail',
      component: () => import('../views/PwChangeEmail.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/pw-check',
      name: 'PWCheckView',
      component: () => import('../views/PwCheck.vue'),
      meta: { requiresAuth: true }
    },

    {
      path: '/icon',
      name: 'icon',
      component: () => import('../views/IconView.vue')
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
