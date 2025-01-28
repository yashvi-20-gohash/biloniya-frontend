import { Control, Controller, FieldValues, Path } from 'react-hook-form'
import { Checkbox } from '../checkbox'

interface CheckboxFieldProps<T extends FieldValues> {
  name: Path<T>
  control: Control<T>
  label: string
  description: string
  required?: boolean
}

export const CheckboxFieldV2 = <T extends FieldValues>({
  name,
  control,
  label,
  description,
  required = false,
}: CheckboxFieldProps<T>) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState: { error } }) => (
        <div className="items-top flex space-x-2">
          {/* Ensure onChange is passed to handle toggling */}
          <Checkbox
            id={name}
            {...field}
            checked={field.value}
            onCheckedChange={(checked) => field.onChange(checked)} // Properly update field value
          />
          <div className="grid gap-1.5 leading-none">
            <label
              htmlFor={name}
              className="text-sm ml-2 font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              {label} {required && <span className="text-red-500">*</span>}
            </label>
            <p className="text-sm text-muted-foreground">{description}</p>
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
