import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { randomBytes, createCipheriv, createDecipheriv } from 'crypto'
import dayjs from 'dayjs'

const secretKey = randomBytes(32) // For AES-256
const iv = randomBytes(16) // AES block size

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
export function convertToSubcurrency(amount: number, factor = 100) {
  return Math.round(amount * factor)
}

export default convertToSubcurrency

export const changeInFormData = <
  T extends Record<string, string | File | Blob>,
>(
  data: T
): FormData => {
  const formData = new FormData()
  Object.keys(data).forEach((key) => {
    formData.append(key, data[key]) // Append all data fields
  })
  return formData
}

export const generateOTP = (length: number = 6): string => {
  const min = Math.pow(10, length - 1)
  const max = Math.pow(10, length) - 1
  return Math.floor(Math.random() * (max - min + 1) + min).toString()
}
export function objectToQueryString<T extends Record<string, unknown>>(
  params: T,
  prefix = ''
): string {
  return Object.keys(params)
    .map((key) => {
      const value = params[key]
      const paramKey = prefix ? `${prefix}[${key}]` : key

      if (value === null || value === undefined) {
        return ''
      }
      if (typeof value === 'object' && !Array.isArray(value)) {
        return objectToQueryString(value as Record<string, unknown>, paramKey)
      }
      return `${encodeURIComponent(paramKey)}=${encodeURIComponent(String(value))}`
    })
    .filter(Boolean)
    .join('&')
}

export function formatDateTime(dateString: string): string {
  const date = new Date(dateString)

  // Check if the date is invalid
  if (isNaN(date.getTime())) {
    return '-' // Return "-" if the date is not valid
  }

  const day = date.getDate().toString().padStart(2, '0') // Pad day with leading zero
  const month = date.toLocaleString('default', { month: 'short' }) // Get month as "Oct"
  const year = date.getFullYear()

  // Format hours and minutes
  let hours = date.getHours()
  const minutes = date.getMinutes().toString().padStart(2, '0')
  const ampm = hours >= 12 ? 'pm' : 'am'

  hours = hours % 12 || 12 // Convert to 12-hour format

  return `${day} ${month} ${year} ${hours}:${minutes}${ampm}`
}

export const genderOptions = [
  { name: 'Male', label: 'Male', value: 'male' },
  { name: 'Female', label: 'Female', value: 'female' },
]

export const ticketType = [
  { name: 'General', label: 'General', value: 'General' },
  {
    name: 'Technology Issue',
    label: 'Technology Issue',
    value: 'Technology Issue',
  },
]

export const generateRandomStringToken = (length: number = 32): string => {
  return randomBytes(length).toString('hex')
}
export const generateRandomToken = (length: number = 32): string => {
  const randomNumbers = randomBytes(length)
    .toString('hex') // Convert to hexadecimal
    .replace(/[a-f]/g, '') // Remove any hex letters (a-f)

  // In case the result is shorter than the desired length
  return randomNumbers.slice(0, length)
}

// Encrypt function
export const encryptData = (data: string) => {
  const cipher = createCipheriv('aes-256-cbc', secretKey, iv)
  let encrypted = cipher.update(data, 'utf8', 'hex')
  encrypted += cipher.final('hex')
  return { iv: iv.toString('hex'), encryptedData: encrypted }
}

// Decrypt function
export const decryptData = (iv: string, encryptedData: string) => {
  const decipher = createDecipheriv(
    'aes-256-cbc',
    secretKey,
    Buffer.from(iv, 'hex')
  )
  let decrypted = decipher.update(encryptedData, 'hex', 'utf8')
  decrypted += decipher.final('utf8')
  return decrypted
}

// calculate date range
export const getDateRange = (unit: 'Day' | 'Month' | 'Year' = 'Day') => {
  const now = dayjs()
  let startDate, endDate

  switch (unit) {
    case 'Day':
      startDate = now.format('YYYY-MM-DD')
      endDate = now.format('YYYY-MM-DD')
      break
    case 'Month':
      startDate = now.startOf('month').format('YYYY-MM-DD')
      endDate = now.format('YYYY-MM-DD')
      break
    case 'Year':
      startDate = now.startOf('year').format('YYYY-MM-DD')
      endDate = now.format('YYYY-MM-DD')
      break
    default:
      startDate = now.format('YYYY-MM-DD')
      endDate = now.format('YYYY-MM-DD')
  }

  return { startDate, endDate }
}

// convert csv file //
export const convertToCSV = <T extends object>(data: T[]): string => {
  if (data.length === 0) return ''
  const header = Object.keys(data[0]).join(',')
  const rows = data.map((row) => Object.values(row).join(','))
  return [header, ...rows].join('\n')
}
// download csv file
export const downloadCSV = (csvData: string, filename: string) => {
  const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' })
  const link = document.createElement('a')
  const url = URL.createObjectURL(blob)
  link.setAttribute('href', url)
  link.setAttribute('download', filename)
  link.style.visibility = 'hidden'
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}
