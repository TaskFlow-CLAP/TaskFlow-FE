import type { RequestParams, TaskBoardParams, TeamBoardParams } from '@/types/stores'

export const useParseParams = () => {
  const parseRequestParams = (params: RequestParams) => {
    const newParams = {
      ...params,
      mainCategoryIds: params.mainCategoryIds.join(','),
      categoryIds: params.categoryIds.join(''),
      taskStatus: params.taskStatus?.join(',')
    }
    return newParams
  }

  const parseBoardParams = (params: TaskBoardParams | TeamBoardParams) => {
    const newParams = {
      ...params,
      mainCategoryIds: params.mainCategoryIds.join(','),
      categoryIds: params.categoryIds.join('')
    }
    return newParams
  }

  return { parseRequestParams, parseBoardParams }
}
