import CocktailForm from "@/features/cocktail/CocktailForm";
import {IBaseCocktail} from "@/features/cocktail/type";
import {FC} from "react";

interface EditCocktailProps {
    cocktail: IBaseCocktail;
}

const EditCocktail: FC<EditCocktailProps> = ({
    cocktail,
}) => {
    return (
        <CocktailForm
            mode="edit"
            className="edit-cocktail"
            cocktail={cocktail}
            request={() => {}}
            title="Edit cocktail"
            submitText="Modifier"
            notificationSuccess="Cocktail modifié avec succès"
            notificationError="Une erreur est survenue lors de la modification du cocktail"
        />
    );
}