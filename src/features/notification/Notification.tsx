import React, { useCallback, useEffect } from 'react'
import { type NotificationType } from '@features/notification/types'
import { useAppSelector } from '@/app/hooks'
import { useSnackbar } from 'notistack'
import { Button } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'

export const Notification = () => {
  const { notification: notif } = useAppSelector(state => state.notification)
  const { enqueueSnackbar, closeSnackbar } = useSnackbar()

  const openNotificationWithIcon = useCallback((type: NotificationType, title: string) => {
    enqueueSnackbar(title, {
      variant: type,
      // preventDuplicate: true,
      anchorOrigin: {
        vertical: 'top',
        horizontal: 'right'
      },
      autoHideDuration: 3000,
      persist: false,
      action: (key) => (
                <Button
                    onClick={() => {
                      closeSnackbar(key)
                    }}
                    color="inherit"
                >
                    <CloseIcon/>
                </Button>
      )
    })
  }, [])

  useEffect(() => {
    if (notif != null) {
      openNotificationWithIcon(notif.type, notif.title)
    }
  }, [notif, openNotificationWithIcon])

  return (
        <></>
  )
}
