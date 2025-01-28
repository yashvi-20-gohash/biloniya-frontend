'use client'
import { Button } from '@/src/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/src/components/ui/dropdown-menu'
import { CustomRow } from '@/src/types'
import { Dialog } from '@radix-ui/react-dialog'
import {
  MoreHorizontal,
  Pencil,
} from 'lucide-react'
import { ContactUsListType } from '@/src/schema/contact'
import { useState } from 'react'
import { ContactUsReplyModal } from '../replyModel'
import { SuperAdminContactListStore } from '@/src/store/contact-list'



interface DataTableRowActionsProps<TData extends ContactUsListType> {
  row: CustomRow<TData>
}

export function DataTableRowActions<TData extends ContactUsListType>({
  row,
}: DataTableRowActionsProps<TData>) {

  const id = (row?.original as { _id: string })._id

  const { getContactdetails } = SuperAdminContactListStore()
  const [open, setModalOpen] = useState<boolean>(false);

  const handalContactdetails = async () => {
    await getContactdetails(id)
    setModalOpen(true)
  }


  return (
    <>
      <Dialog>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
            >
              <MoreHorizontal className="h-4 w-4" />
              <span className="sr-only">Open menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-[200px]">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>

            <DropdownMenuItem onClick={() => handalContactdetails()} >
              <Pencil className="mr-2 h-4 w-4" />
              Reply
            </DropdownMenuItem>
            <DropdownMenuSeparator />
          </DropdownMenuContent>
        </DropdownMenu>
      </Dialog>

      <ContactUsReplyModal
        openStatusDialog={open}
        setOpenStatusDialog={setModalOpen}
        updateRow={(id, updatedData) => {
          const data = { ...row.original, ...updatedData }
          row?.actions?.updateRow?.(id, data)
        }}
      />
    </>
  )
}
