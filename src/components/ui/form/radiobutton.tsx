import { Control, Controller, FieldValues, Path } from 'react-hook-form'

interface RadioButtonFieldProps<T extends FieldValues> {
  name: Path<T>
  control: Control<T>
  label: string
  required?: boolean
  options: string[] // Make options required for radio buttons
  capitalize?: boolean // Option to capitalize labels
  disabled?: boolean // Option to disable radio buttons
  onChange?: (value: string) => void
}

export const RadioButtonField = <T extends FieldValues>({
  name,
  control,
  label,
  required = false,
  options,
  capitalize = false,
  disabled = false,
  onChange,
}: RadioButtonFieldProps<T>) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState: { error } }) => (
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            {label} {required && <span className="text-red-500">*</span>}
          </label>

          <div className="flex flex-col space-y-1">
            {options.map((option) => {
              const label = capitalize ? option.toUpperCase() : option
              return (
                <label
                  key={option}
                  className={`flex items-center space-x-2 ${disabled ? 'cursor-not-allowed opacity-50' : ''
                    }`}
                >
                  <input
                    type="radio"
                    value={option}
                    checked={field.value === option}
                    disabled={disabled}
                    className={`text-primary-600 border-gray-300 focus:ring-primary ${error ? 'border-red-500' : ''
                      }`}
                    onChange={(e) => {
                      field.onChange(e.target.value)
                      onChange?.(e.target.value)
                    }}
                  />
                  <span className="text-gray-900 ">{label}</span>
                </label>
              )
            })}
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
