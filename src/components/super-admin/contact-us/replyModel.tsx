import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from '../../ui/dialog'
import { FormProvider, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import LoadingButton from '../../ui/loading-button'
import { Button } from '../../ui/button'
import { z } from 'zod'
import { useEffect, useMemo } from 'react'
import 'react-quill/dist/quill.snow.css'
import dynamic from 'next/dynamic'

import { ContactUsListType, ContactUsReplySchema } from '@/src/schema/contact'
import { SuperAdminContactListStore } from '@/src/store/contact-list'

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false })

type ContactUsReplyFormValue = z.infer<typeof ContactUsReplySchema>

export const ContactUsReplyModal: React.FC<{
    openStatusDialog: boolean
    setOpenStatusDialog: React.Dispatch<React.SetStateAction<boolean>>
    updateRow: (id: string, data: ContactUsListType) => void
}> = ({ openStatusDialog, setOpenStatusDialog, updateRow }) => {


    const { contactUsReplyLoading, contactUsReply, contactUsdetailsData } = SuperAdminContactListStore()

    const defaultValues: ContactUsReplyFormValue = {
        replyMessage: '',
    }

    const formMethods = useForm<ContactUsReplyFormValue>({
        resolver: zodResolver(ContactUsReplySchema),
        defaultValues,
    })

    const { handleSubmit, reset, setValue, watch } = formMethods

    const replyMessage = watch('replyMessage')

    const handleTextEditorChange = (value: string) => {
        setValue('replyMessage', value, {
            shouldValidate: true,
            shouldDirty: true,
        })
    }
    useEffect(() => {
        if (contactUsdetailsData) {
            setValue('replyMessage', contactUsdetailsData?.replyMessage || '')
        }
    }, [contactUsdetailsData])


    console.log("contactUsdetailsData", contactUsdetailsData);


    const onSubmit = async (data: ContactUsReplyFormValue) => {
        const id = contactUsdetailsData?._id || ''
        const formData = {
            ...data,
            id: id
        }
        const response = await contactUsReply(formData)

        if (response?.status === 'SUCCESS') {
            const updatedData = response?.data?.lastData as ContactUsListType
            if (updatedData) {
                updateRow(id, updatedData)
            }
            formMethods.reset()
            closeStatusDialog()
        } else {
            console.error('Update failed:', response?.message)
        }
    }




    const closeStatusDialog = () => {
        reset()
        setOpenStatusDialog(false)
    }

    const modules = useMemo(
        () => ({
            toolbar: {
                container: [
                    [{ header: [1, 2, false] }],
                    ['bold', 'italic', 'underline', 'strike'],
                    ['link', 'blockquote', 'code-block'],
                    [{ list: 'ordered' }, { list: 'bullet' }],
                    ['clean'],
                ],
            },
        }),
        []
    )



    return (
        <Dialog open={openStatusDialog} onOpenChange={closeStatusDialog}>
            <DialogContent className="sm:max-w-[1000px] max-h-[90%] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle className="font-bold">Reply Message</DialogTitle>
                </DialogHeader>


                <div>
                    <p><span className='font-semibold'>Message</span>: {contactUsdetailsData?.message}</p>
                </div>
                <FormProvider {...formMethods}>
                    <form
                        id="blog-form"
                        className="py-3"
                        onSubmit={handleSubmit(onSubmit)}
                    >
                        <div className="mt-5">
                            <ReactQuill
                                value={replyMessage}
                                onChange={handleTextEditorChange}
                                theme="snow"
                                modules={modules}
                                className="h-[20vh]"
                            />
                        </div>

                        <div className="flex justify-end gap-2 mt-16">
                            <Button
                                variant="outline"
                                type="button"
                                onClick={closeStatusDialog}
                            >
                                Close
                            </Button>
                            <LoadingButton
                                type="submit"
                                isLoading={contactUsReplyLoading}
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
