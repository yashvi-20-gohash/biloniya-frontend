import httpClient from '@/src/lib/http-client'
import { create } from 'zustand'


export type IResponseType = {
  status: boolean | string
  message: string
  data: Record<string, unknown> | null // Remove the array option if not expected
}


export interface ItourexpErienceData {
  _id: string;
  duration: string;
  location: string;
  serviceImage: string;
  serviceImageUrl: string;
  serviceType: string;
  tags: string[];
  description: string;
  title: string;

}



export type IStore = {
  isTourexpErienceLoading: boolean
  tourexpErienceData: ItourexpErienceData[] | []
  getTourexpErienceList: () => Promise<IResponseType | null>

}

export const userTourexpErienceStore = create<IStore>((set) => ({
  isTourexpErienceLoading: false,
  tourexpErienceData: [],


  getTourexpErienceList: async () => {
    try {
      set({ isTourexpErienceLoading: true })
      const { data: resp } = await httpClient.get(
        `/services?serviceType=travels`
      )
      console.log("resp", resp);

      if (resp.status === 'SUCCESS') {
        set({
          tourexpErienceData: resp?.data.service || [],
          isTourexpErienceLoading: false
        })
      } else {
        set({
          tourexpErienceData: [],
          isTourexpErienceLoading: false
        })
      }

      return resp
    } catch (error) {
      set({ isTourexpErienceLoading: false, tourexpErienceData: [] })
      return error
    }
  },

}))
