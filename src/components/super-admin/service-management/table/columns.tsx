import { Badge } from '@/src/components/ui/badge'
import { ColumnDef } from '@tanstack/react-table'
import { DataTableColumnHeader } from './data-table-column-header'
import { DataTableRowActions } from './data-table-row-actions'
// import { useCurrencySymbol } from '@/src/hooks/useCurrencySymbol'
// import { CustomRow } from '@/src/types'
import dayjs from 'dayjs'
import { ServicelistType } from '@/src/schema/service-management'



export const columns: ColumnDef<ServicelistType>[] = [
  {
    accessorKey: 'id',
    header: ({ column }) => <DataTableColumnHeader column={column} title="#" />,
    cell: ({ row }) => <div>{row.index + 1}</div>,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'title',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Title" />
    ),
    cell: ({ row }) => (
      <div className="truncate">{row.getValue('title') as string}</div>
    ),
  },
  {
    accessorKey: 'serviceType',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Service Type" />
    ),
    cell: ({ row }) => (
      <div className="truncate">{row.getValue('serviceType') as string}</div>
    ),
  },
  {
    accessorKey: 'duration',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Duration" />
    ),
    cell: ({ row }) => (
      <div className="truncate">{row.getValue('duration') as string}</div>
    ),
  },
  {
    accessorKey: 'location',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Location" />
    ),
    cell: ({ row }) => (
      <div className="truncate">{row.getValue('location') as string}</div>
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
    accessorKey: 'isActive',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => {
      const isActive = row.getValue('isActive')

      return (
        <div className="flex items-center">
          <Badge
            className="text-center"
            variant={isActive === true ? 'success' : 'destructive'}
          >
            {isActive === true ? 'Active' : 'Inactive'}
          </Badge>
        </div>
      )
    },
  },
  {
    id: 'actions',
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
]
