import { defineStore } from 'pinia'
import { axiosInstance } from '@/utils/axios'
import { ref } from 'vue'
import type { User } from '@/types/auth'
import Cookies from 'js-cookie'

export const useMemberStore = defineStore('memberInfo', () => {
  const info = ref<User>({
    memberId: 0,
    memberName: '',
    nickname: '',
    imageUrl: '',
    memberRole: '',
    memberStatus: ''
  })

  async function updateMemberInfoWithToken() {
    try {
      const accessToken = Cookies.get('accessToken')

      if (!accessToken) {
        console.error('Access token error')
        return
      }

      const response = await axiosInstance.get('/api/members/info', {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      })

      console.log('API Response:', response.data)
      updateMemberInfo(response.data)
    } catch (error) {
      console.error('updata error:', error)
    }
  }

  function updateMemberInfo(responseData: any) {
    info.value = {
      memberId: 0,
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
