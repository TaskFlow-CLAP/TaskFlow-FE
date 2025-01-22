import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '../views/Login.vue'
import PwChangeView from '../views/PwChange.vue'
import PwChangeEmailView from '../views/PwChangeEmail.vue'

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
    }
  ]
})

router.beforeEach((to, from, next) => {
  const isLogined = localStorage.getItem('isLoggedIn') // 로그인 상태 서버로부터 받아와야함, 우선 세션스토리지로 설정
  console.log('isLogined:', isLogined)

  if (to.path === '/pw-change' && (isLogined == 'false' || isLogined == null)) {
    alert('로그인이 필요합니다.')
    next('/login') // 로그인 페이지로 리다이렉트
  } else {
    next() // 접근 허용
  }
})

export default router
