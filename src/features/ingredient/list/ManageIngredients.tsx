import React, { type FC, useCallback, useState, useMemo } from 'react'
import { Button, Grid } from '@mui/material'
import { type FetchStatus } from '@/app/shared/types'
import { type IBaseIngredient } from '@/features/ingredient/types'
import Loader from '@/features/ui/loader/loader'
import { useAppDispatch } from '@/app/hooks'
import { setSelectedIngredient } from '../IngredientSlice'
import { CardIngredient } from './cardIngredient/CardIngredient'
import { type ICardIngredientData } from './cardIngredient/types'
import EditIngredient from '../ingredientForm/edit/EditIngredient'
import AddIngredient from '../ingredientForm/add/AddIngredient'

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

  const dispatch = useAppDispatch()

  const handleModal = useCallback(() => {
    setIsOpen(!isOpen)
  }, [isOpen])

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
        return (
          <EditIngredient
            isModalOpen={isOpen}
            onCloseModal={handleModal}
          />
        )
      } else if (modalMode === 'add') {
        return (
          <AddIngredient
            isModalOpen={isOpen}
            onCloseModal={handleModal}
          />
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
          <Button
            color="primary"
            variant="contained"
            sx={{
              display: 'flex',
              justifyContent: 'end',
              alignItems: 'center',
              ml: 'auto',
              mb: 3,
              mr: 2
            }}
            onClick={() => {
              dispatch(setSelectedIngredient({} as IBaseIngredient))
              setModalMode('add')
              handleModal()
            }}
          >
            Ajouter
          </Button>
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
