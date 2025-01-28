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
import { useEffect, useState } from 'react'
import { MultiSelect } from '../../ui/form/multiselect'
import 'react-quill/dist/quill.snow.css'


import { TextAreaField } from '../../ui/form/textarea'
import { addTourSchema, TourListType } from '@/src/schema/tour-package-management'
import { SuperAdminTourStore } from '@/src/store/tour-package-management'
import { toast } from 'sonner'



type TourFormValue = z.infer<typeof addTourSchema>

const options = [
  { label: 'KST Service', value: 'kSTService' },
  { label: 'Housekeeping Service', value: 'housekeepingService' },
  { label: 'Bell Boy', value: 'bellBoy' },
  { label: 'Glass Cleaning', value: 'glassCleaning' },
  { label: 'Valet Drivers', value: 'valetDrivers' },
  { label: 'Bouncers', value: 'bouncers' },
  { label: 'Darban', value: 'darban' },
  { label: 'Security', value: 'security' },
  { label: 'Wedding Events', value: 'weddingEvents' },
  { label: 'Corporate Events', value: 'corporateEvents' },
  { label: 'City & Local Package', value: 'city&LocalPackage' },
  { label: 'Out Station Trip', value: 'outStationTrip' },
  { label: 'Airport Transfer', value: 'airportTransfer' },
]

const initialFileData: FileData = {
  tourImage: null,
}


export const EditModel: React.FC<{
  openStatusDialog: boolean
  setOpenStatusDialog: React.Dispatch<React.SetStateAction<boolean>>
  updateRow: (id: string, data: TourListType) => void
}> = ({ openStatusDialog, setOpenStatusDialog, updateRow }) => {

  const { updateTourLoading, updateTour, tourDetails } = SuperAdminTourStore()

  const [selectedTag, setSelectedValues] = useState<string[]>([])
  const [fileData, setFileData] = useState<FileData>(initialFileData)


  const defaultValues: TourFormValue = {
    title: '',
    duration: '',
    location: '',
    description: '',
    tags: [],
  }

  const formMethods = useForm<TourFormValue>({
    resolver: zodResolver(addTourSchema),
    defaultValues,
  })


  useEffect(() => {
    if (tourDetails) {
      setValue('title', tourDetails.title || '')
      setValue('duration', tourDetails.duration || '')
      setValue('location', tourDetails.location || '')
      setSelectedValues(tourDetails.tags || [])
      setValue('description', tourDetails.description || '')
      setFileData({
        tourImage: {
          url: tourDetails?.tourImageUrl || '',
          filename: tourDetails?.tourImage ?? '',
          alt: tourDetails?.tourImage,
          type: tourDetails?.tourImage.split('.').pop() || '',
        },
      })
    }
  }, [tourDetails])

  const { control, handleSubmit, reset, setValue } = formMethods

  const handleFileChange = (fileInfo: FileData['tourImage']) => {
    if (fileInfo) {
      setFileData({ tourImage: fileInfo })
    }
  }
  const onSubmit = async (data: TourFormValue) => {
    try {
      if (!fileData?.tourImage) {
        toast.error('Please select a image')
        return
      }
      const id = tourDetails?._id ?? ''
      const formData = {
        ...data,
        id: id,
        tags: selectedTag,
        tourImage: fileData?.tourImage?.filename,
      }
      const response = await updateTour(formData)
      if (response?.status === 'SUCCESS') {
        const updatedData = response?.data?.lastData as TourListType
        if (updatedData) {
          updateRow(id, updatedData)
        }
        SuperAdminTourStore.setState({
          tourDetails: null,
        })
        formMethods.reset()

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
          <DialogTitle className="font-bold">Edit Tour Package</DialogTitle>
        </DialogHeader>
        <FormProvider {...formMethods}>
          <form
            id="blog-form"
            className="py-3"
            onSubmit={handleSubmit(onSubmit)}
            onKeyDown={handleKeyDown}
          >
            <div className="grid grid-cols-2 gap-5">
              <TextField name="title" control={control} label="Title" />
              <TextField name="duration" control={control} label="Duration" />

              <TextField
                name="location"
                control={control}
                label="Location"
              />

              <SingleUpload
                name="tourImage"
                documentDetails={{
                  fileSize: 2048,
                  validFiles: ['jpg', 'jpeg', 'png'],
                }}
                fileData={fileData}
                setFileData={setFileData}
                onChange={handleFileChange}
                onRemove={() => setFileData(initialFileData)}
              />

              <MultiSelect
                options={options}
                onValueChange={setSelectedValues}
                defaultValue={selectedTag ?? []}
                placeholder="Choose options"
                maxCount={3}
                animation={0.3}
                variant="default"
                modalPopover={false}
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
                isLoading={updateTourLoading}
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
