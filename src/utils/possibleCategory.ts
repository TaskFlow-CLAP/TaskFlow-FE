import { getCategory } from '@/api/common'
import type { Category } from '@/types/common'
import { ref } from 'vue'

const getPossibleCategory = async (): Promise<number[]> => {
  const categories = ref<Category[]>([])
  const possibleCategory = await getCategory()
  categories.value = possibleCategory

  const mainCategoryIds = categories.value
    .filter(category => category.subCategory && category.subCategory.length > 0)
    .map(category => category.mainCategoryId)

  return mainCategoryIds
}

export default getPossibleCategory
