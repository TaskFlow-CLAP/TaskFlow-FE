import { useLogsParamsStore } from '@/stores/params'

export const useLogsParamsChange = () => {
  const { params } = useLogsParamsStore()

  const onTermChange = (value: string) => {
    if (value === '') {
      params.term = ''
    } else {
      params.term = Number(value)
    }
  }
  const onDivisionChange = (value: string) => {
    params.division = value
  }
  const onNickNameChange = (value: string) => {
    params.nickName = value
  }
  const onIpAddressChange = (value: string) => {
    params.ipAddress = value
  }
  const onPageSizeChange = (value: string) => {
    params.pageSize = Number(value)
  }

  const toggleSortBy = () => {
    params.orderRequest.sortDirection =
      params.orderRequest.sortDirection === 'DESC' ? 'ASC' : 'DESC'
  }

  return {
    onTermChange,
    onDivisionChange,
    onNickNameChange,
    onIpAddressChange,
    onPageSizeChange,
    toggleSortBy
  }
}
