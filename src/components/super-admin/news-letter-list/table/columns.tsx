import { ColumnDef } from '@tanstack/react-table'
import { DataTableColumnHeader } from './data-table-column-header'
// import { useCurrencySymbol } from '@/src/hooks/useCurrencySymbol'
// import { CustomRow } from '@/src/types'
import dayjs from 'dayjs'
import { NewsLetterListType } from '@/src/schema/news-letter-list'


export const columns: ColumnDef<NewsLetterListType>[] = [
  {
    accessorKey: 'id',
    header: ({ column }) => <DataTableColumnHeader column={column} title="#" />,
    cell: ({ row }) => <div>{row.index + 1}</div>,
    enableSorting: false,
    enableHiding: false,
  },

  {
    accessorKey: 'email',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Email" />
    ),
    cell: ({ row }) => (
      <div className="truncate">{row.getValue('email') as string}</div>
    ),
  },


  {
    accessorKey: 'createdAt',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Creation Date" />
    ),
    cell: ({ row }) => {
      return (
        <div>
          {dayjs(row.getValue('createdAt')).format('DD MMM YYYY h:mm A')}
        </div>
      )
    },
  },


]
