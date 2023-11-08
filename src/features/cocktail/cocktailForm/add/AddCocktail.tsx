import React from 'react'
import CocktailForm from '@/features/cocktail/cocktailForm/CocktailForm'
import { type FC } from 'react'
import { type IBaseCocktail } from '../../types'
import { createCocktail } from '@/features/cocktail/CocktailSlice'
import { type IBaseIngredient } from '@/features/ingredient/types'

interface AddCocktailProps {
  ingredients: IBaseIngredient[]
  isModalOpen: boolean
  onCloseModal: () => void
}

const AddCocktail: FC<AddCocktailProps> = ({
  ingredients,
  isModalOpen,
  onCloseModal
}) => {
  return (
        <CocktailForm
            mode="add"
            className="add-cocktail"
            request={createCocktail}
            title="Ajoute d'un cocktail"
            submitText="Ajouter"
            notificationSuccess="Cocktail ajouté avec succès"
            notificationError="Une erreur est survenue lors de l'ajout du cocktail"
            isModalOpen={isModalOpen}
            onCloseModal={onCloseModal}
            cocktail={{} as IBaseCocktail}
            ingredients={ingredients}
        />
  )
}

export default AddCocktail
