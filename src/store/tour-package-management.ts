
import { API_PREFIX } from '@/src/constants/appConstants'
import httpClient from '@/src/lib/http-client'
import { objectToQueryString } from '@/src/lib/utils'
import { toast } from 'sonner'
import { create } from 'zustand'
import { TourListType } from '../schema/tour-package-management'

export type IResponseType = {
  status: boolean | string
  message: string
  data: Record<string, unknown> | null // Remove the array option if not expected
}

export type TourResponse = {
  data: TourListType[]
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
  addTourLoading: boolean
  addTour: (data: object) => Promise<IResponseType | null>

  updateTourLoading: boolean
  updateTour: (data: object) => Promise<IResponseType | null>

  isTourLoading: boolean
  tourData: TourListType[] | []
  getTourList: (queryParams: IQueryParams) => Promise<IResponseType | null>

  setTotalTransactionPages: (totalPages: number) => void
  pagination: { pageIndex: number; pageSize: number }
  setPagination: (pagination: { pageIndex: number; pageSize: number }) => void
  totalTransactionPages: number
  loadedPages: Record<number, []>

  deleteTour: (id: string) => Promise<IResponseType | null>
  isTourDeleteLoading: boolean
  formSubmitError: string | null

  getTourDetails: (id: string) => Promise<IResponseType | null>
  isTourDetails: boolean
  tourDetails: TourListType | null

  updateTourStatus: (data: IUpdateStatus) => Promise<IResponseType | null>
  isTourStatusLoading: boolean
}

export const SuperAdminTourStore = create<IStore>((set, get) => ({
  addTourLoading: false,
  updateTourLoading: false,

  isTourLoading: false,
  tourData: [],
  loadedPages: {},
  totalTransactionPages: 1,

  pagination: { pageIndex: 0, pageSize: 10 },
  setPagination: (pagination) => set({ pagination }),
  setTotalTransactionPages: (totalTransactionPages: number) =>
    set({ totalTransactionPages }),

  isTourDeleteLoading: false,
  formSubmitError: null,

  isTourDetails: false,
  tourDetails: null,

  isTourStatusLoading: false,


  addTour: async (data) => {
    try {
      set({ addTourLoading: true })
      const response = await httpClient.post(
        `/${API_PREFIX.SUPER_ADMIN}/tour-package`,
        data
      )
      const resp = response?.data

      if (resp?.status === 'success') {
        const tourData = get().tourData || []
        set({ tourData: [resp.data, ...tourData] })
      }
      return resp
    } catch {
      set({
        addTourLoading: false,
      })
      return null
    } finally {
      set({ addTourLoading: false })
    }
  },

  updateTour: async (data) => {
    try {
      set({ updateTourLoading: true })
      const response = await httpClient.put(
        `/${API_PREFIX.SUPER_ADMIN}/tour-package/`,
        data
      )
      const resp = response?.data

      if (resp?.status === 'success') {
        set((state) => ({
          tourData: state.tourData.map((blog) =>
            blog.id === resp.id ? resp : blog
          ),
        }))
      }
      return resp
    } catch {
      set({
        formSubmitError: 'Something went wrong. Please try again later.',
        updateTourLoading: false,
      })
      return null
    } finally {
      set({ updateTourLoading: false })
    }
  },

  getTourList: async (queryParams) => {
    const { loadedPages } = get()
    if (loadedPages[queryParams.page]) return null

    try {
      set({ isTourLoading: true })
      const queryString = objectToQueryString(queryParams)
      const { data: resp } = await httpClient.get(
        `/${API_PREFIX.SUPER_ADMIN}/tour-package/list?${queryString}`
      )

      const updatedList =
        queryParams.page === 1
          ? resp.data?.data || []
          : get().tourData.concat(resp.data?.data || [])

      set((state) => ({
        tourData: updatedList,
        totalTransactionPages: Math.ceil(
          resp.data?.paginator?.itemCount / resp.data?.paginator?.perPage
        ),
        loadedPages: {
          ...state.loadedPages,
          [queryParams.page]: resp.data || [],
        },
        isTourLoading: false,
      }))
      return resp
    } catch (error) {
      set({ isTourLoading: false })
      return error
    }
  },


  updateTourStatus: async (data) => {
    try {
      set({ isTourStatusLoading: true })
      const response = await httpClient.put(
        `/${API_PREFIX.SUPER_ADMIN}/tour-package/status`,
        data
      )
      const resp = response?.data
      if (resp?.status === 'SUCCESS') {
        set((state) => ({
          tourData: state.tourData.map((blog) =>
            blog._id === resp._id ? resp : blog
          ),
        }))
      }
      return resp
    } catch {
      set({
        isTourStatusLoading: false,
      })
      return null
    } finally {
      set({ isTourStatusLoading: false })
    }
  },

  deleteTour: async (id: string) => {
    try {
      set({ isTourDeleteLoading: true, formSubmitError: null })

      const response = await httpClient.delete(
        `${API_PREFIX.SUPER_ADMIN}/tour-package?ids=${id}`
      )
      const resp = response.data
      if (resp?.status === 'SUCCESS') {
        set((state) => ({
          tourData: state.tourData.filter((code) => code?.id !== id),
        }))
      } else {
        toast.error(resp?.message)
      }

      return resp
    } catch (error) {
      const err = error as { response?: { data?: string } }
      set({
        formSubmitError: 'Failed to delete inventory item.',
        isTourDeleteLoading: false,
      })
      return err.response?.data ?? null
    } finally {
      set({ isTourDeleteLoading: false })
    }
  },

  getTourDetails: async (id: string) => {
    try {
      set({ isTourDetails: true })

      const response = await httpClient.get(
        `/${API_PREFIX.SUPER_ADMIN}/tour-package?id=${id}`
      )
      const resp = response.data.data

      set({ tourDetails: resp.tourPackage })
      set({ isTourDetails: false })
      return resp
    } catch (error) {
      const err = error as { response?: { data?: string } }
      set({
        isTourDetails: false,
      })
      return err.response?.data ?? null
    }
  },
}))
