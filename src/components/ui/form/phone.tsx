import { Control, Controller, FieldValues, Path } from 'react-hook-form'

interface FormFieldProps<T extends FieldValues> {
  name: Path<T>
  control: Control<T>
  label: string
  required?: boolean
}

export const MobileNumberField = <T extends FieldValues>({
  name,
  control,
  label,
  required = false,
}: FormFieldProps<T>) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState: { error } }) => (
        <div>
          <div className="relative">
            <input
              type="tel" // Changed to 'tel' for phone input
              id="floating_outlined_mobile"
              className={`block px-2.5 pb-2.5 pt-3 w-full text-sm text-gray-900 bg-transparent rounded-lg border border-gray-300 appearance-none  ${error
                ? '  focus:outline-none focus:ring-0 focus:border-red-600'
                : ' focus:outline-none focus:ring-0 focus:border-primary'
                } peer`}
              placeholder=" "
              {...field}
              pattern="\d{10}" // Regex pattern for 10 digits
              maxLength={10} // Limit input to 10 characters
              onInput={(e) => {
                // Allow only numeric input
                e.currentTarget.value = e.currentTarget.value.replace(
                  /[^0-9]/g,
                  ''
                )
              }}
            />
            <label
              htmlFor="floating_outlined_mobile"
              className={`ml-1 absolute text-sm ${error
                ? 'text-red-600 '
                : 'text-primary-500 '
                } duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white  px-2 peer-focus:px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4`}
            >
              {label} {required && <span className="text-red-500">*</span>}
            </label>
          </div>
          {error && (
            <p
              id="outlined_error_help_mobile"
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
