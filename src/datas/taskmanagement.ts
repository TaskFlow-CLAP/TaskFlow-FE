import type { CategoryAllData } from '@/types/admin'

export const mockCategoryAllData: CategoryAllData = {
  mainCategory: [
    {
      id: 1,
      name: 'VM',
      code: 'VM001'
    },
    {
      id: 2,
      name: 'NFS',
      code: 'NFS001'
    }
  ],
  subCategory: [
    {
      id: 1,
      mainCategoryId: 1,
      name: 'VM 생성',
      code: 'VM_CREATE'
    },
    {
      id: 2,
      mainCategoryId: 1,
      name: 'VM 수정',
      code: 'VM_UPDATE'
    },
    {
      id: 3,
      mainCategoryId: 1,
      name: 'VM 삭제',
      code: 'VM_DELETE'
    },
    {
      id: 4,
      mainCategoryId: 2,
      name: 'NFS 생성',
      code: 'NFS_CREATE'
    },
    {
      id: 5,
      mainCategoryId: 2,
      name: 'NFS 수정',
      code: 'NFS_UPDATE'
    }
  ]
}
