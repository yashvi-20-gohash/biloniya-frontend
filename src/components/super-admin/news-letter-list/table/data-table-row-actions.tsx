'use client'
import { Button } from '@/src/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/src/components/ui/dropdown-menu'
import { NewsLetterListType } from '@/src/schema/news-letter-list'
import { CustomRow } from '@/src/types'
import { Dialog } from '@radix-ui/react-dialog'
import {
  MoreHorizontal,
} from 'lucide-react'


interface DataTableRowActionsProps<TData extends NewsLetterListType> {
  row: CustomRow<TData>
}

export function DataTableRowActions<TData extends NewsLetterListType>({
  row,
}: DataTableRowActionsProps<TData>) {

  const id = (row?.original as { _id: string })._id
  console.log("id", id);

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
            <DropdownMenuSeparator />
          </DropdownMenuContent>
        </DropdownMenu>
      </Dialog>
    </>
  )
}
