import React from 'react'
import { Grid } from '@mui/material'
import { BlogPostCard } from '@/features/ui/card'
import { type IBaseCocktail } from '@/features/cocktail/type'
import { type FC, useState } from 'react'
import { env } from '@/env'
import { ViewCocktail } from '@/features/cocktail'
import { setSelectedCocktail } from '@/features/cocktail/CocktailSlice'
import { useAppDispatch } from '@/app/hooks'
import { type ICardData } from '@/features/ui/card/types'

interface ListCocktailProps {
  cocktails: IBaseCocktail[]
}

const ListCocktail: FC<ListCocktailProps> = ({
  cocktails
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
            <Grid container spacing={3}>
                {cocktailsList?.map((item: ICardData, index: number) => (
                    <BlogPostCard key={item.id} data={item} index={index} onClick={() => {
                      dispatch(setSelectedCocktail(cocktails[index]))
                      handleModal()
                    }}/>
                ))}
            </Grid>
            <ViewCocktail
                isModalOpen={isOpen}
                onCloseModal={handleModal}
            />
        </>
  )
}

export default ListCocktail
