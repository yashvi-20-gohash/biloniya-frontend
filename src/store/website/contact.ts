

import { ContactUsFormValue } from '@/src/components/website/comman/contact-us'
import httpClient from '@/src/lib/http-client'
import { create } from 'zustand'


export type IResponseType = {
    status: boolean | string
    message: string
    data: Record<string, unknown> | null // Remove the array option if not expected
}

export type IStore = {
    addContactLoading: boolean
    addContact: (data: ContactUsFormValue) => Promise<IResponseType | null>

}

export const useContactUsStore = create<IStore>((set) => ({
    addContactLoading: false,

    addContact: async (data) => {
        try {
            set({ addContactLoading: true })
            const response = await httpClient.post(
                `/contact-us`,
                data
            )
            const resp = response?.data
            return resp
        } catch {
            set({
                addContactLoading: false,
            })
            return null
        } finally {
            set({ addContactLoading: false })
        }
    },

}))
