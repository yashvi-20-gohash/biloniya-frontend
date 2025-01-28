'use client'

import * as React from 'react'
import {
  ColumnDef,
  ColumnFiltersState,
  OnChangeFn,
  RowSelectionState,
  SortingState,
  Updater,
  VisibilityState,
  flexRender,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/src/components/ui/table'

import { DataTableToolbar } from './data-table-toolbar'
import { DataTablePagination } from './data-table-pagination'
import { PaginationState } from '@/src/types/common'
import { useSidebar } from '@/src/hooks/useSidebar'
import { DateRange } from 'react-day-picker'
import { getCoreRowModel } from './data-table-row-model'
import ErrorBoundary from '../ErrorBoundary'
export interface DataTableActions<TData> {
  addRow: (newRow: TData) => void
  updateRow: (rowId: string, updatedData: TData) => void
  deleteRow: (rowId: string) => void
  resetSelectedRows?: () => void
  getColumnsiFlters?: () => ColumnFiltersState
}
interface DataTableProps<TData> {
  columns: ColumnDef<TData, unknown>[]
  data: TData[]
  filters: Record<
    string,
    {
      value: string
      label: string
      icon?: React.ComponentType<{ className?: string }>
    }[]
  >
  filterTitles?: Record<string, string>
  columnFilters?: ColumnFiltersState
  setColumnFilters?: (columnFilters: ColumnFiltersState) => void
  pagination: PaginationState
  setPagination: (pagination: PaginationState) => void
  setSelectedRows?: (selectedRows: TData[]) => void
  pageCount: number
  search?: string
  isDatePicker?: boolean
  setSearch?: (search: string) => void
  onSearchChange?: (search: string) => void
  onSelectDateRange?: (range: DateRange | undefined) => void
  actions?: DataTableActions<TData>
  rowSelection?: RowSelectionState
  setRowSelection?: (rowSelection: RowSelectionState) => void
  TableOptions?: React.ReactNode
  columnsData?: Record<string, string>
  showFilters?: boolean
}

export function DataTable<TData>({
  showFilters = true,
  columns,
  data,
  filters,
  pagination,
  filterTitles,
  columnFilters,
  setColumnFilters,
  setPagination,
  setSelectedRows,
  pageCount = 1,
  search,
  isDatePicker,
  setSearch,
  onSearchChange,
  onSelectDateRange,
  actions,
  rowSelection,
  setRowSelection,
  TableOptions,
  columnsData,
}: DataTableProps<TData>) {
  const { isOpen } = useSidebar()
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({})
  // const [rowSelection, setRowSelection] = React.useState({})
  const defaultActions: DataTableActions<TData> = {
    addRow: () => {
      console.warn('Add row function not implemented.')
    },
    updateRow: () => {
      console.warn('Update row function not implemented.')
    },
    deleteRow: () => {
      console.warn('Delete row function not implemented.')
    },
    getColumnsiFlters: () => {
      console.warn('ColumnsiFlters function not implemented.')
      return []
    },
    resetSelectedRows: () => {
      console.warn('resetSelectedRows function not implemented.')
      return []
    },
  }
  const onRowSelectionChange: OnChangeFn<RowSelectionState> = (
    updaterOrValue: Updater<RowSelectionState> | RowSelectionState
  ) => {
    if (typeof updaterOrValue === 'function') {
      if (rowSelection && setRowSelection) {
        setRowSelection(updaterOrValue(rowSelection))
      }
    } else {
      if (setRowSelection) {
        setRowSelection(updaterOrValue)
      }
    }
  }
  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      columnVisibility,
      rowSelection,
      columnFilters,
      pagination,
    },
    pageCount,
    autoResetPageIndex: false,
    manualFiltering: true,
    onPaginationChange: async (updater) => {
      if (typeof updater === 'function') {
        await setPagination(await updater(pagination))
      } else {
        await setPagination(updater)
      }
    },
    enableRowSelection: true,
    onRowSelectionChange,
    onSortingChange: setSorting,
    onColumnFiltersChange: (
      updaterOrValue:
        | ColumnFiltersState
        | ((old: ColumnFiltersState) => ColumnFiltersState)
    ) => {
      if (typeof updaterOrValue === 'function') {
        const newFilters = updaterOrValue(columnFilters || [])
        setColumnFilters?.(newFilters)
      } else {
        setColumnFilters?.(updaterOrValue)
      }
    },
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(actions ?? defaultActions),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
  })
  React.useEffect(() => {
    if (rowSelection && Object.keys(rowSelection).length) {
      const selectedRowIndices = Object.keys(rowSelection).map(Number)
      const selectedRows = data.filter((_, index) =>
        selectedRowIndices.includes(index)
      )
      setSelectedRows && setSelectedRows(selectedRows)
    } else {
      setSelectedRows && setSelectedRows([])
    }
  }, [rowSelection, data, setSelectedRows])
  return (
    <ErrorBoundary>
      <div className="space-y-4">
        {showFilters ?
          <DataTableToolbar
            table={table}
            columnsData={columnsData}
            filters={filters}
            filterTitles={filterTitles}
            search={search}
            setSearch={setSearch}
            isDatePicker={isDatePicker}
            onSearchChange={onSearchChange}
            onSelectDateRange={onSelectDateRange}
            TableOptions={TableOptions}
          />
          : null}
        <div
          className={`${isOpen
            ? 'rounded-md border overflow-x-auto main-detatable-box'
            : 'rounded-md border overflow-x-auto main-detatable-box main-detatable-box-1'
            }`}
        >
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead key={header.id}>
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                      </TableHead>

                    )
                  })}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table?.getRowModel() && table?.getRowModel()?.rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row?.getIsSelected() && 'selected'}

                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center"
                  >
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        {showFilters ?

          <DataTablePagination table={table} /> : null}
      </div>
    </ErrorBoundary>
  )
}
