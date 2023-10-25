import { RefObject, useEffect } from 'react'

const useOutsideClick = (ref: RefObject<HTMLElement>, callback: () => void) => {
  const handleClick = (e: MouseEvent) => {
    if (ref.current && e.target && !ref.current.contains(e.target as Node)) {
      callback()
    }
  }

  useEffect(() => {
    document.addEventListener('click', handleClick)

    return () => {
      document.removeEventListener('click', handleClick)
    }
  })
}

export default useOutsideClick
