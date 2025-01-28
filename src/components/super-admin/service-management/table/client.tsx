'use client'

import { useTableData } from '@/src/hooks/useTableData'
import { useEffect, useState } from 'react'

import { DataTable } from '@/src/components/data-table/data-table'
import { DataTableLoading } from '@/src/components/data-table/data-table-skeleton'
import { usePathname } from 'next/navigation'
import { columns } from './columns'
import Link from 'next/link'
import { AddModel } from '../add-model'
import { ServiceResponse, SuperAdminServiceManagementStore } from '@/src/store/service-management'
import { ServicelistType } from '@/src/schema/service-management'
import { Heading } from '@/src/components/ui/heading'
import { Separator } from '@/src/components/ui/separator'

export const ServiceManagementTable: React.FC = () => {
  const pathname = usePathname()

  const { getServiceList, setTotalTransactionPages, isServiceLoading } =
    SuperAdminServiceManagementStore()

  const {
    data: ServiceData,
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
  } = useTableData<ServicelistType>({
    fetchData: async ({ limit, page, search, query }) => {
      const customQuery = query ?? {}
      const resp = await getServiceList({
        limit,
        page,
        search,
        query: customQuery,
      })
      const responseData = resp?.data as ServiceResponse
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
      SuperAdminServiceManagementStore.setState({ loadedPages: {} }),
  })

  useEffect(() => {
    return () => {
      SuperAdminServiceManagementStore.setState({ loadedPages: {} })
    }
  }, [pathname])

  useEffect(() => {
    console.log('Transaction List Updated:', ServiceData)
  }, [ServiceData])

  const [openModel, setOpenModel] = useState(false)

  return (
    <>
      <div className="space-y-4 mt-5">
        <div className="flex items-center justify-between">
          <Heading title="Service Management" description='' />
        </div>
        <div className="w-full flex justify-end mb-6">
          <Link
            href=""
            onClick={() => setOpenModel(true)}
            className="border py-2 px-5 rounded text-sm"
          >
            + Add new service
          </Link>
        </div>
        <Separator />
        {isServiceLoading ? (
          <DataTableLoading columnCount={5} rowCount={5} />
        ) : (
          <DataTable
            data={ServiceData}
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

      <AddModel
        openStatusDialog={openModel}
        setOpenStatusDialog={setOpenModel}
        addRow={addRow}
      />
    </>
  )
}
