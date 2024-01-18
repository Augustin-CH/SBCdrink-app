import React, { useEffect } from 'react'
import { type FC } from 'react'
import { Outlet } from 'react-router-dom'
import { Notification } from '@/features/notification/Notification'
import { useAppDispatch } from '@/app/hooks'
import { listenCocktails } from '@/features/cocktail/CocktailSlice'
import { unsubscribeCocktails } from '@/lib/supabase/supabase'

const Main: FC = () => {
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(listenCocktails())

    return () => {
      unsubscribeCocktails()
    }
  }, [dispatch])

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
