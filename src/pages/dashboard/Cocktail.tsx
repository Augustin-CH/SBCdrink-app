import React, { useCallback, useEffect, useMemo } from 'react'
import { useAppDispatch, useAppSelector } from '@/app/hooks'
import ManageCocktails from '@/features/cocktail/ManageCocktails'
import { fetchCocktails } from '@/features/cocktail/CocktailSlice'
import { type FC } from 'react'
import { fetchIngredients } from '@/features/ingredient/IngredientSlice'

const Cocktail: FC = () => {
  const dispatch = useAppDispatch()

  const { listCocktails, listCocktailsStatus } = useAppSelector(state => state.cocktail)
  const { listIngredients, listIngredientsStatus } = useAppSelector(state => state.ingredient)
  const { listRecipeIngredients } = useAppSelector(state => state.recipeIngredient)
  const listIngredientIds = useMemo(() => [...new Set(listRecipeIngredients.map((recipeIngredient) => recipeIngredient.ingredient))], [listRecipeIngredients])

  const fetchData = useCallback(() => {
    dispatch(fetchCocktails())
    dispatch(fetchIngredients(listIngredientIds))
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
