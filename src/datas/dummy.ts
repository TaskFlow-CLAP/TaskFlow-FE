import type { Category } from '@/types/common'
import type { RequestedListData } from '@/types/manager'
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
