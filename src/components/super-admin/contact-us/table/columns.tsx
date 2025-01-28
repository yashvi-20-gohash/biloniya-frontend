import { ColumnDef } from '@tanstack/react-table'
import { DataTableColumnHeader } from './data-table-column-header'
import { DataTableRowActions } from './data-table-row-actions'
// import { useCurrencySymbol } from '@/src/hooks/useCurrencySymbol'
// import { CustomRow } from '@/src/types'
import dayjs from 'dayjs'
import { ContactUsListType } from '@/src/schema/contact'


export const columns: ColumnDef<ContactUsListType>[] = [
  {
    accessorKey: 'id',
    header: ({ column }) => <DataTableColumnHeader column={column} title="#" />,
    cell: ({ row }) => <div>{row.index + 1}</div>,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'name',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name" />
    ),
    cell: ({ row }) => (
      <div className="truncate">{row.getValue('name') as string}</div>
    ),
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
    accessorKey: 'phone',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Phone" />
    ),
    cell: ({ row }) => (
      <div className="truncate">{row.getValue('phone') as string}</div>
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

  {
    id: 'actions',
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
]
