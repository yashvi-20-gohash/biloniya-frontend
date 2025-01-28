'use client'

import type { Table } from '@tanstack/react-table'

import { Button } from '@/src/components/ui/button'
import { Input } from '@/src/components/ui/input'
import { DataTableFacetedFilter } from '@/src/components/data-table/data-table-faceted-filter'
import { DataTableViewOptions } from '@/src/components/data-table/data-table-view-options'
import { X } from 'lucide-react'
// import { DateRangePickerV2 } from '../forms/date-range-picker-v2'
import { DateRange } from 'react-day-picker'

interface DataTableToolbarProps<TData> {
  table: Table<TData>
  filters: Record<
    string,
    {
      value: string
      label: string
      icon?: React.ComponentType<{ className?: string }>
    }[]
  > // Dynamic filters
  filterTitles?: Record<string, string>
  search?: string
  isDatePicker?: boolean
  setSearch?: (search: string) => void
  onSearchChange?: (search: string) => void
  onSelectDateRange?: (range: DateRange | undefined) => void
  TableOptions?: React.ReactNode
  columnsData?: Record<string, string>
}

export function DataTableToolbar<TData>({
  table,
  filters,
  filterTitles,
  search,
  setSearch,
  // isDatePicker,
  onSearchChange,
  // onSelectDateRange,
  TableOptions,
  columnsData,
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters?.length > 0

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        <Input
          placeholder="Search..."
          value={search}
          onChange={(event) => {
            if (setSearch) {
              setSearch(event.target.value)
            }
            if (onSearchChange) {
              onSearchChange(event.target.value)
            }
          }}
          className="h-8 w-[150px] lg:w-[250px]"
        />
        {Object.keys(filters).map((filterKey) => {
          const column = table.getColumn(filterKey)
          if (!column) return null
          let filterTitle
          if (filterTitles && filterTitles[filterKey]) {
            filterTitle = filterTitles[filterKey]
          } else {
            filterTitle = filterKey.charAt(0).toUpperCase() + filterKey.slice(1)
          }
          return (
            <DataTableFacetedFilter
              key={filterKey}
              column={column}
              title={filterTitle}
              options={filters[filterKey]}
            />
          )
        })}

        {/* Reset button if any filters are applied */}
        {isFiltered && Object.keys(filters)?.length ? (
          <Button
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
            className="h-8 px-2 lg:px-3"
          >
            Reset
            <X className="ml-2 h-4 w-4" />
          </Button>
        ) : null}
      </div>

      {/* <div className="mr-2">
        {onSelectDateRange ? (
          <DateRangePickerV2 onSelect={onSelectDateRange} className="" />
        ) : null}
      </div> */}

      {/* View options */}
      <div className="flex items-center justify-between lg:flex-row flex-col">
        {TableOptions ? <div className="lg:mr-2">{TableOptions}</div> : null}
        <div>
          <DataTableViewOptions table={table} columnsData={columnsData} />
        </div>
      </div>
    </div>
  )
}
