import { Breadcrumbs } from '@/src/components/breadcrumbs';
import { TestimonialManagementTable } from '@/src/components/super-admin/testimonial-management/table/client';

export const metadata = { title: `Testimonial Management` };
const breadcrumbItems = [
  { title: 'Dashboard', link: '/super-admin/dashboard' },
  { title: 'Testimonial Management', link: '/super-admin/testimonial-management' },
]

export default function Page() {
  return (
    <>
      <div className="space-y-2">
        <Breadcrumbs items={breadcrumbItems} />
        <TestimonialManagementTable />
      </div>
    </>
  )
}
