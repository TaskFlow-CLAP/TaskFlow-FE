import Cookies from 'js-cookie'
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

router.beforeEach((to, from, next) => {
  if (to.path === '/pw-change') {
    if (
      from.path === '/pw-check' ||
      from.path === '/pw-change-email' ||
      (from.path === '/login' && Cookies.get('accessToken'))
    ) {
      next()
    } else {
      next('/login')
      return
    }
  } else {
    next()
  }
})

export default router
