import React from 'react'
import { useFormik } from 'formik'
import * as yup from 'yup'
import { Button, Grid, Modal, TextField, Typography } from '@mui/material'
import { type FC, useState } from 'react'
import { type IBaseCocktail } from '@features/cocktail/types'
import { useAppDispatch } from '@/app/hooks'
import { type FetchStatus } from '@/app/shared/types'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { AxiosError } from 'axios'
import { showNotification } from '@/features/notification/notificationSlice'
import { BoxModal } from '@/features/ui/components/BoxModal/BoxModal'

const validationSchema = yup.object({

})

interface CocktailFormProps {
  mode: 'add' | 'edit'
  className?: string
  cocktail?: IBaseCocktail
  request: (values: any) => void
  title: string
  submitText: string
  notificationSuccess: string
  notificationError: string
  isModalOpen: boolean
  onCloseModal: () => void
}

const CocktailForm: FC<CocktailFormProps> = ({
  mode,
  className,
  cocktail,
  request,
  title,
  submitText,
  notificationSuccess,
  notificationError,
  isModalOpen,
  onCloseModal
}) => {
  const dispatch = useAppDispatch()
  const [requestStatus, setRequestStatus] = useState<FetchStatus>('idle')

  const formik = useFormik({
    initialValues: {} as IBaseCocktail,
    validationSchema,
    onSubmit: async (values: any) => {
      if (requestStatus === 'idle') {
        try {
          setRequestStatus('loading')
          // @ts-ignore
          // eslint-disable-next-line @typescript-eslint/no-confusing-void-expression
          await dispatch(request(values)).unwrap()
          onReset()
          dispatch(showNotification({
            title: notificationSuccess,
            type: 'success'
          }))
        } catch (e: AxiosError | any) {
          dispatch(showNotification({
            title: notificationError,
            type: 'error'
          }))
        } finally {
          setRequestStatus('idle')
        }
      }
    }
  })

  const onReset = () => {
    formik.resetForm()
  }

  return (
        <Modal
            open={isModalOpen}
            onClose={onCloseModal}
        >
            <BoxModal>
                <Typography id="modal-title" variant="h6" component="h2">
                    {title}
                </Typography>
                <form onSubmit={formik.handleSubmit}>
                    <Grid container mb={5} pt={5}>

                        <TextField
                            fullWidth
                            id="name"
                            name="name"
                            label="Name"
                            value={formik.values.name}
                            onChange={formik.handleChange}
                            error={formik.touched.name && Boolean(formik.errors.name)}
                            helperText={formik.touched.name && String(formik.errors.name)}
                        />

                        <TextField
                            fullWidth
                            id="description"
                            name="description"
                            label="Description"
                            value={formik.values.description}
                            onChange={formik.handleChange}
                            error={formik.touched.description && Boolean(formik.errors.description)}
                            helperText={formik.touched.description && String(formik.errors.description)}
                            multiline
                        />
                    </Grid>

                    <Button color="primary" variant="contained" fullWidth type="submit">
                        {submitText}
                    </Button>
                </form>
            </BoxModal>
        </Modal>
  )
}

export default CocktailForm
