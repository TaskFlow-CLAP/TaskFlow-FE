import { useRequestParamsStore } from '@/stores/params'

export const useRequestParamsChange = () => {
  const { params } = useRequestParamsStore()

  const onArrayChange = <Value extends number | string>(array: Value[], value: Value) => {
    return array.includes(value) ? array.filter(el => el !== value) : [...array, value]
  }

  const onTermChange = (value: string) => {
    if (value === '') {
      params.filterTaskListRequest.term = ''
    } else {
      params.filterTaskListRequest.term = Number(value)
    }
  }
  const onTitleChange = (value: string) => {
    params.filterTaskListRequest.title = value
  }
  const onNickNameChange = (value: string) => {
    params.filterTaskListRequest.nickName = value
  }
  const onMainChange = (value: number) => {
    params.filterTaskListRequest.mainCategoryIds = onArrayChange(
      params.filterTaskListRequest.mainCategoryIds,
      value
    )
  }
  const onSubChange = (value: number) => {
    params.filterTaskListRequest.categoryIds = onArrayChange(
      params.filterTaskListRequest.categoryIds,
      value
    )
  }
  const onTaskStatusChange = (value: string) => {
    params.filterTaskListRequest.taskStatus = onArrayChange(
      params.filterTaskListRequest.taskStatus!,
      value
    )
  }
  const onPageSizeChange = (value: string) => {
    params.pageSize = Number(value)
  }

  const toggleSortBy = (sortBy: 'REQUESTED' | 'FINISHED') => {
    if (sortBy === params.filterTaskListRequest.sortBy) {
      params.filterTaskListRequest.sortDirection =
        params.filterTaskListRequest.sortDirection === 'DESC' ? 'ASC' : 'DESC'
    } else {
      params.filterTaskListRequest.sortBy = sortBy
      params.filterTaskListRequest.sortDirection = 'DESC'
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
