
import { API_PREFIX } from '@/src/constants/appConstants'
import httpClient from '@/src/lib/http-client'
import { objectToQueryString } from '@/src/lib/utils'
import { toast } from 'sonner'
import { create } from 'zustand'
import { GallerylistType } from '../schema/gallery-management'


export type IResponseType = {
  status: boolean | string
  message: string
  data: Record<string, unknown> | null // Remove the array option if not expected
}

export type GalleryResponse = {
  data: GallerylistType[]
  paginator: {
    itemCount: number
    pageCount: number
  }
}

export type IUpdateStatus = {
  id: string[]
  isActive: boolean
}

export type IaddGallery = {
  title: string,
  image: string
}

export interface IQueryParams {
  limit: number
  page: number
  search?: string
  [key: string]: unknown
}


export type IStore = {
  addGalleryLoading: boolean
  addGallery: (data: IaddGallery) => Promise<IResponseType | null>


  isGalleryLoading: boolean
  galleryData: GallerylistType[] | []
  getGalleryList: (queryParams: IQueryParams) => Promise<IResponseType | null>

  setTotalTransactionPages: (totalPages: number) => void
  pagination: { pageIndex: number; pageSize: number }
  setPagination: (pagination: { pageIndex: number; pageSize: number }) => void
  totalTransactionPages: number
  loadedPages: Record<number, []>

  deleteGallery: (id: string) => Promise<IResponseType | null>
  isDeletingGallery: boolean
  formSubmitError: string | null

  updateGalleryStatus: (data: IUpdateStatus) => Promise<IResponseType | null>
  isGalleryStatusLoading: boolean
}

export const SuperAdminGalleryStore = create<IStore>((set, get) => ({
  addGalleryLoading: false,

  isGalleryLoading: false,
  galleryData: [],

  loadedPages: {},
  totalTransactionPages: 1,

  pagination: { pageIndex: 0, pageSize: 10 },
  setPagination: (pagination) => set({ pagination }),
  setTotalTransactionPages: (totalTransactionPages: number) =>
    set({ totalTransactionPages }),

  isDeletingGallery: false,
  formSubmitError: null,

  isGalleryStatusLoading: false,


  addGallery: async (data) => {
    try {
      set({ addGalleryLoading: true })
      const response = await httpClient.post(
        `/${API_PREFIX.SUPER_ADMIN}/gallery`,
        data
      )
      const resp = response?.data
      return resp
    } catch {
      set({
        addGalleryLoading: false,
      })
      return null
    } finally {
      set({ addGalleryLoading: false })
    }
  },


  getGalleryList: async (queryParams) => {
    const { loadedPages } = get()
    if (loadedPages[queryParams.page]) return null

    try {
      set({ isGalleryLoading: true })
      const queryString = objectToQueryString(queryParams)
      const { data: resp } = await httpClient.get(
        `/${API_PREFIX.SUPER_ADMIN}/gallery/list?${queryString}`
      )

      const updatedList =
        queryParams.page === 1
          ? resp.data?.data || []
          : get().galleryData.concat(resp.data?.data || [])

      set((state) => ({
        galleryData: updatedList,
        totalTransactionPages: Math.ceil(
          resp.data?.paginator?.itemCount / resp.data?.paginator?.perPage
        ),
        loadedPages: {
          ...state.loadedPages,
          [queryParams.page]: resp.data || [],
        },
        isGalleryLoading: false,
      }))
      return resp
    } catch (error) {
      set({ isGalleryLoading: false })
      return error
    }
  },

  updateGalleryStatus: async (data) => {
    try {
      set({ isGalleryStatusLoading: true })
      const response = await httpClient.put(
        `/${API_PREFIX.SUPER_ADMIN}/gallery/status`,
        data
      )
      const resp = response?.data
      if (resp?.status === 'SUCCESS') {
        set((state) => ({
          galleryData: state.galleryData.map((blog) =>
            blog._id === resp._id ? resp : blog
          ),
        }))
      }
      return resp
    } catch {
      set({
        isGalleryStatusLoading: false,
      })
      return null
    } finally {
      set({ isGalleryStatusLoading: false })
    }
  },

  deleteGallery: async (id: string) => {
    try {
      set({ isDeletingGallery: true, formSubmitError: null })

      const response = await httpClient.delete(
        `${API_PREFIX.SUPER_ADMIN}/gallery?ids=${id}`
      )
      const resp = response.data
      if (resp?.status === 'SUCCESS') {
        set((state) => ({
          galleryData: state.galleryData.filter((code) => code?.id !== id),
        }))
      } else {
        toast.error(resp?.message)
      }

      return resp
    } catch (error) {
      const err = error as { response?: { data?: string } }
      set({
        formSubmitError: 'Failed to delete inventory item.',
        isDeletingGallery: false,
      })
      return err.response?.data ?? null
    } finally {
      set({ isDeletingGallery: false })
    }
  },

}))
