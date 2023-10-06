import { ButtonHTMLAttributes } from 'react'

interface ButtonProps extends Partial<ButtonHTMLAttributes<HTMLButtonElement>> {
  className?: string
  onClick?: () => void
  btnText: string
}

export const Button = ({
  className,
  onClick,
  btnText,
  ...props
}: ButtonProps) => (
  <button
    className={`w-[100px] h-[30px] rounded border-none cursor-pointer hover:opacity-80 ${
      className && className
    }`}
    type="button"
    onClick={onClick}
    {...props}
  >
    {btnText}
  </button>
)
