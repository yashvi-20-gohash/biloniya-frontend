import { ChevronDown, ChevronUp } from 'lucide-react'
import { useState } from 'react'
import { Control, Controller, FieldValues, Path } from 'react-hook-form'

interface SelectOption<T> {
  value: T
  label: string
}

type SelectOptions<T> = readonly SelectOption<T>[]

interface CustomSelectProps<
  T extends FieldValues,
  U extends string | number | boolean,
> {
  name: Path<T>
  control: Control<T>
  label: string
  required?: boolean
  options: SelectOptions<U>
  defaultValue?: SelectOption<U>
  disabled?: boolean
  onChange?: (option: SelectOption<U>) => void
}

export const SelectField = <
  T extends FieldValues,
  U extends string | number | boolean,
>({
  name,
  control,
  label,
  required = false,
  options,
  disabled = false,
  onChange,
}: CustomSelectProps<T, U>) => {
  const [isOpen, setIsOpen] = useState(false)

  const isOptionObject = (option: unknown): option is SelectOption<U> => {
    return (
      typeof option === 'object' &&
      option !== null &&
      'value' in option &&
      'label' in option
    )
  }

  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState: { error } }) => (
        <div className="relative">
          <div className="flex flex-col">
            <div
              className={`cursor-pointer block w-full px-2.5 pb-2.5 pt-[0.725rem] text-sm text-gray-900 bg-transparent rounded-lg border border-gray-300 appearance-none ${disabled
                ? 'cursor-not-allowed !bg-gray-100'
                : error
                  ? ' border-red-600 '
                  : ''
                }`}
              onClick={() => {
                if (!disabled) {
                  setIsOpen((prev) => !prev)
                }
              }}
            >
              <span>
                {field.value && isOptionObject(field.value)
                  ? field.value.label
                  : field.value !== undefined
                    ? field.value
                    : label}
              </span>
              {isOpen ? (
                <ChevronUp className="h-5 w-5 inline float-right" />
              ) : (
                <ChevronDown className="h-5 w-5 inline float-right" />
              )}
            </div>

            {isOpen && !disabled && (
              <div className="absolute w-full z-50 mt-12 bg-white rounded-xl shadow-xl max-h-48 overflow-y-auto">
                {options.map((option) => (
                  <div
                    key={option.value.toString()}
                    className={`cursor-pointer text-sm px-4 py-2 hover:bg-[#EEF6EE] hover:text-black text-gray-700 ${option.value ===
                      (isOptionObject(field.value)
                        ? field.value.value
                        : field.value)
                      ? 'bg-primary text-white'
                      : ''
                      }`}
                    onClick={() => {
                      field.onChange(option)
                      onChange?.(option)
                      setIsOpen(false)
                    }}
                  >
                    {option.label}
                  </div>
                ))}
              </div>
            )}
            <label
              className={`ml-2 mt-[-3px] absolute text-sm transition-transform duration-300 transform ${field.value ? '-translate-y-4 scale-75 top-2 z-1' : 'top-1/2 '
                } origin-[0] bg-white px-2`}
            >
              {label} {required && <span className="text-red-500">*</span>}
            </label>
          </div>
          {error && (
            <p className="mt-2 text-xs text-red-600">
              <span className="font-medium">{error.message}!</span>
            </p>
          )}
        </div>
      )}
    />
  )
}
