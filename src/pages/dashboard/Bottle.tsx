import React, { useCallback, useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '@/app/hooks'
import ManageBottles from '@/features/bottle/ManageBottles'
import { fetchBottles } from '@/features/bottle/BottleSlice'
import { fetchIngredients } from '@/features/ingredient/IngredientSlice'
import { type FC } from 'react'

const Bottle: FC = () => {
  const dispatch = useAppDispatch()

  const { listBottles, listBottlesStatus } = useAppSelector(state => state.bottle)
  const { listIngredients, listIngredientsStatus } = useAppSelector(state => state.ingredient)

  const fetchData = useCallback(() => {
    dispatch(fetchBottles())
    dispatch(fetchIngredients())
  }, [dispatch])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  return (
    <>
      <ManageBottles
        bottles={listBottles}
        listBottlesStatus={listBottlesStatus}
        ingredients={listIngredients}
        listIngredientsStatus={listIngredientsStatus}
      />
    </>
  )
}

export default Bottle
