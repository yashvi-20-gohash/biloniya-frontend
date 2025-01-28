'use client'
import { Button } from '@/src/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuTrigger,
} from '@/src/components/ui/dropdown-menu'
import { CustomRow } from '@/src/types'
import { Dialog } from '@radix-ui/react-dialog'
import {
  MoreHorizontal,
} from 'lucide-react'
import { ContactUsListType } from '@/src/schema/contact'

interface DataTableRowActionsProps<TData extends ContactUsListType> {
  row: CustomRow<TData>
}

export function DataTableRowActions<TData extends ContactUsListType>({

}: DataTableRowActionsProps<TData>) {



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
        </DropdownMenu>
      </Dialog>

    </>
  )
}
