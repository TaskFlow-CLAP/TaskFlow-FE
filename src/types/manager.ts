import type { Status } from './common'
import type { AttachmentResponse } from './user'

export interface RequestedListData {
  taskId: number
  requestedAt: string
  mainCategoryName: string
  categoryName: string
  title: string
  requesterImg: string
  requesterName: string
}

export interface RequestHistoryListData {
  taskId: number
  taskCode: string
  requestedAt: string
  mainCategoryName: string
  categoryName: string
  title: string
  requesterImg: string
  requesterName: string
  processorImg?: string
  processorName?: string
  taskStatus: string
  finishedAt?: string
}

export interface TaskCardProps {
  taskId: number
  taskCode: string
  mainCategoryName: string
  categoryName: string
  title: string
  requesterNickName: string
  requesterImageUrl: string
  requesterDepartment: string
  processorOrder: number
  taskStatus: string
  createdAt: string
}

export interface TaskCardList {
  tasksInProgress: TaskCardProps[]
  tasksPendingComplete: TaskCardProps[]
  tasksCompleted: TaskCardProps[]
  hasNext: boolean
  isFirst: boolean
  isLast: boolean
}

export interface MyTaskListData {
  taskId: number
  taskCode: string
  requestedAt: string
  mainCategoryName: string
  categoryName: string
  title: string
  requesterImg: string
  requesterName: string
  taskStatus: string
  finishedAt?: string
}

export interface TeamBoardCardProps {
  name: string
  department: string
  taskStatusSummary: { inProgress: number; pendingCompletion: number; totalTasks: number }
  tasks: TaskCardProps[]
}

export type PeriodType = 'DAY' | 'WEEK' | 'MONTH'

export interface RequestApproveFormData {
  category1: string
  category2: string
  processor: string
  labeling: string
  dueDate: string
  dueTime: string
}

export interface MyTaskDetailDatas {
  taskId: number
  taskCode: string
  requestedAt: string
  finishedAt: string
  taskStatus: Status
  requesterNickName: string
  requesterImageUrl: string
  processorNickName: string
  processorImageUrl: string
  mainCategoryName: string
  categoryName: string
  title: string
  description: string
  dueDate: string
  labelName: string
  attachmentResponses: AttachmentResponse[]
}

export interface TaskDetailTopBarProps {
  isManager: boolean
  isApproved: boolean
  closeTaskDetail: () => void
}

export interface DraggableEvent {
  added?: {
    element: TaskCardProps
    newIndex: number
  }
  removed?: {
    element: TaskCardProps
    oldIndex: number
  }
  moved?: {
    element: TaskCardProps
    oldIndex: number
    newIndex: number
  }
}
