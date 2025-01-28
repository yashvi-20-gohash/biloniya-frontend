import { Badge } from '@/src/components/ui/badge'
import { ColumnDef } from '@tanstack/react-table'
import { DataTableColumnHeader } from './data-table-column-header'
import { DataTableRowActions } from './data-table-row-actions'
// import { useCurrencySymbol } from '@/src/hooks/useCurrencySymbol'
// import { CustomRow } from '@/src/types'
import dayjs from 'dayjs'
import { TestimonialLisType } from '@/src/schema/testimonial-management'



export const columns: ColumnDef<TestimonialLisType>[] = [
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
      <DataTableColumnHeader column={column} title="Title" />
    ),
    cell: ({ row }) => (
      <div className="truncate">{row.getValue('name') as string}</div>
    ),
  },
  {
    accessorKey: 'type',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Testimonial Type" />
    ),
    cell: ({ row }) => (
      <div className="truncate">{row.getValue('type') as string}</div>
    ),
  },
  {
    accessorKey: 'countryName',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Country Name" />
    ),
    cell: ({ row }) => (
      <div className="truncate">{row.getValue('countryName') as string}</div>
    ),
  },
  {
    accessorKey: 'rating',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Rating" />
    ),
    cell: ({ row }) => (
      <div className="truncate">{row.getValue('rating') as string}</div>
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
