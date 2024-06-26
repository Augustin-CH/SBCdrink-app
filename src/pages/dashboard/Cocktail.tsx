import React, { useCallback, useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '@/app/hooks'
import ManageCocktails from '@/features/cocktail/list/ManageCocktails'
import { fetchCocktails } from '@/features/cocktail/CocktailSlice'
import { type FC } from 'react'
import { fetchIngredients } from '@/features/ingredient/IngredientSlice'

const Cocktail: FC = () => {
  const dispatch = useAppDispatch()

  const { listCocktails, listCocktailsStatus } = useAppSelector(state => state.cocktail)
  const { listIngredients, listIngredientsStatus } = useAppSelector(state => state.ingredient)

  const fetchData = useCallback(() => {
    dispatch(fetchCocktails())
    dispatch(fetchIngredients())
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
