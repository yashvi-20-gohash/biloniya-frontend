
import { API_PREFIX } from '@/src/constants/appConstants'
import httpClient from '@/src/lib/http-client'
import { objectToQueryString } from '@/src/lib/utils'
import { create } from 'zustand'
import { NewsLetterListType } from '../schema/news-letter-list'


export type IResponseType = {
  status: boolean | string
  message: string
  data: Record<string, unknown> | null // Remove the array option if not expected
}

export type INewsLetterList = {
  data: NewsLetterListType[]
  paginator: {
    itemCount: number
    pageCount: number
  }
}


export interface IQueryParams {
  limit: number
  page: number
  search?: string
  [key: string]: unknown
}

export interface INewsLetter {
  email: string
}

export type IStore = {
  isNewsLetterLoading: boolean
  newsLetterListData: NewsLetterListType[] | []
  getNewsLetterList: (queryParams: IQueryParams) => Promise<IResponseType | null>

  setTotalTransactionPages: (totalPages: number) => void
  pagination: { pageIndex: number; pageSize: number }
  setPagination: (pagination: { pageIndex: number; pageSize: number }) => void
  totalTransactionPages: number
  loadedPages: Record<number, []>


  isNewsLoading: boolean
  addNews: (data: INewsLetter) => Promise<IResponseType | null>


}

export const NewsLetterListStore = create<IStore>((set, get) => ({
  isNewsLetterLoading: false,
  isNewsLoading: false,
  newsLetterListData: [],


  loadedPages: {},
  totalTransactionPages: 1,

  pagination: { pageIndex: 0, pageSize: 10 },
  setPagination: (pagination) => set({ pagination }),
  setTotalTransactionPages: (totalTransactionPages: number) =>
    set({ totalTransactionPages }),


  getNewsLetterList: async (queryParams) => {
    const { loadedPages } = get()
    if (loadedPages[queryParams.page]) return null

    try {
      set({ isNewsLetterLoading: true })
      const queryString = objectToQueryString(queryParams)
      const { data: resp } = await httpClient.get(
        `/${API_PREFIX.SUPER_ADMIN}/news-letter/list?${queryString}`
      )

      const updatedList =
        queryParams.page === 1
          ? resp.data?.data || []
          : get().newsLetterListData.concat(resp.data?.data || [])

      set((state) => ({
        newsLetterListData: updatedList,
        totalTransactionPages: Math.ceil(
          resp.data?.paginator?.itemCount / resp.data?.paginator?.perPage
        ),
        loadedPages: {
          ...state.loadedPages,
          [queryParams.page]: resp.data || [],
        },
        isNewsLetterLoading: false,
      }))
      return resp
    } catch (error) {
      set({ isNewsLetterLoading: false })
      return error
    }
  },


  addNews: async (data) => {
    try {
      set({ isNewsLoading: true })
      const response = await httpClient.post(
        `/news-letter`,
        data
      )
      const resp = response?.data
      return resp
    } catch {
      set({
        isNewsLoading: false,
      })
      return null
    } finally {
      set({ isNewsLoading: false })
    }
  },

}))
