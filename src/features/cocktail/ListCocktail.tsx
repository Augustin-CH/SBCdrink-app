import React from 'react'
import { Button, Grid } from '@mui/material'
import { BlogPostCard } from '@/features/ui/card'
import { type IBaseCocktail } from '@features/cocktail/types'
import { type FC, useState } from 'react'
import { env } from '@/env'
import { EditCocktail, ViewCocktail } from '@/features/cocktail'
import { setSelectedCocktail } from '@/features/cocktail/CocktailSlice'
import { useAppDispatch } from '@/app/hooks'
import { type ICardData } from '@/features/ui/card/types'
import { type IBaseIngredient } from '@/features/ingredient/types'

interface ListCocktailProps {
  cocktails: IBaseCocktail[]
  ingredients?: IBaseIngredient[]
  isEdit?: boolean
}

const ListCocktail: FC<ListCocktailProps> = ({
  cocktails,
  ingredients,
  isEdit
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const dispatch = useAppDispatch()

  const handleModal = () => { setIsOpen(!isOpen) }

  const formatCocktailList = (items: IBaseCocktail[]): ICardData[] => {
    return items?.map((cocktail, index) => ({
      id: cocktail.id,
      cover: `${env.REACT_APP_API_URL}${cocktail.picture}`,
      title: cocktail.name,
      subTitle: cocktail.ingredients.map((ingredient) => ingredient.name).join(', '),
      description: cocktail.description
    }))
  }

  const cocktailsList = formatCocktailList(cocktails)

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
          >
            Ajouter
          </Button>

          <Grid container spacing={3}>
            {cocktailsList?.map((item: ICardData, index: number) => (
              <BlogPostCard key={item.id} data={item} index={index} onClick={() => {
                dispatch(setSelectedCocktail(cocktails[index]))
                handleModal()
              }}/>
            ))}
          </Grid>
          {
          isEdit && ingredients && isOpen
            ? (
              <EditCocktail
                ingredients={ingredients}
                isModalOpen={isOpen}
                onCloseModal={handleModal}
              />)
            : (
              <ViewCocktail
                isModalOpen={isOpen}
                onCloseModal={handleModal}
              />)}
        </>
  )
}

export default ListCocktail
