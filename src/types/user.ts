import type { Status } from './common'

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
}

export interface RequestTaskInputProps {
  modelValue: string
  placeholderText: string
  labelName: string
  isNotRequired?: boolean
}

export interface RequestTaskFileInputProps {
  files: File[] | null
  removeFile: (index: number) => void
}

export interface RequestTaskTextAreaProps {
  modelValue: string
  placeholderText: string
}

export interface AttachmentResponse {
  fileId: number
  fileUrl: string
  fileUploadedAt: string
  fileSize: string
  fileName: string
}

export interface TaskDetailRightProps {
  taskId: string
  requestedAt: string
  finishedAt: string
  taskStatus: string
  requesterNickName: string
  requesterImageUrl: string
  processorNickName: string
  processorImageUrl: string
}

export interface TaskDetailLeftProps {
  mainCategoryName: string
  categoryName: string
  title: string
  description: string
  attachmentResponse: AttachmentResponse[]
}

export interface TaskDetailDatas {
  taskId: string
  taskCode: string
  requestedAt: string
  finishedAt: string
  taskStatus: string
  requesterNickName: string
  requesterImageUrl: string
  processorNickName: string
  processorImageUrl: string
  mainCategoryName: string
  categoryName: string
  title: string
  description: string
  attachmentResponse: AttachmentResponse[]
}

export type TaskHistoryType =
  | 'COMMENT'
  | 'COMMENT_FILE'
  | 'STATUS_SWITCHED'
  | 'PROCESSOR_ASSIGNED'
  | 'PROCESSOR_CHANGED'

interface TaskDetailHistoryFileTypes {
  fileId: number
  fileUrl: string
  fileName: string
}

export interface TaskDetailHistoryProps {
  date: string
  time: string
  name: string
  profileImageUrl: string
  TaskHistoryType: TaskHistoryType
  isModified: boolean
  details: {
    previousProcessor: string
    currentProcessor: string
    comment?: string
    updateDetails?: string
    taskStatus?: string
    file?: TaskDetailHistoryFileTypes
  }
}

export interface TaskDetailProps {
  isManager: boolean
  isApproved: boolean
  closeTaskDetail: () => void
}
