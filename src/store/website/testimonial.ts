import httpClient from '@/src/lib/http-client'
import { create } from 'zustand'


export type IResponseType = {
  status: boolean | string
  message: string
  data: Record<string, unknown> | null // Remove the array option if not expected
}


export interface ItestimonialData {
  _id: string;
  name: string;
  type: string;
  image: string;
  countryName: string;
  description: string;
  rating: number;
  imageUrl: string;
  createdAt: string;

}


export type IStore = {
  isTestimonialLoading: boolean
  testimonialData: ItestimonialData[] | []
  getTestimonialList: (type: string) => Promise<IResponseType | null>

}

export const userTestimonialStore = create<IStore>((set) => ({
  isTestimonialLoading: false,
  testimonialData: [],


  getTestimonialList: async (type) => {
    try {
      set({ isTestimonialLoading: true })
      const { data: resp } = await httpClient.get(
        `/testimonial?type=${type}`
      )
      console.log("resp", resp);

      if (resp.status === 'SUCCESS') {
        set({
          testimonialData: resp?.data.testimonial || [],
          isTestimonialLoading: false
        })
      } else {
        set({
          testimonialData: [],
          isTestimonialLoading: false
        })
      }

      return resp
    } catch (error) {
      set({ isTestimonialLoading: false, testimonialData: [] })
      return error
    }
  },

}))
