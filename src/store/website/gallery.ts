import httpClient from '@/src/lib/http-client'
import { create } from 'zustand'


export type IResponseType = {
  status: boolean | string
  message: string
  data: Record<string, unknown> | null // Remove the array option if not expected
}


export interface Igallery {
  _id: string;
  title: string;
  image: string;
  imageUrl: string;
}



export type IStore = {
  isGalleryLoading: boolean
  galleryData: Igallery[] | []
  getGalleryList: () => Promise<IResponseType | null>

  isAllGalleryLoading: boolean
  allGalleryData: Igallery[] | []
  getGalleryAllList: () => Promise<IResponseType | null>

}

export const userGalleryListStore = create<IStore>((set) => ({
  isGalleryLoading: false,
  galleryData: [],
  isAllGalleryLoading: false,
  allGalleryData: [],

  getGalleryList: async () => {
    try {
      set({ isGalleryLoading: true })
      const { data: resp } = await httpClient.post(
        `/gallery`
      )
      console.log("resp", resp);

      if (resp.status === 'SUCCESS') {
        set({
          galleryData: resp?.data.gallery || [],
          isGalleryLoading: false
        })
      } else {
        set({
          galleryData: [],
          isGalleryLoading: false
        })
      }

      return resp
    } catch (error) {
      set({ isGalleryLoading: false })
      return error
    }
  },

  getGalleryAllList: async () => {
    try {
      set({ isAllGalleryLoading: true })
      const { data: resp } = await httpClient.get(
        `/gallery`
      )
      console.log("resp", resp);

      if (resp.status === 'SUCCESS') {
        set({
          allGalleryData: resp?.data.gallery || [],
          isAllGalleryLoading: false
        })
      } else {
        set({
          allGalleryData: [],
          isAllGalleryLoading: false
        })
      }

      return resp
    } catch (error) {
      set({ isAllGalleryLoading: false })
      return error
    }
  },

}))
