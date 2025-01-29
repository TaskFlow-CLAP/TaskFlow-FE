import { useTeamBoardParamsStore } from '@/stores/params'

export const useTeamBoardParamsChange = () => {
  const { params } = useTeamBoardParamsStore()

  const onArrayChange = <Value extends number | string>(array: Value[], value: Value) => {
    return array.includes(value) ? array.filter(el => el !== value) : [...array, value]
  }

  const onOrderChange = (value: string) => {
    params.order = value
  }
  const onTitleChange = (value: string) => {
    params.title = value
  }
  const onMainChange = (value: number) => {
    params.mainCategoryId = onArrayChange(params.mainCategoryId, value)
  }
  const onSubChange = (value: number) => {
    params.categoryId = onArrayChange(params.categoryId, value)
  }

  return {
    onOrderChange,
    onTitleChange,
    onMainChange,
    onSubChange
  }
}
