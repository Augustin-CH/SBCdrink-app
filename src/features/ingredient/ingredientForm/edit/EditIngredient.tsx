import React from 'react'
import { type FC } from 'react'
import { useAppSelector } from '@/app/hooks'
import IngredientForm from '../IngredientForm'
import { updateIngredient } from '@/features/ingredient/IngredientSlice'

interface EditIngredientProps {
  isModalOpen: boolean
  onCloseModal: () => void
}

const EditIngredient: FC<EditIngredientProps> = ({
  isModalOpen,
  onCloseModal
}) => {
  const { selectedIngredient } = useAppSelector(state => state.ingredient)

  return (
    <IngredientForm
        mode="edit"
        className="edit-ingredient"
        ingredient={selectedIngredient}
        request={updateIngredient}
        title="Edition d'un ingrédient"
        submitText="Modifier"
        notificationSuccess="Ingrédient modifié avec succès"
        notificationError="Une erreur est survenue lors de la modification de l'ingrédient"
        isModalOpen={isModalOpen}
        onCloseModal={onCloseModal}
    />
  )
}

export default EditIngredient
