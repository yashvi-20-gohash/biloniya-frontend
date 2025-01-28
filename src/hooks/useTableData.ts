import { useState, useEffect, useCallback, useRef } from 'react'
import { debounce } from 'lodash'
import { ColumnFiltersState } from '@tanstack/react-table'
import { DateRange } from 'react-day-picker'
import dayjs from 'dayjs'

interface PaginationState {
  pageIndex: number
  pageSize: number
}
type ItemWithId = { id?: string; _id?: string }

interface UseTableDataParams<T> {
  fetchData: (params: {
    limit: number
    page: number
    search: string
    query?: Record<string, string | undefined>
  }) => Promise<{ data: T[]; totalItems: number }>
  initialPageSize?: number
  resetStorePages: () => void
}
export const convertRowData = <T extends ItemWithId>(
  updatedData: Partial<T>,
  originalData: T
): T => {
  const updatedRow = { ...originalData }

  for (const key in updatedData) {
    if (updatedData.hasOwnProperty(key)) {
      const originalValue = originalData[key as keyof T]
      const updatedValue = updatedData[key as keyof T]

      // Check if both the original and updated values are objects
      if (
        typeof originalValue === 'object' &&
        originalValue !== null &&
        !Array.isArray(originalValue) &&
        typeof updatedValue === 'object' &&
        updatedValue !== null &&
        !Array.isArray(updatedValue)
      ) {
        // Merge objects
        updatedRow[key as keyof T] = {
          ...originalValue,
          ...updatedValue,
        } as T[keyof T]
      } else {
        // Assign non-object or incompatible types directly
        updatedRow[key as keyof T] = updatedValue as T[keyof T]
      }
    }
  }

  return updatedRow
}

export const tabelFilters = (
  columnFilters: ColumnFiltersState,
  filterId: string,
  singleValueOnly = false
): string | undefined => {
  const filter = columnFilters.find((f) => f.id === filterId)
  if (filter?.value) {
    const values = Array.isArray(filter.value) ? filter.value : [filter.value]
    const uniqueValues = Array.from(new Set(values))

    if (singleValueOnly) {
      return uniqueValues.length === 1 ? uniqueValues[0] : undefined
    } else {
      return uniqueValues.join(',')
    }
  }
  return undefined
}
export const useTableData = <T extends ItemWithId>({
  fetchData,
  initialPageSize = 10,
  resetStorePages,
}: UseTableDataParams<T>) => {
  const [data, setData] = useState<T[]>([])
  const [loadedPages, setLoadedPages] = useState<{ [key: number]: T[] }>({})
  const [totalPages, setTotalPages] = useState(0)
  const [search, setSearch] = useState('')
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: initialPageSize,
  })
  const columnFiltersRef = useRef<ColumnFiltersState>(columnFilters)
  const [isLoading, setIsLoading] = useState(false)
  const [daterange, setDaterange] = useState<DateRange | undefined>(undefined)
  const [rowSelection, setRowSelection] = useState({})

  const debouncedFetchData = useCallback(
    debounce(async (page: number, searchQuery: string) => {
      const isActiveFilter = columnFilters.find(
        (filter) => filter.id === 'isActive'
      )
      const ipStatusFilter = columnFilters.find(
        (filter) => filter.id === 'listType'
      )

      const emailStatusFilter = columnFilters.find(
        (filter) => filter.id === 'listType'
      )
      let isActiveQuery: string | undefined
      let ipStatusQuery: string | undefined
      let emailStatusQuery: string | undefined

      if (isActiveFilter?.value) {
        const values = Array.isArray(isActiveFilter.value)
          ? isActiveFilter.value
          : [isActiveFilter.value]
        const uniqueValues = Array.from(new Set(values))
        if (uniqueValues.length === 1) {
          isActiveQuery = uniqueValues[0] === 'active' ? 'true' : 'false'
        }
      }

      if (ipStatusFilter?.value) {
        const values = Array.isArray(ipStatusFilter.value)
          ? ipStatusFilter.value
          : [ipStatusFilter.value]
        const uniqueValues = Array.from(new Set(values))
        if (uniqueValues.length === 1) {
          ipStatusQuery = uniqueValues[0] === 'whiteList' ? 'true' : 'false'
        }
      }

      if (emailStatusFilter?.value) {
        const values = Array.isArray(emailStatusFilter.value)
          ? emailStatusFilter.value
          : [emailStatusFilter.value]
        const uniqueValues = Array.from(new Set(values))
        if (uniqueValues.length === 1) {
          emailStatusQuery = uniqueValues[0] === 'whiteList' ? 'true' : 'false'
        }
      }
      try {
        if (!loadedPages[page]) {
          setIsLoading(true)
          const response = await fetchData({
            limit: pagination.pageSize,
            page: page + 1,
            search: searchQuery,
            query: {
              isActive: isActiveQuery,
              listType: emailStatusQuery || ipStatusQuery,
              startDate: daterange?.from
                ? dayjs(daterange.from).format('YYYY-MM-DD')
                : undefined, // Format date to 'YYYY-MM-DD'
              endDate: daterange?.to
                ? dayjs(daterange.to).format('YYYY-MM-DD')
                : undefined,
            },
          })

          const { data: newData, totalItems } = response
          const updatedData = page === 0 ? newData : [...data, ...newData]

          setData(updatedData)
          setLoadedPages((prev) => ({ ...prev, [page]: newData }))
          setTotalPages(Math.ceil(totalItems / pagination.pageSize))
        }
      } catch (error) {
        console.error('Error fetching data:', error)
      } finally {
        setIsLoading(false)
      }
    }, 300),
    [pagination.pageSize, columnFilters, data, loadedPages, daterange]
  )

  useEffect(() => {
    debouncedFetchData(pagination.pageIndex, search)
  }, [
    pagination.pageIndex,
    pagination.pageSize,
    search,
    columnFilters,
    daterange,
    debouncedFetchData,
  ])

  useEffect(() => {
    if (pagination.pageSize !== initialPageSize) {
      setLoadedPages({})
      setSearch('')
      resetStorePages()
      setPagination({ ...pagination, pageIndex: 0 })
      debouncedFetchData(0, search)
    }
  }, [pagination.pageSize])

  const handleSearchInput = (newSearch: string) => {
    setSearch(newSearch)
    setLoadedPages({})
    resetStorePages()
    setPagination({ ...pagination, pageIndex: 0 })
  }

  const handleColumnFiltersChange = (newFilters: ColumnFiltersState) => {
    setColumnFilters(newFilters)
    setLoadedPages({})
    resetStorePages()
    setPagination({ ...pagination, pageIndex: 0 })
    debouncedFetchData(0, search)
  }

  const handleSelectDateRangeChange = (range: DateRange | undefined) => {
    setDaterange(range)
    setLoadedPages({})
    resetStorePages()
    setPagination({ ...pagination, pageIndex: 0 })
    debouncedFetchData(0, search)
  }

  const addRow = (newRow: T | T[]) => {
    setData((prevData) => {
      let updatedData: T[]

      if (Array.isArray(newRow)) {
        // Handle array of rows
        const newRows = [...newRow] // Create a copy to avoid mutations

        if (prevData.length < pagination.pageSize) {
          // If we have space, add as many rows as we can fit
          const availableSpace = pagination.pageSize - prevData.length
          const rowsToAdd = newRows.slice(0, availableSpace)
          updatedData = [...rowsToAdd, ...prevData]
        } else {
          // If page is full, replace rows from the start and maintain page size
          const rowsToAdd = newRows.slice(0, pagination.pageSize)
          updatedData = [...rowsToAdd, ...prevData.slice(rowsToAdd.length)]
        }
      } else {
        // Handle single row (original behavior)
        updatedData =
          prevData.length < pagination.pageSize
            ? [newRow, ...prevData]
            : [newRow, ...prevData.slice(0, -1)]
      }

      // Update loaded pages
      setLoadedPages((prevLoadedPages) => ({
        ...prevLoadedPages,
        [pagination.pageIndex]: updatedData,
      }))

      return updatedData
    })
  }

  const updateRow = <T extends ItemWithId>(
    id: string,
    updatedRow: Partial<T>
  ) => {
    setData((prevData) => {
      const updatedData = prevData.map((row) => {
        const rowId = row.id || row._id
        return rowId === id ? { ...row, ...updatedRow } : row
      })
      setLoadedPages((prevLoadedPages) => ({
        ...prevLoadedPages,
        [pagination.pageIndex]: updatedData,
      }))

      return updatedData
    })
  }

  const deleteRow = (id: string) => {
    setData((prevData) => {
      const updatedData = prevData.filter((row) => {
        const rowId = row.id || row._id
        return rowId !== id
      })

      let nextPageData = loadedPages[pagination.pageIndex + 1]

      if (nextPageData && updatedData.length < pagination.pageSize) {
        const nextItem = nextPageData[0]
        nextPageData = nextPageData.slice(1)
        updatedData.push(nextItem)
      }

      setLoadedPages((prevLoadedPages) => {
        return {
          ...prevLoadedPages,
          [pagination.pageIndex]: updatedData,
          [pagination.pageIndex + 1]: nextPageData,
        }
      })

      return updatedData
    })
  }
  const resetSelectedRows = () => {
    setRowSelection({})
  }
  useEffect(() => {
    columnFiltersRef.current = columnFilters
  }, [columnFilters])

  const getColumnsiFlters = (): ColumnFiltersState => {
    return columnFiltersRef.current
  }
  return {
    data,
    setData,
    pagination,
    setPagination,
    totalPages,
    search,
    setSearch: handleSearchInput,
    columnFilters,
    setColumnFilters: handleColumnFiltersChange,
    daterange,
    setDaterange: handleSelectDateRangeChange,
    isLoading,
    addRow,
    updateRow,
    deleteRow,
    resetSelectedRows,
    getColumnsiFlters,
    rowSelection,
    setRowSelection,
  }
}
