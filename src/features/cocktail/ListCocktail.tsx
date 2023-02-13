import {Grid} from "@mui/material";
import {BlogPostCard} from "@/features/ui/blog";
import {RootState} from "@/app/store";
import {useAppSelector} from "@/app/hooks";
import {IBaseCocktail, ICocktailList} from "@/features/cocktail/type";
import {FC} from "react";
import {faker} from "@faker-js/faker";

interface ListCocktailProps {
    cocktails: ICocktailList[];
}

const ListCocktail: FC<ListCocktailProps> = ({
    cocktails,
}) => {
    return (
        <Grid container spacing={3}>
            {cocktails?.map((post: ICocktailList, index: number) => (
                <BlogPostCard key={post.id} post={post} index={index} />
            ))}
        </Grid>
    )
}

export default ListCocktail;