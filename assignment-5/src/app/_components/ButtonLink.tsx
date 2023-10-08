import { ButtonHTMLAttributes } from 'react'

interface ButtonLinkProps
  extends Partial<ButtonHTMLAttributes<HTMLButtonElement>> {
  onClick?: () => void
  btnText: string
  className?: string
}

export const ButtonLink = ({
  onClick,
  btnText,
  className = '',
  ...props
}: ButtonLinkProps) => (
  <button
    className={`w-fit h-fit bg-transparent underline text-red-secondary cursor-pointer hover:opacity-80 ${
      className || 'border-none'
    }`}
    type="button"
    onClick={onClick}
    {...props}
  >
    {btnText}
  </button>
)
