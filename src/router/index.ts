import MyRequestView from '@/views/MyRequestView.vue'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue')
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
      path: '/my-request',
      name: 'MyRequest',
      component: MyRequestView
    },
    {
      path: '/task-request',
      name: 'taskRequest',
      component: () => import('../views/TaskRequestView.vue')
    },
    {
      path: '/requested',
      name: 'Requested',
      component: () => import('../views/RequestedView.vue')
    },
    {
      path: '/request-history',
      name: 'RequestHistory',
      component: () => import('../views/RequestHistory.vue')
    },
    {
      path: '/task-board',
      name: 'TaskBoard',
      component: () => import('../views/TaskBoardView.vue')
    },
    { path: '/my-task', name: 'MyTask', component: () => import('../views/MyTaskView.vue') },
    {
      path: '/member-management',
      name: 'MemberManagement',
      component: () => import('../views/MemberManagement.vue')
    },
    {
      path: '/login-logs',
      name: 'LoginLogs',
      component: () => import('../views/LoginLogsView.vue')
    },
    {
      path: '/api-logs',
      name: 'ApiLogs',
      component: () => import('../views/ApiLogsView.vue')
    },
    {
      path: '/team-board',
      name: 'TeamBoard',
      component: () => import('../views/TeamBoardView.vue')
    },
    {
      path: '/request-approve',
      name: 'requestApprove',
      component: () => import('../views/RequestApproveView.vue')
    },
    {
      path: '/user-registration',
      name: 'UserRegistration',
      component: () => import('../views/UserRegistrationView.vue')
    },
    {
      path: '/user-update',
      name: 'UserUpdate',
      component: () => import('../views/UserUpdateView.vue')
    },
    {
      path: '/task-management',
      name: 'TaskManagement',
      component: () => import('../views/TaskManagementView.vue')
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
