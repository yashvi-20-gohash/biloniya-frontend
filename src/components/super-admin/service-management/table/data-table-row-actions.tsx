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
  Pencil,
  Trash2,
  XCircle,
} from 'lucide-react'
import React, { useState } from 'react'
import { AlertModal } from '@/src/components/modal/alert-modal'
import { EditModel } from '../edit-model'
import { SuperAdminServiceManagementStore } from '@/src/store/service-management'
import { ServicelistType } from '@/src/schema/service-management'


interface DataTableRowActionsProps<TData extends ServicelistType> {
  row: CustomRow<TData>
}

export function DataTableRowActions<TData extends ServicelistType>({
  row,
}: DataTableRowActionsProps<TData>) {
  const id = (row?.original as { _id: string })._id

  const [isModalOpen, setIsModalOpen] = React.useState<boolean>(false)
  const [editModel, setEditModel] = useState(false)
  const [updateStatusModel, setUpdateStatusModel] = useState(false)

  const {
    deleteService,
    isServiceBlog,
    getServiceDetails,
    updateServiceStatus,
    isServiceStatusLoading,
  } = SuperAdminServiceManagementStore()

  const handleCloseModal = () => {
    setUpdateStatusModel(false)
  }
  const handleClose = () => {
    setIsModalOpen(false)
  }

  const handleConfirmDelete = async () => {
    const resp = await deleteService(id)
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

  const handleEdit = async () => {
    await getServiceDetails(id)
    setEditModel(true)
  }

  const handleUpdateState = async () => {
    const data = {
      id: [id],
      isActive: row.original?.isActive === true ? false : true,
    }
    const resp = await updateServiceStatus(data)
    console.log("resp", resp);

    if (resp?.status === 'SUCCESS') {
      const data = { ...row.original, ...resp?.data?.lastData as ServicelistType }
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

            <DropdownMenuItem onClick={handleEdit}>
              <Pencil className="mr-2 h-4 w-4" />
              Edit
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
        loading={isServiceBlog}
        variant={'default'}
        title={'Delete Blog'}
        description={`Are you sure you want to Delete this?`}
        confirmText={'Delete'}
      />

      <AlertModal
        isOpen={updateStatusModel}
        onClose={handleCloseModal}
        onConfirm={() => handleUpdateState()}
        loading={isServiceStatusLoading}
        variant="default"
        title={'Update Status'}
        description={`Are you sure you want to ${row?.original?.isActive === true ? 'Inactive' : 'Active'} this status?`}
        confirmText={'Submit'}
      />

      <EditModel
        openStatusDialog={editModel}
        setOpenStatusDialog={setEditModel}
        updateRow={(id, updatedData) => {
          const data = { ...row.original, ...updatedData }
          row?.actions?.updateRow?.(id, data)
        }}
      />
    </>
  )
}
