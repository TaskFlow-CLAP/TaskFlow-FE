import type { TaskDetailHistoryProps } from '@/types/user'

export const DUMMY_REQUEST_TASK_CATEGORIES: string[] = [
  'Categroy 1',
  'Categroy 2',
  'Categroy 3',
  'Categroy 4'
]

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
