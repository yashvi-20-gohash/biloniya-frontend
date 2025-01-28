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
import { MultiSelect } from '../../ui/form/multiselect'
import 'react-quill/dist/quill.snow.css'


import { addServiceModal, ServicelistType } from '@/src/schema/service-management'
import { SuperAdminServiceManagementStore } from '@/src/store/service-management'
import { TextAreaField } from '../../ui/form/textarea'
import { toast } from 'sonner'



type ServiceFormValue = z.infer<typeof addServiceModal>

const serviceTypeOptions = [
  { value: 'security', name: 'Security' },
  { value: 'travels', name: 'Travels' },
  { value: 'hotels', name: 'Hotels' },
]
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
  serviceImage: null,
}

export const AddModel: React.FC<{
  openStatusDialog: boolean
  setOpenStatusDialog: React.Dispatch<React.SetStateAction<boolean>>
  addRow: (newRow: ServicelistType) => void
}> = ({ openStatusDialog, setOpenStatusDialog, addRow }) => {
  const { addServiceLoading, addService } = SuperAdminServiceManagementStore()

  const [selectedTag, setSelectedValues] = useState<string[]>([])
  const [fileData, setFileData] = useState<FileData>(initialFileData)


  const defaultValues: ServiceFormValue = {
    title: '',
    duration: '',
    location: '',
    serviceType: null,
    description: '',
    tags: [],
  }

  const formMethods = useForm<ServiceFormValue>({
    resolver: zodResolver(addServiceModal),
    defaultValues,
  })

  const { control, handleSubmit, reset, } = formMethods



  const handleFileChange = (fileInfo: FileData['serviceImage']) => {
    if (fileInfo) {
      setFileData({ serviceImage: fileInfo })
    }
  }
  const onSubmit = async (data: ServiceFormValue) => {

    try {
      if (!fileData?.serviceImage) {
        toast.error('Please select a image')
        return
      }
      const formData = {
        ...data,
        tags: selectedTag,
        serviceType: data?.serviceType?.value,
        serviceImage: fileData?.serviceImage?.filename,
      }
      const response = await addService(formData)
      if (response?.status === 'SUCCESS') {
        const addedData = response?.data?.lastData as ServicelistType
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
          <DialogTitle className="font-bold">Add Service</DialogTitle>
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

              <Autocomplete
                name="serviceType"
                control={control}
                label="Select Service Type"
                options={serviceTypeOptions}
              />

              <SingleUpload
                name="serviceImage"
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
                defaultValue={[]}
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
                isLoading={addServiceLoading}
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
