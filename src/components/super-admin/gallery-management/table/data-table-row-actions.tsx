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
  CheckCircle,
  MoreHorizontal,
  Trash2,
  XCircle,
} from 'lucide-react'
import React, { useState } from 'react'
import { AlertModal } from '@/src/components/modal/alert-modal'
import { GallerylistType } from '@/src/schema/gallery-management'
import { SuperAdminGalleryStore } from '@/src/store/gallery-management '


interface DataTableRowActionsProps<TData extends GallerylistType> {
  row: CustomRow<TData>
}

export function DataTableRowActions<TData extends GallerylistType>({
  row,
}: DataTableRowActionsProps<TData>) {
  const id = (row?.original as { _id: string })._id

  const [isModalOpen, setIsModalOpen] = React.useState<boolean>(false)
  const [updateStatusModel, setUpdateStatusModel] = useState(false)

  const {
    deleteGallery,
    isDeletingGallery,
    updateGalleryStatus,
    isGalleryStatusLoading,
  } = SuperAdminGalleryStore()

  const handleCloseModal = () => {
    setUpdateStatusModel(false)
  }
  const handleClose = () => {
    setIsModalOpen(false)
  }

  const handleConfirmDelete = async () => {
    const resp = await deleteGallery(id)
    if (row?.actions?.deleteRow) {
      row.actions.deleteRow(id)
    } else {
      console.error('Delete action not available or undefined')
    }
    if (!row?.actions) return

    if (resp?.status === 'SUCCESS') {
      setIsModalOpen(false)
    }
  }



  const handleUpdateState = async () => {
    const data = {
      id: [id],
      isActive: row.original?.isActive === true ? false : true,
    }
    const resp = await updateGalleryStatus(data)
    console.log("resp", resp);

    if (resp?.status === 'SUCCESS') {
      const data = { ...row.original, ...resp?.data?.lastData as GallerylistType }
      row?.actions?.updateRow?.(id, data)
      setUpdateStatusModel(false)
    }
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

            <DropdownMenuItem onClick={() => setUpdateStatusModel(true)}>
              {row?.original?.isActive === true ? (
                <span className="flex items-center ">
                  <XCircle className="mr-2 h-4 w-4" />
                  Inactive
                </span>
              ) : (
                <span className="flex items-center ">
                  <CheckCircle className="mr-2 h-4 w-4" />
                  Active
                </span>
              )}
            </DropdownMenuItem>


            {/* Delete action */}
            <DropdownMenuItem onClick={() => setIsModalOpen(true)}>
              <Trash2 className="mr-2 h-4 w-4" />
              Delete
            </DropdownMenuItem>

            <DropdownMenuSeparator />
          </DropdownMenuContent>
        </DropdownMenu>
      </Dialog>

      {/* Edit modal */}

      <AlertModal
        isOpen={isModalOpen}
        onClose={handleClose}
        onConfirm={handleConfirmDelete}
        loading={isDeletingGallery}
        variant={'default'}
        title={'Delete Blog'}
        description={`Are you sure you want to Delete this?`}
        confirmText={'Delete'}
      />

      <AlertModal
        isOpen={updateStatusModel}
        onClose={handleCloseModal}
        onConfirm={() => handleUpdateState()}
        loading={isGalleryStatusLoading}
        variant="default"
        title={'Update Status'}
        description={`Are you sure you want to ${row?.original?.isActive === true ? 'Inactive' : 'Active'} this status?`}
        confirmText={'Submit'}
      />

    </>
  )
}
