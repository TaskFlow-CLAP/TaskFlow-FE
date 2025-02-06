import { axiosInstance } from '@/utils/axios'
import Cookies from 'js-cookie'
import type { loginDataTypes } from '@/types/auth'
import { useMemberStore } from '@/stores/member'

export const postPasswordCheck = async (password: string) => {
  const response = await axiosInstance.post('/api/members/password', password)
  return response.data
}

export const postLogin = async (loginData: loginDataTypes, sessionId: string) => {
  const memberStore = useMemberStore()
  const response = await axiosInstance.post('/api/auths/login', loginData, {
    headers: { sessionId: sessionId }
  })
  Cookies.set('accessToken', response.data.accessToken, {
    path: '/',
    sameSite: 'strict'
  })
  Cookies.set('refreshToken', response.data.refreshToken, {
    path: '/',
    sameSite: 'strict'
  })
  await memberStore.updateMemberInfoWithToken()
  return response.data
}

export const patchPassword = async (password: string) => {
  const response = await axiosInstance.patch('/api/members/password', password)
  return response.data
}

export const deleteLogout = async () => {
  const refreshToken = Cookies.get('refreshToken')
  const accessToken = Cookies.get('accessToken')

  const response = await axiosInstance.delete('/api/auths/logout', {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      refreshToken: refreshToken
    }
  })
  Cookies.remove('accessToken', { path: '/' })
  Cookies.remove('refreshToken', { path: '/' })
  return response
}
