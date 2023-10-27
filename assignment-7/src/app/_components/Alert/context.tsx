'use client'

import { createContext } from '@dwarvesf/react-utils'
import { WithChildren } from '../../_types/common'

export type AlertStatus = 'error' | 'success' | 'info' | 'warning'

const [Provider, useAlertContext] = createContext<{
  status: AlertStatus
}>()

export const AlertProvider = ({
  children,
  ...props
}: WithChildren<{ status: AlertStatus }>) => {
  return <Provider value={props}>{children}</Provider>
}

export { useAlertContext }
