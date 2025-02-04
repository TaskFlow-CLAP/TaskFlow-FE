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
    memberStatus: ''
  })

  const refreshToken = ref(Cookies.get('refreshToken') || '')
  const isLogined = ref(!!refreshToken.value)

  async function updateMemberInfoWithToken() {
    const response = await axiosInstance.get('/api/members/info')
    console.log('API Response:', response.data)
    updateMemberInfo(response.data)
    isLogined.value = true
  }

  function updateMemberInfo(responseData: any) {
    info.value = {
      memberName: responseData.name || '',
      nickname: responseData.nicknanme || '',
      imageUrl: responseData.profileImageUrl || '',
      memberRole: responseData.role || '',
      memberStatus: ''
    }
    console.log('Updated member info:', info.value)
  }

  function logout() {
    info.value = {
      memberName: '',
      nickname: '',
      imageUrl: '',
      memberRole: '',
      memberStatus: ''
    }
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
