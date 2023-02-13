
import { Grid, Button, Container, Stack, Typography } from '@mui/material';
import {BlogPostCard, BlogPostsSearch, BlogPostsSort} from '@/features/ui/blog';
import {ListCocktail} from "@/features/cocktail";
import {useEffect} from "react";
import {useAppDispatch, useAppSelector} from "@/app/hooks";
import {fetchCocktails} from "@/features/cocktail/CocktailSlice";
import {IBaseCocktail, ICocktailList} from "@features/cocktail/type";
import {faker} from "@faker-js/faker";
import {env} from "@/env";

// ----------------------------------------------------------------------

const SORT_OPTIONS = [
    { value: 'latest', label: 'Latest' },
    { value: 'popular', label: 'Popular' },
    { value: 'oldest', label: 'Oldest' },
];

// ----------------------------------------------------------------------

export default function Home() {
    const dispatch = useAppDispatch()
    const {listCocktails, error, listStatus} = useAppSelector(state => state.cocktail)


    const formatCocktailList = (cocktails: IBaseCocktail[]): ICocktailList[] => {
        return cocktails?.map((cocktail, index) => ({
            id: cocktail.id,
            cover: `${env.REACT_APP_API_URL}${cocktail.picture}`,
            title: cocktail.name,
            description: cocktail.description,
        }));
    }

    const cocktailsList = formatCocktailList(listCocktails)


    useEffect(() => {
        dispatch(fetchCocktails())
    }, [dispatch])

    if (listStatus === 'failed') {
        return (
            <h3>Error: {error}</h3>
        )
    }

    return (
        <>
            {/*// TODO: Loading spinner*/}

            <Container sx={{ paddingTop: "15px"}}>
                <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                    <Typography variant="h4" gutterBottom>
                        Cocktail
                    </Typography>
                </Stack>

                {/*<Stack mb={5} direction="row" alignItems="center" justifyContent="space-between">*/}
                {/*    <BlogPostsSearch posts={cocktailsList} />*/}
                {/*    <BlogPostsSort options={SORT_OPTIONS} />*/}
                {/*</Stack>*/}

                <ListCocktail cocktails={cocktailsList} />
                <Stack direction="row" alignItems="center" justifyContent="flex-end" mb={5}>
                    <Button variant="contained">
                        Manage
                    </Button>
                </Stack>
            </Container>
        </>
    );
}