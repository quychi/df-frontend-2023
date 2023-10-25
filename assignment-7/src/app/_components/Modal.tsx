import { ReactNode, useRef } from 'react'
import useOutsideClick from '../_hooks/useClickOutside'

interface Props {
  isOpen: boolean
  onClose: () => void
  title: string
  children: ReactNode
}

export const Modal = (props: Props) => {
  const { isOpen, onClose, title, children } = props

  const modalRef = useRef<HTMLDivElement | null>(null)

  useOutsideClick(modalRef, () => {
    onClose?.()
  })

  if (!isOpen) {
    return null
  }

  return (
    <div className="absolute top-0 left-0 z-10 w-full h-full overflow-hidden bg-white flex justify-center items-center">
      <div
        ref={modalRef}
        className="p-5 rounded-lg border border-solid border-cyan-800 w-[300px]"
      >
        <h2 className="text-center font-bold underline underline-offset-2 h-12">
          {title}
        </h2>
        <div>{children}</div>
      </div>
    </div>
  )
}
