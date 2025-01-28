'use client'
import axios from 'axios'
import { listRoutes } from './list-routs'
import { toast } from 'sonner'
import useCommonStore from '../store/common'
export const __LOGIN_SESSION__: string = '__LOGIN_SESSION__'
export const getTokens = (): { token: string | null } => {
  if (typeof window !== 'undefined') {
    const userSession: string | null = localStorage.getItem(__LOGIN_SESSION__)
    if (!userSession) {
      return { token: null }
    }
    try {
      const { token_detail } = JSON.parse(userSession)
      return { token: token_detail }
    } catch (error) {
      console.error('Error parsing user session:', error)
      return { token: null }
    }
  }
  return { token: null }
}
export const getAuthHeader = async (): Promise<string | null> => {
  const { token } = getTokens()
  if (!token) {
    return null
  }
  return `Token ${token}`
}
const httpClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
})
httpClient.interceptors.request.use(
  async (request) => {
    const authHeader = await getAuthHeader()
    if (authHeader) {
      request.headers.Authorization = authHeader
    }
    return request
  },
  (error) => {
    return Promise.reject(error)
  }
)
httpClient.interceptors.response.use(
  (res) => {
    const url = res.config?.url
    if (!url) {
      console.error('Response config URL is not defined:', res)
      return res
    }

    const isMatch = listRoutes.some((pattern) => pattern?.test(url))
    if (!isMatch) {
      if (res.data.status === 'SUCCESS') {
        toast.success(res.data.message)
      } else if (res.data.status === 'FAILURE') {
        toast.error(res.data.message)
      } else if (res.data.status === 'RECORD_NOT_FOUND') {
        toast.error(res.data.message)
      }
    }

    return res
  },
  async (error) => {
    if (error.response) {
      toast.error(error.response.data.message)
    }

    if (error.response && error.response.data.status === 'UNAUTHORIZED') {
      useCommonStore.setState({
        unAuthoriseSession: true,
      })

      return Promise.reject(error)
    }
    return Promise.reject(error)
  }
  // async (error) => {
  //   if (error.response) {
  //     if (error.response.status === 403 && typeof window !== 'undefined') {
  //       console.error('Unauthorized!')
  //       localStorage.clear()
  //       window.location.href = '/'
  //     }
  //   } else {
  //     console.error('Error response not available', error)
  //   }
  //   return Promise.reject(error)
  // }
)
export default httpClient
