import { ColumnFiltersState, Row } from '@tanstack/react-table'

export interface NavItem {
  title: string
  href: string
  icon?: string
  color?: string
  label?: string
  description?: string
  isChidren?: boolean
  children?: NavItem[]
}

export interface NavItemWithChildren extends NavItem {
  items: NavItemWithChildren[]
}

export interface NavItemWithOptionalChildren extends NavItem {
  items?: NavItemWithChildren[]
}

export interface FooterItem {
  title: string
  items: {
    title: string
    href: string
    external?: boolean
  }[]
}
export interface CustomRow<TData> extends Row<TData> {
  actions?: {
    addRow: (newRow: TData) => void
    updateRow: (rowId: string, updatedData: TData) => void
    deleteRow: (rowId: string) => void
    getColumnsiFlters?: () => ColumnFiltersState
  }
}

export type MainNavItem = NavItemWithOptionalChildren

export type SidebarNavItem = NavItemWithChildren
