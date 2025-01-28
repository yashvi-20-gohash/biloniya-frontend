
import { API_PREFIX } from '@/src/constants/appConstants'
import httpClient from '@/src/lib/http-client'
import { objectToQueryString } from '@/src/lib/utils'
import { create } from 'zustand'
import { ContactUsListType } from '../schema/contact'

export type IResponseType = {
  status: boolean | string
  message: string
  data: Record<string, unknown> | null // Remove the array option if not expected
}

export type IContactList = {
  data: ContactUsListType[]
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

export interface IContactUs {
  id: string
  replyMessage: string
}

export type IStore = {
  contactLoading: boolean
  contactListData: ContactUsListType[] | []
  getContactList: (queryParams: IQueryParams) => Promise<IResponseType | null>

  setTotalTransactionPages: (totalPages: number) => void
  pagination: { pageIndex: number; pageSize: number }
  setPagination: (pagination: { pageIndex: number; pageSize: number }) => void
  totalTransactionPages: number
  loadedPages: Record<number, []>


  contactUsReplyLoading: boolean
  contactUsReply: (data: IContactUs) => Promise<IResponseType | null>

  contactUsdetailsLoading: boolean
  contactUsdetailsData: ContactUsListType | null
  getContactdetails: (id: string) => Promise<IResponseType | null>

}

export const SuperAdminContactListStore = create<IStore>((set, get) => ({


  contactLoading: false,
  contactUsReplyLoading: false,
  contactListData: [],

  contactUsdetailsLoading: false,
  contactUsdetailsData: null,

  loadedPages: {},
  totalTransactionPages: 1,

  pagination: { pageIndex: 0, pageSize: 10 },
  setPagination: (pagination) => set({ pagination }),
  setTotalTransactionPages: (totalTransactionPages: number) =>
    set({ totalTransactionPages }),


  getContactList: async (queryParams) => {
    const { loadedPages } = get()
    if (loadedPages[queryParams.page]) return null

    try {
      set({ contactLoading: true })
      const queryString = objectToQueryString(queryParams)
      const { data: resp } = await httpClient.get(
        `/${API_PREFIX.SUPER_ADMIN}/contact-us/list?${queryString}`
      )

      const updatedList =
        queryParams.page === 1
          ? resp.data?.data || []
          : get().contactListData.concat(resp.data?.data || [])

      set((state) => ({
        contactListData: updatedList,
        totalTransactionPages: Math.ceil(
          resp.data?.paginator?.itemCount / resp.data?.paginator?.perPage
        ),
        loadedPages: {
          ...state.loadedPages,
          [queryParams.page]: resp.data || [],
        },
        contactLoading: false,
      }))
      return resp
    } catch (error) {
      set({ contactLoading: false })
      return error
    }
  },


  getContactdetails: async (id) => {
    try {
      set({ contactUsdetailsLoading: true })
      const { data: resp } = await httpClient.get(
        `/${API_PREFIX.SUPER_ADMIN}/contact-us?id=${id}`
      )
      set({
        contactUsdetailsData: resp.data.contactUs || null,
        contactUsdetailsLoading: true
      })

      return resp
    } catch (error) {
      set({ contactUsdetailsLoading: false })
      return error
    }
  },

  contactUsReply: async (data) => {
    try {
      set({ contactUsReplyLoading: true })
      const response = await httpClient.post(
        `/${API_PREFIX.SUPER_ADMIN}/contact-us/reply`,
        data
      )
      const resp = response?.data
      return resp
    } catch {
      set({
        contactUsReplyLoading: false,
      })
      return null
    } finally {
      set({ contactUsReplyLoading: false })
    }
  },

}))
