import React, { useCallback } from 'react'
import { type FormikHelpers, Formik, Form } from 'formik'
import * as yup from 'yup'
import { Button, Grid, Modal, TextField, Typography } from '@mui/material'
import { type FC, useState } from 'react'
import { type IFormCocktail, type IBaseCocktail, type IPopulatedCocktail } from '@/features/cocktail/types'
import { useAppDispatch } from '@/app/hooks'
import { type FetchStatus } from '@/app/shared/types'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { AxiosError } from 'axios'
import { showNotification } from '@/features/notification/notificationSlice'
import { BoxModal } from '@/features/ui/components/BoxModal/BoxModal'
import CloseIcon from '@mui/icons-material/Close'
import { type IBaseIngredient } from '@/features/ingredient/types'
import ListIngredients from './partials/ListIngredients'
import FooterListIngredients from './partials/FooterListIngredients'
import { calculeVolumeIngredient } from '../utils'
import GlassVolumeSlider from './partials/GlassVolumeSlider'
import AlcoholLevel from './partials/AlcoholLevel'
import PictureField from './partials/PictureField'
import { createFile, updateFile } from '@/features/file/FileSlice'

const validationSchema = yup.object({

})

interface CocktailFormProps {
  mode: 'add' | 'edit'
  className?: string
  cocktail: IPopulatedCocktail
  request: (values: any) => void
  title: string
  submitText: string
  notificationSuccess: string
  notificationError: string
  isModalOpen: boolean
  onCloseModal: () => void
  ingredients: IBaseIngredient[]
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
  onCloseModal,
  ingredients
}) => {
  const dispatch = useAppDispatch()
  const [requestStatus, setRequestStatus] = useState<FetchStatus>('idle')

  const onSubmit = useCallback(async (values: IFormCocktail, { resetForm }: FormikHelpers<IFormCocktail>): Promise<void> => {
    const newRecipe: any = { ...values }
    delete newRecipe.glassVolume
    delete newRecipe.isAvailable
    newRecipe.steps = values.ingredients.map(({ orderIndex, proportion, stepId, ...ingredient }) => ({
      id: stepId,
      orderIndex,
      proportion,
      ingredientId: ingredient.id
    }))
    delete newRecipe.ingredients
    newRecipe.defaultGlassVolume = values.glassVolume

    if (requestStatus === 'idle') {
      try {
        setRequestStatus('loading')

        let newPicture
        if (cocktail?.picture?.id) {
          newPicture = await dispatch(updateFile({
            id: cocktail?.picture?.id,
            file: newRecipe.picture
          })).unwrap()
        } else if (newRecipe.picture) {
          newPicture = await dispatch(createFile(newRecipe.picture)).unwrap()
        }

        newRecipe.pictureId = newPicture?.id ?? null
        delete newRecipe.picture

        // @ts-ignore
        await dispatch(request(newRecipe as IBaseCocktail)).unwrap()
        resetForm()
        dispatch(showNotification({
          title: notificationSuccess,
          type: 'success'
        }))
        onCloseModal()
      } catch (e: AxiosError | any) {
        console.log(e)
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
            ...cocktail,
            alcoholMinLevel: cocktail?.alcoholMinLevel ?? 0,
            alcoholMaxLevel: cocktail?.alcoholMaxLevel ?? 100,
            steps: undefined,
            ingredients: cocktail?.steps
              ? [...cocktail?.steps].map(({ proportion, orderIndex, ingredient, id }) => ({
                  ...ingredient,
                  orderIndex,
                  proportion,
                  volume: calculeVolumeIngredient(cocktail.alcoholLevel, 50, proportion, ingredient.isAlcohol),
                  stepId: id
                })).sort((a, b) => a.orderIndex - b.orderIndex)
              : [],
            glassVolume: cocktail?.defaultGlassVolume ?? 50,
            picture: cocktail?.picture?.path ?? ''
          } as IFormCocktail}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {({ values, handleChange, handleBlur }) => (
            <Form>
              <Grid container>
                <Grid container mb={3} pt={3}>
                  <Grid item xs={12} md={4} mb={{ xs: 3 }}>
                      <PictureField />
                  </Grid>
                  <Grid container item xs={12} md={8} pl={{ md: 2 }} rowSpacing={3} flexDirection="column" >
                    <Grid item>
                      <TextField
                        fullWidth
                        id="name"
                        name="name"
                        label="Nom"
                        value={values.name}
                        onChange={handleChange}
                        multiline
                      />
                    </Grid>
                    <Grid item>
                      <TextField
                        fullWidth
                        id="description"
                        name="description"
                        label="Description"
                        value={values.description}
                        onChange={handleChange}
                        multiline
                        rows={5.75}
                      />
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>

              <GlassVolumeSlider />
              <ListIngredients ingredients={ingredients} />
              <FooterListIngredients />
              <AlcoholLevel />

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

export default CocktailForm
