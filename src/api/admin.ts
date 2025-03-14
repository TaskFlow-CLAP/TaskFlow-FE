import type { NewLabelTypes, UserRegistrationApiProps, UserUpdateValue } from '@/types/admin'
import type { LabelDataTypes } from '@/types/common'
import { axiosInstance, formDataAxiosInstance } from '@/utils/axios'
import DOMPurify from 'dompurify'

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
    labelName: DOMPurify.sanitize(editLabel.labelName),
    labelColor: editLabel.labelColor
  })
  return response.data
}

export const deleteCategoryAdmin = async (id: number) => {
  const response = await axiosInstance.delete(`/api/managements/categories/${id}`)
  return response.data
}

export const addMemberAdmin = async (memberData: UserRegistrationApiProps) => {
  const response = await axiosInstance.post('/api/managements/members', memberData)
  return response.data
}

export const getDepartmentsAdmin = async () => {
  const response = await axiosInstance.get('/api/managements/departments')
  return response.data
}

export const addMemberAdminByCsv = async (formdata: FormData) => {
  const response = await formDataAxiosInstance.post('/api/managements/members/upload', formdata)
  return response.data
}

export const getMemberDetailAdmin = async (id: string) => {
  const response = await axiosInstance.get(`api/managements/members/${id}/details`)
  return response.data
}

export const updateMemberAdmin = async (id: string, data: UserUpdateValue) => {
  const response = await axiosInstance.patch(`api/managements/members/${id}`, data)
  return response.data
}
