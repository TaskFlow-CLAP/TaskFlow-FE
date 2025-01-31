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
    params.filterTaskListRequest.mainCategoryId = onArrayChange(
      params.filterTaskListRequest.mainCategoryId,
      value
    )
  }
  const onSubChange = (value: number) => {
    params.filterTaskListRequest.categoryId = onArrayChange(
      params.filterTaskListRequest.categoryId,
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
    if (sortBy === params.filterTaskListRequest.orderRequest.sortBy) {
      params.filterTaskListRequest.orderRequest.sortDirection =
        params.filterTaskListRequest.orderRequest.sortDirection === 'DESC' ? 'ASC' : 'DESC'
    } else {
      params.filterTaskListRequest.orderRequest = { sortBy, sortDirection: 'DESC' }
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
