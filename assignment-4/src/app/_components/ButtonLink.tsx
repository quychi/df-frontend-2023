import { ButtonHTMLAttributes } from 'react'

interface ButtonLinkProps
  extends Partial<ButtonHTMLAttributes<HTMLButtonElement>> {
  onClick?: () => void
  btnText: string
}

export const ButtonLink = ({ onClick, btnText, ...props }: ButtonLinkProps) => (
  <button
    className="w-fit h-fit border-none bg-transparent underline text-red-secondary cursor-pointer hover:opacity-80"
    type="button"
    onClick={onClick}
    {...props}
  >
    {btnText}
  </button>
)
