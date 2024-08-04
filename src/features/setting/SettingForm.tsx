import React, { type FC, useCallback, useEffect, useState } from 'react'
import { Form, Formik, type FormikHelpers } from 'formik'
import { type IBaseSetting } from './types'
import * as yup from 'yup'
import { Button, Grid, TextField } from '@mui/material'
import { useAppDispatch } from '@/app/hooks'
import { type FetchStatus } from '@/app/shared/types'
import { updateSetting } from './SettingSlice'
import { showNotification } from '@/features/notification/notificationSlice'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { AxiosError } from 'axios'

const validationSchema = yup.object({
  timeForOneQuantity: yup.number().required('Le temps pour un centilitre est requis')
})

interface SettingFormProps {
  setting: IBaseSetting
}

const SettingForm: FC<SettingFormProps> = ({
  setting
}) => {
  const [key, setKey] = useState(Math.random())
  const dispatch = useAppDispatch()
  const [requestStatus, setRequestStatus] = useState<FetchStatus>('idle')

  const onSubmit = useCallback(async (values: IBaseSetting, { resetForm }: FormikHelpers<IBaseSetting>): Promise<void> => {
    const newSetting: IBaseSetting = { ...values }
    if (requestStatus === 'idle') {
      try {
        setRequestStatus('loading')
        await dispatch(updateSetting(newSetting)).unwrap()
        resetForm()
        dispatch(showNotification({
          title: 'Paramètre modifié avec succès',
          type: 'success'
        }))
      } catch (e: AxiosError | any) {
        dispatch(showNotification({
          title: 'Une erreur est survenue lors de la modification des paramètres',
          type: 'error'
        }))
      } finally {
        setRequestStatus('idle')
      }
    }
  }, [requestStatus, dispatch])

  useEffect(() => {
    setKey(Math.random())
  }, [setting])

  return (
    <Formik
      initialValues={setting}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
      key={key}
    >
      {({ values, errors, handleChange, handleBlur }) => (
        <Form>
          <Grid container sx={{ mb: 2 }}>
            <Grid container>
              <TextField
                fullWidth
                id="timeForOneQuantity"
                name="timeForOneQuantity"
                label="Temps pour un centilitre"
                value={values.timeForOneQuantity}
                onChange={handleChange}
                onBlur={handleBlur}
                type="number"
                error={!!errors.timeForOneQuantity}
                helperText={errors.timeForOneQuantity}
                required
              />
            </Grid>
          </Grid>
          <Button color="primary" variant="contained" fullWidth type="submit" sx={{ mb: 2 }}>
            Enregistrer
          </Button>
        </Form>
      )}
    </Formik>
  )
}

export default SettingForm
