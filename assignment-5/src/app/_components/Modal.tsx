import { ReactNode } from 'react'

interface Props {
  isOpen: boolean
  onClose: () => void
  title: string
  children: ReactNode
}

export const Modal = (props: Props) => {
  const { isOpen, onClose, title, children } = props

  if (!isOpen) {
    return null
  }

  return (
    <div className="absolute top-0 left-0 z-10 w-full h-full overflow-hidden bg-gray-200 flex justify-center items-center">
      <div className="p-5 rounded-lg border border-solid border-cyan-800 w-[300px]">
        <div className="flex justify-between items-center h-10">
          <h2 className="font-bold underline underline-offset-2">{title}</h2>
          <button
            type="button"
            className="text-black-400 bg-transparent border-none text-2xl font-bold cursor-pointer hover:opacity-80"
            onClick={onClose}
          >
            &times;
          </button>
        </div>
        <div>{children}</div>
      </div>
    </div>
  )
}
