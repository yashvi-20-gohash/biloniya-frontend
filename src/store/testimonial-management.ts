
import { API_PREFIX } from '@/src/constants/appConstants'
import httpClient from '@/src/lib/http-client'
import { objectToQueryString } from '@/src/lib/utils'
import { toast } from 'sonner'
import { create } from 'zustand'
import { TestimonialLisType } from '../schema/testimonial-management'

export type IResponseType = {
  status: boolean | string
  message: string
  data: Record<string, unknown> | null // Remove the array option if not expected
}

export type TestimonialResponse = {
  data: TestimonialLisType[]
  paginator: {
    itemCount: number
    pageCount: number
  }
}

export type IUpdateStatus = {
  id: string[]
  isActive: boolean
}

export interface IQueryParams {
  limit: number
  page: number
  search?: string
  [key: string]: unknown
}




export type IStore = {
  addTestimonialLoading: boolean
  addTestimonial: (data: object) => Promise<IResponseType | null>

  updateTestimonialLoading: boolean
  updateTestimonial: (data: object) => Promise<IResponseType | null>

  isTestimonialLoading: boolean
  testimonialData: TestimonialLisType[] | []
  getTestimonialList: (queryParams: IQueryParams) => Promise<IResponseType | null>

  setTotalTransactionPages: (totalPages: number) => void
  pagination: { pageIndex: number; pageSize: number }
  setPagination: (pagination: { pageIndex: number; pageSize: number }) => void
  totalTransactionPages: number
  loadedPages: Record<number, []>

  deleteTestimonial: (id: string) => Promise<IResponseType | null>
  isDeleteTestimonialLoading: boolean
  formSubmitError: string | null

  getTestimonialDetails: (id: string) => Promise<IResponseType | null>
  isTestimonialDetails: boolean
  testimonialDetails: TestimonialLisType | null

  updateTestimonialStatus: (data: IUpdateStatus) => Promise<IResponseType | null>
  isTestimonialStatusLoading: boolean
}

export const SuperAdminTestimonialManagementStore = create<IStore>((set, get) => ({
  addTestimonialLoading: false,
  updateTestimonialLoading: false,

  isTestimonialLoading: false,
  testimonialData: [],
  loadedPages: {},
  totalTransactionPages: 1,

  pagination: { pageIndex: 0, pageSize: 10 },
  setPagination: (pagination) => set({ pagination }),
  setTotalTransactionPages: (totalTransactionPages: number) =>
    set({ totalTransactionPages }),

  isDeleteTestimonialLoading: false,
  formSubmitError: null,

  isTestimonialDetails: false,
  testimonialDetails: null,

  isTestimonialStatusLoading: false,


  addTestimonial: async (data) => {
    try {
      set({ addTestimonialLoading: true })
      const response = await httpClient.post(
        `/${API_PREFIX.SUPER_ADMIN}/testimonial`,
        data
      )
      const resp = response?.data

      if (resp?.status === 'success') {
        const testimonialData = get().testimonialData || []
        set({ testimonialData: [resp.data, ...testimonialData] })
      }
      return resp
    } catch {
      set({
        addTestimonialLoading: false,
      })
      return null
    } finally {
      set({ addTestimonialLoading: false })
    }
  },

  updateTestimonial: async (data) => {
    try {
      set({ updateTestimonialLoading: true })
      const response = await httpClient.put(
        `/${API_PREFIX.SUPER_ADMIN}/testimonial/`,
        data
      )
      const resp = response?.data

      if (resp?.status === 'success') {
        set((state) => ({
          testimonialData: state.testimonialData.map((blog) =>
            blog.id === resp.id ? resp : blog
          ),
        }))
      }
      return resp
    } catch {
      set({
        formSubmitError: 'Something went wrong. Please try again later.',
        updateTestimonialLoading: false,
      })
      return null
    } finally {
      set({ updateTestimonialLoading: false })
    }
  },

  getTestimonialList: async (queryParams) => {
    const { loadedPages } = get()
    if (loadedPages[queryParams.page]) return null

    try {
      set({ isTestimonialLoading: true })
      const queryString = objectToQueryString(queryParams)
      const { data: resp } = await httpClient.get(
        `/${API_PREFIX.SUPER_ADMIN}/testimonial/list?${queryString}`
      )

      const updatedList =
        queryParams.page === 1
          ? resp.data?.data || []
          : get().testimonialData.concat(resp.data?.data || [])

      set((state) => ({
        testimonialData: updatedList,
        totalTransactionPages: Math.ceil(
          resp.data?.paginator?.itemCount / resp.data?.paginator?.perPage
        ),
        loadedPages: {
          ...state.loadedPages,
          [queryParams.page]: resp.data || [],
        },
        isTestimonialLoading: false,
      }))
      return resp
    } catch (error) {
      set({ isTestimonialLoading: false })
      return error
    }
  },


  updateTestimonialStatus: async (data) => {
    try {
      set({ isTestimonialStatusLoading: true })
      const response = await httpClient.put(
        `/${API_PREFIX.SUPER_ADMIN}/testimonial/status`,
        data
      )
      const resp = response?.data
      if (resp?.status === 'SUCCESS') {
        set((state) => ({
          testimonialData: state.testimonialData.map((blog) =>
            blog._id === resp._id ? resp : blog
          ),
        }))
      }
      return resp
    } catch {
      set({
        isTestimonialStatusLoading: false,
      })
      return null
    } finally {
      set({ isTestimonialStatusLoading: false })
    }
  },

  deleteTestimonial: async (id: string) => {
    try {
      set({ isDeleteTestimonialLoading: true, formSubmitError: null })

      const response = await httpClient.delete(
        `${API_PREFIX.SUPER_ADMIN}/testimonial?ids=${id}`
      )
      const resp = response.data
      if (resp?.status === 'SUCCESS') {
        set((state) => ({
          testimonialData: state.testimonialData.filter((code) => code?.id !== id),
        }))
      } else {
        toast.error(resp?.message)
      }

      return resp
    } catch (error) {
      const err = error as { response?: { data?: string } }
      set({
        formSubmitError: 'Failed to delete inventory item.',
        isDeleteTestimonialLoading: false,
      })
      return err.response?.data ?? null
    } finally {
      set({ isDeleteTestimonialLoading: false })
    }
  },

  getTestimonialDetails: async (id: string) => {
    try {
      set({ isTestimonialDetails: true })

      const response = await httpClient.get(
        `/${API_PREFIX.SUPER_ADMIN}/testimonial?id=${id}`
      )
      const resp = response.data.data

      set({ testimonialDetails: resp.testimonial })
      set({ isTestimonialDetails: false })
      return resp
    } catch (error) {
      const err = error as { response?: { data?: string } }
      set({
        isTestimonialDetails: false,
      })
      return err.response?.data ?? null
    }
  },
}))
