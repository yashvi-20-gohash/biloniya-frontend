import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '../../ui/dialog'
import { FormProvider, useForm } from 'react-hook-form'
import { TextField } from '../../ui/form/input'
import { zodResolver } from '@hookform/resolvers/zod'
import LoadingButton from '../../ui/loading-button'
import { Button } from '../../ui/button'
import { z } from 'zod'
import SingleUpload, { FileData } from '../../ui/form/single-upload'
import 'react-quill/dist/quill.snow.css'

import { useState } from 'react'
import { addGalleryModal, GallerylistType } from '@/src/schema/gallery-management'
import { SuperAdminGalleryStore } from '@/src/store/gallery-management '
import { toast } from 'sonner'


type GalleryFormValue = z.infer<typeof addGalleryModal>


const initialFileData: FileData = {
  galleryImage: null,
}

export const AddModel: React.FC<{
  openStatusDialog: boolean
  setOpenStatusDialog: React.Dispatch<React.SetStateAction<boolean>>
  addRow: (newRow: GallerylistType) => void
}> = ({ openStatusDialog, setOpenStatusDialog, addRow }) => {
  const { addGalleryLoading, addGallery } = SuperAdminGalleryStore()
  const [fileData, setFileData] = useState<FileData>(initialFileData)

  const defaultValues: GalleryFormValue = {
    title: '',
  }

  const formMethods = useForm<GalleryFormValue>({
    resolver: zodResolver(addGalleryModal),
    defaultValues,
  })

  const { control, handleSubmit, reset, } = formMethods

  const handleFileChange = (fileInfo: FileData['galleryImage']) => {
    if (fileInfo) {
      setFileData({ galleryImage: fileInfo })
    }
  }
  const onSubmit = async (data: GalleryFormValue) => {
    try {

      if (!fileData?.galleryImage) {
        toast.error('Please select a image')
        return
      }
      const formData = {
        ...data,
        image: fileData?.galleryImage?.filename ?? '',
      }
      const response = await addGallery(formData)
      if (response?.status === 'SUCCESS') {
        const addedData = response?.data?.lastData as GallerylistType
        if (addedData) {
          addRow(addedData)
        }
        reset()
        setFileData(initialFileData)
        closeStatusDialog()
      } else {
        console.error('Submission failed:', response?.message)
      }
    } catch (error) {
      console.error('Error submitting form:', error)
    }
  }

  const closeStatusDialog = () => {
    reset()
    setFileData(initialFileData)
    setOpenStatusDialog(false)
  }

  const handleKeyDown = (event: React.KeyboardEvent<HTMLFormElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault()
    }
  }


  return (
    <Dialog open={openStatusDialog} onOpenChange={closeStatusDialog}>
      <DialogContent className="w-full overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="font-bold">Add Gallery</DialogTitle>
        </DialogHeader>
        <FormProvider {...formMethods}>
          <form
            id="form"
            className="py-3"
            onSubmit={handleSubmit(onSubmit)}
            onKeyDown={handleKeyDown}
          >
            <div className="grid grid-cols-1 gap-5">
              <TextField name="title" control={control} label="Title" />

              <SingleUpload
                name="galleryImage"
                documentDetails={{
                  fileSize: 2048,
                  validFiles: ['jpg', 'jpeg', 'png'],
                }}
                fileData={fileData}
                setFileData={setFileData}
                onChange={handleFileChange}
                onRemove={() => setFileData(initialFileData)}
              />
            </div>



            <div className="flex justify-end gap-2 mt-10">
              <Button
                variant="outline"
                type="button"
                onClick={closeStatusDialog}
              >
                Close
              </Button>
              <LoadingButton
                type="submit"
                isLoading={addGalleryLoading}
                form="form"
              >
                Submit
              </LoadingButton>
            </div>
          </form>
        </FormProvider>
      </DialogContent>
    </Dialog>
  )
}
