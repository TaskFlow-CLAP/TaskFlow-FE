import type { LogsListData, MemberManagementListData } from '@/types/admin'
import type { Category } from '@/types/common'
import type {
  MyTaskListData,
  RequestedListData,
  RequestHistoryListData,
  TaskCardList
} from '@/types/manager'
import type { MyRequestListData } from '@/types/user'

export const DUMMY_CATEGORY_LIST: Category[] = [
  {
    id: 1,
    content: '인프라 검토',
    subCategoryList: [
      { id: 11, content: '생성' },
      { id: 12, content: '삭제' },
      { id: 13, content: '변경' },
      { id: 14, content: '기타' }
    ]
  },
  {
    id: 2,
    content: 'VM',
    subCategoryList: [
      { id: 21, content: '생성' },
      { id: 22, content: '삭제' },
      { id: 23, content: '변경' },
      { id: 24, content: '기타' }
    ]
  },
  {
    id: 3,
    content: 'LB',
    subCategoryList: [
      { id: 31, content: '생성' },
      { id: 32, content: '삭제' },
      { id: 33, content: '변경' },
      { id: 34, content: '기타' }
    ]
  },
  {
    id: 4,
    content: 'K8S',
    subCategoryList: [
      { id: 41, content: '생성' },
      { id: 42, content: '삭제' },
      { id: 43, content: '변경' },
      { id: 44, content: '기타' }
    ]
  }
]

export const DUMMY_MY_REQUEST_LIST_DATA: MyRequestListData[] = [
  {
    taskId: 1,
    taskCode: 'asfawnwakngla',
    requestedAt: '2025.01.01',
    mainCategoryName: 'VM',
    categoryName: '생성',
    title: 'VM 생성 부탁드립니다',
    processorName: '',
    taskStatus: '요청',
    finishedAt: '2025.01.11'
  },
  {
    taskId: 2,
    taskCode: 'asfawnwakngla',
    requestedAt: '2025.01.01',
    mainCategoryName: 'VM',
    categoryName: '생성',
    title: 'VM 생성 부탁드립니다',
    processorImg: 'https://picsum.photos/24/24',
    processorName: 'Tony.tsx',
    taskStatus: '진행 중',
    finishedAt: '2025.01.11'
  },
  {
    taskId: 3,
    taskCode: 'asfawnwakngla',
    requestedAt: '2025.01.01',
    mainCategoryName: 'VM',
    categoryName: '생성',
    title: 'VM 생성 부탁드립니다',
    processorImg: 'https://picsum.photos/24/24',
    processorName: 'Tony.tsx',
    taskStatus: '검토 중',
    finishedAt: '2025.01.11'
  },
  {
    taskId: 4,
    taskCode: 'asfawnwakngla',
    requestedAt: '2025.01.01',
    mainCategoryName: 'VM',
    categoryName: '생성',
    title: 'VM 생성 부탁드립니다',
    processorImg: 'https://picsum.photos/24/24',
    processorName: 'Tony.tsx',
    taskStatus: '완료',
    finishedAt: '2025.01.11'
  },
  {
    taskId: 5,
    taskCode: 'asfawnwakngla',
    requestedAt: '2025.01.01',
    mainCategoryName: 'VM',
    categoryName: '생성',
    title: 'VM 생성 부탁드립니다',
    processorImg: 'https://picsum.photos/24/24',
    processorName: 'Tony.tsx',
    taskStatus: '종료',
    finishedAt: '2025.01.11'
  },
  {
    taskId: 6,
    taskCode: 'asfawnwakngla',
    requestedAt: '2025.01.01',
    mainCategoryName: 'VM',
    categoryName: '생성',
    title: 'VM 생성 부탁드립니다',
    processorName: '',
    taskStatus: '요청',
    finishedAt: '2025.01.11'
  },
  {
    taskId: 7,
    taskCode: 'asfawnwakngla',
    requestedAt: '2025.01.01',
    mainCategoryName: 'VM',
    categoryName: '생성',
    title: 'VM 생성 부탁드립니다',
    processorImg: 'https://picsum.photos/24/24',
    processorName: 'Tony.tsx',
    taskStatus: '진행 중',
    finishedAt: '2025.01.11'
  },
  {
    taskId: 8,
    taskCode: 'asfawnwakngla',
    requestedAt: '2025.01.01',
    mainCategoryName: 'VM',
    categoryName: '생성',
    title: 'VM 생성 부탁드립니다',
    processorImg: 'https://picsum.photos/24/24',
    processorName: 'Tony.tsx',
    taskStatus: '검토 중',
    finishedAt: '2025.01.11'
  },
  {
    taskId: 9,
    taskCode: 'asfawnwakngla',
    requestedAt: '2025.01.01',
    mainCategoryName: 'VM',
    categoryName: '생성',
    title: 'VM 생성 부탁드립니다',
    processorImg: 'https://picsum.photos/24/24',
    processorName: 'Tony.tsx',
    taskStatus: '완료',
    finishedAt: '2025.01.11'
  },
  {
    taskId: 10,
    taskCode: 'asfawnwakngla',
    requestedAt: '2025.01.01',
    mainCategoryName: 'VM',
    categoryName: '생성',
    title: 'VM 생성 부탁드립니다',
    processorImg: 'https://picsum.photos/24/24',
    processorName: 'Tony.tsx',
    taskStatus: '종료',
    finishedAt: '2025.01.11'
  },
  {
    taskId: 11,
    taskCode: 'asfawnwakngla',
    requestedAt: '2025.01.01',
    mainCategoryName: 'VM',
    categoryName: '생성',
    title: 'VM 생성 부탁드립니다',
    processorName: '',
    taskStatus: '요청',
    finishedAt: '2025.01.11'
  },
  {
    taskId: 12,
    taskCode: 'asfawnwakngla',
    requestedAt: '2025.01.01',
    mainCategoryName: 'VM',
    categoryName: '생성',
    title: 'VM 생성 부탁드립니다',
    processorImg: 'https://picsum.photos/24/24',
    processorName: 'Tony.tsx',
    taskStatus: '진행 중',
    finishedAt: '2025.01.11'
  },
  {
    taskId: 13,
    taskCode: 'asfawnwakngla',
    requestedAt: '2025.01.01',
    mainCategoryName: 'VM',
    categoryName: '생성',
    title: 'VM 생성 부탁드립니다',
    processorImg: 'https://picsum.photos/24/24',
    processorName: 'Tony.tsx',
    taskStatus: '검토 중',
    finishedAt: '2025.01.11'
  },
  {
    taskId: 14,
    taskCode: 'asfawnwakngla',
    requestedAt: '2025.01.01',
    mainCategoryName: 'VM',
    categoryName: '생성',
    title: 'VM 생성 부탁드립니다',
    processorImg: 'https://picsum.photos/24/24',
    processorName: 'Tony.tsx',
    taskStatus: '완료',
    finishedAt: '2025.01.11'
  },
  {
    taskId: 15,
    taskCode: 'asfawnwakngla',
    requestedAt: '2025.01.01',
    mainCategoryName: 'VM',
    categoryName: '생성',
    title: 'VM 생성 부탁드립니다',
    processorImg: 'https://picsum.photos/24/24',
    processorName: 'Tony.tsx',
    taskStatus: '종료',
    finishedAt: '2025.01.11'
  },
  {
    taskId: 16,
    taskCode: 'asfawnwakngla',
    requestedAt: '2025.01.01',
    mainCategoryName: 'VM',
    categoryName: '생성',
    title: 'VM 생성 부탁드립니다',
    processorName: '',
    taskStatus: '요청',
    finishedAt: '2025.01.11'
  },
  {
    taskId: 17,
    taskCode: 'asfawnwakngla',
    requestedAt: '2025.01.01',
    mainCategoryName: 'VM',
    categoryName: '생성',
    title: 'VM 생성 부탁드립니다',
    processorImg: 'https://picsum.photos/24/24',
    processorName: 'Tony.tsx',
    taskStatus: '진행 중',
    finishedAt: '2025.01.11'
  },
  {
    taskId: 18,
    taskCode: 'asfawnwakngla',
    requestedAt: '2025.01.01',
    mainCategoryName: 'VM',
    categoryName: '생성',
    title: 'VM 생성 부탁드립니다',
    processorImg: 'https://picsum.photos/24/24',
    processorName: 'Tony.tsx',
    taskStatus: '검토 중',
    finishedAt: '2025.01.11'
  },
  {
    taskId: 19,
    taskCode: 'asfawnwakngla',
    requestedAt: '2025.01.01',
    mainCategoryName: 'VM',
    categoryName: '생성',
    title: 'VM 생성 부탁드립니다',
    processorImg: 'https://picsum.photos/24/24',
    processorName: 'Tony.tsx',
    taskStatus: '완료',
    finishedAt: '2025.01.11'
  },
  {
    taskId: 20,
    taskCode: 'asfawnwakngla',
    requestedAt: '2025.01.01',
    mainCategoryName: 'VM',
    categoryName: '생성',
    title: 'VM 생성 부탁드립니다',
    processorImg: 'https://picsum.photos/24/24',
    processorName: 'Tony.tsx',
    taskStatus: '종료',
    finishedAt: '2025.01.11'
  }
]

export const DUMMY_REQUESTED_LIST_DATA: RequestedListData[] = [
  {
    taskId: 1,
    requestedAt: '2025.01.01',
    mainCategoryName: 'VM',
    categoryName: '생성',
    title: 'VM 생성 부탁드립니다',
    requesterImg: 'https://picsum.photos/24/24',
    requesterName: 'Hello.world'
  },
  {
    taskId: 2,
    requestedAt: '2025.01.01',
    mainCategoryName: 'VM',
    categoryName: '생성',
    title: 'VM 생성 부탁드립니다',
    requesterImg: 'https://picsum.photos/24/24',
    requesterName: 'Hello.world'
  },
  {
    taskId: 3,
    requestedAt: '2025.01.01',
    mainCategoryName: 'VM',
    categoryName: '생성',
    title: 'VM 생성 부탁드립니다',
    requesterImg: 'https://picsum.photos/24/24',
    requesterName: 'Hello.world'
  },
  {
    taskId: 4,
    requestedAt: '2025.01.01',
    mainCategoryName: 'VM',
    categoryName: '생성',
    title: 'VM 생성 부탁드립니다',
    requesterImg: 'https://picsum.photos/24/24',
    requesterName: 'Hello.world'
  },
  {
    taskId: 5,
    requestedAt: '2025.01.01',
    mainCategoryName: 'VM',
    categoryName: '생성',
    title: 'VM 생성 부탁드립니다',
    requesterImg: 'https://picsum.photos/24/24',
    requesterName: 'Hello.world'
  },
  {
    taskId: 6,
    requestedAt: '2025.01.01',
    mainCategoryName: 'VM',
    categoryName: '생성',
    title: 'VM 생성 부탁드립니다',
    requesterImg: 'https://picsum.photos/24/24',
    requesterName: 'Hello.world'
  },
  {
    taskId: 7,
    requestedAt: '2025.01.01',
    mainCategoryName: 'VM',
    categoryName: '생성',
    title: 'VM 생성 부탁드립니다',
    requesterImg: 'https://picsum.photos/24/24',
    requesterName: 'Hello.world'
  },
  {
    taskId: 8,
    requestedAt: '2025.01.01',
    mainCategoryName: 'VM',
    categoryName: '생성',
    title: 'VM 생성 부탁드립니다',
    requesterImg: 'https://picsum.photos/24/24',
    requesterName: 'Hello.world'
  },
  {
    taskId: 9,
    requestedAt: '2025.01.01',
    mainCategoryName: 'VM',
    categoryName: '생성',
    title: 'VM 생성 부탁드립니다',
    requesterImg: 'https://picsum.photos/24/24',
    requesterName: 'Hello.world'
  },
  {
    taskId: 10,
    requestedAt: '2025.01.01',
    mainCategoryName: 'VM',
    categoryName: '생성',
    title: 'VM 생성 부탁드립니다',
    requesterImg: 'https://picsum.photos/24/24',
    requesterName: 'Hello.world'
  },
  {
    taskId: 11,
    requestedAt: '2025.01.01',
    mainCategoryName: 'VM',
    categoryName: '생성',
    title: 'VM 생성 부탁드립니다',
    requesterImg: 'https://picsum.photos/24/24',
    requesterName: 'Hello.world'
  },
  {
    taskId: 12,
    requestedAt: '2025.01.01',
    mainCategoryName: 'VM',
    categoryName: '생성',
    title: 'VM 생성 부탁드립니다',
    requesterImg: 'https://picsum.photos/24/24',
    requesterName: 'Hello.world'
  },
  {
    taskId: 13,
    requestedAt: '2025.01.01',
    mainCategoryName: 'VM',
    categoryName: '생성',
    title: 'VM 생성 부탁드립니다',
    requesterImg: 'https://picsum.photos/24/24',
    requesterName: 'Hello.world'
  },
  {
    taskId: 14,
    requestedAt: '2025.01.01',
    mainCategoryName: 'VM',
    categoryName: '생성',
    title: 'VM 생성 부탁드립니다',
    requesterImg: 'https://picsum.photos/24/24',
    requesterName: 'Hello.world'
  },
  {
    taskId: 15,
    requestedAt: '2025.01.01',
    mainCategoryName: 'VM',
    categoryName: '생성',
    title: 'VM 생성 부탁드립니다',
    requesterImg: 'https://picsum.photos/24/24',
    requesterName: 'Hello.world'
  },
  {
    taskId: 16,
    requestedAt: '2025.01.01',
    mainCategoryName: 'VM',
    categoryName: '생성',
    title: 'VM 생성 부탁드립니다',
    requesterImg: 'https://picsum.photos/24/24',
    requesterName: 'Hello.world'
  },
  {
    taskId: 17,
    requestedAt: '2025.01.01',
    mainCategoryName: 'VM',
    categoryName: '생성',
    title: 'VM 생성 부탁드립니다',
    requesterImg: 'https://picsum.photos/24/24',
    requesterName: 'Hello.world'
  },
  {
    taskId: 18,
    requestedAt: '2025.01.01',
    mainCategoryName: 'VM',
    categoryName: '생성',
    title: 'VM 생성 부탁드립니다',
    requesterImg: 'https://picsum.photos/24/24',
    requesterName: 'Hello.world'
  },
  {
    taskId: 19,
    requestedAt: '2025.01.01',
    mainCategoryName: 'VM',
    categoryName: '생성',
    title: 'VM 생성 부탁드립니다',
    requesterImg: 'https://picsum.photos/24/24',
    requesterName: 'Hello.world'
  },
  {
    taskId: 20,
    requestedAt: '2025.01.01',
    mainCategoryName: 'VM',
    categoryName: '생성',
    title: 'VM 생성 부탁드립니다',
    requesterImg: 'https://picsum.photos/24/24',
    requesterName: 'Hello.world'
  }
]

export const DUMMY_REQUEST_HISTORY_LIST_DATA: RequestHistoryListData[] = [
  {
    taskId: 1,
    taskCode: 'asfawnwakngla',
    requestedAt: '2025.01.01',
    mainCategoryName: 'VM',
    categoryName: '생성',
    title: 'VM 생성 부탁드립니다',
    requesterImg: 'https://picsum.photos/24/24',
    requesterName: 'Hello.world',
    processorName: '',
    taskStatus: '요청',
    finishedAt: '2025.01.11'
  },
  {
    taskId: 2,
    taskCode: 'asfawnwakngla',
    requestedAt: '2025.01.01',
    mainCategoryName: 'VM',
    categoryName: '생성',
    title: 'VM 생성 부탁드립니다',
    requesterImg: 'https://picsum.photos/24/24',
    requesterName: 'Hello.world',
    processorImg: 'https://picsum.photos/24/24',
    processorName: 'Tony.tsx',
    taskStatus: '진행 중',
    finishedAt: '2025.01.11'
  },
  {
    taskId: 3,
    taskCode: 'asfawnwakngla',
    requestedAt: '2025.01.01',
    mainCategoryName: 'VM',
    categoryName: '생성',
    title: 'VM 생성 부탁드립니다',
    requesterImg: 'https://picsum.photos/24/24',
    requesterName: 'Hello.world',
    processorImg: 'https://picsum.photos/24/24',
    processorName: 'Tony.tsx',
    taskStatus: '검토 중',
    finishedAt: '2025.01.11'
  },
  {
    taskId: 4,
    taskCode: 'asfawnwakngla',
    requestedAt: '2025.01.01',
    mainCategoryName: 'VM',
    categoryName: '생성',
    title: 'VM 생성 부탁드립니다',
    requesterImg: 'https://picsum.photos/24/24',
    requesterName: 'Hello.world',
    processorImg: 'https://picsum.photos/24/24',
    processorName: 'Tony.tsx',
    taskStatus: '완료',
    finishedAt: '2025.01.11'
  },
  {
    taskId: 5,
    taskCode: 'asfawnwakngla',
    requestedAt: '2025.01.01',
    mainCategoryName: 'VM',
    categoryName: '생성',
    title: 'VM 생성 부탁드립니다',
    requesterImg: 'https://picsum.photos/24/24',
    requesterName: 'Hello.world',
    processorImg: 'https://picsum.photos/24/24',
    processorName: 'Tony.tsx',
    taskStatus: '종료',
    finishedAt: '2025.01.11'
  },
  {
    taskId: 6,
    taskCode: 'asfawnwakngla',
    requestedAt: '2025.01.01',
    mainCategoryName: 'VM',
    categoryName: '생성',
    title: 'VM 생성 부탁드립니다',
    requesterImg: 'https://picsum.photos/24/24',
    requesterName: 'Hello.world',
    processorName: '',
    taskStatus: '요청',
    finishedAt: '2025.01.11'
  },
  {
    taskId: 7,
    taskCode: 'asfawnwakngla',
    requestedAt: '2025.01.01',
    mainCategoryName: 'VM',
    categoryName: '생성',
    title: 'VM 생성 부탁드립니다',
    requesterImg: 'https://picsum.photos/24/24',
    requesterName: 'Hello.world',
    processorImg: 'https://picsum.photos/24/24',
    processorName: 'Tony.tsx',
    taskStatus: '진행 중',
    finishedAt: '2025.01.11'
  },
  {
    taskId: 8,
    taskCode: 'asfawnwakngla',
    requestedAt: '2025.01.01',
    mainCategoryName: 'VM',
    categoryName: '생성',
    title: 'VM 생성 부탁드립니다',
    requesterImg: 'https://picsum.photos/24/24',
    requesterName: 'Hello.world',
    processorImg: 'https://picsum.photos/24/24',
    processorName: 'Tony.tsx',
    taskStatus: '검토 중',
    finishedAt: '2025.01.11'
  },
  {
    taskId: 9,
    taskCode: 'asfawnwakngla',
    requestedAt: '2025.01.01',
    mainCategoryName: 'VM',
    categoryName: '생성',
    title: 'VM 생성 부탁드립니다',
    requesterImg: 'https://picsum.photos/24/24',
    requesterName: 'Hello.world',
    processorImg: 'https://picsum.photos/24/24',
    processorName: 'Tony.tsx',
    taskStatus: '완료',
    finishedAt: '2025.01.11'
  },
  {
    taskId: 10,
    taskCode: 'asfawnwakngla',
    requestedAt: '2025.01.01',
    mainCategoryName: 'VM',
    categoryName: '생성',
    title: 'VM 생성 부탁드립니다',
    requesterImg: 'https://picsum.photos/24/24',
    requesterName: 'Hello.world',
    processorImg: 'https://picsum.photos/24/24',
    processorName: 'Tony.tsx',
    taskStatus: '종료',
    finishedAt: '2025.01.11'
  },
  {
    taskId: 11,
    taskCode: 'asfawnwakngla',
    requestedAt: '2025.01.01',
    mainCategoryName: 'VM',
    categoryName: '생성',
    title: 'VM 생성 부탁드립니다',
    requesterImg: 'https://picsum.photos/24/24',
    requesterName: 'Hello.world',
    processorName: '',
    taskStatus: '요청',
    finishedAt: '2025.01.11'
  },
  {
    taskId: 12,
    taskCode: 'asfawnwakngla',
    requestedAt: '2025.01.01',
    mainCategoryName: 'VM',
    categoryName: '생성',
    title: 'VM 생성 부탁드립니다',
    requesterImg: 'https://picsum.photos/24/24',
    requesterName: 'Hello.world',
    processorImg: 'https://picsum.photos/24/24',
    processorName: 'Tony.tsx',
    taskStatus: '진행 중',
    finishedAt: '2025.01.11'
  },
  {
    taskId: 13,
    taskCode: 'asfawnwakngla',
    requestedAt: '2025.01.01',
    mainCategoryName: 'VM',
    categoryName: '생성',
    title: 'VM 생성 부탁드립니다',
    requesterImg: 'https://picsum.photos/24/24',
    requesterName: 'Hello.world',
    processorImg: 'https://picsum.photos/24/24',
    processorName: 'Tony.tsx',
    taskStatus: '검토 중',
    finishedAt: '2025.01.11'
  },
  {
    taskId: 14,
    taskCode: 'asfawnwakngla',
    requestedAt: '2025.01.01',
    mainCategoryName: 'VM',
    categoryName: '생성',
    title: 'VM 생성 부탁드립니다',
    requesterImg: 'https://picsum.photos/24/24',
    requesterName: 'Hello.world',
    processorImg: 'https://picsum.photos/24/24',
    processorName: 'Tony.tsx',
    taskStatus: '완료',
    finishedAt: '2025.01.11'
  },
  {
    taskId: 15,
    taskCode: 'asfawnwakngla',
    requestedAt: '2025.01.01',
    mainCategoryName: 'VM',
    categoryName: '생성',
    title: 'VM 생성 부탁드립니다',
    requesterImg: 'https://picsum.photos/24/24',
    requesterName: 'Hello.world',
    processorImg: 'https://picsum.photos/24/24',
    processorName: 'Tony.tsx',
    taskStatus: '종료',
    finishedAt: '2025.01.11'
  },
  {
    taskId: 16,
    taskCode: 'asfawnwakngla',
    requestedAt: '2025.01.01',
    mainCategoryName: 'VM',
    categoryName: '생성',
    title: 'VM 생성 부탁드립니다',
    requesterImg: 'https://picsum.photos/24/24',
    requesterName: 'Hello.world',
    processorName: '',
    taskStatus: '요청',
    finishedAt: '2025.01.11'
  },
  {
    taskId: 17,
    taskCode: 'asfawnwakngla',
    requestedAt: '2025.01.01',
    mainCategoryName: 'VM',
    categoryName: '생성',
    title: 'VM 생성 부탁드립니다',
    requesterImg: 'https://picsum.photos/24/24',
    requesterName: 'Hello.world',
    processorImg: 'https://picsum.photos/24/24',
    processorName: 'Tony.tsx',
    taskStatus: '진행 중',
    finishedAt: '2025.01.11'
  },
  {
    taskId: 18,
    taskCode: 'asfawnwakngla',
    requestedAt: '2025.01.01',
    mainCategoryName: 'VM',
    categoryName: '생성',
    title: 'VM 생성 부탁드립니다',
    requesterImg: 'https://picsum.photos/24/24',
    requesterName: 'Hello.world',
    processorImg: 'https://picsum.photos/24/24',
    processorName: 'Tony.tsx',
    taskStatus: '검토 중',
    finishedAt: '2025.01.11'
  },
  {
    taskId: 19,
    taskCode: 'asfawnwakngla',
    requestedAt: '2025.01.01',
    mainCategoryName: 'VM',
    categoryName: '생성',
    title: 'VM 생성 부탁드립니다',
    requesterImg: 'https://picsum.photos/24/24',
    requesterName: 'Hello.world',
    processorImg: 'https://picsum.photos/24/24',
    processorName: 'Tony.tsx',
    taskStatus: '완료',
    finishedAt: '2025.01.11'
  },
  {
    taskId: 20,
    taskCode: 'asfawnwakngla',
    requestedAt: '2025.01.01',
    mainCategoryName: 'VM',
    categoryName: '생성',
    title: 'VM 생성 부탁드립니다',
    requesterImg: 'https://picsum.photos/24/24',
    requesterName: 'Hello.world',
    processorImg: 'https://picsum.photos/24/24',
    processorName: 'Tony.tsx',
    taskStatus: '종료',
    finishedAt: '2025.01.11'
  }
]

export const DUMMY_TASK_CARD_LIST: TaskCardList = {
  tasksInProgress: [
    {
      taskId: 0,
      taskCode: 'string',
      mainCategoryName: 'string',
      categoryName: 'string',
      title: 'string',
      requesterNickName: 'string',
      requesterImageUrl: 'string',
      requesterDepartment: 'string',
      processorOrder: 0,
      taskStatus: '진행 중',
      createdAt: '2025-01-28T09:34:00.128Z'
    },
    {
      taskId: 1,
      taskCode: 'string',
      mainCategoryName: 'string',
      categoryName: 'string',
      title: 'string',
      requesterNickName: 'string',
      requesterImageUrl: 'string',
      requesterDepartment: 'string',
      processorOrder: 0,
      taskStatus: '진행 중',
      createdAt: '2025-01-28T09:34:00.128Z'
    },
    {
      taskId: 2,
      taskCode: 'string',
      mainCategoryName: 'string',
      categoryName: 'string',
      title: 'string',
      requesterNickName: 'string',
      requesterImageUrl: 'string',
      requesterDepartment: 'string',
      processorOrder: 0,
      taskStatus: '진행 중',
      createdAt: '2025-01-28T09:34:00.128Z'
    },
    {
      taskId: 3,
      taskCode: 'string',
      mainCategoryName: 'string',
      categoryName: 'string',
      title: 'string',
      requesterNickName: 'string',
      requesterImageUrl: 'string',
      requesterDepartment: 'string',
      processorOrder: 0,
      taskStatus: '진행 중',
      createdAt: '2025-01-28T09:34:00.128Z'
    },
    {
      taskId: 4,
      taskCode: 'string',
      mainCategoryName: 'string',
      categoryName: 'string',
      title: 'string',
      requesterNickName: 'string',
      requesterImageUrl: 'string',
      requesterDepartment: 'string',
      processorOrder: 0,
      taskStatus: '진행 중',
      createdAt: '2025-01-28T09:34:00.128Z'
    }
  ],
  tasksPendingComplete: [
    {
      taskId: 5,
      taskCode: 'string',
      mainCategoryName: 'string',
      categoryName: 'string',
      title: 'string',
      requesterNickName: 'string',
      requesterImageUrl: 'string',
      requesterDepartment: 'string',
      processorOrder: 0,
      taskStatus: '검토 중',
      createdAt: '2025-01-28T09:34:00.128Z'
    },
    {
      taskId: 6,
      taskCode: 'string',
      mainCategoryName: 'string',
      categoryName: 'string',
      title: 'string',
      requesterNickName: 'string',
      requesterImageUrl: 'string',
      requesterDepartment: 'string',
      processorOrder: 0,
      taskStatus: '검토 중',
      createdAt: '2025-01-28T09:34:00.128Z'
    },
    {
      taskId: 7,
      taskCode: 'string',
      mainCategoryName: 'string',
      categoryName: 'string',
      title: 'string',
      requesterNickName: 'string',
      requesterImageUrl: 'string',
      requesterDepartment: 'string',
      processorOrder: 0,
      taskStatus: '검토 중',
      createdAt: '2025-01-28T09:34:00.128Z'
    },
    {
      taskId: 8,
      taskCode: 'string',
      mainCategoryName: 'string',
      categoryName: 'string',
      title: 'string',
      requesterNickName: 'string',
      requesterImageUrl: 'string',
      requesterDepartment: 'string',
      processorOrder: 0,
      taskStatus: '검토 중',
      createdAt: '2025-01-28T09:34:00.128Z'
    },
    {
      taskId: 9,
      taskCode: 'string',
      mainCategoryName: 'string',
      categoryName: 'string',
      title: 'string',
      requesterNickName: 'string',
      requesterImageUrl: 'string',
      requesterDepartment: 'string',
      processorOrder: 0,
      taskStatus: '검토 중',
      createdAt: '2025-01-28T09:34:00.128Z'
    }
  ],
  tasksCompleted: [
    {
      taskId: 10,
      taskCode: 'string',
      mainCategoryName: 'string',
      categoryName: 'string',
      title: 'string',
      requesterNickName: 'string',
      requesterImageUrl: 'string',
      requesterDepartment: 'string',
      processorOrder: 0,
      taskStatus: '완료',
      createdAt: '2025-01-28T09:34:00.128Z'
    },
    {
      taskId: 11,
      taskCode: 'string',
      mainCategoryName: 'string',
      categoryName: 'string',
      title: 'string',
      requesterNickName: 'string',
      requesterImageUrl: 'string',
      requesterDepartment: 'string',
      processorOrder: 0,
      taskStatus: '완료',
      createdAt: '2025-01-28T09:34:00.128Z'
    },
    {
      taskId: 12,
      taskCode: 'string',
      mainCategoryName: 'string',
      categoryName: 'string',
      title: 'string',
      requesterNickName: 'string',
      requesterImageUrl: 'string',
      requesterDepartment: 'string',
      processorOrder: 0,
      taskStatus: '완료',
      createdAt: '2025-01-28T09:34:00.128Z'
    },
    {
      taskId: 13,
      taskCode: 'string',
      mainCategoryName: 'string',
      categoryName: 'string',
      title: 'string',
      requesterNickName: 'string',
      requesterImageUrl: 'string',
      requesterDepartment: 'string',
      processorOrder: 0,
      taskStatus: '완료',
      createdAt: '2025-01-28T09:34:00.128Z'
    },
    {
      taskId: 14,
      taskCode: 'string',
      mainCategoryName: 'string',
      categoryName: 'string',
      title: 'string',
      requesterNickName: 'string',
      requesterImageUrl: 'string',
      requesterDepartment: 'string',
      processorOrder: 0,
      taskStatus: '완료',
      createdAt: '2025-01-28T09:34:00.128Z'
    }
  ],
  hasNext: true,
  isFirst: true,
  isLast: true
}

export const DUMMY_MY_TASK_LIST_DATA: MyTaskListData[] = [
  {
    taskId: 1,
    taskCode: 'asfawnwakngla',
    requestedAt: '2025.01.01',
    mainCategoryName: 'VM',
    categoryName: '생성',
    title: 'VM 생성 부탁드립니다',
    requesterImg: 'https://picsum.photos/24/24',
    requesterName: 'Hello.world',
    taskStatus: '요청',
    finishedAt: '2025.01.11'
  },
  {
    taskId: 2,
    taskCode: 'asfawnwakngla',
    requestedAt: '2025.01.01',
    mainCategoryName: 'VM',
    categoryName: '생성',
    title: 'VM 생성 부탁드립니다',
    requesterImg: 'https://picsum.photos/24/24',
    requesterName: 'Tony.tsx',
    taskStatus: '진행 중',
    finishedAt: '2025.01.11'
  },
  {
    taskId: 3,
    taskCode: 'asfawnwakngla',
    requestedAt: '2025.01.01',
    mainCategoryName: 'VM',
    categoryName: '생성',
    title: 'VM 생성 부탁드립니다',
    requesterImg: 'https://picsum.photos/24/24',
    requesterName: 'Tony.tsx',
    taskStatus: '검토 중',
    finishedAt: '2025.01.11'
  },
  {
    taskId: 4,
    taskCode: 'asfawnwakngla',
    requestedAt: '2025.01.01',
    mainCategoryName: 'VM',
    categoryName: '생성',
    title: 'VM 생성 부탁드립니다',
    requesterImg: 'https://picsum.photos/24/24',
    requesterName: 'Tony.tsx',
    taskStatus: '완료',
    finishedAt: '2025.01.11'
  },
  {
    taskId: 5,
    taskCode: 'asfawnwakngla',
    requestedAt: '2025.01.01',
    mainCategoryName: 'VM',
    categoryName: '생성',
    title: 'VM 생성 부탁드립니다',
    requesterImg: 'https://picsum.photos/24/24',
    requesterName: 'Tony.tsx',
    taskStatus: '종료',
    finishedAt: '2025.01.11'
  },
  {
    taskId: 6,
    taskCode: 'asfawnwakngla',
    requestedAt: '2025.01.01',
    mainCategoryName: 'VM',
    categoryName: '생성',
    title: 'VM 생성 부탁드립니다',
    requesterImg: 'https://picsum.photos/24/24',
    requesterName: 'Hello.world',
    taskStatus: '요청',
    finishedAt: '2025.01.11'
  },
  {
    taskId: 7,
    taskCode: 'asfawnwakngla',
    requestedAt: '2025.01.01',
    mainCategoryName: 'VM',
    categoryName: '생성',
    title: 'VM 생성 부탁드립니다',
    requesterImg: 'https://picsum.photos/24/24',
    requesterName: 'Tony.tsx',
    taskStatus: '진행 중',
    finishedAt: '2025.01.11'
  },
  {
    taskId: 8,
    taskCode: 'asfawnwakngla',
    requestedAt: '2025.01.01',
    mainCategoryName: 'VM',
    categoryName: '생성',
    title: 'VM 생성 부탁드립니다',
    requesterImg: 'https://picsum.photos/24/24',
    requesterName: 'Tony.tsx',
    taskStatus: '검토 중',
    finishedAt: '2025.01.11'
  },
  {
    taskId: 9,
    taskCode: 'asfawnwakngla',
    requestedAt: '2025.01.01',
    mainCategoryName: 'VM',
    categoryName: '생성',
    title: 'VM 생성 부탁드립니다',
    requesterImg: 'https://picsum.photos/24/24',
    requesterName: 'Tony.tsx',
    taskStatus: '완료',
    finishedAt: '2025.01.11'
  },
  {
    taskId: 10,
    taskCode: 'asfawnwakngla',
    requestedAt: '2025.01.01',
    mainCategoryName: 'VM',
    categoryName: '생성',
    title: 'VM 생성 부탁드립니다',
    requesterImg: 'https://picsum.photos/24/24',
    requesterName: 'Tony.tsx',
    taskStatus: '종료',
    finishedAt: '2025.01.11'
  },
  {
    taskId: 11,
    taskCode: 'asfawnwakngla',
    requestedAt: '2025.01.01',
    mainCategoryName: 'VM',
    categoryName: '생성',
    title: 'VM 생성 부탁드립니다',
    requesterImg: 'https://picsum.photos/24/24',
    requesterName: 'Hello.world',
    taskStatus: '요청',
    finishedAt: '2025.01.11'
  },
  {
    taskId: 12,
    taskCode: 'asfawnwakngla',
    requestedAt: '2025.01.01',
    mainCategoryName: 'VM',
    categoryName: '생성',
    title: 'VM 생성 부탁드립니다',
    requesterImg: 'https://picsum.photos/24/24',
    requesterName: 'Tony.tsx',
    taskStatus: '진행 중',
    finishedAt: '2025.01.11'
  },
  {
    taskId: 13,
    taskCode: 'asfawnwakngla',
    requestedAt: '2025.01.01',
    mainCategoryName: 'VM',
    categoryName: '생성',
    title: 'VM 생성 부탁드립니다',
    requesterImg: 'https://picsum.photos/24/24',
    requesterName: 'Tony.tsx',
    taskStatus: '검토 중',
    finishedAt: '2025.01.11'
  },
  {
    taskId: 14,
    taskCode: 'asfawnwakngla',
    requestedAt: '2025.01.01',
    mainCategoryName: 'VM',
    categoryName: '생성',
    title: 'VM 생성 부탁드립니다',
    requesterImg: 'https://picsum.photos/24/24',
    requesterName: 'Tony.tsx',
    taskStatus: '완료',
    finishedAt: '2025.01.11'
  },
  {
    taskId: 15,
    taskCode: 'asfawnwakngla',
    requestedAt: '2025.01.01',
    mainCategoryName: 'VM',
    categoryName: '생성',
    title: 'VM 생성 부탁드립니다',
    requesterImg: 'https://picsum.photos/24/24',
    requesterName: 'Tony.tsx',
    taskStatus: '종료',
    finishedAt: '2025.01.11'
  },
  {
    taskId: 16,
    taskCode: 'asfawnwakngla',
    requestedAt: '2025.01.01',
    mainCategoryName: 'VM',
    categoryName: '생성',
    title: 'VM 생성 부탁드립니다',
    requesterImg: 'https://picsum.photos/24/24',
    requesterName: 'Hello.world',
    taskStatus: '요청',
    finishedAt: '2025.01.11'
  },
  {
    taskId: 17,
    taskCode: 'asfawnwakngla',
    requestedAt: '2025.01.01',
    mainCategoryName: 'VM',
    categoryName: '생성',
    title: 'VM 생성 부탁드립니다',
    requesterImg: 'https://picsum.photos/24/24',
    requesterName: 'Tony.tsx',
    taskStatus: '진행 중',
    finishedAt: '2025.01.11'
  },
  {
    taskId: 18,
    taskCode: 'asfawnwakngla',
    requestedAt: '2025.01.01',
    mainCategoryName: 'VM',
    categoryName: '생성',
    title: 'VM 생성 부탁드립니다',
    requesterImg: 'https://picsum.photos/24/24',
    requesterName: 'Tony.tsx',
    taskStatus: '검토 중',
    finishedAt: '2025.01.11'
  },
  {
    taskId: 19,
    taskCode: 'asfawnwakngla',
    requestedAt: '2025.01.01',
    mainCategoryName: 'VM',
    categoryName: '생성',
    title: 'VM 생성 부탁드립니다',
    requesterImg: 'https://picsum.photos/24/24',
    requesterName: 'Tony.tsx',
    taskStatus: '완료',
    finishedAt: '2025.01.11'
  },
  {
    taskId: 20,
    taskCode: 'asfawnwakngla',
    requestedAt: '2025.01.01',
    mainCategoryName: 'VM',
    categoryName: '생성',
    title: 'VM 생성 부탁드립니다',
    requesterImg: 'https://picsum.photos/24/24',
    requesterName: 'Tony.tsx',
    taskStatus: '종료',
    finishedAt: '2025.01.11'
  }
]

export const DUMMY_MEMBER_MANAGEMENT_LIST_DATA: MemberManagementListData[] = [
  {
    memberId: 1,
    name: '김기기',
    nickName: 'gigi.kim',
    department: '백엔드 1팀',
    departmentRole: '백엔드 개발자',
    email: 'gigikim@gachon.ac.kr',
    role: 'USER',
    registeredAt: '2025.01.11'
  },
  {
    memberId: 2,
    name: '남니니',
    nickName: 'nini.nam',
    department: '인프라팀',
    departmentRole: '인프라 아키텍터',
    email: 'nininam@gachon.ac.kr',
    role: 'MANAGER',
    registeredAt: '2025.01.11'
  },
  {
    memberId: 3,
    name: '도디디',
    nickName: 'didi.do',
    department: '인프라팀',
    departmentRole: '네트워크 엔지니어',
    email: 'didido@gachon.ac.kr',
    role: 'MANAGER',
    registeredAt: '2025.01.11'
  },
  {
    memberId: 4,
    name: '류리리',
    nickName: 'riri.ryu',
    department: '인프라팀',
    departmentRole: '시스템 엔지니어',
    email: 'ririryu@gachon.ac.kr',
    role: 'MANAGER',
    registeredAt: '2025.01.11'
  },
  {
    memberId: 5,
    name: '민미미',
    nickName: 'mimi.min',
    department: '인프라팀',
    departmentRole: '공통플랫폼 운영 담당자',
    email: 'mimimin@gachon.ac.kr',
    role: 'MANAGER',
    registeredAt: '2025.01.11'
  },
  {
    memberId: 6,
    name: '방비비',
    nickName: 'bibi.bang',
    department: '인프라팀',
    departmentRole: 'Project Manager',
    email: 'bibibang@gachon.ac.kr',
    role: 'MANAGER',
    permission: true,
    registeredAt: '2025.01.11'
  },
  {
    memberId: 7,
    name: '심시시',
    nickName: 'sisi.shim',
    department: '매니지먼트팀',
    departmentRole: 'TMS 시스템 관리자',
    email: 'sisishim@gachon.ac.kr',
    role: 'ADMIN',
    registeredAt: '2025.01.11'
  },
  {
    memberId: 8,
    name: '김기기',
    nickName: 'gigi.kim',
    department: '백엔드 1팀',
    departmentRole: '백엔드 개발자',
    email: 'gigikim@gachon.ac.kr',
    role: 'USER',
    registeredAt: '2025.01.11'
  },
  {
    memberId: 9,
    name: '남니니',
    nickName: 'nini.nam',
    department: '인프라팀',
    departmentRole: '인프라 아키텍터',
    email: 'nininam@gachon.ac.kr',
    role: 'MANAGER',
    registeredAt: '2025.01.11'
  },
  {
    memberId: 10,
    name: '도디디',
    nickName: 'didi.do',
    department: '인프라팀',
    departmentRole: '네트워크 엔지니어',
    email: 'didido@gachon.ac.kr',
    role: 'MANAGER',
    registeredAt: '2025.01.11'
  },
  {
    memberId: 11,
    name: '류리리',
    nickName: 'riri.ryu',
    department: '인프라팀',
    departmentRole: '시스템 엔지니어',
    email: 'ririryu@gachon.ac.kr',
    role: 'MANAGER',
    registeredAt: '2025.01.11'
  },
  {
    memberId: 12,
    name: '민미미',
    nickName: 'mimi.min',
    department: '인프라팀',
    departmentRole: '공통플랫폼 운영 담당자',
    email: 'mimimin@gachon.ac.kr',
    role: 'MANAGER',
    registeredAt: '2025.01.11'
  },
  {
    memberId: 13,
    name: '방비비',
    nickName: 'bibi.bang',
    department: '인프라팀',
    departmentRole: 'Project Manager',
    email: 'bibibang@gachon.ac.kr',
    role: 'MANAGER',
    permission: true,
    registeredAt: '2025.01.11'
  },
  {
    memberId: 14,
    name: '심시시',
    nickName: 'sisi.shim',
    department: '매니지먼트팀',
    departmentRole: 'TMS 시스템 관리자',
    email: 'sisishim@gachon.ac.kr',
    role: 'ADMIN',
    registeredAt: '2025.01.11'
  },
  {
    memberId: 15,
    name: '김기기',
    nickName: 'gigi.kim',
    department: '백엔드 1팀',
    departmentRole: '백엔드 개발자',
    email: 'gigikim@gachon.ac.kr',
    role: 'USER',
    registeredAt: '2025.01.11'
  },
  {
    memberId: 16,
    name: '남니니',
    nickName: 'nini.nam',
    department: '인프라팀',
    departmentRole: '인프라 아키텍터',
    email: 'nininam@gachon.ac.kr',
    role: 'MANAGER',
    registeredAt: '2025.01.11'
  },
  {
    memberId: 17,
    name: '도디디',
    nickName: 'didi.do',
    department: '인프라팀',
    departmentRole: '네트워크 엔지니어',
    email: 'didido@gachon.ac.kr',
    role: 'MANAGER',
    registeredAt: '2025.01.11'
  },
  {
    memberId: 18,
    name: '류리리',
    nickName: 'riri.ryu',
    department: '인프라팀',
    departmentRole: '시스템 엔지니어',
    email: 'ririryu@gachon.ac.kr',
    role: 'MANAGER',
    registeredAt: '2025.01.11'
  },
  {
    memberId: 19,
    name: '민미미',
    nickName: 'mimi.min',
    department: '인프라팀',
    departmentRole: '공통플랫폼 운영 담당자',
    email: 'mimimin@gachon.ac.kr',
    role: 'MANAGER',
    registeredAt: '2025.01.11'
  },
  {
    memberId: 20,
    name: '방비비',
    nickName: 'bibi.bang',
    department: '인프라팀',
    departmentRole: 'Project Manager',
    email: 'bibibang@gachon.ac.kr',
    role: 'MANAGER',
    permission: true,
    registeredAt: '2025.01.11'
  }
]

export const DUMMY_LOGIN_LOGS_LIST_DATA: LogsListData[] = [
  {
    logId: 1,
    division: '로그인 시도',
    createdAt: '2025.01.08 오전 12:23:04',
    nickName: 'Tony.tsx',
    ipAddress: '192.168.222.222',
    status: 400,
    result: 'count=4'
  },
  {
    logId: 2,
    division: '로그인 시도',
    createdAt: '2025.01.08 오전 12:23:04',
    nickName: 'Tony.tsx',
    ipAddress: '192.168.222.222',
    status: 400,
    result: 'count=3'
  },
  {
    logId: 3,
    division: '로그인 시도',
    createdAt: '2025.01.08 오전 12:23:04',
    nickName: 'Tony.tsx',
    ipAddress: '192.168.222.222',
    status: 400,
    result: 'count=2'
  },
  {
    logId: 4,
    division: '로그인 시도',
    createdAt: '2025.01.08 오전 12:23:04',
    nickName: 'Tony.tsx',
    ipAddress: '192.168.222.222',
    status: 400,
    result: 'count=1'
  },
  {
    logId: 5,
    division: '로그인 시도',
    createdAt: '2025.01.08 오전 12:23:04',
    nickName: 'Tony.tsx',
    ipAddress: '192.168.222.222',
    status: 200
  },
  {
    logId: 6,
    division: '로그인 시도',
    createdAt: '2025.01.08 오전 12:23:04',
    nickName: 'Tony.tsx',
    ipAddress: '192.168.222.222',
    status: 400,
    result: 'count=4'
  },
  {
    logId: 7,
    division: '로그인 시도',
    createdAt: '2025.01.08 오전 12:23:04',
    nickName: 'Tony.tsx',
    ipAddress: '192.168.222.222',
    status: 400,
    result: 'count=3'
  },
  {
    logId: 8,
    division: '로그인 시도',
    createdAt: '2025.01.08 오전 12:23:04',
    nickName: 'Tony.tsx',
    ipAddress: '192.168.222.222',
    status: 400,
    result: 'count=2'
  },
  {
    logId: 9,
    division: '로그인 시도',
    createdAt: '2025.01.08 오전 12:23:04',
    nickName: 'Tony.tsx',
    ipAddress: '192.168.222.222',
    status: 400,
    result: 'count=1'
  },
  {
    logId: 10,
    division: '로그인 시도',
    createdAt: '2025.01.08 오전 12:23:04',
    nickName: 'Tony.tsx',
    ipAddress: '192.168.222.222',
    status: 200
  },
  {
    logId: 11,
    division: '로그인 시도',
    createdAt: '2025.01.08 오전 12:23:04',
    nickName: 'Tony.tsx',
    ipAddress: '192.168.222.222',
    status: 400,
    result: 'count=4'
  },
  {
    logId: 12,
    division: '로그인 시도',
    createdAt: '2025.01.08 오전 12:23:04',
    nickName: 'Tony.tsx',
    ipAddress: '192.168.222.222',
    status: 400,
    result: 'count=3'
  },
  {
    logId: 13,
    division: '로그인 시도',
    createdAt: '2025.01.08 오전 12:23:04',
    nickName: 'Tony.tsx',
    ipAddress: '192.168.222.222',
    status: 400,
    result: 'count=2'
  },
  {
    logId: 14,
    division: '로그인 시도',
    createdAt: '2025.01.08 오전 12:23:04',
    nickName: 'Tony.tsx',
    ipAddress: '192.168.222.222',
    status: 400,
    result: 'count=1'
  },
  {
    logId: 15,
    division: '로그인 시도',
    createdAt: '2025.01.08 오전 12:23:04',
    nickName: 'Tony.tsx',
    ipAddress: '192.168.222.222',
    status: 200
  },
  {
    logId: 16,
    division: '로그인 시도',
    createdAt: '2025.01.08 오전 12:23:04',
    nickName: 'Tony.tsx',
    ipAddress: '192.168.222.222',
    status: 400,
    result: 'count=4'
  },
  {
    logId: 17,
    division: '로그인 시도',
    createdAt: '2025.01.08 오전 12:23:04',
    nickName: 'Tony.tsx',
    ipAddress: '192.168.222.222',
    status: 400,
    result: 'count=3'
  },
  {
    logId: 18,
    division: '로그인 시도',
    createdAt: '2025.01.08 오전 12:23:04',
    nickName: 'Tony.tsx',
    ipAddress: '192.168.222.222',
    status: 400,
    result: 'count=2'
  },
  {
    logId: 19,
    division: '로그인 시도',
    createdAt: '2025.01.08 오전 12:23:04',
    nickName: 'Tony.tsx',
    ipAddress: '192.168.222.222',
    status: 400,
    result: 'count=1'
  },
  {
    logId: 20,
    division: '로그인 시도',
    createdAt: '2025.01.08 오전 12:23:04',
    nickName: 'Tony.tsx',
    ipAddress: '192.168.222.222',
    status: 200
  }
]

export const DUMMY_API_LOGS_LIST_DATA: LogsListData[] = [
  {
    logId: 1,
    division: '요청 생성',
    createdAt: '2025.01.08 오전 12:23:04',
    nickName: 'Tony.tsx',
    ipAddress: '192.168.222.222',
    status: 200
  },
  {
    logId: 2,
    division: '요청 수정',
    createdAt: '2025.01.08 오전 12:23:04',
    nickName: 'Tony.tsx',
    ipAddress: '192.168.222.222',
    status: 200
  },
  {
    logId: 3,
    division: '요청 취소',
    createdAt: '2025.01.08 오전 12:23:04',
    nickName: 'Tony.tsx',
    ipAddress: '192.168.222.222',
    status: 200
  },
  {
    logId: 4,
    division: '요청 승인',
    createdAt: '2025.01.08 오전 12:23:04',
    nickName: 'Tony.tsx',
    ipAddress: '192.168.222.222',
    status: 200
  },
  {
    logId: 5,
    division: '요청 생성',
    createdAt: '2025.01.08 오전 12:23:04',
    nickName: 'Tony.tsx',
    ipAddress: '192.168.222.222',
    status: 200
  },
  {
    logId: 6,
    division: '요청 수정',
    createdAt: '2025.01.08 오전 12:23:04',
    nickName: 'Tony.tsx',
    ipAddress: '192.168.222.222',
    status: 200
  },
  {
    logId: 7,
    division: '요청 취소',
    createdAt: '2025.01.08 오전 12:23:04',
    nickName: 'Tony.tsx',
    ipAddress: '192.168.222.222',
    status: 200
  },
  {
    logId: 8,
    division: '요청 승인',
    createdAt: '2025.01.08 오전 12:23:04',
    nickName: 'Tony.tsx',
    ipAddress: '192.168.222.222',
    status: 200
  },
  {
    logId: 9,
    division: '요청 생성',
    createdAt: '2025.01.08 오전 12:23:04',
    nickName: 'Tony.tsx',
    ipAddress: '192.168.222.222',
    status: 200
  },
  {
    logId: 10,
    division: '요청 수정',
    createdAt: '2025.01.08 오전 12:23:04',
    nickName: 'Tony.tsx',
    ipAddress: '192.168.222.222',
    status: 200
  },
  {
    logId: 11,
    division: '요청 취소',
    createdAt: '2025.01.08 오전 12:23:04',
    nickName: 'Tony.tsx',
    ipAddress: '192.168.222.222',
    status: 200
  },
  {
    logId: 12,
    division: '요청 승인',
    createdAt: '2025.01.08 오전 12:23:04',
    nickName: 'Tony.tsx',
    ipAddress: '192.168.222.222',
    status: 200
  },
  {
    logId: 13,
    division: '요청 생성',
    createdAt: '2025.01.08 오전 12:23:04',
    nickName: 'Tony.tsx',
    ipAddress: '192.168.222.222',
    status: 200
  },
  {
    logId: 14,
    division: '요청 수정',
    createdAt: '2025.01.08 오전 12:23:04',
    nickName: 'Tony.tsx',
    ipAddress: '192.168.222.222',
    status: 200
  },
  {
    logId: 15,
    division: '요청 취소',
    createdAt: '2025.01.08 오전 12:23:04',
    nickName: 'Tony.tsx',
    ipAddress: '192.168.222.222',
    status: 200
  },
  {
    logId: 16,
    division: '요청 승인',
    createdAt: '2025.01.08 오전 12:23:04',
    nickName: 'Tony.tsx',
    ipAddress: '192.168.222.222',
    status: 200
  },
  {
    logId: 17,
    division: '요청 생성',
    createdAt: '2025.01.08 오전 12:23:04',
    nickName: 'Tony.tsx',
    ipAddress: '192.168.222.222',
    status: 200
  },
  {
    logId: 18,
    division: '요청 수정',
    createdAt: '2025.01.08 오전 12:23:04',
    nickName: 'Tony.tsx',
    ipAddress: '192.168.222.222',
    status: 200
  },
  {
    logId: 19,
    division: '요청 취소',
    createdAt: '2025.01.08 오전 12:23:04',
    nickName: 'Tony.tsx',
    ipAddress: '192.168.222.222',
    status: 200
  },
  {
    logId: 20,
    division: '요청 승인',
    createdAt: '2025.01.08 오전 12:23:04',
    nickName: 'Tony.tsx',
    ipAddress: '192.168.222.222',
    status: 200
  }
]

export const DUMMY_TEAM_MEMBERS_LIST = [
  {
    name: 'Tony.tsx',
    department: '기획팀',
    taskStatusSummary: {
      inProgress: 5,
      pendingCompletion: 3,
      totalTasks: 8
    },
    tasks: [
      {
        taskId: 1,
        taskCode: 'string',
        mainCategoryName: 'string',
        categoryName: 'string',
        title: 'string',
        requesterNickName: 'string',
        requesterImageUrl: 'string',
        requesterDepartment: 'string',
        processorOrder: 0,
        taskStatus: '진행 중',
        createdAt: '2025-01-28T09:34:00.128Z'
      },

      {
        taskId: 2,
        taskCode: 'string',
        mainCategoryName: 'string',
        categoryName: 'string',
        title: 'string',
        requesterNickName: 'string',
        requesterImageUrl: 'string',
        requesterDepartment: 'string',
        processorOrder: 0,
        taskStatus: '진행 중',
        createdAt: '2025-01-28T09:34:00.128Z'
      }
    ]
  },
  {
    name: 'Hello.world',
    department: '개발팀',
    taskStatusSummary: {
      inProgress: 3,
      pendingCompletion: 2,
      totalTasks: 5
    },
    tasks: [
      {
        taskId: 3,
        taskCode: 'string',
        mainCategoryName: 'string',
        categoryName: 'string',
        title: 'string',
        requesterNickName: 'string',
        requesterImageUrl: 'string',
        requesterDepartment: 'string',
        processorOrder: 0,
        taskStatus: '진행 중',
        createdAt: '2025-01-28T09:34:00.128Z'
      },

      {
        taskId: 4,
        taskCode: 'string',
        mainCategoryName: 'string',
        categoryName: 'string',
        title: 'string',
        requesterNickName: 'string',
        requesterImageUrl: 'string',
        requesterDepartment: 'string',
        processorOrder: 0,
        taskStatus: '진행 중',
        createdAt: '2025-01-28T09:34:00.128Z'
      }
    ]
  },
  {
    name: 'John.doe',
    department: '기획팀',
    taskStatusSummary: {
      inProgress: 5,
      pendingCompletion: 3,
      totalTasks: 8
    },
    tasks: [
      {
        taskId: 1,
        taskCode: 'string',
        mainCategoryName: 'string',
        categoryName: 'string',
        title: 'string',
        requesterNickName: 'string',
        requesterImageUrl: 'string',
        requesterDepartment: 'string',
        processorOrder: 0,
        taskStatus: '진행 중',
        createdAt: '2025-01-28T09:34:00.128Z'
      },

      {
        taskId: 2,
        taskCode: 'string',
        mainCategoryName: 'string',
        categoryName: 'string',
        title: 'string',
        requesterNickName: 'string',
        requesterImageUrl: 'string',
        requesterDepartment: 'string',
        processorOrder: 0,
        taskStatus: '진행 중',
        createdAt: '2025-01-28T09:34:00.128Z'
      }
    ]
  },
  {
    name: 'Jane.doe',
    department: '개발팀',
    taskStatusSummary: {
      inProgress: 3,
      pendingCompletion: 2,
      totalTasks: 5
    },
    tasks: [
      {
        taskId: 3,
        taskCode: 'string',
        mainCategoryName: 'string',
        categoryName: 'string',
        title: 'string',
        requesterNickName: 'string',
        requesterImageUrl: 'string',
        requesterDepartment: 'string',
        processorOrder: 0,
        taskStatus: '진행 중',
        createdAt: '2025-01-28T09:34:00.128Z'
      },

      {
        taskId: 4,
        taskCode: 'string',
        mainCategoryName: 'string',
        categoryName: 'string',
        title: 'string',
        requesterNickName: 'string',
        requesterImageUrl: 'string',
        requesterDepartment: 'string',
        processorOrder: 0,
        taskStatus: '진행 중',
        createdAt: '2025-01-28T09:34:00.128Z'
      }
    ]
  },
  {
    name: 'atom.park',
    department: '기획팀',
    taskStatusSummary: {
      inProgress: 5,
      pendingCompletion: 3,
      totalTasks: 8
    },
    tasks: [
      {
        taskId: 1,
        taskCode: 'string',
        mainCategoryName: 'string',
        categoryName: 'string',
        title: 'string',
        requesterNickName: 'string',
        requesterImageUrl: 'string',
        requesterDepartment: 'string',
        processorOrder: 0,
        taskStatus: '진행 중',
        createdAt: '2025-01-28T09:34:00.128Z'
      },

      {
        taskId: 2,
        taskCode: 'string',
        mainCategoryName: 'string',
        categoryName: 'string',
        title: 'string',
        requesterNickName: 'string',
        requesterImageUrl: 'string',
        requesterDepartment: 'string',
        processorOrder: 0,
        taskStatus: '진행 중',
        createdAt: '2025-01-28T09:34:00.128Z'
      }
    ]
  },
  {
    name: 'kim.lee',
    department: '개발팀',
    taskStatusSummary: {
      inProgress: 3,
      pendingCompletion: 2,
      totalTasks: 5
    },
    tasks: [
      {
        taskId: 3,
        taskCode: 'string',
        mainCategoryName: 'string',
        categoryName: 'string',
        title: 'string',
        requesterNickName: 'string',
        requesterImageUrl: 'string',
        requesterDepartment: 'string',
        processorOrder: 0,
        taskStatus: '진행 중',
        createdAt: '2025-01-28T09:34:00.128Z'
      },

      {
        taskId: 4,
        taskCode: 'string',
        mainCategoryName: 'string',
        categoryName: 'string',
        title: 'string',
        requesterNickName: 'string',
        requesterImageUrl: 'string',
        requesterDepartment: 'string',
        processorOrder: 0,
        taskStatus: '진행 중',
        createdAt: '2025-01-28T09:34:00.128Z'
      }
    ]
  }
]

export const DUMMY_DIVISION_LIST = [
  { value: '', content: '전체' },
  { value: '‼️ 긴급', content: '‼️ 긴급' },
  { value: '❌ 오류', content: '❌ 오류' },
  { value: '🕑 정기', content: '🕑 정기' }
]
