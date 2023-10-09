import { ChangeEventHandler, InputHTMLAttributes } from 'react'
import { FieldError, UseFormRegisterReturn } from 'react-hook-form'

interface InputProps extends Partial<InputHTMLAttributes<HTMLInputElement>> {
  type?: 'text' | 'password'
  placeholder?: string
  onChange?: ChangeEventHandler<HTMLInputElement>
  registration?: Partial<UseFormRegisterReturn>
  error?: FieldError | undefined
}

export const Input = ({
  type = 'text',
  placeholder = '',
  onChange,
  registration,
  error,
  ...props
}: InputProps) => {
  return (
    <div>
      <input
        className={`w-full h-7 rounded px-2.5 text-base placeholder:font-normal placeholder:text-gray-400 border-gray-silver-sand focus:border-transparent focus:outline-none focus:ring-2 border${
          error ? 'border-red-300 focus:ring-red-300' : ' focus:ring-blue-300'
        }`}
        type={type}
        onChange={onChange}
        placeholder={placeholder}
        {...registration}
        {...props}
      />
      {error && <p className="text-red-primary font-normal">{error.message}</p>}
    </div>
  )
}
