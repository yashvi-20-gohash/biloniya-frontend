'use client'

import { useTableData } from '@/src/hooks/useTableData'
import { DataTable } from '@/src/components/data-table/data-table'
import { DataTableLoading } from '@/src/components/data-table/data-table-skeleton'
import { Separator } from '@radix-ui/react-dropdown-menu'
import { columns } from './columns'
import { ContactUsListType } from '@/src/schema/contact'
import { IContactUsList, SuperAdminDashboardStore } from '@/src/store/dashboard'


export const DashboardContactUsTable: React.FC = () => {
  const { getDashboard, dashboardLoading } =
    SuperAdminDashboardStore()

  const {
    data: ContactListData,
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

  } = useTableData<ContactUsListType>({
    fetchData: async () => {
      const resp = await getDashboard()
      const responseData = resp?.data as IContactUsList
      return {
        data: responseData?.topContactList || [],
        totalItems: 0,
      }
    },
    initialPageSize: 10,
    resetStorePages: () =>
      SuperAdminDashboardStore.setState({ loadedPages: {} }),
  })

  return (
    <>
      <div className="space-y-4 mt-5">
        <div className="w-full flex justify-start mb-1">
          ContactUs List
        </div>
        <Separator />
        {dashboardLoading ? (
          <DataTableLoading columnCount={5} rowCount={5} />
        ) : (
          <DataTable
            data={ContactListData}
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
            showFilters={false}
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
