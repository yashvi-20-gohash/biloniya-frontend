import httpClient from '@/src/lib/http-client'
import { create } from 'zustand'


export type IResponseType = {
  status: boolean | string
  message: string
  data: Record<string, unknown> | null // Remove the array option if not expected
}


export interface IserviceData {
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
  isServiceLoading: boolean
  serviceData: IserviceData[] | []
  getServiceList: (serviceType: string) => Promise<IResponseType | null>

}

export const userServiceStore = create<IStore>((set) => ({
  isServiceLoading: false,
  serviceData: [],


  getServiceList: async (serviceType) => {
    try {
      set({ isServiceLoading: true })
      const { data: resp } = await httpClient.get(
        `/services?serviceType=${serviceType}`
      )
      console.log("resp", resp);

      if (resp.status === 'SUCCESS') {
        set({
          serviceData: resp?.data.service || [],
          isServiceLoading: false
        })
      } else {
        set({
          serviceData: [],
          isServiceLoading: false
        })
      }

      return resp
    } catch (error) {
      set({ isServiceLoading: false, serviceData: [] })
      return error
    }
  },

}))
