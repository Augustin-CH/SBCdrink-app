import React from 'react'
import CocktailForm from '@/features/cocktail/CocktailForm'
import { type FC } from 'react'

interface AddCocktailProps {
  isModalOpen: boolean
  onCloseModal: () => void
}

const AddCocktail: FC<AddCocktailProps> = ({
  isModalOpen,
  onCloseModal
}) => {
  return (
        <CocktailForm
            mode="add"
            className="add-cocktail"
            request={() => {}}
            title="Add cocktail"
            submitText="Ajouter"
            notificationSuccess="Cocktail ajouté avec succès"
            notificationError="Une erreur est survenue lors de l'ajout du cocktail"
            isModalOpen={isModalOpen}
            onCloseModal={onCloseModal}
        />
  )
}

export default AddCocktail
