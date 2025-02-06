import { axiosInstance } from '@/utils/axios'
import Cookies from 'js-cookie'
import type { loginDataTypes } from '@/types/auth'
import { useMemberStore } from '@/stores/member'

export const postLogin = async (loginData: loginDataTypes) => {
  const response = await axiosInstance.post('/api/auths/login', loginData, {})
  Cookies.set('accessToken', response.data.accessToken, {
    path: '/',
    sameSite: 'strict'
  })
  Cookies.set('refreshToken', response.data.refreshToken, {
    path: '/',
    sameSite: 'strict'
  })
  return response.data
}

export const patchPassword = async (password: string) => {
  const response = await axiosInstance.patch('/api/members/password', password)

  return response.data
}

export const deleteLogout = async () => {
  const memberStore = useMemberStore()
  memberStore.$reset()
  Cookies.remove('accessToken')
  Cookies.remove('refreshToken')
}
