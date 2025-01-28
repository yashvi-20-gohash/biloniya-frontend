import { Breadcrumbs } from '@/src/components/breadcrumbs';
import { ContactUsTable } from '@/src/components/super-admin/contact-us/table/client';

export const metadata = { title: `ContactUs List` };

const breadcrumbItems = [
  { title: 'Dashboard', link: '/super-admin/dashboard' },
  { title: 'ContactUs', link: '/super-admin/contact-us' },
]

export default function Page() {
  return (
    <>

      <div className="space-y-2">
        <Breadcrumbs items={breadcrumbItems} />
        <ContactUsTable />
      </div>
    </>
  )
}
