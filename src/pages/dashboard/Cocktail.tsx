import React, { useCallback, useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '@/app/hooks'
import ManageCocktails from '@/features/cocktail/ManageCocktails'
import { fetchCocktails } from '@/features/cocktail/CocktailSlice'
import { type FC } from 'react'

const Cocktail: FC = () => {
  const dispatch = useAppDispatch()

  const { listCocktails, listCocktailsStatus } = useAppSelector(state => state.cocktail)
  const { listIngredients, listIngredientsStatus } = useAppSelector(state => state.ingredient)

  const fetchData = useCallback(() => {
    dispatch(fetchCocktails())
  }, [dispatch])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  return (
    <>
      <ManageCocktails
        cocktails={listCocktails}
        listCocktailsStatus={listCocktailsStatus}
        ingredients={listIngredients}
        listIngredientsStatus={listIngredientsStatus}
      />
    </>
  )
}

export default Cocktail
