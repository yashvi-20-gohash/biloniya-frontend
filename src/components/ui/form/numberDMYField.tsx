import { Control, Controller, FieldValues, Path } from 'react-hook-form'
import { useState } from 'react'

interface FormFieldProps<T extends FieldValues> {
  name: Path<T>
  control: Control<T>
  label: string
  required?: boolean
  disabled?: boolean
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>
}

export const NumberDMYField = <T extends FieldValues>({
  name,
  control,
  label,
  required = false,
  disabled = false,
  inputProps = {},
}: FormFieldProps<T>) => {
  const [unit, setUnit] = useState('MONTH') // Manage unit selection (KB, MB, GB)

  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState: { error } }) => (
        <div>
          <div className="relative flex items-center">
            <input
              type="text"
              id={name}
              disabled={disabled}
              className={`block px-2.5 pb-2.5 pt-3 w-full text-sm text-gray-900 bg-transparent rounded-l-lg border border-gray-300 appearance-none  ${disabled
                ? 'cursor-not-allowed !bg-gray-100'
                : ''
                } ${error
                  ? ' border-red-600 focus:outline-none focus:ring-0 focus:border-red-600'
                  : ' focus:outline-none focus:ring-0 focus:border-primary'
                } peer`}
              placeholder=" "
              {...field}
              {...inputProps}
              onChange={(e) => {
                const value = e.target.value
                if (/^\d*$/.test(value)) {
                  field.onChange(value ? value.toString() : '')
                }
              }}
              onBlur={field.onBlur}
            />
            <select
              value={unit}
              onChange={(e) => setUnit(e.target.value)}
              className="block px-2.5 pb-2.5 pt-3 text-sm text-gray-900 bg-transparent rounded-r-lg border border-l-0 border-gray-300 appearance-none  focus:outline-none focus:border-primary"
            >
              <option value="MONTH">MONTH</option>
              <option value="YEAR">YEAR</option>
              <option value="DAY">DAY</option>
            </select>
            <label
              htmlFor={name}
              className={`ml-1 absolute text-sm ${error
                ? 'text-red-600 '
                : 'text-primary-500 '
                } duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4`}
            >
              {label} {required && <span className="text-red-500">*</span>}
            </label>
          </div>
          {error && (
            <p
              id="outlined_error_help_number"
              className="mt-2 text-xs text-red-600"
            >
              <span className="font-medium">{error.message}!</span>
            </p>
          )}
        </div>
      )}
    />
  )
}
