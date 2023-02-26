import React, { type FC, useState } from 'react'
import { useAppDispatch, useAppSelector } from '@/app/hooks'
import { Button, Grid, Modal, Slider, TextField, Typography } from '@mui/material'
import { Formik, type FormikHelpers } from 'formik'
import { type IMakeCocktail, type IRules } from '@/features/cocktail/type'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { AxiosError } from 'axios'
import * as yup from 'yup'
import { type FetchStatus } from '@/app/shared/types'
import { styled } from '@mui/material/styles'
import { formatStepMakeCocktail, makeCocktail } from '@/features/cocktail/CocktailSlice'
import { showNotification } from '@/features/notification/notificationSlice'

const validationSchema = yup.object({

})
interface ViewCocktailProps {
  isModalOpen: boolean
  onCloseModal: () => void
}

function textVolume (value: number): string {
  return `${value} cl`
}

function textPercentage (value: number): string {
  return `${value.toFixed(0)} %`
}

const marksVolume = [
  {
    value: 0,
    label: '0 cl'
  },
  {
    value: 20,
    label: '20 cl'
  },
  {
    value: 25,
    label: '25 cl'
  },
  {
    value: 33,
    label: '33 cl'
  },
  {
    value: 50,
    label: '50 cl'
  }
]

const BoxModal = styled('div')(({ theme }) => ({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  maxWidth: 600,
  minWidth: 350,
  width: '100%',
  backgroundColor: theme.palette.background.paper,
  padding: 20
}))

const ViewCocktail: FC<ViewCocktailProps> = ({
  isModalOpen,
  onCloseModal
}) => {
  const dispatch = useAppDispatch()
  const [requestStatus, setRequestStatus] = useState<FetchStatus>('idle')
  const [stepCocktails, setStepCocktails] = useState<IMakeCocktail>([] as IMakeCocktail)

  const { selectedCocktail } = useAppSelector(state => state.cocktail)

  const ingredientText: string[] = selectedCocktail?.ingredients?.map((item, index) => {
    const ingredientIndex = stepCocktails.findIndex((step) => step.ingredient === item.id)
    const quantity = stepCocktails[ingredientIndex]?.quantity.toFixed(1)
    return `${index !== 0 ? ' ' : ''}${item?.name} (${quantity} cl)`
  })

  const onValidate = async (values: any): Promise<any> => {
    setStepCocktails(formatStepMakeCocktail({ rules: values, cocktail: selectedCocktail }))
  }

  const onSubmit = async (values: IRules, { resetForm }: FormikHelpers<IRules>): Promise<void> => {
    if (requestStatus === 'idle') {
      try {
        setRequestStatus('loading')

        await dispatch(makeCocktail(stepCocktails)).unwrap()
        resetForm()
        dispatch(showNotification({
          title: 'Demande de cocktail envoyée avec succès',
          type: 'success'
        }))
      } catch (e: AxiosError | any) {
        dispatch(showNotification({
          title: "Une erreur est survenue lors de l'envoi de la demande de cocktail",
          type: 'error'
        }))
      } finally {
        setRequestStatus('idle')
      }
    }
  }

  const marksPercentage = () => {
    const min = selectedCocktail.alcoholMinLevel
    const max = selectedCocktail?.alcoholMaxLevel
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
        >
            <BoxModal>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                    {selectedCocktail?.name}
                </Typography>
                <Formik
                    initialValues={{
                      glassVolume: 25,
                      alcoholLevel: selectedCocktail?.alcoholLevel
                    }}
                    validationSchema={validationSchema}
                    onSubmit={onSubmit}
                    validate={onValidate}
                >
                    {({
                      values,
                      errors,
                      touched,
                      handleChange,
                      handleBlur,
                      handleSubmit,
                      isSubmitting
                    }) => (
                        <form onSubmit={handleSubmit}>
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
                                    label="Ingredients"
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
                                        aria-label="Temperature"
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
                                        aria-label="Temperature"
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

                            <Button color="primary" variant="contained" fullWidth type="submit">
                                Servir le cocktail
                            </Button>
                        </form>
                    )}
                </Formik>
            </BoxModal>
        </Modal>
  )
}

export default ViewCocktail
