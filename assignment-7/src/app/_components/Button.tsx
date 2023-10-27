import { ButtonHTMLAttributes } from 'react'

interface ButtonProps extends Partial<ButtonHTMLAttributes<HTMLButtonElement>> {
  className?: string
  onClick?: () => void
  btnText: string
  isLoading?: boolean
}

export const Button = ({
  className,
  onClick,
  btnText,
  isLoading = false,
  ...props
}: ButtonProps) => (
  <button
    className={`w-[100px] h-[30px] rounded border-none cursor-pointer hover:opacity-80 ${
      className && className
    } ${isLoading ? 'cursor-wait' : ''}`}
    disabled={isLoading}
    type="button"
    onClick={onClick}
    {...props}
  >
    {btnText}
  </button>
)
