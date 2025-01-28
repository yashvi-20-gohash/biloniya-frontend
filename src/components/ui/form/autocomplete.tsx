'use client'

import * as React from 'react'
import { Check, ChevronsUpDown } from 'lucide-react'
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
import {
  Control,
  Controller,
  ControllerFieldState,
  ControllerRenderProps,
  FieldValues,
  Path,
  UseFormStateReturn,
} from 'react-hook-form'

type Option = { name: string; value: string }

interface CustomSelectProps<T extends FieldValues> {
  name: Path<T>
  control: Control<T>
  label: string
  required?: boolean
  options: Option[]
  defaultValue?: Option | null
  value?: Option | null
  setValue?: (value: Option) => void
  disabled?: boolean
}

export const Autocomplete = <T extends FieldValues>({
  name,
  control,
  label,
  options,
  defaultValue,
  value,
  required,
  setValue,
  disabled = false,
}: CustomSelectProps<T>) => {
  const [open, setOpen] = React.useState(false)
  const [searchQuery, setSearchQuery] = React.useState('')
  const [autocompleteValue, setAutocompleteValue] =
    React.useState<Option | null>(null)

  React.useEffect(() => {
    if (defaultValue) {
      setAutocompleteValue(defaultValue)
    } else if (value) {
      setAutocompleteValue(value)
    }
  }, [defaultValue, value])

  const filteredOptions = React.useMemo(() => {
    return options?.filter((option) => {
      const normalizedSearch = searchQuery?.toLowerCase().trim()
      return (
        (option?.name &&
          option.name.toLowerCase().includes(normalizedSearch)) ||
        (option?.value && option.value.toLowerCase().includes(normalizedSearch))
      )
    })
  }, [options, searchQuery])

  const AutocompleteFile = ({
    field,
    fieldState: { error },
  }: {
    field: ControllerRenderProps<T, Path<T>>
    fieldState: ControllerFieldState
    formState: UseFormStateReturn<T>
  }) => {
    React.useEffect(() => {
      if (field.value) {
        setAutocompleteValue(field.value)
      } else {
        setAutocompleteValue(null)
      }
    }, [field.value])

    return (
      <div>
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={open}
              disabled={disabled}
              className={cn(
                'w-full h-11 justify-between',
                disabled
                  ? 'cursor-not-allowed bg-gray-100 '
                  : '',
                error || (required && !field.value) ? 'border-red-500' : ''
              )}
            >
              {autocompleteValue
                ? options.find(
                  (option) => option.value === autocompleteValue?.value
                )?.name
                : ` ${label}`}
              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-full p-0">
            <Command shouldFilter={false}>
              <CommandInput
                placeholder={`Search ${label}...`}
                onValueChange={setSearchQuery}
              />
              <CommandList>
                <CommandEmpty>{`No ${label} found.`}</CommandEmpty>
                <CommandGroup>
                  {filteredOptions?.map((option) => (
                    <CommandItem
                      key={option.value}
                      value={option.value}
                      onSelect={() => {
                        setAutocompleteValue(option)
                        field.onChange(option)
                        setValue?.(option)
                        setOpen(false)
                        setSearchQuery('')
                      }}
                    >
                      <Check
                        className={cn(
                          'mr-2 h-4 w-4',
                          autocompleteValue?.value === option.value
                            ? 'opacity-100'
                            : 'opacity-0'
                        )}
                      />
                      {option.name}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
        {(error || (required && !field.value)) && (
          <p className="mt-2 text-red-500 text-sm">
            {error?.message ?? `Please select ${label}`}
          </p>
        )}
      </div>
    )
  }

  return <Controller control={control} name={name} render={AutocompleteFile} />
}
