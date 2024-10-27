import React, { type FC, useState, useCallback, useEffect, useMemo } from 'react'
import { FormControl, Grid, InputLabel, List, ListItem, ListItemAvatar, MenuItem, Select, TextField } from '@mui/material'
import { useAppDispatch } from '@/app/hooks'
import { type IPopulatedBottle, type IBaseBottle } from '@/features/bottle/types'
import { useFormik } from 'formik'
import { type UUID, type FetchStatus } from '@/app/shared/types'
import { showNotification } from '@/features/notification/notificationSlice'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { AxiosError } from 'axios'
import * as yup from 'yup'
import { type IBaseIngredient } from '@/features/ingredient/types'
import Loader from '@/features/ui/loader/loader'
import { updateBottle } from './BottleSlice'

const validationSchema = yup.object({
  bottles: yup.array().of(
    yup.object().shape({
      id: yup.string(),
      slot: yup.number().required(),
      measureVolume: yup.number().nullable(),
      ingredient: yup.object().shape({
        id: yup.string().required()
      }).nullable()
    })
  )
})

interface ManageBottlesProps {
  bottles: IPopulatedBottle[]
  listBottlesStatus: FetchStatus
  ingredients: IBaseIngredient[]
  listIngredientsStatus: FetchStatus
}

const ManageBottles: FC<ManageBottlesProps> = ({
  bottles,
  listBottlesStatus,
  ingredients,
  listIngredientsStatus
}) => {
  const [requestStatus, setRequestStatus] = useState<FetchStatus>('idle')
  const [indexModifiedRow, setIndexModifiedRow] = useState<number | null>(null)
  const dispatch = useAppDispatch()

  const formik = useFormik({
    initialValues: {
      bottles
    } as { bottles: IPopulatedBottle[] },
    validationSchema,
    onSubmit: async (values) => {
      const bottle = values.bottles[indexModifiedRow as number]

      const newBottles: IBaseBottle = {
        id: bottle.id,
        slot: bottle.slot,
        ingredientId: bottle?.ingredient?.id ?? null,
        measureVolume: bottle.measureVolume === -1 ? null : bottle.measureVolume,
        position: bottle.position
      }

      formik.validateField('bottles')
      if (requestStatus === 'idle') {
        try {
          setRequestStatus('loading')
          await dispatch(updateBottle(newBottles)).unwrap()
          dispatch(showNotification({
            title: 'Bouteille modifiée avec succès',
            type: 'success'
          }))
        } catch (e: AxiosError | any) {
          dispatch(showNotification({
            title: 'Erreur lors de la modification de la bouteille',
            type: 'error'
          }))
        } finally {
          setRequestStatus('idle')
        }
      }
    }
  })

  const handleChangeBottle = useCallback((value: string | null, index: number) => {
    const targetIngredient = ingredients.find((ingredient) => ingredient.id === value)

    if (targetIngredient) {
      formik.setFieldValue(`bottles[${index}].ingredient`, targetIngredient)
      setIndexModifiedRow(index)
      formik.submitForm()
    }
  }, [ingredients])

  const handleChangeVolume = useCallback((value: number, index: number) => {
    formik.setFieldValue(`bottles[${index}].measureVolume`, value)
    setIndexModifiedRow(index)
    formik.submitForm()
  }, [])

  const handleChangePosition = useCallback((value: number, index: number) => {
    formik.setFieldValue(`bottles[${index}].position`, value)
  }, [])

  const handleBlurPosition = useCallback((index: number) => {
    console.log(index)
    setIndexModifiedRow(index)
    formik.submitForm()
  }, [])

  const renderSelectIngredient = useCallback((value: UUID | null, index: number) => (
    <FormControl fullWidth sx={{ margin: '5px 10px', minWidth: 150 }} >
      <InputLabel id={`bottles[${index}].ingredient.id`}>Ingredient</InputLabel>
      <Select
        labelId={`bottles[${index}].ingredient.id`}
        id="select"
        value={value ?? ''}
        label={`bottles[${index}].ingredient.id`}
        name={`bottles[${index}].ingredient.id`}
        onChange={(e) => handleChangeBottle(e.target.value, index)}
      >
        {ingredients.map((ingredient) => (
          <MenuItem key={`item_cocktail_${ingredient.id}`} value={ingredient.id}>{ingredient.name}</MenuItem>
        ))}
      </Select>
    </FormControl>
  ), [ingredients])

  const volumeList = useMemo(() => [
    { value: -1, label: 'Pas de doseur' },
    { value: 25, label: '25 ml' },
    { value: 35, label: '35 ml' },
    { value: 50, label: '50 ml' }
  ], [])

  const renderSelectVolume = useCallback((value: number | null, index: number) => {
    return (
      <FormControl fullWidth sx={{ margin: '5px 10px', minWidth: 150 }} >
        <InputLabel id={`bottles[${index}].measureVolume`}>Volume</InputLabel>
        <Select
          labelId={`bottles[${index}].measureVolume`}
          id="select"
          value={value ?? -1}
          label={`bottles[${index}].measureVolume`}
          onChange={(e) => handleChangeVolume(+e.target.value, index)}
        >
          {volumeList.map((volume) => (
            <MenuItem key={`item_volume_${volume?.value}`} value={volume.value}>{volume.label}</MenuItem>
          ))}
        </Select>
      </FormControl>
    )
  }, [])

  const renderInputPosition = useCallback((value: number | null, index: number) => {
    return (
        <TextField
          fullWidth
          sx={{ minWidth: 150 }}
          id={`bottles[${index}].position`}
          name="position"
          label="Position"
          value={value}
          onChange={(e) => handleChangePosition(+e.target.value, index)}
          onBlur={() => handleBlurPosition(index)}
        />
    )
  }, [])

  const renderContent = useCallback(() => {
    if (listIngredientsStatus === 'failed') {
      return (
        <h3>
            Erreur lors du chargement des ingredients
        </h3>
      )
    } else if (listBottlesStatus === 'failed') {
      return (
        <h3>
            Erreur lors du chargement des bouteilles
        </h3>
      )
    } else if (listIngredientsStatus === 'loading' || listBottlesStatus === 'loading') {
      return <Loader styles={{ minHeight: 300 }}/>
    } else {
      return (
        <>
          {/* <Box flexDirection={'row'} display={'flex'} alignItems={'center'} justifyContent={'space-between'}>
            <Typography id="modal-title" variant="h6" component="h2">
                Liste des bouteilles
            </Typography>
          </Box> */}
          <form onSubmit={formik.handleSubmit}>
            <Grid container mb={5}
            // pt={5}
            >
              <List sx={{ width: '100%' }}>
                {formik.values.bottles.map((bottle: IPopulatedBottle, index: number) => (
                  <ListItem key={`list_bottle_${bottle.slot}`}>
                    <ListItemAvatar>
                      {bottle.slot}
                    </ListItemAvatar>
                    {renderSelectIngredient(bottle.ingredient?.id ?? null, index)}
                    {renderSelectVolume(bottle?.measureVolume, index)}
                    {renderInputPosition(bottle?.position, index)}
                  </ListItem>
                ))}
              </List>
            </Grid>
          </form>
        </>
      )
    }
  }, [bottles, formik.handleSubmit, listIngredientsStatus, renderSelectIngredient, renderSelectVolume, formik.values])

  useEffect(() => {
    if (listBottlesStatus === 'succeeded') {
      formik.setFieldValue('bottles', bottles)
    }
  }, [bottles, listBottlesStatus])

  return (
    <>
      {renderContent()}
    </>
  )
}

export default ManageBottles
