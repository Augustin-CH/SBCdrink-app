import React, { useCallback, useMemo } from 'react'
import { Button, Grid } from '@mui/material'
import { BlogPostCard } from '@/features/ui/card'
import { type IBaseCocktail } from '@features/cocktail/types'
import { type FC, useState } from 'react'
import { env } from '@/env'
import { AddCocktail, EditCocktail, ViewCocktail } from '@/features/cocktail'
import { populate, setSelectedCocktail } from '@/features/cocktail/CocktailSlice'
import { useAppDispatch } from '@/app/hooks'
import { type ICardData } from '@/features/ui/card/types'
import { type IBaseIngredient } from '@/features/ingredient/types'

interface ListCocktailProps {
  cocktails: IBaseCocktail[]
  ingredients?: IBaseIngredient[]
  isDashboard?: boolean
}

const ListCocktail: FC<ListCocktailProps> = ({
  cocktails,
  ingredients,
  isDashboard
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const [modalMode, setModalMode] = useState('edit')

  const dispatch = useAppDispatch()

  const populateSelectedCocktail = populate(cocktails)

  const handleModal = useCallback(() => {
    setIsOpen(!isOpen)
  }, [isOpen])

  const cocktailsList = useMemo((): ICardData[] => {
    return populateSelectedCocktail?.map((cocktail) => ({
      id: cocktail.id,
      cover: `${env.REACT_APP_SUPABASE_URL}/storage/v1/object/public/${cocktail.picture}`,
      title: cocktail.name,
      subTitle: cocktail.recipeIngredients?.map(({ ingredient }) => ingredient.name).join(', '),
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

          <Grid container spacing={3}>
            {cocktailsList?.map((item: ICardData, index: number) => (
              <BlogPostCard key={item.id} data={item} index={index} onClick={() => {
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
