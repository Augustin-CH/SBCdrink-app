import React, { type FC, useState, useCallback, useEffect, useMemo } from 'react'
import { FormControl, Grid, InputLabel, List, ListItem, ListItemAvatar, MenuItem, Select } from '@mui/material'
import { useAppDispatch } from '@/app/hooks'
import { type IBaseBottle } from '@/features/bottle/types'
import { useFormik } from 'formik'
import { type FetchStatus } from '@/app/shared/types'
import { showNotification } from '@/features/notification/notificationSlice'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { AxiosError } from 'axios'
import * as yup from 'yup'
import { type IBaseIngredient } from '@/features/ingredient/types'
import Loader from '@/features/ui/loader/loader'
import { updateBottles } from './BottleSlice'

const validationSchema = yup.object({
  bottles: yup.array().of(
    yup.object().shape({
      slot: yup.number().required(),
      measureVolume: yup.number().required(),
      ingredientId: yup.number().required(),
      ingredientName: yup.string().required()
    })
  )
})

interface ListBottleProps {
  bottles: IBaseBottle[]
  listBottlesStatus: FetchStatus
  ingredients: IBaseIngredient[]
  listIngredientsStatus: FetchStatus
}

const ManageBottles: FC<ListBottleProps> = ({
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
    } as { bottles: IBaseBottle[] },
    validationSchema,
    onSubmit: async (values) => {
      const value = values.bottles[indexModifiedRow as number]
      console.log('values', values)

      formik.validateField('bottles')
      if (requestStatus === 'idle') {
        try {
          setRequestStatus('loading')
          await dispatch(updateBottles({
            bottle: value
          })).unwrap()
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

  const handleChangeBottle = useCallback((value: number, index: number) => {
    const targetIngredient = ingredients.find((ingredient) => +ingredient.id === value)

    console.log('index', index)
    console.log('targetIngredient', targetIngredient)

    if (targetIngredient) {
      Promise.all([
        formik.setFieldValue(`bottles[${index}].ingredientName`, targetIngredient.name),
        formik.setFieldValue(`bottles[${index}].ingredientId`, targetIngredient.id)
      ]).then(() => {
        setIndexModifiedRow(index)
        formik.submitForm()
      })
    }
  }, [ingredients])

  const handleChangeVolume = useCallback((value: number, index: number) => {
    formik.setFieldValue(`bottles[${index}].measureVolume`, value)
    setIndexModifiedRow(index)
    formik.submitForm()
  }, [])

  const renderSelectIngredient = useCallback((slot: number, value: number, index: number) => (
    <FormControl fullWidth sx={{ margin: '5px 10px', minWidth: 150 }} >
      <InputLabel id={`bottle-cocktail-${slot}`}>Ingredient</InputLabel>
      <Select
        labelId={`bottles.[${index}].ingredientId`}
        id="demo-simple-select"
        value={value}
        label={`bottles.[${index}].ingredientId`}
        name={`bottles.[${index}].ingredientId`}
        onChange={(e) => handleChangeBottle(+e.target.value, index)}
      >
        {ingredients.map((ingredient) => (
          <MenuItem key={`item_cocktail_${ingredient.id}`} value={ingredient.id}>{ingredient.name}</MenuItem>
        ))}
      </Select>
    </FormControl>
  ), [ingredients])

  const volumeList = useMemo(() => [
    { value: 25, label: '25 cl' },
    { value: 33, label: '33 cl' },
    { value: 50, label: '50 cl' }
  ], [])

  const renderSelectVolume = useCallback((slot: number, value: number, index: number) => {
    return (
      <FormControl fullWidth sx={{ margin: '5px 10px', minWidth: 150 }} >
        <InputLabel id={`bottles[${index}].measureVolume`}>Volume</InputLabel>
        <Select
          labelId={`bottles[${index}].measureVolume`}
          id="demo-simple-select"
          value={value}
          label={`bottles[${index}].measureVolume`}
          onChange={(e) => handleChangeVolume(+e.target.value, index)}
        >
          {volumeList.map((volume) => (
            <MenuItem key={`item_volume_${volume.value}`} value={volume.value}>{volume.label}</MenuItem>
          ))}
        </Select>
      </FormControl>
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
                {formik.values.bottles.map((bottle: IBaseBottle, index: number) => (
                  <ListItem key={`list_bottle_${bottle.slot}`}>
                    <ListItemAvatar>
                      {bottle.slot}
                    </ListItemAvatar>
                    {renderSelectIngredient(bottle.slot, bottle.ingredientId, index)}
                    {renderSelectVolume(bottle.slot, bottle.measureVolume, index)}
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

  useEffect(() => {
    console.log('formik.values.bottles', formik.values.bottles)
  }, [formik.values.bottles])

  return (
    <>
      {renderContent()}
    </>
  )
}

export default ManageBottles
