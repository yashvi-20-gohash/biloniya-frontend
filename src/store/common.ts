// src/store/common.ts
import create from 'zustand'
import axios from 'axios'

interface UploadResponse {
  data: {
    responses: Array<{
      imageUrl: string
      filename: string
      Key: string
    }>
  }
  status: string
  message: string
}

interface CommonState {
  unAuthoriseSession: boolean
  isFileLoading: boolean
  uploadProgress: number
  uploadFile: (file: File, type: number) => Promise<UploadResponse | null>
  resetUpload: () => void
}

const useCommonStore = create<CommonState>((set) => ({
  isFileLoading: false,
  unAuthoriseSession: false,

  uploadProgress: 0,
  uploadFile: async (file, type) => {
    set({ isFileLoading: true, uploadProgress: 0 })

    const formData = new FormData()
    formData.append('file', file)
    formData.append('type', type.toString())

    try {
      const response = await axios.post<UploadResponse>(
        '/api/documents',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          onUploadProgress: (progressEvent) => {
            const percentCompleted = Math.round(
              (progressEvent.loaded * 100) / (progressEvent.total || 1)
            )
            set({ uploadProgress: percentCompleted })
          },
        }
      )
      set({ isFileLoading: false, uploadProgress: 100 })
      return response.data
    } catch (error) {
      console.error('File upload error:', error)
      set({ isFileLoading: false, uploadProgress: 0 })
      return null
    }
  },
  resetUpload: () => set({ isFileLoading: false, uploadProgress: 0 }),
}))

export default useCommonStore
