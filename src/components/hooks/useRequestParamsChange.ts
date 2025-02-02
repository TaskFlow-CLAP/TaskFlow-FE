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
    params.mainCategoryIds = onArrayChange(params.mainCategoryIds, value)
  }
  const onSubChange = (value: number) => {
    params.categoryIds = onArrayChange(params.categoryIds, value)
  }
  const onTaskStatusChange = (value: string) => {
    params.taskStatus = onArrayChange(params.taskStatus!, value)
  }
  const onPageSizeChange = (value: string) => {
    params.pageSize = Number(value)
  }

  const toggleSortBy = (sortBy: 'REQUESTED_AT' | 'FINISHED_AT') => {
    if (sortBy === params.sortBy) {
      params.sortDirection = params.sortDirection === 'DESC' ? 'ASC' : 'DESC'
    } else {
      params.sortBy = sortBy
      params.sortDirection = 'DESC'
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
