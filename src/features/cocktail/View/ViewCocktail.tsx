import React, { type FC, useState } from 'react'
import { useAppDispatch, useAppSelector } from '@/app/hooks'
import { Button, Grid, Modal, Slider, TextField, Typography } from '@mui/material'
import { Form, Formik, type FormikHelpers } from 'formik'
import { type IMakeCocktail, type IRules } from '@/features/cocktail/types'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { AxiosError } from 'axios'
import * as yup from 'yup'
import { type FetchStatus } from '@/app/shared/types'
import { formatStepMakeCocktail, makeCocktail } from '@/features/cocktail/CocktailSlice'
import { showNotification } from '@/features/notification/notificationSlice'
import CloseIcon from '@mui/icons-material/Close'
import { BoxModal } from '@/features/ui/components/BoxModal/BoxModal'
import { marksVolume } from '../constant'
import { textPercentage, textVolume } from '../utils'

const validationSchema = yup.object({

})
interface ViewCocktailProps {
  isModalOpen: boolean
  onCloseModal: () => void
}

const ViewCocktail: FC<ViewCocktailProps> = ({
  isModalOpen,
  onCloseModal
}) => {
  const dispatch = useAppDispatch()
  const [requestStatus, setRequestStatus] = useState<FetchStatus>('idle')
  const [stepCocktails, setStepCocktails] = useState<IMakeCocktail>()

  const { selectedCocktail } = useAppSelector(state => state.cocktail)

  const ingredientText: string[] = selectedCocktail?.steps?.map((item, index) => {
    if (!stepCocktails) return ''
    const ingredientIndex = stepCocktails.steps.findIndex((step) => step.ingredient === item.ingredient.id)
    const quantity = stepCocktails.steps[ingredientIndex]?.quantity.toFixed(1)
    return `${index !== 0 ? ' ' : ''}${item.ingredient.name} (${quantity} cl)`
  })

  const onValidate = (values: any) => {
    setStepCocktails(formatStepMakeCocktail({ rules: values, cocktail: selectedCocktail }))
  }

  const onSubmit = async (values: IRules, { resetForm }: FormikHelpers<IRules>): Promise<void> => {
    if (requestStatus === 'idle') {
      try {
        setRequestStatus('loading')

        stepCocktails && await dispatch(makeCocktail(stepCocktails)).unwrap()
        resetForm()
        dispatch(showNotification({
          title: 'Demande de cocktail envoyée avec succès',
          type: 'success'
        }))
      } catch (e: AxiosError | any) {
        dispatch(showNotification({
          title: e.message,
          type: 'error'
        }))
      } finally {
        setRequestStatus('idle')
      }
    }
  }

  const marksPercentage = () => {
    const min = selectedCocktail.alcoholMinLevel
    const max = selectedCocktail.alcoholMaxLevel
    const step = 10
    const result = []
    result.push({
      value: min,
      label: textPercentage(min)
    })
    for (let i = min - min % 10; i <= max; i += step) {
      result.push({
        value: i,
        label: textPercentage(i)
      })
    }
    result.push({
      value: max,
      label: textPercentage(max)
    })
    return result
  }

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
                            {selectedCocktail?.name}
                        </Typography>
                    </Grid>
                    <Grid item>
                        <CloseIcon onClick={onCloseModal} style={{ cursor: 'pointer' }} />
                    </Grid>
                </Grid>
                <Formik
                    initialValues={{
                      glassVolume: selectedCocktail?.defaultGlassVolume,
                      alcoholLevel: selectedCocktail?.alcoholLevel
                    }}
                    validationSchema={validationSchema}
                    onSubmit={onSubmit}
                    validate={onValidate}
                    enableReinitialize={true}
                    validateOnMount={true}
                >
                    {({
                      values,
                      handleChange,
                      handleBlur
                    }) => (
                        <Form>
                            <Grid container mb={5} pt={5}>
                                <TextField
                                    fullWidth
                                    id="description"
                                    name="description"
                                    label="Description"
                                    value={selectedCocktail.description}
                                    multiline
                                    disabled
                                />
                            </Grid>
                            <Grid container mb={5}>
                                <TextField
                                    fullWidth
                                    id="ingedients"
                                    name="ingedients"
                                    label="Ingrédients"
                                    value={ingredientText}
                                    multiline
                                    disabled
                                />
                            </Grid>

                            <Grid container spacing={2} justifyContent="space-around">
                                <Grid item xs={6} textAlign="center">
                                    <Typography variant="subtitle1" mb={3}>
                                        Volume du verre
                                    </Typography>
                                    <Slider
                                        id="glassVolume"
                                        name="glassVolume"
                                        orientation="vertical"
                                        getAriaValueText={textVolume}
                                        valueLabelDisplay="auto"
                                        marks={marksVolume}
                                        aria-labelledby="non-linear-slider"
                                        sx={{ height: 300, width: 6, marginLeft: '44px', mb: 3 }}
                                        max={50}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.glassVolume}
                                    />
                                    <Typography variant="subtitle1" mb={3}>
                                        {textVolume(values.glassVolume)}
                                    </Typography>
                                </Grid>
                                <Grid item xs={6} textAlign="center">
                                    <Typography variant="subtitle1" mb={3}>
                                        Volume d&apos;alcool
                                    </Typography>
                                    <Slider
                                        id="alcoholLevel"
                                        name="alcoholLevel"
                                        orientation="vertical"
                                        getAriaValueText={textPercentage}
                                        valueLabelDisplay="auto"
                                        marks={marksPercentage()}
                                        aria-labelledby="non-linear-slider"
                                        sx={{ height: 300, width: 6, marginLeft: '44px', mb: 3 }}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.alcoholLevel}
                                        min={selectedCocktail?.alcoholMinLevel}
                                        max={selectedCocktail?.alcoholMaxLevel}
                                    />
                                    <Typography variant="subtitle1" mb={3}>
                                        {textPercentage(values.alcoholLevel)}
                                    </Typography>
                                </Grid>
                            </Grid>

                            <Button color="primary" variant="contained" fullWidth type="submit" sx={{ mb: 2 }}>
                                Servir le cocktail
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

export default ViewCocktail
