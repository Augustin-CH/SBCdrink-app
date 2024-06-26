import React, { useCallback, useMemo } from 'react'
import { Button, Grid } from '@mui/material'
import { CardCocktail } from '@/features/cocktail/list/cardCocktail/CardCocktail'
import { type IPopulatedCocktail, type IBaseCocktail } from '@/features/cocktail/types'
import { type FC, useState } from 'react'
import { AddCocktail, EditCocktail, ViewCocktail } from '@/features/cocktail'
import { setSelectedCocktail } from '@/features/cocktail/CocktailSlice'
import { useAppDispatch } from '@/app/hooks'
import { type ICardCocktailData } from '@/features/cocktail/list/cardCocktail/types'
import { type IBaseIngredient } from '@/features/ingredient/types'
import { env } from '@/env'

interface ListCocktailProps {
  cocktails: IPopulatedCocktail[]
  ingredients?: IBaseIngredient[]
  isDashboard?: boolean
  withAddButton?: boolean
}

const ListCocktail: FC<ListCocktailProps> = ({
  cocktails,
  ingredients,
  isDashboard,
  withAddButton = true
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const [modalMode, setModalMode] = useState('edit')

  const dispatch = useAppDispatch()

  const handleModal = useCallback(() => {
    setIsOpen(!isOpen)
  }, [isOpen])

  const cocktailsList = useMemo((): ICardCocktailData[] => {
    return cocktails?.map((cocktail) => ({
      id: cocktail.id,
      cover: cocktail?.picture?.path ? `${env.REACT_APP_API_URL}/public/${cocktail?.picture?.path}` : null,
      title: cocktail.name,
      subTitle: cocktail.steps?.map(({ ingredient }) => ingredient.name).join(', '),
      description: cocktail.description
    }))
  }, [cocktails])

  const renderModal = useMemo(() => {
    if (isOpen) {
      if (isDashboard && ingredients) {
        if (modalMode === 'edit') {
          return (
            <EditCocktail
              ingredients={ingredients}
              isModalOpen={isOpen}
              onCloseModal={handleModal}
            />)
        } else if (modalMode === 'add') {
          return (
            <AddCocktail
              ingredients={ingredients}
              isModalOpen={isOpen}
              onCloseModal={handleModal}
            />)
        }
      }
      return (
        <ViewCocktail
          isModalOpen={isOpen}
          onCloseModal={handleModal}
        />)
    }
  }, [isOpen, isDashboard, ingredients])

  return (
        <>
          {withAddButton && (
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
                dispatch(setSelectedCocktail({} as IBaseCocktail))
                setModalMode('add')
                handleModal()
              }}
            >
              Ajouter
            </Button>
          )}

          <Grid container spacing={3}>
            {cocktailsList?.map((item: ICardCocktailData, index: number) => (
              <CardCocktail key={item.id} data={item} index={index} onClick={() => {
                dispatch(setSelectedCocktail(cocktails[index]))
                setModalMode('edit')
                handleModal()
              }}/>
            ))}
          </Grid>
          {renderModal}
        </>
  )
}

export default ListCocktail
