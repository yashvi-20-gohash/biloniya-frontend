import { ReactNode } from 'react'
import {
  Control,
  Controller,
  FieldValues,
  Path,
  ControllerRenderProps,
} from 'react-hook-form'
import { FormItem, FormLabel, FormControl, FormMessage } from '../ui/form'

interface FormFieldProps<T extends FieldValues> {
  name: Path<T>
  control: Control<T>
  label: string
  render: (field: ControllerRenderProps<T, Path<T>>) => ReactNode
  required?: boolean
  isSelect?: boolean
  options?: string[]
}

export const FormField = <T extends FieldValues>({
  name,
  control,
  label,
  required = false,
  isSelect = false,
  options = [],
}: FormFieldProps<T>) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState: { error } }) => (
        <FormItem className="mb-4">
          <FormLabel className="block text-sm font-medium text-white-700">
            {label} {required && <span className="text-red-500">*</span>}
          </FormLabel>
          <FormControl>
            {isSelect ? (
              <select
                {...field}
                className={`mt-1 outline-none  block w-full rounded py-2 px-1 border-gray-300 border shadow-sm focus:border-primary focus:text-primary focus:opacity-50 ${
                  error ? 'border-red-500' : ''
                }`}
              >
                {options.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            ) : (
              // Rendering other types of inputs with full width, outline, padding
              <input
                {...field}
                className={`mt-1 block outline-none w-full rounded py-2 px-1 border border-gray-300 shadow-sm focus:border-primary  focus:text-primary focus:opacity-50 ${
                  error ? 'border-red-500' : ''
                }`}
              />
            )}
          </FormControl>
          {error && (
            <FormMessage className="mt-1 text-red-500 text-sm">
              {error.message}
            </FormMessage>
          )}
        </FormItem>
      )}
    />
  )
}
