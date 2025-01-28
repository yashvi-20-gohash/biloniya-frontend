'use client'

import { useTableData } from '@/src/hooks/useTableData'
import { useEffect } from 'react'
import { DataTable } from '@/src/components/data-table/data-table'
import { DataTableLoading } from '@/src/components/data-table/data-table-skeleton'
import { usePathname } from 'next/navigation'
import { columns } from './columns'

import { IContactList, SuperAdminContactListStore } from '@/src/store/contact-list'
import { ContactUsListType } from '@/src/schema/contact'
import { Heading } from '@/src/components/ui/heading'
import { Separator } from '@/src/components/front/ui/separator'

export const ContactUsTable: React.FC = () => {
  const pathname = usePathname()
  const { getContactList, setTotalTransactionPages, contactLoading } =
    SuperAdminContactListStore()

  const {
    data: ContactData,
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
  } = useTableData<ContactUsListType>({
    fetchData: async ({ limit, page, search, query }) => {
      const customQuery = query ?? {}
      const resp = await getContactList({
        limit,
        page,
        search,
        query: customQuery,
      })
      const responseData = resp?.data as IContactList
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
      SuperAdminContactListStore.setState({ loadedPages: {} }),
  })

  useEffect(() => {
    return () => {
      SuperAdminContactListStore.setState({ loadedPages: {} })
    }
  }, [pathname])

  useEffect(() => {
    console.log('Transaction List Updated:', ContactData)
  }, [ContactData])


  return (
    <>
      <div className="space-y-4 mt-5">
        <div className="flex items-center justify-between">
          <Heading title="ContactUs" description='' />
        </div>
        <Separator />
        {contactLoading ? (
          <DataTableLoading columnCount={5} rowCount={5} />
        ) : (
          <DataTable
            data={ContactData}
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
