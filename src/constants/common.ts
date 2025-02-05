import type { TaskStatusListTypes } from '@/types/common'

export const TERM_LIST = [
  { value: '', content: '전체' },
  { value: '1', content: '1시간 이내' },
  { value: '24', content: '24시간 이내' },
  { value: '168', content: '1주일 이내' },
  { value: '730', content: '1개월 이내' },
  { value: '2190', content: '3개월 이내' }
]
export const TASK_STATUS_LIST: TaskStatusListTypes[] = [
  { value: 'IN_PROGRESS', content: '진행 중' },
  { value: 'PENDING_COMPLETED', content: '검토 중' },
  { value: 'COMPLETED', content: '완료' },
  { value: 'TERMINATED', content: '종료' }
]
export const PAGE_SIZE_LIST = [
  { value: '20', content: '20' },
  { value: '50', content: '50' },
  { value: '100', content: '100' }
]

export const ROLE_LIST = [
  { value: '', content: '전체' },
  { value: 'user', content: '사용자' },
  { value: 'manager', content: '담당자' },
  { value: 'admin', content: '관리자' }
]

export const COLOR_LIST = [
  { borderColor: '#DC2626', fillColor: '#FEF2F2', colorEnum: 'RED' },
  { borderColor: '#FB923C', fillColor: '#FFF7ED', colorEnum: 'ORANGE' },
  { borderColor: '#FACC15', fillColor: '#FEFCE8', colorEnum: 'YELLOW' },
  { borderColor: '#22C55E', fillColor: '#F0FDF4', colorEnum: 'GREEN' },
  { borderColor: '#3B82F6', fillColor: '#EFF6FF', colorEnum: 'BLUE' },
  { borderColor: '#6366F1', fillColor: '#EEF2FF', colorEnum: 'INDIGO' },
  { borderColor: '#8B5CF6', fillColor: '#F5F3FF', colorEnum: 'PURPLE' },
  { borderColor: '#A1A1AA', fillColor: '#F4F4F5', colorEnum: 'GREY' }
]

export const PERMITTED_URL = {
  UNKNOWN: ['login', 'pw-change-email', 'pw-change'],
  ROLE_USER: ['my-request', 'task-request', 'edit-information', 'pw-check', 'pw-change'],
  ROLE_MANAGER: [
    'my-request',
    'task-request',
    'requested',
    'request-history',
    'my-task',
    'task-board',
    'team-board',
    'statistics',
    'task-detail',
    'edit-information',
    'pw-check',
    'pw-change'
  ],
  ROLE_ADMIN: [
    'member-management',
    'edit-information',
    'task-management',
    'category-first',
    'category-second',
    'login-logs',
    'api-logs',
    'edit-information',
    'pw-check',
    'pw-change'
  ]
}
