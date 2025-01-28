
import { API_PREFIX } from '@/src/constants/appConstants'
import httpClient from '@/src/lib/http-client'
import { create } from 'zustand'
import { ContactUsListType } from '../schema/contact'


export type IResponseType = {
    status: boolean | string
    message: string
    data: Record<string, unknown> | null // Remove the array option if not expected
}




export type IContactUsList = {
    topContactList: ContactUsListType[]
}

export interface IQueryParams {
    limit: number
    page: number
    search?: string
    [key: string]: unknown
}

export interface IContactUs {
    id: string
    replyMessage: string
}


interface DashboardData {
    totalContactUsCount: number;
    totalBlogCount: number;
    topContactList: ContactUsListType[];
}

export type IStore = {
    dashboardLoading: boolean
    contactDashboardListData: DashboardData | null
    getDashboard: () => Promise<IResponseType | null>
    loadedPages: Record<number, []>
}

export const SuperAdminDashboardStore = create<IStore>((set) => ({
    dashboardLoading: false,
    contactDashboardListData: null,
    loadedPages: {},

    getDashboard: async () => {
        try {
            set({ dashboardLoading: true })
            const { data: resp } = await httpClient.post(
                `/${API_PREFIX.SUPER_ADMIN}/dashboard`
            )
            set({
                contactDashboardListData: resp.data,
                dashboardLoading: false,
            })
            return resp
        } catch (error) {
            set({ dashboardLoading: false })
            return error
        }
    },
}))
