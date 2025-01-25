import { useRequestParamsStore } from '@/stores/params'

export const useRequestParamsChange = () => {
  const { params } = useRequestParamsStore()

  const onTermChange = (value: string) => {
    if (value === '') {
      params.term = ''
    }
    params.term = Number(value)
  }
  const onTitleChange = (value: string) => {
    params.title = value
  }
  const onNickNameChange = (value: string) => {
    params.nickName = value
  }
  const onMainChange = (value: number) => {
    if (params.mainCategoryId.includes(value)) {
      params.mainCategoryId = [...params.mainCategoryId].filter(el => el !== value)
    } else {
      params.mainCategoryId.push(value)
    }
  }
  const onSubChange = (value: number) => {
    if (params.categoryId.includes(value)) {
      params.categoryId = [...params.categoryId].filter(el => el !== value)
    } else {
      params.categoryId.push(value)
    }
  }
  const onTaskStatusChange = (value: string) => {
    if (params.taskStatus) {
      if (params.taskStatus.includes(value)) {
        params.taskStatus = [...params.taskStatus].filter(el => el !== value)
      } else {
        params.taskStatus.push(value)
      }
    }
  }
  const onPageSizeChange = (value: string) => {
    params.pageSize = Number(value)
  }

  return {
    onTermChange,
    onTitleChange,
    onNickNameChange,
    onMainChange,
    onSubChange,
    onTaskStatusChange,
    onPageSizeChange
  }
}
