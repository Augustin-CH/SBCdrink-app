import React from 'react'
import CocktailForm from '@/features/cocktail/cocktailForm/CocktailForm'
import { type FC } from 'react'
import { useAppSelector } from '@/app/hooks'
import { type IBaseIngredient } from '@/features/ingredient/types'

interface EditCocktailProps {
  ingredients: IBaseIngredient[]
  isModalOpen: boolean
  onCloseModal: () => void
}

const EditCocktail: FC<EditCocktailProps> = ({
  ingredients,
  isModalOpen,
  onCloseModal
}) => {
  const { selectedCocktail } = useAppSelector(state => state.cocktail)

  return (
        <CocktailForm
            mode="edit"
            className="edit-cocktail"
            cocktail={selectedCocktail}
            request={() => {}}
            title="Edit cocktail"
            submitText="Modifier"
            notificationSuccess="Cocktail modifié avec succès"
            notificationError="Une erreur est survenue lors de la modification du cocktail"
            isModalOpen={isModalOpen}
            onCloseModal={onCloseModal}
            ingredients={ingredients}
        />
  )
}

export default EditCocktail
