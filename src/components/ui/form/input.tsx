import { Control, Controller, FieldValues, Path } from 'react-hook-form'

interface FormFieldProps<T extends FieldValues> {
  name: Path<T>
  control: Control<T>
  label: string
  type?: string
  placeholder?: string
  required?: boolean
  isSelect?: boolean
  options?: string[]
  capitalize?: boolean
  disabled?: boolean
  onChange?: (value: string) => void
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>
}

export const TextField = <T extends FieldValues>({
  name,
  control,
  label,
  required = false,
  capitalize = false,
  disabled = false,
  onChange,
  inputProps = {},
  ...others
}: FormFieldProps<T>) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState: { error } }) => (
        <div>
          <div className="relative">
            <input
              id={field.name}
              disabled={disabled}
              className={`block px-2.5 pb-2.5 pt-3 w-full text-sm text-gray-900 bg-transparent rounded border border-gray-300 appearance-none  ${disabled
                ? 'cursor-not-allowed !bg-gray-100 '
                : ''
                } ${error
                  ? ' border-red-600  focus:outline-none focus:ring-0 focus:border-red-600'
                  : 'focus:outline-none focus:ring-0 focus:border-primary'
                } peer`}
              placeholder=""
              {...field}
              {...inputProps}
              value={
                typeof field.value === 'object'
                  ? field.value.value
                  : field.value
              }
              onChange={(e) => {
                const newValue = capitalize
                  ? e.target.value.toUpperCase()
                  : e.target.value
                field.onChange(newValue)
                onChange?.(e.target.value)
              }}
              {...others}
            />
            <label
              htmlFor={field.name}
              className={`absolute text-sm ${error
                ? 'text-red-600 peer-focus:text-red-500'
                : 'text-primary-500 peer-focus:text-primary'
                } duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1`}
            >
              {label} {required && <span className="text-red-500"></span>}
            </label>
          </div>

          {error && (
            <p
              id="outlined_error_help"
              className="mt-2 text-xs text-red-600 "
            >
              <span className="font-medium">{error.message}!</span>
            </p>
          )}
        </div>
      )}
    />
  )
}
