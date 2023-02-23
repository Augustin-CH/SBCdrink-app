import {Grid} from "@mui/material";
import {BlogPostCard} from "@/features/ui/blog";
import {IBaseCocktail, ICocktailList} from "@/features/cocktail/type";
import {FC, useState} from "react";
import {env} from "@/env";
import {ViewCocktail} from "@/features/cocktail";
import {setSelectedCocktail} from "@/features/cocktail/CocktailSlice";
import {useAppDispatch} from "@/app/hooks";

interface ListCocktailProps {
    cocktails: IBaseCocktail[];
}

const ListCocktail: FC<ListCocktailProps> = ({
    cocktails,
}) => {
    const [isOpen, setIsOpen] = useState(false)
    const dispatch = useAppDispatch()

    const handleModal = () => setIsOpen(!isOpen)

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
        <>
            <Grid container spacing={3}>
                {cocktailsList?.map((item: ICocktailList, index: number) => (
                    <BlogPostCard key={item.id} post={item} index={index} onClick={() => {
                        dispatch(setSelectedCocktail(cocktails[index]))
                        handleModal()
                    }}/>
                ))}
            </Grid>
            <ViewCocktail
                isModalOpen={isOpen}
                onCloseModal={handleModal}
            />
        </>
    )
}

export default ListCocktail;