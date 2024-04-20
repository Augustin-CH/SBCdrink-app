import React from 'react'
import { type FC } from 'react'
import IngredientForm from '../IngredientForm'
import { createIngredient } from '@/features/ingredient/IngredientSlice'
import { type IBaseIngredient } from '@/features/ingredient/types'

interface AddIngredientProps {
  isModalOpen: boolean
  onCloseModal: () => void
}

const AddIngredient: FC<AddIngredientProps> = ({
  isModalOpen,
  onCloseModal
}) => {
  return (
    <IngredientForm
        mode="add"
        className="add-ingredient"
        request={createIngredient}
        title="Ajout d'un ingrédient"
        submitText="Ajouter"
        notificationSuccess="Ingrédient ajouté avec succès"
        notificationError="Une erreur est survenue lors de l'ajout de l'ingrédient"
        isModalOpen={isModalOpen}
        onCloseModal={onCloseModal}
        ingredient={{} as IBaseIngredient}
    />
  )
}

export default AddIngredient
