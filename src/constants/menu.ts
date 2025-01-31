import type { MenuItemProps } from '@/types/menu'

interface SideMenu {
  groupId: number
  groupTitle: string
  items: MenuItemProps[]
}

export const SIDE_USER_MENU: SideMenu[] = [
  {
    groupId: 1,
    groupTitle: '요청',
    items: [
      { menuId: 11, content: '내 요청', link: '/my-request', role: 'user' },
      { menuId: 12, content: '작업 요청', link: '/task-request', role: 'user' }
    ]
  }
]

export const SIDE_MANAGER_MENU: SideMenu[] = [
  {
    groupId: 1,
    groupTitle: '요청',
    items: [
      { menuId: 11, content: '내 요청', link: '/my-request', role: 'manager' },
      { menuId: 12, content: '작업 요청', link: '/task-request', role: 'manager' },
      { menuId: 13, content: '승인 대기중인 요청', link: '/requested', role: 'manager' },
      { menuId: 14, content: '전체 요청 기록', link: '/request-history', role: 'manager' }
    ]
  },
  {
    groupId: 1,
    groupTitle: '작업',
    items: [
      { menuId: 21, content: '내 작업', link: '/my-task', role: 'manager' },
      { menuId: 22, content: '작업 보드', link: '/task-board', role: 'manager' },
      { menuId: 23, content: '팀 작업 현황', link: '/team-board', role: 'manager' },
      { menuId: 24, content: '통계', link: '/statistics', role: 'manager' }
    ]
  }
]

export const SIDE_ADMIN_MENU: SideMenu[] = [
  {
    groupId: 1,
    groupTitle: '관리',
    items: [
      { menuId: 11, content: '회원 관리', link: '/member-management', role: 'admin' },
      { menuId: 12, content: '작업 관리', link: '/task-request', role: 'admin' }
    ]
  },
  {
    groupId: 2,
    groupTitle: '감사 로그',
    items: [
      { menuId: 21, content: '로그인 기록', link: '/login-logs', role: 'admin' },
      { menuId: 22, content: '작업 기록', link: '/api-logs', role: 'admin' }
    ]
  }
]
