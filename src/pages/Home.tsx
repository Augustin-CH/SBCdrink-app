import React, { type FC, useEffect } from 'react'
import { Button, Container, Stack, Typography, CircularProgress, Box } from '@mui/material'
import { ListCocktail } from '@/features/cocktail'
import { useAppDispatch, useAppSelector } from '@/app/hooks'
import { fetchCocktails } from '@/features/cocktail/CocktailSlice'

const Home: FC = () => {
  const dispatch = useAppDispatch()
  const { listCocktails, listStatus } = useAppSelector(state => state.cocktail)

  useEffect(() => {
    dispatch(fetchCocktails())
  }, [dispatch])

  if (listStatus === 'failed') {
    return (
            <h3>
                Erreur lors du chargement des cocktails
            </h3>
    )
  }

  if (listStatus === 'loading') {
    return (
        <Box sx={{ position: 'absolute', left: '45vw', top: '45vh' }}>
            <CircularProgress />
        </Box>
    )
  }

  return (
        <Container sx={{ paddingTop: '15px' }}>
            <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                <Typography variant="h4" gutterBottom>
                    Cocktail
                </Typography>
            </Stack>

            <ListCocktail cocktails={listCocktails} />
            <Stack direction="row" alignItems="center" justifyContent="flex-end" mb={5}>
                <Button variant="contained">
                    Manage
                </Button>
            </Stack>
        </Container>
  )
}

export default Home
