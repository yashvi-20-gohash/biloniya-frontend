
import { API_PREFIX } from '@/src/constants/appConstants'
import httpClient from '@/src/lib/http-client'
import { objectToQueryString } from '@/src/lib/utils'
import { toast } from 'sonner'
import { create } from 'zustand'
import { ServicelistType } from '../schema/service-management'

export type IResponseType = {
  status: boolean | string
  message: string
  data: Record<string, unknown> | null // Remove the array option if not expected
}

export type ServiceResponse = {
  data: ServicelistType[]
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
  addServiceLoading: boolean
  addService: (data: object) => Promise<IResponseType | null>

  updateServiceLoading: boolean
  updateService: (data: object) => Promise<IResponseType | null>

  isServiceLoading: boolean
  serviceData: ServicelistType[] | []
  getServiceList: (queryParams: IQueryParams) => Promise<IResponseType | null>

  setTotalTransactionPages: (totalPages: number) => void
  pagination: { pageIndex: number; pageSize: number }
  setPagination: (pagination: { pageIndex: number; pageSize: number }) => void
  totalTransactionPages: number
  loadedPages: Record<number, []>

  deleteService: (id: string) => Promise<IResponseType | null>
  isServiceBlog: boolean
  formSubmitError: string | null

  getServiceDetails: (id: string) => Promise<IResponseType | null>
  isServiceDetails: boolean
  serviceDetails: ServicelistType | null

  updateServiceStatus: (data: IUpdateStatus) => Promise<IResponseType | null>
  isServiceStatusLoading: boolean
}

export const SuperAdminServiceManagementStore = create<IStore>((set, get) => ({
  addServiceLoading: false,
  updateServiceLoading: false,

  isServiceLoading: false,
  serviceData: [],
  loadedPages: {},
  totalTransactionPages: 1,

  pagination: { pageIndex: 0, pageSize: 10 },
  setPagination: (pagination) => set({ pagination }),
  setTotalTransactionPages: (totalTransactionPages: number) =>
    set({ totalTransactionPages }),

  isServiceBlog: false,
  formSubmitError: null,

  isServiceDetails: false,
  serviceDetails: null,

  isServiceStatusLoading: false,


  addService: async (data) => {
    try {
      set({ addServiceLoading: true })
      const response = await httpClient.post(
        `/${API_PREFIX.SUPER_ADMIN}/services`,
        data
      )
      const resp = response?.data

      if (resp?.status === 'success') {
        const serviceData = get().serviceData || []
        set({ serviceData: [resp.data, ...serviceData] })
      }
      return resp
    } catch {
      set({
        addServiceLoading: false,
      })
      return null
    } finally {
      set({ addServiceLoading: false })
    }
  },

  updateService: async (data) => {
    try {
      set({ updateServiceLoading: true })
      const response = await httpClient.put(
        `/${API_PREFIX.SUPER_ADMIN}/services/`,
        data
      )
      const resp = response?.data

      if (resp?.status === 'success') {
        set((state) => ({
          serviceData: state.serviceData.map((blog) =>
            blog.id === resp.id ? resp : blog
          ),
        }))
      }
      return resp
    } catch {
      set({
        formSubmitError: 'Something went wrong. Please try again later.',
        updateServiceLoading: false,
      })
      return null
    } finally {
      set({ updateServiceLoading: false })
    }
  },

  getServiceList: async (queryParams) => {
    const { loadedPages } = get()
    if (loadedPages[queryParams.page]) return null

    try {
      set({ isServiceLoading: true })
      const queryString = objectToQueryString(queryParams)
      const { data: resp } = await httpClient.get(
        `/${API_PREFIX.SUPER_ADMIN}/services/list?${queryString}`
      )

      const updatedList =
        queryParams.page === 1
          ? resp.data?.data || []
          : get().serviceData.concat(resp.data?.data || [])

      set((state) => ({
        serviceData: updatedList,
        totalTransactionPages: Math.ceil(
          resp.data?.paginator?.itemCount / resp.data?.paginator?.perPage
        ),
        loadedPages: {
          ...state.loadedPages,
          [queryParams.page]: resp.data || [],
        },
        isServiceLoading: false,
      }))
      return resp
    } catch (error) {
      set({ isServiceLoading: false })
      return error
    }
  },


  updateServiceStatus: async (data) => {
    try {
      set({ isServiceStatusLoading: true })
      const response = await httpClient.put(
        `/${API_PREFIX.SUPER_ADMIN}/services/status`,
        data
      )
      const resp = response?.data
      if (resp?.status === 'SUCCESS') {
        set((state) => ({
          serviceData: state.serviceData.map((blog) =>
            blog._id === resp._id ? resp : blog
          ),
        }))
      }
      return resp
    } catch {
      set({
        isServiceStatusLoading: false,
      })
      return null
    } finally {
      set({ isServiceStatusLoading: false })
    }
  },

  deleteService: async (id: string) => {
    try {
      set({ isServiceBlog: true, formSubmitError: null })

      const response = await httpClient.delete(
        `${API_PREFIX.SUPER_ADMIN}/services?ids=${id}`
      )
      const resp = response.data
      if (resp?.status === 'SUCCESS') {
        set((state) => ({
          serviceData: state.serviceData.filter((code) => code?.id !== id),
        }))
      } else {
        toast.error(resp?.message)
      }

      return resp
    } catch (error) {
      const err = error as { response?: { data?: string } }
      set({
        formSubmitError: 'Failed to delete inventory item.',
        isServiceBlog: false,
      })
      return err.response?.data ?? null
    } finally {
      set({ isServiceBlog: false })
    }
  },

  getServiceDetails: async (id: string) => {
    try {
      set({ isServiceDetails: true })

      const response = await httpClient.get(
        `/${API_PREFIX.SUPER_ADMIN}/services?id=${id}`
      )
      const resp = response.data.data

      set({ serviceDetails: resp.service })
      set({ isServiceDetails: false })
      return resp
    } catch (error) {
      const err = error as { response?: { data?: string } }
      set({
        isServiceDetails: false,
      })
      return err.response?.data ?? null
    }
  },
}))
