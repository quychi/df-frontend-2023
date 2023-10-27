import React from 'react'
import { IconExlamationCirleSolid } from '../../_icons/components/IconExlamationCirleSolid'
import { IconCloseCircleSolid } from '../../_icons/components/IconCloseCircleSolid'
import { IconCheckCircleSolid } from '../../_icons/components/IconCheckCircleSolid'
import { IconInformationCircleSolid } from '../../_icons/components/IconInformationCircleSolid'
import { useAlertContext, AlertStatus } from './context'
import styles from './Alert.styles'

function getIcon(status: AlertStatus) {
  if (status === 'error') {
    return IconCloseCircleSolid
  }

  if (status === 'success') {
    return IconCheckCircleSolid
  }

  if (status === 'warning') {
    return IconExlamationCirleSolid
  }

  return IconInformationCircleSolid
}

export const AlertIcon = () => {
  const { status } = useAlertContext()
  const Icon = getIcon(status)

  return (
    <div className={styles({ status }).icon()}>
      <Icon />
    </div>
  )
}
