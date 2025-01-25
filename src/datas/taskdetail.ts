import type { TaskDetailLeftProps, TaskDetailRightProps } from '@/types/user'

export const REQUEST_TASK_CATEGORIES: string[] = [
  'Categroy 1',
  'Categroy 2',
  'Categroy 3',
  'Categroy 4'
]

export const DUMMY_TASK_DETAIL_RIGHT: TaskDetailRightProps = {
  taskId: '1',
  requestedAt: '2023-10-01T10:00:00Z',
  finishedAt: '2023-10-02T15:00:00Z',
  taskStatus: 'completed',
  requesterNickName: 'JohnDoe',
  requesterImageUrl: 'images/mockProfile.jpg',
  processorNickName: 'JaneSmith',
  processorImageUrl: 'images/mockProfile.jpg'
}

export const DUMMY_TASK_DETAIL_LEFT: TaskDetailLeftProps = {
  mainCategoryName: 'Virtual Machine',
  categoryName: 'Virtual Machine 생성',
  title: '카카오워크',
  description: `카카오워크입니다 인프라 지원 부탁드립니다 스크린샷과 로그 파일 첨부해드립니다`,
  attachmentResponse: [
    {
      fileId: 1,
      fileUrl: 'files/attachment1.pdf',
      fileUploadedAt: '2023-10-01T10:00:00Z',
      fileSize: '1MB',
      fileName: '스크린샷.pdf'
    },
    {
      fileId: 2,
      fileUrl: 'files/attachment2.jpg',
      fileUploadedAt: '2023-10-01T11:00:00Z',
      fileSize: '2MB',
      fileName: 'log2.jpg'
    }
  ]
}
