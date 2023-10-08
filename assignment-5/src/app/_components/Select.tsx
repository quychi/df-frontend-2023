import { SelectHTMLAttributes } from 'react'
import { FieldError, UseFormRegisterReturn } from 'react-hook-form'

interface SelectProps extends Partial<SelectHTMLAttributes<HTMLSelectElement>> {
  name?: string
  label: string
  items: string[]
  labelClassName?: string
  registration: Partial<UseFormRegisterReturn>
  error?: FieldError | undefined
}

export const Select = ({
  label,
  name = '',
  items,
  labelClassName = '',
  registration,
  error,
  ...props
}: SelectProps) => (
  <>
    <label className={labelClassName && labelClassName} htmlFor={name}>
      {label}
    </label>
    <select
      name={name}
      className="w-full h-7 border border-solid border-gray-silver-sand px-2.5 rounded bg-white"
      {...registration}
      {...props}
    >
      {items.map((item) => (
        <option value={item} key={item}>
          {item}
        </option>
      ))}
    </select>
    {error && <p className="text-red-primary font-normal">{error.message}</p>}
  </>
)
