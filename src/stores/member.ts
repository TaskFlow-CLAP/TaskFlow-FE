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

  async function updateMemberInfoWithToken() {
    try {
      const response = await axiosInstance.get('/api/members/info')

      console.log('API Response:', response.data)
      updateMemberInfo(response.data)
    } catch (error) {
      console.error('updata error:', error)
    }
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

  return {
    info,
    updateMemberInfo,
    updateMemberInfoWithToken
  }
})
