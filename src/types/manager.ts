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

type StatisticsType =
  | 'REQUEST_BY_PERIOD'
  | 'PROCESS_BY_PERIOD'
  | 'REQUEST_BY_CATEGORY'
  | 'PROCESS_BY_MANAGER'

export interface StatisticsCardProps {
  title: string
  statisticsType: StatisticsType
  chartType: 'line' | 'pie'
}
