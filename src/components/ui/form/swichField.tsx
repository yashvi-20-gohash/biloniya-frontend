import { Control, Controller, FieldValues, Path } from 'react-hook-form'

interface SwitchFieldProps<T extends FieldValues> {
  name: Path<T>
  control: Control<T>
  label: string
  required?: boolean
  isChecked: boolean // Prop to determine the checked state
  onChange: () => void // Prop to handle change
}

export const SwitchField = <T extends FieldValues>({
  name,
  control,
  label,
  required = false,
  isChecked,
  onChange,
}: SwitchFieldProps<T>) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({ fieldState: { error } }) => (
        <div className="flex items-center space-x-2">
          <button
            type="button"
            className={`relative inline-flex items-center h-6 rounded-full w-11 transition-colors duration-200 ease-in-out ${isChecked ? 'bg-primary' : 'bg-gray-200'
              }`}
            onClick={onChange} // Call the onChange prop when clicked
          >
            <span
              className={`translate-x-1 inline-block w-4 h-4 rounded-full bg-white shadow transform transition-transform duration-200 ease-in-out ${isChecked ? 'translate-x-6' : ''
                }`}
            />
          </button>
          <div className="grid gap-1.5 leading-none">
            <label htmlFor={name} className="text-sm font-medium leading-none">
              {label} {required && <span className="text-red-500">*</span>}
            </label>
          </div>
          {error && (
            <p className="mt-2 text-xs text-red-600 ">
              <span className="font-medium">{error.message}!</span>
            </p>
          )}
        </div>
      )}
    />
  )
}
