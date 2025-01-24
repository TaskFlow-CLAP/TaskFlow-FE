export interface MyRequestListData {
  taskId: number
  taskCode: string
  requestedAt: string
  mainCategoryName: string
  categoryName: string
  title: string
  processorImg?: string
  processorName?: string
  taskStatus: string
  finishedAt?: string
}

export interface RequestTaskDropdownProps {
  placeholderText: string
  options: string[]
  labelName: string
  modelValue: string
}

export interface RequestTaskInputProps {
  modelValue: string
  placeholderText: string
}

export interface RequestTaskFileInputProps {
  files: File[] | null
  removeFile: (index: number) => void
}

export interface RequestTaskTextAreaProps {
  modelValue: string
  placeholderText: string
}
