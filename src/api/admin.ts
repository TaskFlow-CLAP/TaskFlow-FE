import type { NewLabelTypes, UserRegistrationProps } from '@/types/admin'
import type { LabelDataTypes } from '@/types/common'
import { axiosInstance } from '@/utils/axios'

export const deleteLabelAdmin = async (id: number) => {
  const response = await axiosInstance.delete(`/api/managements/labels/${id}`)
  return response.data
}

export const postAddLabelAdmin = async (newLabel: NewLabelTypes) => {
  const response = await axiosInstance.post('/api/managements/labels', newLabel)
  return response.data
}

export const patchLabelAdmin = async (editLabel: LabelDataTypes) => {
  const response = await axiosInstance.patch(`/api/managements/labels/${editLabel.labelId}`, {
    labelName: editLabel.labelName,
    labelColor: editLabel.labelColor
  })
  return response.data
}

export const deleteCategoryAdmin = async (id: number) => {
  const response = await axiosInstance.delete(`/api/managements/categories/${id}`)
  return response.data
}

export const addMemberAdmin = async (memberData: UserRegistrationProps) => {
  console.log(memberData, '요청 데이터')

  const response = await axiosInstance.post('/api/managements/members', { memberData })
  return response.data
}
