import {
  BookImage,
  BookText,
  BookTextIcon,
  Contact,
  LayoutDashboardIcon,
  Newspaper,
  TramFront,

} from 'lucide-react'
import { NavItem } from '../types'

export const getSidebarIcon = (icon: string) => {
  switch (icon) {
    case 'dashboard':
      return <LayoutDashboardIcon className="h-5 w-5" />
    case 'service-management':
      return <BookText className="h-5 w-5" />
    case 'contact-us':
      return <Contact className="h-5 w-5" />
    case 'gallery-management':
      return <BookImage className="h-5 w-5" />
    case 'news-letter-list':
      return <Newspaper className="h-5 w-5" />
    case 'tour-package-management':
      return <TramFront className="h-5 w-5" />
    case 'testimonial-management':
      return <BookTextIcon className="h-5 w-5" />
    default:
      return null
  }
}

export const NavItemsSuperAdmin: NavItem[] = [
  {
    title: 'Dashboard',
    href: '/super-admin/dashboard',
    icon: 'dashboard',
  },
  {
    title: 'Contact Us',
    href: '/super-admin/contact-us',
    icon: 'contact-us',
  },
  {
    title: 'Service Management',
    href: '/super-admin/service-management',
    icon: 'service-management',
  },
  {
    title: 'Gallery Management',
    href: '/super-admin/gallery-management',
    icon: 'gallery-management',
  },
  {
    title: 'Newsletter List',
    href: '/super-admin/news-letter-list',
    icon: 'news-letter-list',
  },
  {
    title: 'Tour Package Management',
    href: '/super-admin/tour-package-management',
    icon: 'tour-package-management',
  },
  {
    title: 'Testimonial Management',
    href: '/super-admin/testimonial-management',
    icon: 'testimonial-management',
  },

]
