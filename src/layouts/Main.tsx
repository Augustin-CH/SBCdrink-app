import React from 'react'
import { type FC } from 'react'
import { Outlet } from 'react-router-dom'
import { Notification } from '@/features/notification/Notification'

const Main: FC = () => {
  return (
    <div>
        <Notification/>
        <Outlet/>
    </div>
  )
}
export default Main
