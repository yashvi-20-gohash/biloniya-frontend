// import { Button } from '@/src/components/ui/button'
// import { Calendar } from '@/src/components/ui/calendar'
// import {
//   Popover,
//   PopoverContent,
//   PopoverTrigger,
// } from '@/src/components/ui/popover'
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from '@/src/components/ui/select'
// import { cn } from '@/src/lib/utils'
// import { useProfileStore } from '@/src/store/settings/profile-store'
// import { format } from 'date-fns' // Only import what's necessary
// import dayjs from 'dayjs'
// import isSameOrAfter from 'dayjs/plugin/isSameOrAfter' // Import the plugin
// import timezone from 'dayjs/plugin/timezone'
// import utc from 'dayjs/plugin/utc'
// import { Calendar as CalendarIcon } from 'lucide-react'
// import * as React from 'react'

// // Extend dayjs with plugins
// dayjs.extend(utc)
// dayjs.extend(timezone)
// dayjs.extend(isSameOrAfter) // Extend dayjs with isSameOrAfter plugin

// interface DatePickerWithPresetsProps {
//   disablePast?: boolean
//   onChange?: (date: Date | undefined) => void // Prop for handling date change
//   onBlur?: () => void // Prop for handling blur
//   value?: Date | null // Value of the date field
//   name?: string // Name of the field
//   ref?: React.Ref<unknown> // Reference
// }

// export function DatePickerWithPresets({
//   disablePast,
//   onChange,
//   value, // The value that comes from the form state
// }: DatePickerWithPresetsProps) {
//   const { profileData } = useProfileStore()
//   const userTimezone = profileData?.timeZone?.value || 'UTC' // Ensure the timezone is set from profile data

//   const [date, setDate] = React.useState<Date | undefined>(
//     value || dayjs().tz(userTimezone).startOf('day').toDate() // Set the default value in user's timezone
//   )

//   const [isOpen, setIsOpen] = React.useState(false)

//   // Get today's date in user's timezone without time component
//   const today = dayjs().tz(userTimezone).startOf('day').toDate()

//   // Compare only the date parts, ignoring time
//   const isSameOrAfterToday = (selectedDate: Date) => {
//     return dayjs(selectedDate).isSameOrAfter(dayjs(today), 'day')
//   }

//   return (
//     <Popover open={isOpen} onOpenChange={setIsOpen}>
//       <PopoverTrigger asChild style={{ padding: '21px 15px' }}>
//         <Button
//           variant={'outline'}
//           className={cn(
//             'w-full justify-start text-left font-normal',
//             !date && 'text-muted-foreground'
//           )}
//           onClick={() => setIsOpen(true)} // Open the popover on button click
//         >
//           <CalendarIcon className="mr-2 h-4 w-4" />
//           {date ? format(date, 'PPP') : <span>Pick a date</span>}
//         </Button>
//       </PopoverTrigger>
//       <PopoverContent className="flex w-full flex-col space-y-2 p-4">
//         <Select
//           onValueChange={(value) => {
//             const newDate = dayjs(today)
//               .tz(userTimezone)
//               .add(parseInt(value), 'day')
//               .toDate() // Calculate the new date
//             setDate(newDate)
//             onChange?.(newDate) // Propagate the change to the parent
//             setIsOpen(false) // Close popover when date is selected
//           }}
//         >
//           <SelectTrigger>
//             <SelectValue placeholder="Select" />
//           </SelectTrigger>
//           <SelectContent position="popper">
//             <SelectItem value="0">Today</SelectItem>
//             <SelectItem value="1">Tomorrow</SelectItem>
//             <SelectItem value="3">In 3 days</SelectItem>
//             <SelectItem value="7">In a week</SelectItem>
//           </SelectContent>
//         </Select>
//         <div className="rounded-md border w-full p-6">
//           <Calendar
//             mode="single"
//             selected={date}
//             onSelect={(selectedDate) => {
//               if (
//                 selectedDate &&
//                 disablePast &&
//                 !isSameOrAfterToday(selectedDate)
//               ) {
//                 return // Block past dates
//               }
//               setDate(selectedDate || undefined) // Ensure the date is defined or reset to undefined
//               onChange?.(selectedDate || undefined) // Propagate the change to the parent
//               setIsOpen(false) // Close the popover when a date is selected
//             }}
//             disabled={(date) =>
//               disablePast ? !isSameOrAfterToday(date) : false
//             } // Disable past dates, but allow today
//           />
//         </div>
//       </PopoverContent>
//     </Popover>
//   )
// }

import { Button } from '@/src/components/ui/button'
import { Calendar } from '@/src/components/ui/calendar'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/src/components/ui/popover'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/src/components/ui/select'
import { cn } from '@/src/lib/utils'
import { format } from 'date-fns'
import dayjs from 'dayjs'
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter'
import timezone from 'dayjs/plugin/timezone'
import utc from 'dayjs/plugin/utc'
import { Calendar as CalendarIcon } from 'lucide-react'
import * as React from 'react'

// Extend dayjs with plugins
dayjs.extend(utc)
dayjs.extend(timezone)
dayjs.extend(isSameOrAfter)

interface DatePickerWithPresetsProps {
  disablePast?: boolean
  onChange?: (date: Date | undefined) => void
  onBlur?: () => void
  value?: Date | null
  name?: string
  ref?: React.Ref<unknown>
  userTimezone?: string // Added prop for timezone
}

export function DatePickerWithPresets({
  disablePast,
  onChange,
  value,
  userTimezone = 'UTC', // Default timezone is UTC
}: DatePickerWithPresetsProps) {
  const [date, setDate] = React.useState<Date | undefined>(
    value || dayjs().tz(userTimezone).startOf('day').toDate()
  )

  const [isOpen, setIsOpen] = React.useState(false)

  // Get today's date in user's timezone without time component
  const today = dayjs().tz(userTimezone).startOf('day').toDate()

  // Compare only the date parts, ignoring time
  const isSameOrAfterToday = (selectedDate: Date) => {
    return dayjs(selectedDate).isSameOrAfter(dayjs(today), 'day')
  }

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild style={{ padding: '21px 15px' }}>
        <Button
          variant={'outline'}
          className={cn(
            'w-full justify-start text-left font-normal',
            !date && 'text-muted-foreground'
          )}
          onClick={() => setIsOpen(true)}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? format(date, 'PPP') : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="flex w-full flex-col space-y-2 p-4">
        <Select
          onValueChange={(value) => {
            const newDate = dayjs(today)
              .tz(userTimezone)
              .add(parseInt(value), 'day')
              .toDate()
            setDate(newDate)
            onChange?.(newDate)
            setIsOpen(false)
          }}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select" />
          </SelectTrigger>
          <SelectContent position="popper">
            <SelectItem value="0">Today</SelectItem>
            <SelectItem value="1">Tomorrow</SelectItem>
            <SelectItem value="3">In 3 days</SelectItem>
            <SelectItem value="7">In a week</SelectItem>
          </SelectContent>
        </Select>
        <div className="rounded-md border w-full p-6">
          <Calendar
            mode="single"
            selected={date}
            onSelect={(selectedDate) => {
              if (
                selectedDate &&
                disablePast &&
                !isSameOrAfterToday(selectedDate)
              ) {
                return
              }
              setDate(selectedDate || undefined)
              onChange?.(selectedDate || undefined)
              setIsOpen(false)
            }}
            disabled={(date) =>
              disablePast ? !isSameOrAfterToday(date) : false
            }
          />
        </div>
      </PopoverContent>
    </Popover>
  )
}
