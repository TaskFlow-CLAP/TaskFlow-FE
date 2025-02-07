import { useLogsParamsStore } from '@/stores/params'

export const useLogsParamsChange = () => {
  const { params } = useLogsParamsStore()

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
  const onLogStatusChange = (value: string) => {
    params.logStatus = onArrayChange(params.logStatus!, value)
  }
  const onNickNameChange = (value: string) => {
    params.nickName = value
  }
  const onClientIpChange = (value: string) => {
    params.clientIp = value
  }
  const onPageSizeChange = (value: string) => {
    params.pageSize = Number(value)
  }

  const toggleSortBy = () => {
    params.sortDirection = params.sortDirection === 'DESC' ? 'ASC' : 'DESC'
  }

  return {
    onTermChange,
    onLogStatusChange,
    onNickNameChange,
    onClientIpChange,
    onPageSizeChange,
    toggleSortBy
  }
}
