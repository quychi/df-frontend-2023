import { SelectHTMLAttributes } from 'react'

interface SelectProps extends Partial<SelectHTMLAttributes<HTMLSelectElement>> {
  name?: string
  label: string
  items: string[]
  labelClassName?: string
}

export const Select = ({
  label,
  name = '',
  items,
  labelClassName = '',
  ...props
}: SelectProps) => (
  <>
    <label className={labelClassName && labelClassName} htmlFor={name}>
      {label}
    </label>
    <select
      name={name}
      className="w-full h-7 border border-solid border-gray-silver-sand px-2.5 rounded bg-white"
      {...props}
    >
      {items.map((item) => (
        <option value={item} key={item}>
          {item}
        </option>
      ))}
    </select>
  </>
)
