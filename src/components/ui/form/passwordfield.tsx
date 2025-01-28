import { Control, Controller, FieldValues, Path } from 'react-hook-form'
import { useState } from 'react'
import { Eye, EyeOff } from 'lucide-react'

interface FormFieldProps<T extends FieldValues> {
  name: Path<T>
  control: Control<T>
  label: string
  required?: boolean
  disabled?: boolean // New prop for disabled state
}

export const PasswordField = <T extends FieldValues>({
  name,
  control,
  label,
  required = false,
  disabled = false, // Default disabled to false
  ...others
}: FormFieldProps<T>) => {
  const [showPassword, setShowPassword] = useState(false)

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev)
  }

  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState: { error } }) => (
        <div>
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              id={name}
              disabled={disabled} // Apply disabled prop here
              className={`block px-2.5 pb-2.5 pt-3 w-full text-sm text-gray-900 bg-transparent rounded border border-gray-300 appearance-none  ${disabled
                ? 'cursor-not-allowed !bg-gray-100 ' // Add styles for disabled state
                : ''
                } ${error
                  ? ' border-red-600  focus:outline-none focus:ring-0 focus:border-red-600'
                  : ' focus:outline-none focus:ring-0 focus:border-primary'
                } peer`}
              placeholder=" "
              {...field}
              {...others}
            />
            <label
              htmlFor={name}
              className={`absolute text-sm ${error
                ? 'text-red-600  peer-focus:text-red-500 '
                : 'text-primary-500  peer-focus:text-primary '
                } duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white  px-2 peer-focus:px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1`}
            >
              {label} {required && <span className="text-red-500">*</span>}
            </label>

            {!disabled && (
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="focus:outline-none"
                >
                  {showPassword ? (
                    <Eye className="h-5 w-5 text-gray-500 " />
                  ) : (
                    <EyeOff className="h-5 w-5 text-gray-500 " />
                  )}
                </button>
              </div>
            )}
          </div>
          {error && (
            <p
              id="outlined_error_help"
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
