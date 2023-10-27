import { HTMLAttributes } from 'react'
import { useAlertContext } from './context'
import styles from './Alert.styles'

interface Props extends HTMLAttributes<HTMLElement> {
  children: React.ReactNode
}

export const AlertContent = ({ children, ...props }: Props) => {
  const { status } = useAlertContext()
  return (
    <p className={styles({ status }).content()} {...props}>
      {children}
    </p>
  )
}
