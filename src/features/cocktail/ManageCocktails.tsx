import React, { type FC, useCallback } from 'react'
import { type FetchStatus } from '@/app/shared/types'
import { type IBaseIngredient } from '@/features/ingredient/types'
import Loader from '@/features/ui/loader/loader'
import { type IBaseCocktail } from './types'
import ListCocktail from './ListCocktail'

interface ManageCocktailsProps {
  cocktails: IBaseCocktail[]
  listCocktailsStatus: FetchStatus
  ingredients: IBaseIngredient[]
  listIngredientsStatus: FetchStatus
}

const ManageCocktails: FC<ManageCocktailsProps> = ({
  cocktails,
  listCocktailsStatus,
  ingredients,
  listIngredientsStatus
}) => {
  const renderContent = useCallback(() => {
    if (listIngredientsStatus === 'failed') {
      return (
        <h3>
            Erreur lors du chargement des ingredients
        </h3>
      )
    } else if (listCocktailsStatus === 'failed') {
      return (
        <h3>
            Erreur lors du chargement des cocktails
        </h3>
      )
    } else if (listIngredientsStatus === 'loading' || listCocktailsStatus === 'loading') {
      return <Loader styles={{ minHeight: 300 }}/>
    } else {
      return (
        <>
          <ListCocktail cocktails={cocktails} ingredients={ingredients} isDashboard />
        </>
      )
    }
  }, [cocktails, listIngredientsStatus])

  return (
    <>
      {renderContent()}
    </>
  )
}

export default ManageCocktails
