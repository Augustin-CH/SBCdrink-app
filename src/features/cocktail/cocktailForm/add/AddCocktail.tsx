import React from 'react'
import CocktailForm from '@/features/cocktail/cocktailForm/CocktailForm'
import { type FC } from 'react'
import { type IBaseCocktail } from '../../types'

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
            cocktail={{} as IBaseCocktail}
            ingredients={[]}
        />
  )
}

export default AddCocktail
