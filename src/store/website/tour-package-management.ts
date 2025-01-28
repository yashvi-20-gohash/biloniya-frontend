import httpClient from '@/src/lib/http-client'
import { create } from 'zustand'


export type IResponseType = {
  status: boolean | string
  message: string
  data: Record<string, unknown> | null // Remove the array option if not expected
}


export interface ITourData {
  _id: string;
  duration: string;
  location: string;
  tourImage: string;
  tourImageUrl: string;
  tags: string[];
  description: string;
  title: string;

}

export type IStore = {
  isTourLoading: boolean
  tourData: ITourData[] | []
  getTourList: () => Promise<IResponseType | null>

}

export const userTourPackageStore = create<IStore>((set) => ({
  isTourLoading: false,
  tourData: [],


  getTourList: async () => {
    try {
      set({ isTourLoading: true })
      const { data: resp } = await httpClient.get(
        `/tour-package`
      )
      console.log("resp", resp);

      if (resp.status === 'SUCCESS') {
        set({
          tourData: resp?.data.service || [],
          isTourLoading: false
        })
      }

      return resp
    } catch (error) {
      set({ isTourLoading: false })
      return error
    }
  },

}))
