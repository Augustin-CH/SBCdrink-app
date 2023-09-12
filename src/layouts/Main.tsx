import React from 'react'
import { type FC } from 'react'
import { Outlet } from 'react-router-dom'
import { Notification } from '@/features/notification/Notification'

const Main: FC = () => {
  return (
    <div style={{
      backgroundImage: 'url("/assets/images/beach_summer_2.png")',
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
      width: '100vw',
      height: '100vh'
    }}>
        <Notification/>
        <Outlet/>
    </div>
  )
}
export default Main
