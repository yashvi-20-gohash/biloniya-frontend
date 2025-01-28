import { Breadcrumbs } from '@/src/components/breadcrumbs';
import { TourPackageManagementTable } from '@/src/components/super-admin/tour-package-management/table/client';

export const metadata = { title: `Tour Package Management` };
const breadcrumbItems = [
  { title: 'Dashboard', link: '/super-admin/dashboard' },
  { title: 'Tour Package Management', link: '/super-admin/tour-package-management' },
]

export default function Page() {
  return (
    <>
      <div className="space-y-2">
        <Breadcrumbs items={breadcrumbItems} />
        <TourPackageManagementTable />
      </div>
    </>
  )
}
