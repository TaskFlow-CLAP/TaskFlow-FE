import type { TaskDetailRightProps } from '@/types/user'

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
