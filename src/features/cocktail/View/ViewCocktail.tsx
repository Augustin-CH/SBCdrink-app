import CocktailForm from "@/features/cocktail/CocktailForm";
import {IBaseCocktail} from "@/features/cocktail/type";
import {FC} from "react";

interface ViewCocktailProps {
    cocktail: IBaseCocktail;
}

const ViewCocktail: FC<ViewCocktailProps> = ({
    cocktail,
}) => {
    return (
        <CocktailForm
            mode="view"
            className="view-cocktail"
            cocktail={cocktail}
            request={() => {}}
            title="View cocktail"
            submitText="Servir le cocktail"
            notificationSuccess="Cocktail servi avec succès"
            notificationError="Une erreur est survenue lors du service du cocktail"
        />
    );
}