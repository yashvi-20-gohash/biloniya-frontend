import { Control, FieldValues, Path } from 'react-hook-form'

export type Option = { label: string; value: string | number } | null
export type Options = Option[] | (string | number)[]

export interface CustomSelectProps<T extends FieldValues> {
  name: Path<T>
  control: Control<T>
  label: string
  required?: boolean
  options: Options
  defaultValue?: Option
  value?: Option
}

export interface PaginationState {
  pageIndex: number
  pageSize: number
}

export interface IEmailTemplate {
  counters: Counters
  body: Body
}

// Update Counters to include an index signature
interface Counters extends Record<string, number> {
  u_row: number
  u_column: number
  u_content_text: number
  u_content_divider: number
  u_content_button: number
}

interface Body {
  id: string // Make id required
  rows: Row[]
  headers: Header[] // Now correctly defined as an array of Header
  footers: Footer[] // Now correctly defined as an array of Footer
  values: Record<string, unknown>
}

interface Row {
  id: string
  cells: number[]
  columns: Column[]
  values: Record<string, unknown>
}

interface Column {
  id: string
  contents: Content[]
  values: Record<string, unknown>
}

type Content = TextContent | DividerContent | ButtonContent

interface TextContent {
  type: 'text'
  values: {
    text: string
  }
}

interface DividerContent {
  type: 'divider'
}

interface ButtonContent {
  type: 'button'
  values: {
    text: string
    link: string
    style: ButtonStyle
  }
}

interface ButtonStyle {
  backgroundColor: string
  color: string
  padding: string
  borderRadius: string
}

// Header and Footer interfaces
interface Header {
  id: string
  title?: string
  logoUrl?: string
  links?: Array<HeaderLink>
  values?: Record<string, unknown>
}

interface HeaderLink {
  text: string
  url: string
}

interface Footer {
  id: string
  copyrightText: string
  links?: Array<FooterLink>
  socialMedia?: Array<SocialMediaLink>
  values?: Record<string, unknown>
}

interface FooterLink {
  text: string
  url: string
}

interface SocialMediaLink {
  platform: string
  url: string
}

// BodyItem type is not necessary if Header and Footer are already well defined
// Removed duplicate definition of BodyItem
export type FiltersState = Record<
  string,
  | string[]
  | {
      value: string
      label: string
      icon?: React.ComponentType<{ className?: string }>
    }
  | null
>
export interface Paginator {
  itemCount: number
  perPage: number
  pageCount: number
  currentPage: number
  slNo: number
  hasPrevPage: boolean
  hasNextPage: boolean
  prev: null
  next: null
  search: string | number
}
