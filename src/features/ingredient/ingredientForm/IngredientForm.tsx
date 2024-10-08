import React, { useCallback } from 'react'
import { type FormikHelpers, Formik, Form } from 'formik'
import * as yup from 'yup'
import { Button, Grid, Modal, TextField, Typography } from '@mui/material'
import { type FC, useState } from 'react'
import { useAppDispatch } from '@/app/hooks'
import { type FetchStatus } from '@/app/shared/types'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { AxiosError } from 'axios'
import { showNotification } from '@/features/notification/notificationSlice'
import { BoxModal } from '@/features/ui/components/BoxModal/BoxModal'
import CloseIcon from '@mui/icons-material/Close'
import { type IFormIngredient, type IBaseIngredient } from '@/features/ingredient/types'

const validationSchema = yup.object({
  name: yup.string().required('Le nom est requis'),
  alcoholDegree: yup.number().required('Le degré d\'alcool est requis')
})

interface IngredientFormProps {
  mode: 'add' | 'edit'
  className?: string
  ingredient: IBaseIngredient
  request: (values: any) => void
  title: string
  submitText: string
  notificationSuccess: string
  notificationError: string
  isModalOpen: boolean
  onCloseModal: () => void
}

const IngredientForm: FC<IngredientFormProps> = ({
  mode,
  className,
  ingredient,
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

  const onSubmit = useCallback(async (values: IFormIngredient, { resetForm }: FormikHelpers<IFormIngredient>): Promise<void> => {
    const newIngredient: IFormIngredient = { ...values }
    newIngredient.isAlcohol = newIngredient.alcoholDegree > 0

    if (requestStatus === 'idle') {
      try {
        setRequestStatus('loading')
        // @ts-ignore
        await dispatch(request(newIngredient)).unwrap()
        resetForm()
        dispatch(showNotification({
          title: notificationSuccess,
          type: 'success'
        }))
        onCloseModal()
      } catch (e: AxiosError | any) {
        dispatch(showNotification({
          title: notificationError,
          type: 'error'
        }))
      } finally {
        setRequestStatus('idle')
      }
    }
  }, [requestStatus, dispatch, notificationSuccess, notificationError])

  return (
    <Modal
      open={isModalOpen}
      onClose={onCloseModal}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <BoxModal>
        <Grid container justifyContent="space-between">
          <Grid item>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              {title}
            </Typography>
          </Grid>
          <Grid item>
            <CloseIcon onClick={onCloseModal} style={{ cursor: 'pointer' }} />
          </Grid>
        </Grid>
        <Formik
          initialValues={{
            ...ingredient,
            viscosity: ingredient.viscosity ?? 1
          } as IFormIngredient}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {({ values, errors, handleChange, handleBlur }) => (
            <Form>
              <Grid container>
                <Grid container mb={2} pt={3}>
                  <TextField
                    fullWidth
                    id="name"
                    name="name"
                    label="Nom"
                    value={values.name}
                    onChange={handleChange}
                    multiline
                    error={!!errors.name}
                    helperText={errors.name}
                    required
                  />
                </Grid>
                <Grid container mb={2}>
                  <TextField
                    fullWidth
                    id="alcoholDegree"
                    name="alcoholDegree"
                    label="Degré d'alcool"
                    value={values.alcoholDegree}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    type="number"
                    error={!!errors.alcoholDegree}
                    helperText={errors.alcoholDegree}
                    required
                  />
                </Grid>
                <Grid container mb={2}>
                  <TextField
                    fullWidth
                    id="viscosity"
                    name="viscosity"
                    label="Viscosité"
                    value={values.viscosity}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    type="number"
                    error={!!errors.viscosity}
                    helperText={errors.viscosity}
                    required
                  />
                </Grid>
              </Grid>
              <Button color="primary" variant="contained" fullWidth type="submit" sx={{ mb: 2 }}>
                {submitText}
              </Button>
              <Button color="inherit" variant="contained" fullWidth onClick={onCloseModal}>
                Retour
              </Button>
            </Form>
          )}
        </Formik>
      </BoxModal>
    </Modal>
  )
}

export default IngredientForm
