import React, { type FC, useCallback, useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '@/app/hooks'
import ManageSetting from '@/features/setting/ManageSetting'
import { fetchSettings } from '@/features/setting/SettingSlice'

const Setting: FC = () => {
  const dispatch = useAppDispatch()

  const { setting, settingStatus } = useAppSelector(state => state.setting)

  const fetchData = useCallback(() => {
    dispatch(fetchSettings())
  }, [dispatch])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  return (
    <>
      <ManageSetting
        setting={setting}
        settingStatus={settingStatus}
      />
    </>
  )
}

export default Setting
