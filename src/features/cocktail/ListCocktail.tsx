import {Grid} from "@mui/material";
import {BlogPostCard} from "@/features/ui/blog";
import {IBaseCocktail, ICocktailList} from "@/features/cocktail/type";
import {FC} from "react";
import {env} from "@/env";

interface ListCocktailProps {
    cocktails: IBaseCocktail[];
}

const ListCocktail: FC<ListCocktailProps> = ({
    cocktails,
}) => {

    const formatCocktailList = (items: IBaseCocktail[]): ICocktailList[] => {
        return items?.map((cocktail, index) => ({
            id: cocktail.id,
            cover: `${env.REACT_APP_API_URL}${cocktail.picture}`,
            title: cocktail.name,
            description: cocktail.description,
        }));
    }

    const cocktailsList = formatCocktailList(cocktails)

    return (
        <Grid container spacing={3}>
            {cocktailsList?.map((post: ICocktailList, index: number) => (
                <BlogPostCard key={post.id} post={post} index={index} />
            ))}
        </Grid>
    )
}

export default ListCocktail;