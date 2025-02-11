import { PERMITTED_URL } from '@/constants/common'
import { useErrorStore } from '@/stores/error'
import { useMemberStore } from '@/stores/member'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: () => import('../views/LoginView.vue')
    },
    {
      path: '/pw-change',
      name: 'PwChange',
      component: () => import('../views/PwChangeView.vue')
    },
    {
      path: '/pw-change-email',
      name: 'PwChangeEmail',
      component: () => import('../views/PwChangeEmail.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/pw-check',
      name: 'PWCheckView',
      component: () => import('../views/PwCheckView.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/my-request',
      name: 'MyRequest',
      component: () => import('../views/MyRequestView.vue')
    },
    {
      path: '/task-request',
      name: 'TaskRequest',
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
      component: () => import('../views/RequestHistoryView.vue')
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
      component: () => import('../views/MemberManagementView.vue')
    },
    {
      path: '/category-first',
      name: 'CategoryFirst',
      component: () => import('../views/CategoryFirstAddView.vue'),
      children: [
        {
          path: ':id',
          name: 'EditSubCategory',
          component: () => import('../views/CategoryFirstAddView.vue')
        }
      ]
    },
    {
      path: '/category-second',
      name: 'CategorySecond',
      component: () => import('../views/CategorySecondAddView.vue'),
      children: [
        {
          path: ':id',
          name: 'EditMainCategory',
          component: () => import('../views/CategorySecondAddView.vue')
        }
      ]
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
      name: 'RequestApprove',
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
    },
    {
      path: '/edit-information',
      name: 'EditInformation',
      component: () => import('../views/EditInformationView.vue')
    },
    {
      path: '/statistics',
      name: 'Statistics',
      component: () => import('../views/StatisticsView.vue')
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      component: () => import('../views/NotFoundView.vue')
    }
  ]
})

router.beforeEach(async (to, from, next) => {
  const memberStore = useMemberStore()
  const { setError } = useErrorStore()

  await memberStore.updateMemberInfoWithToken()
  const { info } = memberStore

  const originUrl = to.path.split('/')[1]

  const redirectMap = {
    ROLE_USER: '/my-request',
    ROLE_MANAGER: '/my-task',
    ROLE_ADMIN: '/member-management'
  }

  if (info.role && to.path === '/login') {
    return next(redirectMap[info.role])
  }

  if (!info.role) {
    if (PERMITTED_URL.UNKNOWN.includes(originUrl)) {
      return next()
    }
    if (to.path === '/login') {
      return next()
    }
    setError('로그인이 필요합니다')
    return next('/login')
  }

  const permittedUrlMap = {
    ROLE_USER: PERMITTED_URL.ROLE_USER,
    ROLE_MANAGER: PERMITTED_URL.ROLE_MANAGER,
    ROLE_ADMIN: PERMITTED_URL.ROLE_ADMIN
  }

  if (from.path === redirectMap[info.role] && !permittedUrlMap[info.role].includes(originUrl)) {
    return false
  }

  if (!permittedUrlMap[info.role].includes(originUrl)) {
    if (to.path === redirectMap[info.role]) {
      return next()
    }
    setError('권한이 없는 페이지입니다')
    return next(redirectMap[info.role])
  }

  return next()
})

export default router
