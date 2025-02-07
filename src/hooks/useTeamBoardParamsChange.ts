import { useTeamBoardParamsStore } from '@/stores/params'

export const useTeamBoardParamsChange = () => {
  const { params } = useTeamBoardParamsStore()

  const onArrayChange = <Value extends number | string>(array: Value[], value: Value) => {
    return array.includes(value) ? array.filter(el => el !== value) : [...array, value]
  }

  const onSortByChange = (value: string) => {
    params.sortBy = value
  }
  const onTaskTitleChange = (value: string) => {
    params.taskTitle = value
  }
  const onMainChange = (value: number) => {
    params.mainCategoryIds = onArrayChange(params.mainCategoryIds, value)
  }
  const onSubChange = (value: number) => {
    params.categoryIds = onArrayChange(params.categoryIds, value)
  }

  return {
    onSortByChange,
    onTaskTitleChange,
    onMainChange,
    onSubChange
  }
}
