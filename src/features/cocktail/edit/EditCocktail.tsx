import CocktailForm from "@/features/cocktail/CocktailForm";
import {FC} from "react";
import {useAppSelector} from "@/app/hooks";

interface EditCocktailProps {
    isModalOpen: boolean,
    onCloseModal: () => void,
}

const EditCocktail: FC<EditCocktailProps> = ({
     isModalOpen,
     onCloseModal,
}) => {
    const {selectedCocktail} = useAppSelector(state => state.cocktail)

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
        />
    );
}

export default EditCocktail;