import type { Category } from '@/types/common'

export const TERM_LIST = ['전체', '24시간 이내', '1주일 이내', '1개월 이내', '3개월 이내']
export const TASK_STATUS_LIST = ['요청', '진행 중', '검토 중', '완료', '종료']
export const PAGE_SIZE_LIST = ['20', '50', '100']
export const DUMMY_CATEGORY_LIST: Category[] = [
  {
    value: 1,
    content: '인프라 검토',
    subCategoryList: [
      { value: 11, content: '생성' },
      { value: 12, content: '삭제' },
      { value: 13, content: '변경' },
      { value: 14, content: '기타' }
    ]
  },
  {
    value: 2,
    content: 'VM',
    subCategoryList: [
      { value: 21, content: '생성' },
      { value: 22, content: '삭제' },
      { value: 23, content: '변경' },
      { value: 24, content: '기타' }
    ]
  },
  {
    value: 3,
    content: 'LB',
    subCategoryList: [
      { value: 31, content: '생성' },
      { value: 32, content: '삭제' },
      { value: 33, content: '변경' },
      { value: 34, content: '기타' }
    ]
  },
  {
    value: 4,
    content: 'K8S',
    subCategoryList: [
      { value: 41, content: '생성' },
      { value: 42, content: '삭제' },
      { value: 43, content: '변경' },
      { value: 44, content: '기타' }
    ]
  }
]
