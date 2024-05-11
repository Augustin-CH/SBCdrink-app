import React, { type FC, useCallback, useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '@/app/hooks'
import ManageIngredients from '@/features/ingredient/list/ManageIngredients'
import { fetchIngredients } from '@/features/ingredient/IngredientSlice'

const Ingredient: FC = () => {
  const dispatch = useAppDispatch()

  const { listIngredients, listIngredientsStatus } = useAppSelector(state => state.ingredient)

  const fetchData = useCallback(() => {
    dispatch(fetchIngredients())
  }, [dispatch])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  return (
    <>
      <ManageIngredients
        ingredients={listIngredients}
        listIngredientsStatus={listIngredientsStatus}
      />
    </>
  )
}

export default Ingredient
