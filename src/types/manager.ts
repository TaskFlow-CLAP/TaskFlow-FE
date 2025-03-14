import type { LabelDataTypes, Status } from './common'
import type { AttachmentResponse } from './user'

export interface RequestedListData {
  taskId: number
  requestedAt: string
  mainCategoryName: string
  categoryName: string
  title: string
  requesterUrl?: string
  requesterName: string
}

export interface RequestHistoryListData {
  taskId: number
  taskCode: string
  requestedAt: string
  mainCategoryName: string
  categoryName: string
  title: string
  requesterUrl?: string
  requesterName: string
  processorUrl?: string
  processorName?: string
  taskStatus: string
  finishedAt?: string
}

export interface TaskCardProps {
  taskId: number
  taskCode: string
  title: string
  mainCategoryName: string
  categoryName: string
  labelInfo: {
    labelName: string
    labelColor: string
  }
  requesterNickname: string
  requesterImageUrl: string
  requesterDepartment: string
  processorOrder: number
  taskStatus: string
  createdAt: string
}

export interface TaskCardList {
  tasksInProgress: TaskCardProps[]
  tasksInReviewing: TaskCardProps[]
  tasksCompleted: TaskCardProps[]
}

export interface MyTaskListData {
  taskId: number
  taskCode: string
  requestedAt: string
  mainCategoryName: string
  categoryName: string
  title: string
  requesterUrl?: string
  requesterName: string
  taskStatus: string
  finishedAt?: string
}

export interface TeamBoardCardProps {
  department: string
  imageUrl?: string
  inProgressTaskCount: number
  inReviewingTaskCount: number
  nickname: string
  processorId: number
  tasks: TaskCardProps[]
  totalTaskCount: number
}

export type PeriodType = 'DAY' | 'WEEK' | 'MONTH'

export interface RequestApproveData {
  categoryId: number
  processor: ManagerTypes | null
  label: LabelDataTypes | null
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
  isApproved: boolean
  closeTaskDetail: () => void
  id: number
  isReviewer: boolean
  isRequestor: boolean
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

export interface RequestedResponse {
  content: RequestedListData[]
  totalElements: number
  totalPages: number
  pageNumber: number
  pageSize: number
  isFirst: boolean
  isLast: boolean
}

export interface RequestHistoryResponse {
  content: RequestHistoryListData[]
  totalElements: number
  totalPages: number
  pageNumber: number
  pageSize: number
  isFirst: boolean
  isLast: boolean
}

export interface MyTaskResponse {
  content: MyTaskListData[]
  totalElements: number
  totalPages: number
  pageNumber: number
  pageSize: number
  isFirst: boolean
  isLast: boolean
}

export interface RequestApprovePostTypes {
  categoryId: number
  processorId: number
  dueDate: string | null
  labelId: number | null
}

export interface ManagerTypes {
  memberId: number
  nickname: string
  imageUrl: string
  remainingTasks: number
}

export interface TeamBoardResponse {
  members: TeamBoardCardProps[]
  totalInProgressTaskCount: number
  totalInReviewingTaskCount: number
  totalTaskCount: number
}
