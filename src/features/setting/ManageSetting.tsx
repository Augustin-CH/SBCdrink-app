import React, { type FC, useCallback } from 'react'
import { Grid } from '@mui/material'
import { type FetchStatus } from '@/app/shared/types'
import Loader from '@/features/ui/loader/loader'
import { type IBaseSetting } from './types'
import SettingForm from './SettingForm'

interface ManageSettingProps {
  setting: IBaseSetting
  settingStatus: FetchStatus
}

const ManageSetting: FC<ManageSettingProps> = ({
  setting,
  settingStatus
}) => {
  // const dispatch = useAppDispatch()

  const renderContent = useCallback(() => {
    if (settingStatus === 'failed') {
      return (
        <h3>
            Erreur lors du chargement des paramètres
        </h3>
      )
    } else if (settingStatus === 'loading') {
      return <Loader styles={{ minHeight: 300 }}/>
    } else {
      return (
        <Grid container>
          <SettingForm setting={setting} />
        </Grid>
      )
    }
  }, [setting, settingStatus])

  return (
    <>
      {renderContent()}
    </>
  )
}

export default ManageSetting
