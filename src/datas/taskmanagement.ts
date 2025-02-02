import type { CategoryAllData } from '@/types/admin'

export const mockCategoryAllData: CategoryAllData = {
  categories: [
    {
      id: 1,
      name: 'VM',
      code: 'VM001',
      subCategory: [
        {
          id: 1,
          mainCategoryId: 1,
          name: 'VM 생성',
          code: 'VM_CR'
        },
        {
          id: 2,
          mainCategoryId: 1,
          name: 'VM 수정',
          code: 'VM_UD'
        },
        {
          id: 3,
          mainCategoryId: 1,
          name: 'VM 삭제',
          code: 'VM_DE'
        }
      ]
    },
    {
      id: 2,
      name: 'NFS',
      code: 'NFS001',
      subCategory: [
        {
          id: 4,
          mainCategoryId: 2,
          name: 'NFS 생성',
          code: 'NFS_CR'
        },
        {
          id: 5,
          mainCategoryId: 2,
          name: 'NFS 수정',
          code: 'NFS_UD'
        }
      ]
    }
  ]
}
