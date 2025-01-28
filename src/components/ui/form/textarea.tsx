import { Control, Controller, FieldValues, Path } from 'react-hook-form'

interface TextAreaFieldProps<T extends FieldValues> {
  name: Path<T>
  control: Control<T>
  label: string
  required?: boolean
  rows?: number
  minRows?: number
}

export const TextAreaField = <T extends FieldValues>({
  name,
  control,
  label,
  required = false,
  rows = 4,
  minRows = 3,
}: TextAreaFieldProps<T>) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState: { error } }) => (
        <div>
          <div className="relative">
            <textarea
              id="floating_textarea"
              rows={rows}
              className={`block px-2.5 pb-2.5 pt-3 w-full text-sm text-gray-900 bg-transparent rounded-lg border border-gray-300 appearance-none  ${error
                ? ' border-red-600 focus:outline-none focus:ring-0 focus:border-red-600'
                : ' focus:outline-none focus:ring-0 focus:border-primary'
                } peer`}
              placeholder=" "
              style={{ minHeight: `${minRows * 1.5}em` }}
              {...field}
              {...(field.value && { value: field.value })}
            />
            <label
              htmlFor="floating_textarea"
              className={` ml-1 absolute text-sm transition-all duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white  px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-[13%] peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 ${error
                ? 'text-red-600  peer-focus:text-red-500 '
                : 'text-primary-500 peer-focus:text-primary '
                }`}
            >
              {label} {required && <span className="text-red-500">*</span>}
            </label>
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
