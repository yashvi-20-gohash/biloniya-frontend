import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/src/components/ui/breadcrumb'
import { Slash } from 'lucide-react'
import { Fragment } from 'react'

type BreadcrumbItemProps = {
  title: string | JSX.Element // Allow both string and JSX.Element
  link: string
}

export function Breadcrumbs({ items }: { items: BreadcrumbItemProps[] }) {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        {items.map((item, index) => (
          <Fragment key={index}>
            {' '}
            {/* Use index as key to avoid issues with duplicate titles */}
            {index !== items.length - 1 && ( // Render links for all but the last item
              <BreadcrumbItem>
                <BreadcrumbLink href={item.link}>{item.title}</BreadcrumbLink>
              </BreadcrumbItem>
            )}
            {index < items.length - 1 && ( // Add separator between items
              <BreadcrumbSeparator>
                <Slash />
              </BreadcrumbSeparator>
            )}
            {index === items.length - 1 && ( // Render the last item as a page
              <BreadcrumbPage>{item.title}</BreadcrumbPage>
            )}
          </Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  )
}
