import { useRequestParamsStore } from '@/stores/params'

export const useRequestParamsChange = () => {
  const { params } = useRequestParamsStore()

  const onArrayChange = <Value extends number | string>(array: Value[], value: Value) => {
    return array.includes(value) ? array.filter(el => el !== value) : [...array, value]
  }

  const onTermChange = (value: string) => {
    if (value === '') {
      params.term = ''
    } else {
      params.term = Number(value)
    }
  }
  const onTitleChange = (value: string) => {
    params.title = value
  }
  const onNickNameChange = (value: string) => {
    params.nickName = value
  }
  const onMainChange = (value: number) => {
    params.mainCategoryId = onArrayChange(params.mainCategoryId, value)
  }
  const onSubChange = (value: number) => {
    params.categoryId = onArrayChange(params.categoryId, value)
  }
  const onTaskStatusChange = (value: string) => {
    params.taskStatus = onArrayChange(params.taskStatus!, value)
  }
  const onPageSizeChange = (value: string) => {
    params.pageSize = Number(value)
  }

  const toggleSortBy = (sortBy: 'REQUESTED' | 'FINISHED') => {
    if (sortBy === params.orderRequest.sortBy) {
      params.orderRequest.sortDirection =
        params.orderRequest.sortDirection === 'DESC' ? 'ASC' : 'DESC'
    } else {
      params.orderRequest = { sortBy, sortDirection: 'DESC' }
    }
  }

  return {
    onTermChange,
    onTitleChange,
    onNickNameChange,
    onMainChange,
    onSubChange,
    onTaskStatusChange,
    onPageSizeChange,
    toggleSortBy
  }
}
