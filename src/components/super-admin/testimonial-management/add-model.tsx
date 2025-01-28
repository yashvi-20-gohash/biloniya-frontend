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
import { Autocomplete } from '../../ui/form/autocomplete'
import SingleUpload, { FileData } from '../../ui/form/single-upload'
import { useState } from 'react'
import 'react-quill/dist/quill.snow.css'
import { TextAreaField } from '../../ui/form/textarea'
import { addTestimonialSchema, TestimonialLisType } from '@/src/schema/testimonial-management'
import { SuperAdminTestimonialManagementStore } from '@/src/store/testimonial-management'



type TestimonialFormValue = z.infer<typeof addTestimonialSchema>

const typeOptions = [
  { value: 'google', name: 'Google' },
  { value: 'facebook', name: 'Facebook' },
  { value: 'tripadvisor', name: 'Tripadvisor' },
]

const initialFileData: FileData = {
  image: null,
}

export const AddModel: React.FC<{
  openStatusDialog: boolean
  setOpenStatusDialog: React.Dispatch<React.SetStateAction<boolean>>
  addRow: (newRow: TestimonialLisType) => void
}> = ({ openStatusDialog, setOpenStatusDialog, addRow }) => {

  const { addTestimonialLoading, addTestimonial } = SuperAdminTestimonialManagementStore()

  const [fileData, setFileData] = useState<FileData>(initialFileData)


  const defaultValues: TestimonialFormValue = {
    name: '',
    countryName: '',
    rating: '',
    type: null,
    description: '',
  }

  const formMethods = useForm<TestimonialFormValue>({
    resolver: zodResolver(addTestimonialSchema),
    defaultValues,
  })

  const { control, handleSubmit, reset, } = formMethods



  const handleFileChange = (fileInfo: FileData['image']) => {
    if (fileInfo) {
      setFileData({ image: fileInfo })
    }
  }
  const onSubmit = async (data: TestimonialFormValue) => {

    try {
      const formData = {
        ...data,
        type: data?.type?.value,
        image: fileData?.image?.filename,
      }
      const response = await addTestimonial(formData)
      if (response?.status === 'SUCCESS') {
        const addedData = response?.data?.lastData as TestimonialLisType
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
      <DialogContent className="sm:max-w-[1000px] h-[90%] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="font-bold">Add Testimonial</DialogTitle>
        </DialogHeader>
        <FormProvider {...formMethods}>
          <form
            id="blog-form"
            className="py-3"
            onSubmit={handleSubmit(onSubmit)}
            onKeyDown={handleKeyDown}
          >
            <div className="grid grid-cols-2 gap-5">
              <TextField name="name" control={control} label="Name" />
              <TextField name="countryName" control={control} label="Country Name" />

              <TextField
                name="rating"
                control={control}
                label="Rating"
              />

              <Autocomplete
                name="type"
                control={control}
                label="Select Service Type"
                options={typeOptions}
              />

              <SingleUpload
                name="image"
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

            <div className="mt-5">
              <TextAreaField
                name="description"
                control={control}
                label="Description"
              />
            </div>

            <div className="flex justify-center gap-2 mt-16">
              <Button
                variant="outline"
                type="button"
                onClick={closeStatusDialog}
              >
                Close
              </Button>
              <LoadingButton
                type="submit"
                isLoading={addTestimonialLoading}
                form="blog-form"
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
