// import * as React from 'react'
// import { CalendarIcon } from '@radix-ui/react-icons'
// import { format, startOfWeek, endOfWeek } from 'date-fns'
// import { DateRange } from 'react-day-picker'
// import dayjs from 'dayjs'
// import utc from 'dayjs/plugin/utc'
// import timezone from 'dayjs/plugin/timezone'

// import { cn } from '@/src/lib/utils'
// import { Button } from '@/src/components/ui/button'
// import { Calendar } from '@/src/components/ui/calendar'
// import {
//   Popover,
//   PopoverContent,
//   PopoverTrigger,
// } from '@/src/components/ui/popover'
// import { useProfileStore } from '@/src/store/settings/profile-store'

// // Extend dayjs with plugins
// dayjs.extend(utc)
// dayjs.extend(timezone)

// interface DateRangePickerV2Props {
//   onSelect: (range: DateRange | undefined) => void
//   initialDate?: DateRange
//   className?: string
// }

// export function DateRangePickerV2({
//   className,
//   onSelect,
//   initialDate,
// }: DateRangePickerV2Props) {
//   const { profileData } = useProfileStore()

//   // Ensure the timezone is set from profile data
//   const userTimezone = profileData?.timeZone?.value || 'UTC'

//   const currentWeek = React.useMemo(() => {
//     const today = dayjs().tz(userTimezone).toDate() // Convert to user's timezone
//     const from = startOfWeek(today, { weekStartsOn: 0 })
//     const to = endOfWeek(today, { weekStartsOn: 0 })

//     return { from, to }
//   }, [userTimezone])

//   const [date, setDate] = React.useState<DateRange | undefined>(
//     initialDate || currentWeek
//   )

//   const handleSelect = (range: DateRange | undefined) => {
//     setDate(range)
//     onSelect(range)
//   }

//   return (
//     <div className={cn('grid gap-2', className)}>
//       <Popover>
//         <PopoverTrigger asChild>
//           <Button
//             id="date"
//             variant={'outline'}
//             className={cn(
//               'w-[300px] justify-start text-left font-normal',
//               !date && 'text-muted-foreground'
//             )}
//           >
//             <CalendarIcon className="mr-2 h-4 w-4" />
//             {date?.from ? (
//               date.to ? (
//                 <>
//                   {format(date.from, 'LLL dd, y')} -{' '}
//                   {format(date.to, 'LLL dd, y')}
//                 </>
//               ) : (
//                 format(date.from, 'LLL dd, y')
//               )
//             ) : (
//               <span>Pick a date</span>
//             )}
//           </Button>
//         </PopoverTrigger>
//         <PopoverContent className="w-auto p-0" align="start">
//           <Calendar
//             initialFocus
//             mode="range"
//             defaultMonth={date?.from}
//             selected={date}
//             onSelect={handleSelect}
//             numberOfMonths={2}
//           />
//         </PopoverContent>
//       </Popover>
//     </div>
//   )
// }
