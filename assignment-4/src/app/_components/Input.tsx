import { InputHTMLAttributes } from 'react'

interface InputProps extends Partial<InputHTMLAttributes<HTMLInputElement>> {
  placeholder?: string
  onChange?: (event) => void
}

export const Input = ({ placeholder = '', onChange, ...props }: InputProps) => {
  return (
    <input
      className="w-full h-7 rounded border border-gray-silver-sand p-x-2.5 text-base  placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent"
      type="text"
      onChange={onChange}
      placeholder={placeholder}
      {...props}
    />
  )
}
