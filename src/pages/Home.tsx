import React, { type FC, useContext, useEffect } from 'react'
import { Button, Container, Stack, Typography, useTheme } from '@mui/material'
import { ListCocktail } from '@/features/cocktail'
import { useAppDispatch, useAppSelector } from '@/app/hooks'
import { TextNeon } from '@/features/ui/components/TextNeon/TextNeon'
import { SwitchTheme } from '@/features/ui/components/SwitchTheme/SwitchTheme'
import { ColorModeContext } from '@/assets/theme'
import Loader from '@/features/ui/loader/loader'
import { useNavigate } from 'react-router-dom'
import paths from '@/router/paths'
import { fetchAvailableCocktails } from '@/features/cocktail/CocktailSlice'

const Home: FC = () => {
  const { setMode } = useContext(ColorModeContext)
  const theme = useTheme()

  const navigate = useNavigate()

  const dispatch = useAppDispatch()

  const { listCocktails, listCocktailsStatus } = useAppSelector(state => state.cocktail)

  useEffect(() => {
    dispatch(fetchAvailableCocktails())
  }, [dispatch, fetchAvailableCocktails])

  if (listCocktailsStatus === 'failed') {
    return (
        <h3>
            Erreur lors du chargement des cocktails
        </h3>
    )
  }

  if (listCocktailsStatus === 'loading') {
    return (
      <Loader />
    )
  }

  return (
    <div
      style={{
        backgroundImage: 'url("/assets/images/beach_summer_2.png")',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover'
      }}
    >
       <Container sx={{ paddingTop: '15px' }}>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
            <Typography variant="h4" gutterBottom>
                <TextNeon text="SBCDRINK" type={2} style={{ fontSize: 40 }}/>
            </Typography>
            <SwitchTheme sx={{ m: 1 }} checked={theme.palette.mode === 'dark'} onChange={(event) => {
              setMode(event.target.checked ? 'dark' : 'light')
            }} />
        </Stack>

        <ListCocktail cocktails={listCocktails} />
        <Stack direction="row" alignItems="center" justifyContent="flex-end" mb={5} mt={5}>
            <Button variant="contained" onClick={() => navigate(paths.dashboard.bottle)} sx={{ mb: 5 }}>
                Manage
            </Button>
        </Stack>
      </Container>
    </div>
  )
}

export default Home
