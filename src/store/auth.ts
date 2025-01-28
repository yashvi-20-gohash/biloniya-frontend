import axios from 'axios'
import { create } from 'zustand'
import httpClient from '../lib/http-client'
import { UserFormValue } from '../components/forms/user-auth-form'

export type IApiForgotPassword = {
  email: string
}
export type IResponseType = {
  status: boolean | string
  message: string
  data: Record<string, unknown> | null
}
export type IChangePasswordData = {
  currentPassword: string
  newPassword: string
}
export type ITwoFactorData = {
  twoFactor: boolean
}

export type IRegisterUser = {
  firstName: string
  lastName: string
  email: string
  password: string
}

export type IForgotPasswordOtp = {
  otp: string | number
  email: string
  token: string
  password: string
}
export type IResendOtp = { email: string | undefined }

export type IStore = {
  registerUserLoading: boolean
  registerUserData: IRegisterUser | null
  userVerifyData: IRegisterUser | null
  emailFormData: { email: string; token: string } | null
  apiForgotPasswordLoading: boolean
  apiTwoFactorLoading: boolean
  apiVerifyPasswordLoading: boolean
  verifyForgotPasswordData: IResponseType | null
  twoFactorData: IResponseType | null
  categoryDataError: string | null
  apiForgotPasswordOtpLoading: boolean
  apiForgotPasswordOtpData: IForgotPasswordOtp | null
  apiChangePasswordLoading: boolean
  verifyRegisterUserData: IRegisterUser | null
  verifyRegisterUserLoading: boolean
  userVerifyLoading: boolean
  apiUserAdminLoading: boolean
  // setCategoryData: (category: ICategoryInterface[] | null) => void;
  apiForgotPassword: (data: IApiForgotPassword) => Promise<IResponseType | null>
  apiSuperAdminSignin: (data: UserFormValue) => Promise<IResponseType | null>
  apiUserSignin: (data: UserFormValue) => Promise<IResponseType | null>
  apiRegisterUser: (data: IRegisterUser) => Promise<IResponseType | null>
  apiVerifForgotPassword: (token: string) => Promise<IResponseType | null>
  apiVerifRegisterUser: (token: string) => Promise<IResponseType | null>
  apiForgotPasswordOtp: (
    data: IForgotPasswordOtp
  ) => Promise<IResponseType | null>
  apiResendOtp: (email: string) => Promise<IResponseType | null>
  apiTwoFactorVerification: (
    data: ITwoFactorData
  ) => Promise<IResponseType | null>
  apiChangePassword: (
    data: IChangePasswordData
  ) => Promise<IResponseType | null>
  apiSuperAdminLoading: boolean
}

export const UserAuthStore = create<IStore>((set) => ({
  registerUserData: null,
  twoFactorData: null,
  registerUserLoading: false,
  apiForgotPasswordLoading: false,
  emailFormData: null,
  categoryDataError: null,
  userVerifyData: null,
  apiVerifyPasswordLoading: false,
  apiUserAdminLoading: false,
  userVerifyLoading: false,
  verifyForgotPasswordData: null,
  apiChangePasswordLoading: false,
  apiForgotPasswordOtpLoading: false,
  apiTwoFactorLoading: false,
  apiForgotPasswordOtpData: null,
  verifyRegisterUserLoading: false,
  verifyRegisterUserData: null,
  apiSuperAdminLoading: false,
  // Super admin signin
  apiSuperAdminSignin: async (data: UserFormValue): Promise<IResponseType> => {
    try {
      set({ apiSuperAdminLoading: true })
      const { data: resp } = await httpClient.post(`/super-admin-login`, data)
      set({
        verifyForgotPasswordData: resp?.data?.token ?? null,
        apiSuperAdminLoading: false,
      })
      return resp
    } catch (error) {
      set({ apiSuperAdminLoading: false })
      if (axios.isAxiosError(error)) {
        return (
          error.response?.data ?? {
            status: 'FAILURE',
            message: 'An error occurred',
            data: null,
          }
        )
      }
      return {
        status: 'FAILURE',
        message: 'An unknown error occurred',
        data: null,
      }
    }
  },
  apiUserSignin: async (data: UserFormValue): Promise<IResponseType> => {
    try {
      set({ apiUserAdminLoading: true })
      const { data: resp } = await httpClient.post(`/user-login`, data)
      set({
        twoFactorData: resp?.data?.twoFactor ?? null,
        apiUserAdminLoading: false,
      })
      return resp
    } catch (error) {
      set({ apiUserAdminLoading: false })
      if (axios.isAxiosError(error)) {
        return (
          error.response?.data ?? {
            status: 'FAILURE',
            message: 'An error occurred',
            data: null,
          }
        )
      }
      return {
        status: 'FAILURE',
        message: 'An unknown error occurred',
        data: null,
      }
    }
  },
  // Forgot Password
  apiForgotPassword: async (
    data: IApiForgotPassword
  ): Promise<IResponseType> => {
    try {
      set({ apiForgotPasswordLoading: true, emailFormData: null })
      const { data: resp } = await httpClient.post(`/forgot-password`, data)
      set({
        verifyForgotPasswordData: resp?.data?.token ?? null,
        apiForgotPasswordLoading: false,
      })
      return resp
    } catch (error) {
      set({ emailFormData: null, apiForgotPasswordLoading: false })
      if (axios.isAxiosError(error)) {
        return (
          error.response?.data ?? {
            status: 'FAILURE',
            message: 'An error occurred',
            data: null,
          }
        )
      }
      return {
        status: 'FAILURE',
        message: 'An unknown error occurred',
        data: null,
      }
    }
  },

  // Register User
  apiRegisterUser: async (data: IRegisterUser): Promise<IResponseType> => {
    try {
      set({ registerUserLoading: true, registerUserData: null })
      const { data: resp } = await httpClient.post(`/register`, data)
      set({
        registerUserData: resp?.data ?? null,
        verifyRegisterUserData: resp?.data ?? null,
        registerUserLoading: false,
      })
      return resp
    } catch (error) {
      set({ registerUserData: null, registerUserLoading: false })
      if (axios.isAxiosError(error)) {
        return (
          error.response?.data ?? {
            status: 'FAILURE',
            message: 'An error occurred',
            data: null,
          }
        )
      }
      return {
        status: 'FAILURE',
        message: 'An unknown error occurred',
        data: null,
      }
    }
  },

  // Verify Forgot Password
  apiVerifForgotPassword: async (token: string): Promise<IResponseType> => {
    try {
      set({
        apiVerifyPasswordLoading: true,
        verifyForgotPasswordData: null,
        emailFormData: null,
      })
      const { data: resp } = await httpClient.get(
        `/forgot-password?token=${token}`
      )
      set({
        emailFormData: resp?.data ?? null,
        verifyForgotPasswordData: resp?.data?.token ?? null,
        apiVerifyPasswordLoading: false,
      })
      return resp
    } catch (error) {
      set({
        verifyForgotPasswordData: null,
        apiVerifyPasswordLoading: false,
        emailFormData: null,
      })
      if (axios.isAxiosError(error)) {
        return (
          error.response?.data ?? {
            status: 'FAILURE',
            message: 'An error occurred',
            data: null,
          }
        )
      }
      return {
        status: 'FAILURE',
        message: 'An unknown error occurred',
        data: null,
      }
    }
  },

  // Verify Register User
  apiVerifRegisterUser: async (token: string): Promise<IResponseType> => {
    try {
      set({ userVerifyLoading: true, userVerifyData: null })
      const { data: resp } = await httpClient.get(`/register?token=${token}`)
      set({
        userVerifyData: resp.data ?? null,
        userVerifyLoading: false,
      })
      return resp
    } catch (error) {
      set({
        userVerifyData: null,
        userVerifyLoading: false,
      })

      // Handle AxiosError specifically
      if (axios.isAxiosError(error)) {
        return (
          error.response?.data ?? {
            status: 'FAILURE',
            message: 'An error occurred',
            data: null,
          }
        )
      }
      return {
        status: 'FAILURE',
        message: 'An unknown error occurred',
        data: null,
      }
    }
  },

  // Forgot Password OTP
  apiForgotPasswordOtp: async (
    data: IForgotPasswordOtp
  ): Promise<IResponseType> => {
    try {
      set({ apiForgotPasswordOtpLoading: true, apiForgotPasswordOtpData: null })
      const { data: resp } = await httpClient.put(`/forgot-password`, data)
      set({ apiForgotPasswordOtpLoading: false })
      return resp
    } catch (error) {
      set({ apiForgotPasswordOtpLoading: false })
      if (axios.isAxiosError(error)) {
        return (
          error.response?.data ?? {
            status: 'FAILURE',
            message: 'An error occurred',
            data: null,
          }
        )
      }
      return {
        status: 'FAILURE',
        message: 'An unknown error occurred',
        data: null,
      }
    }
  },
  // apiresendOtp
  apiResendOtp: async (email: string): Promise<IResponseType> => {
    try {
      const data = { email }
      const { data: resp } = await httpClient.post('/resend-otp', data)
      return resp
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return error.response?.data || 'An error occurred'
      }
      return {
        status: 'FAILURE',
        message: 'An unknown error occurred',
        data: null,
      }
    }
  },

  // change password
  apiChangePassword: async (
    data: IChangePasswordData
  ): Promise<IResponseType> => {
    try {
      set({ apiChangePasswordLoading: true })
      const { data: resp } = await httpClient.put(
        `/settings/change-password`,
        data
      )
      set({ apiChangePasswordLoading: false })
      return resp
    } catch (error) {
      set({ apiChangePasswordLoading: false })
      if (axios.isAxiosError(error)) {
        return (
          error.response?.data ?? {
            status: 'FAILURE',
            message: 'An error occurred',
            data: null,
          }
        )
      }
      return {
        status: 'FAILURE',
        message: 'An unknown error occurred',
        data: null,
      }
    }
  },
  apiTwoFactorVerification: async (
    data: ITwoFactorData
  ): Promise<IResponseType> => {
    try {
      set({ apiTwoFactorLoading: true })
      const { data: resp } = await httpClient.put(
        `/settings/enable-two-factor`,
        data
      )
      set({ apiTwoFactorLoading: false })
      return resp
    } catch (error) {
      set({ apiTwoFactorLoading: false })
      if (axios.isAxiosError(error)) {
        return (
          error.response?.data ?? {
            status: 'FAILURE',
            message: 'An error occurred',
            data: null,
          }
        )
      }
      return {
        status: 'FAILURE',
        message: 'An unknown error occurred',
        data: null,
      }
    }
  },
}))
