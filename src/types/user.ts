import type { LabelDataTypes, Status } from './common'
import type { ManagerTypes } from './manager'

export interface MyRequestListData {
  taskId: number
  taskCode: string
  requestedAt: string
  mainCategoryName: string
  categoryName: string
  title: string
  processorImg?: string
  processorName?: string
  taskStatus: Status
  finishedAt?: string
}

export interface RequestTaskDropdownProps {
  placeholderText: string
  options: string[]
  labelName: string
  modelValue: string
  isLabel?: boolean
  disabled?: boolean
  isInvalidate?: boolean
}

export interface RequestTaskInputProps {
  modelValue: string
  placeholderText: string
  labelName: string
  isNotRequired?: boolean
  isEdit?: boolean
  isInvalidate?: string
  isDisbled?: boolean
  limitLength?: number
}

export interface RequestTaskFileInputProps {
  files: File[] | null
  removeFile: (index: number) => void
}

export interface RequestTaskTextAreaProps {
  modelValue: string
  placeholderText: string
  isInvalidate?: string
  limitLength?: number
}

export interface AttachmentResponse {
  fileId: number
  fileUrl: string
  fileUploadedAt: string
  fileSize: string
  fileName: string
}
export interface TaskDetailDatas {
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
  attachmentResponses: AttachmentResponse[]
  dueDate?: string
  labelName?: string
}

export type TaskHistoryType =
  | 'COMMENT'
  | 'COMMENT_FILE'
  | 'STATUS_SWITCHED'
  | 'PROCESSOR_ASSIGNED'
  | 'PROCESSOR_CHANGED'
  | 'TASK_TERMINATED'

export interface TaskDetailHistoryData {
  histories: TaskHistory[]
}

export interface TaskHistory {
  historyId: number
  date: string
  time: string
  taskHistoryType: TaskHistoryType
  details: TaskHistoryDetails
}

export interface TaskHistoryDetails {
  taskDetails?: TaskDetails | null
  commentDetails?: CommentDetails | null
  commentFileDetails?: CommentFileDetails | null
}

export interface TaskDetails {
  value: string
}

export interface CommentDetails {
  commentId: number
  nickName: string
  profileImageUrl: string
  isModified: boolean
  comment: string
}

export interface CommentFileDetails {
  commentId: number
  nickName: string
  profileImageUrl: string
  isModified: boolean
  fileName: string
  url: string
  size: string
}

export interface TaskDetailProps {
  selectedId: number
  closeTaskDetail: () => void
}
export interface ManagerInfoTypes {
  nickName: string
  profileUrl: string
  totalAssignedTasks: number
}

export interface TaskDetailDropdownProps {
  options: string[]
  modelValue: string
  processor: ManagerInfoTypes
}

export interface TaskDetailRightProps {
  taskDetail: TaskDetailDatas
}

export interface TaskDetailLabelDropdownProps {
  options: LabelDataTypes[]
  modelValue: LabelDataTypes
}

export interface TaskHistoryDatas {
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
  attachmentResponse: AttachmentResponse[]
  dueDate?: string
  labelName?: string
}

export interface MyRequestResponse {
  content: MyRequestListData[]
  totalElements: number
  totalPages: number
  pageNumber: number
  pageSize: number
  isFirst: boolean
  isLast: boolean
}

export interface LabelDropdownProps {
  taskId?: number
  modelValue: LabelDataTypes | null
  placeholderText: string
}

export interface ManagerDropdownProps {
  modelValue: ManagerTypes | null
  placeholderText: string
  isInvalidate: string
}

export interface DetailManagerDropdownProps {
  modelValue: ManagerTypes
}

export interface TaskStatusListProps {
  modelValue: Status
  isProcessor: boolean
  taskId?: number
}
