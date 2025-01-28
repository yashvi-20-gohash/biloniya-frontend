import { Breadcrumbs } from '@/src/components/breadcrumbs';
import { GalleryManagementTable } from '@/src/components/super-admin/gallery-management/table/client';

export const metadata = { title: `Gallery Management` };
const breadcrumbItems = [
  { title: 'Dashboard', link: '/super-admin/dashboard' },
  { title: 'Gallery Management', link: '/super-admin/gallery-management' },
]
export default function Page() {
  return (
    <>
      <div className="space-y-2">
        <Breadcrumbs items={breadcrumbItems} />
        <GalleryManagementTable />
      </div>
    </>
  )
}
