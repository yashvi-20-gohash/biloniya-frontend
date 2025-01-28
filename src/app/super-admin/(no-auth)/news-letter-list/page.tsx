import { Breadcrumbs } from '@/src/components/breadcrumbs';
import { NewsLetterListTable } from '@/src/components/super-admin/news-letter-list/table/client';

export const metadata = { title: `Newsletter List` };

const breadcrumbItems = [
  { title: 'Dashboard', link: '/super-admin/dashboard' },
  { title: 'Newsletter List', link: '/super-admin/news-letter-list' },
]

export default function Page() {
  return (
    <>

      <div className="space-y-2">
        <Breadcrumbs items={breadcrumbItems} />
        <NewsLetterListTable />
      </div>
    </>
  )
}
