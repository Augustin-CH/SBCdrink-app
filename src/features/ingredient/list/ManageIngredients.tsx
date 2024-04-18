import React, { type FC, useCallback, useState, useEffect, useMemo } from 'react'
import { FormControl, Grid, InputLabel, List, ListItem, ListItemAvatar, Slider, Switch } from '@mui/material'
import { type FetchStatus } from '@/app/shared/types'
import { type IBaseIngredient } from '@/features/ingredient/types'
import Loader from '@/features/ui/loader/loader'
import { useFormik } from 'formik'
import * as yup from 'yup'
import { useAppDispatch } from '@/app/hooks'
import { showNotification } from '@/features/notification/notificationSlice'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { AxiosError } from 'axios'
import { setSelectedIngredient, updateIngredients } from '../IngredientSlice'
import { CardIngredient } from './cardIngredient/CardIngredient'
import { ICardIngredientData } from './cardIngredient/types'
import EditIngredient from '../ingredientForm/edit/EditIngredient'

// const validationSchema = yup.object({
//   ingredients: yup.array().of(
//     yup.object().shape({
//       id: yup.number().required(),
//       name: yup.string().required(),
//       isAlcohol: yup.boolean().required(),
//       alcoholDegree: yup.number().required()
//     })
//   )
// })

interface ManageIngredientsProps {
  ingredients: IBaseIngredient[]
  listIngredientsStatus: FetchStatus
}

const ManageIngredients: FC<ManageIngredientsProps> = ({
  ingredients,
  listIngredientsStatus
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const [modalMode, setModalMode] = useState('edit')
  // const [requestStatus, setRequestStatus] = useState<FetchStatus>('idle')
  // const [indexModifiedRow, setIndexModifiedRow] = useState<number | null>(null)

  const dispatch = useAppDispatch()

  const handleModal = useCallback(() => {
    setIsOpen(!isOpen)
  }, [isOpen])

  // const formik = useFormik({
  //   initialValues: {
  //     ingredients
  //   } as { ingredients: IBaseIngredient[] },
  //   // validationSchema,
  //   onSubmit: async (values) => {
  //     const value = values.ingredients[indexModifiedRow as number]

  //     formik.validateField('ingredients')
  //     if (requestStatus === 'idle') {
  //       try {
  //         setRequestStatus('loading')
  //         await dispatch(updateIngredients({
  //           ingredient: value
  //         })).unwrap()
  //         dispatch(showNotification({
  //           title: 'Ingredient modifiée avec succès',
  //           type: 'success'
  //         }))
  //       } catch (e: AxiosError | any) {
  //         dispatch(showNotification({
  //           title: 'Erreur lors de la modification de l\'ingredient',
  //           type: 'error'
  //         }))
  //       } finally {
  //         setRequestStatus('idle')
  //       }
  //     }
  //   }
  // })

  // const handleChangeIsAlcohol = useCallback((value: boolean, index: number) => {
  //   formik.setFieldValue(`bottles[${index}].isAlcohol`, value)
  //   setIndexModifiedRow(index)
  //   formik.submitForm()
  // }, [])

  // const handleChangeAlcoholDegree = useCallback((value: number | number[], index: number) => {
  //   formik.setFieldValue(`ingredients[${index}].alcoholDegree`, value)
  //   setIndexModifiedRow(index)
  //   formik.submitForm()
  // }, [])

  // const renderSwitchIsAlcohol = useCallback((value: boolean, index: number) => {
  //   return (
  //     <FormControl fullWidth sx={{ margin: '5px 10px', minWidth: 150 }} >
  //       <InputLabel id={`ingredients[${index}].isAlcohol`}>Alcool</InputLabel>
  //       <Switch
  //         checked={value}
  //         onChange={(e) => handleChangeIsAlcohol(e.target.checked, index)}
  //         name={`ingredients[${index}].isAlcohol`}
  //       />
  //     </FormControl>
  //   )
  // }, [])

  // const renderSelectAlcoholDegree = useCallback((value: number, index: number) => {
  //   return (
  //     <FormControl fullWidth sx={{ margin: '5px 10px', minWidth: 150 }} >
  //       <InputLabel id={`bottles[${index}].id`}>Volume</InputLabel>
  //       <Slider
  //         id={`ingredients[${index}].id`}
  //         name="alcoholDegree"
  //         orientation="horizontal"
  //         valueLabelDisplay="auto"
  //         sx={{ maxWidth: 400, mb: 5 }}
  //         min={0}
  //         max={100}
  //         onChange={(e, value) => handleChangeAlcoholDegree(value, index)}
  //         value={value}
  //       />
  //     </FormControl>
  //   )
  // }, [])

  const ingredientsList = useMemo((): ICardIngredientData[] => {
    return ingredients?.map((ingredient) => ({
      id: ingredient.id,
      alcoholDegree: ingredient.alcoholDegree,
      isAlcohol: ingredient.isAlcohol,
      name: ingredient.name
    }))
  }, [ingredients])

  const renderModal = useMemo(() => {
    if (isOpen) {
      if (modalMode === 'edit') {
        console.log('isOpen', isOpen, 'modalMode', modalMode)
        return (
          <EditIngredient
            isModalOpen={isOpen}
            onCloseModal={handleModal}
          />
        )
      } else if (modalMode === 'add') {
        return (
          <></>
          // <AddCocktail
          //   ingredients={ingredients}
          //   isModalOpen={isOpen}
          //   onCloseModal={handleModal}
          // />
        )
      }
    }
  }, [isOpen, modalMode])

  const renderContent = useCallback(() => {
    if (listIngredientsStatus === 'failed') {
      return (
        <h3>
            Erreur lors du chargement des ingredients
        </h3>
      )
    } else if (listIngredientsStatus === 'loading') {
      return <Loader styles={{ minHeight: 300 }}/>
    } else {
      return (
        <>
          <Grid container spacing={3}>
            {ingredientsList?.map((item: ICardIngredientData, index: number) => (
                <CardIngredient key={item.id} data={item} index={index} onClick={() => {
                  dispatch(setSelectedIngredient(ingredients[index]))
                  setModalMode('edit')
                  handleModal()
                }}/>
            ))}
          </Grid>
          {renderModal}
        </>
      )
    }
  }, [ingredients, listIngredientsStatus, renderModal])

  return (
    <>
      {renderContent()}
    </>
  )
}

export default ManageIngredients
