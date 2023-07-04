import React, { type FC, useContext, useEffect } from 'react'
import { Button, Container, Stack, Typography, CircularProgress, Box, useTheme } from '@mui/material'
import { ListCocktail } from '@/features/cocktail'
import { useAppDispatch, useAppSelector } from '@/app/hooks'
import { fetchCocktails } from '@/features/cocktail/CocktailSlice'
import { TextNeon } from '@/features/ui/components/TextNeon/TextNeon'
import { SwitchTheme } from '@/features/ui/components/SwitchTheme/SwitchTheme'
import { ColorModeContext } from '@/assets/theme'

const Home: FC = () => {
  const { setMode } = useContext(ColorModeContext)
  const theme = useTheme()
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
                    <TextNeon text="SBCDRINK" type={2} style={{ fontSize: 40 }}/>
                </Typography>
                <SwitchTheme sx={{ m: 1 }} value={theme.palette.mode === 'dark'} onChange={(event) => {
                  console.log(event.target.checked)
                  setMode(event.target.checked ? 'dark' : 'light')
                }}/>
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
