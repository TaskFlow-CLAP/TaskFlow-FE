import { defineStore } from 'pinia'
import { axiosInstance } from '@/utils/axios'
import { ref } from 'vue'
import type { User } from '@/types/auth'
import Cookies from 'js-cookie'

export const useMemberStore = defineStore('memberInfo', () => {
  const info = ref<User>({
    memberName: '',
    nickname: '',
    imageUrl: '',
    memberRole: '',
    memberStatus: '',
    email: '',
    departmentName: '',
    departmentRole: '',
    notificationSettingInfo: {
      agit: false,
      email: false,
      kakaoWork: false
    }
  })

  const refreshToken = ref(Cookies.get('refreshToken') || '')
  const isLogined = ref(!!refreshToken.value)

  async function updateMemberInfoWithToken() {
    const response = await axiosInstance.get('/api/members/info')
    updateMemberInfo(response.data)
    isLogined.value = true
  }

  function updateMemberInfo(responseData: any) {
    info.value = {
      memberName: responseData.name || '',
      nickname: responseData.nicknanme || '',
      email: responseData.email || '',
      imageUrl: responseData.profileImageUrl || '',
      memberRole: responseData.role || '',
      memberStatus: responseData.memberStatus || '',
      departmentName: responseData.departmentName || '',
      departmentRole: responseData.departmentRole || '',
      notificationSettingInfo: {
        agit: responseData.notificationSettingInfo.agit,
        email: responseData.notificationSettingInfo.email,
        kakaoWork: responseData.notificationSettingInfo.kakaoWork
      }
    }
  }

  function logout() {
    isLogined.value = false
    Cookies.remove('accessToken')
    Cookies.remove('refreshToken')
  }

  return {
    info,
    isLogined,
    updateMemberInfo,
    updateMemberInfoWithToken,
    logout
  }
})
