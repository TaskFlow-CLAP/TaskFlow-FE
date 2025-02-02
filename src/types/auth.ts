export interface UserTypes {
  id: number
  name: string
  created_at: string
  updated_at: string
}

export interface User {
  memberId: number
  memberName: string
  nickname: string
  imageUrl: string
  memberRole: string
  memberStatus: string
}
