import type { LabelDataTypes } from '@/types/common'
import type { TaskDetailDatas, TaskDetailHistoryProps } from '@/types/user'

export const DUMMY_REQUEST_TASK_CATEGORIES: string[] = [
  'Categroy 1',
  'Categroy 2',
  'Categroy 3',
  'Categroy 4'
]

export const DUMMY_TASK_DETAIL: TaskDetailDatas = {
  taskId: 1,
  taskCode: 'T202310',
  requestedAt: '2023-10-01T10:00:00Z',
  finishedAt: '2023-10-02T15:00:00Z',
  taskStatus: '진행 중',
  requesterNickName: 'JohnDoe',
  requesterImageUrl: 'images/mockProfile.jpg',
  processorNickName: 'JaneSmith',
  processorImageUrl: 'images/mockProfile.jpg',
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
  ],
  dueDate: '2023-10-10',
  labelName: '긴급'
}

export const DUMMY_TASK_DETAIL_HISTORY: TaskDetailHistoryProps[] = [
  {
    date: '2023-10-01',
    time: '10:00',
    name: 'John Doe',
    profileImageUrl: 'images/mockProfile.jpg',
    TaskHistoryType: 'COMMENT',
    isModified: false,
    details: {
      previousProcessor: 'Hello.world',
      currentProcessor: 'Tony.tsx',
      comment: 'Initial comment on the task.'
    }
  },
  {
    date: '2023-10-02',
    time: '11:30',
    name: 'Jane Smith',
    profileImageUrl: 'images/mockProfile.jpg',
    TaskHistoryType: 'STATUS_SWITCHED',
    isModified: true,
    details: {
      previousProcessor: 'Hello.world',
      currentProcessor: 'Tony.tsx',
      taskStatus: 'In Progress'
    }
  },
  {
    date: '2023-10-03',
    time: '14:45',
    name: 'Alice Johnson',
    profileImageUrl: 'images/mockProfile.jpg',
    TaskHistoryType: 'PROCESSOR_ASSIGNED',
    isModified: false,
    details: {
      previousProcessor: 'Hello.world',
      currentProcessor: 'Tony.tsx',
      updateDetails: 'Processor assigned to Tony.'
    }
  },
  {
    date: '2023-10-04',
    time: '16:20',
    name: 'Bob Brown',
    profileImageUrl: 'images/mockProfile.jpg',
    TaskHistoryType: 'COMMENT_FILE',
    isModified: true,
    details: {
      previousProcessor: 'Hello.world',
      currentProcessor: 'Tony.tsx',
      file: {
        fileId: 1,
        fileUrl: 'https://example.com/file1.pdf',
        fileName: 'file1.pdf'
      }
    }
  }
]

export const DUMMY_REQUEST_PROCESSORS: string[] = ['Tony', 'Chloe', 'Moya', 'MoyaMoya']

export const DUMMY_REQUEST_TASK_LABELS: string[] = ['긴급', '정기', '오류', '점검']

export const DUMMY_PROCESSOR = {
  nickName: 'Tony',
  profileUrl: 'images/mockProfile.jpg',
  totalAssignedTasks: 5
}

export const DUMMY_TASK_DETAIL_LABELS: string[] = ['긴급', '정기', '오류', '점검']

export const DUMMY_TASK_LABELS: LabelDataTypes[] = [
  {
    labelId: 1,
    labelName: '긴급',
    labelColor: 'red'
  },
  {
    labelId: 2,
    labelName: '정기',
    labelColor: 'green'
  },
  {
    labelId: 3,
    labelName: '오류',
    labelColor: 'blue'
  },
  {
    labelId: 4,
    labelName: '점검',
    labelColor: 'gray'
  }
]
