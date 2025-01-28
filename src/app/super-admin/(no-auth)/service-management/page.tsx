import { Breadcrumbs } from '@/src/components/breadcrumbs';
import { ServiceManagementTable } from '@/src/components/super-admin/service-management/table/client'

export const metadata = { title: `Service Management` };
const breadcrumbItems = [
  { title: 'Dashboard', link: '/super-admin/dashboard' },
  { title: 'Service Management', link: '/super-admin/service-management' },
]

export default function Page() {
  return (
    <>
      <div className="space-y-2">
        <Breadcrumbs items={breadcrumbItems} />
        <ServiceManagementTable />
      </div>
    </>
  )
}
