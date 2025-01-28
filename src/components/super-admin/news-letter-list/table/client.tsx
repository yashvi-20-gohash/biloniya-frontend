'use client'

import { useTableData } from '@/src/hooks/useTableData'
import { useEffect } from 'react'
import { DataTable } from '@/src/components/data-table/data-table'
import { DataTableLoading } from '@/src/components/data-table/data-table-skeleton'
import { usePathname } from 'next/navigation'
import { columns } from './columns'


import { Heading } from '@/src/components/ui/heading'
import { Separator } from '@/src/components/front/ui/separator'
import { INewsLetterList, NewsLetterListStore } from '@/src/store/news-letter-list'
import { NewsLetterListType } from '@/src/schema/news-letter-list'

export const NewsLetterListTable: React.FC = () => {
  const pathname = usePathname()
  const { getNewsLetterList, setTotalTransactionPages, isNewsLetterLoading } =
    NewsLetterListStore()

  const {
    data: newsLetterListData,
    pagination,
    setPagination,
    totalPages: totalTransactionPages,
    search,
    setSearch,
    columnFilters,
    setColumnFilters,
    rowSelection,
    setRowSelection,
    addRow,
    deleteRow,

    updateRow,
    resetSelectedRows,
    getColumnsiFlters,

    // setDaterange,
  } = useTableData<NewsLetterListType>({
    fetchData: async ({ limit, page, search, query }) => {
      const customQuery = query ?? {}
      const resp = await getNewsLetterList({
        limit,
        page,
        search,
        query: customQuery,
      })
      const responseData = resp?.data as INewsLetterList
      console.log('Response Data:', responseData)
      if (responseData && typeof responseData.paginator.itemCount === 'number') {
        setTotalTransactionPages(Math.ceil(responseData.paginator.itemCount))
      }
      return {
        data: responseData?.data || [],
        totalItems: responseData.paginator.itemCount || 0,
      }
    },
    initialPageSize: 10,
    resetStorePages: () =>
      NewsLetterListStore.setState({ loadedPages: {} }),
  })

  useEffect(() => {
    return () => {
      NewsLetterListStore.setState({ loadedPages: {} })
    }
  }, [pathname])

  useEffect(() => {
    console.log('Transaction List Updated:', newsLetterListData)
  }, [newsLetterListData])


  return (
    <>
      <div className="space-y-4 mt-5">
        <div className="flex items-center justify-between">
          <Heading title="Newsletter List" description='' />
        </div>
        <Separator />
        {isNewsLetterLoading ? (
          <DataTableLoading columnCount={5} rowCount={5} />
        ) : (
          <DataTable
            data={newsLetterListData}
            columns={columns}
            filters={{}}
            pagination={pagination}
            setPagination={setPagination}
            pageCount={totalTransactionPages}
            columnFilters={columnFilters}
            setColumnFilters={setColumnFilters}
            search={search}
            setSearch={setSearch}
            setRowSelection={setRowSelection}
            rowSelection={rowSelection}
            actions={{
              addRow,
              deleteRow,
              updateRow,
              getColumnsiFlters,
              resetSelectedRows,
            }}
          // columnsData={columnsData}
          />
        )}
      </div>

    </>
  )
}
