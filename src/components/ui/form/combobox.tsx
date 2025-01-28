'use client'

import * as React from 'react'
import { CaretSortIcon, CheckIcon } from '@radix-ui/react-icons'

import { cn } from '@/src/lib/utils'
import { Button } from '@/src/components/ui/button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/src/components/ui/command'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/src/components/ui/popover'

interface ComboboxOptions {
  options: Array<{ value: string; label: string }>
  value: string
  setValue: (value: string) => void
  open: boolean
  setOpen: (value: boolean) => void
  buttonClassName?: string
  commandInputClassName?: string
  commandItemClassName?: string
  placeholder: string
}

export function Combobox({
  options,
  value,
  setValue,
  buttonClassName,
  commandInputClassName,
  commandItemClassName,
  placeholder = 'Select option...',
  open,
  setOpen,
}: ComboboxOptions) {
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn('w-[200px] justify-between', buttonClassName)}
        >
          {value
            ? options.find((option) => option.value === value)?.label
            : placeholder}
          <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput
            placeholder={placeholder}
            className={cn('h-9', commandInputClassName)}
          />
          <CommandList>
            <CommandEmpty>No option found.</CommandEmpty>
            <CommandGroup>
              {options.map((option) => (
                <CommandItem
                  key={option.value}
                  value={option.value}
                  onSelect={(currentValue) => {
                    const newValue = currentValue === value ? '' : currentValue
                    setValue(newValue)
                    setOpen(false)
                  }}
                  className={cn(
                    'flex justify-between items-center px-2 py-1 hover:bg-gray-100',
                    value === option.value ? 'bg-gray-200' : '',
                    commandItemClassName
                  )}
                >
                  {option.label}
                  <CheckIcon
                    className={cn(
                      'ml-auto h-4 w-4',
                      value === option.value ? 'opacity-100' : 'opacity-0'
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
