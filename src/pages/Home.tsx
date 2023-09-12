import React, { type FC, useContext, useEffect, useState, useCallback } from 'react'
import { Button, Container, Stack, Typography, useTheme } from '@mui/material'
import { ListCocktail } from '@/features/cocktail'
import { useAppDispatch, useAppSelector } from '@/app/hooks'
import { fetchAvailableCocktails } from '@/features/cocktail/CocktailSlice'
import { TextNeon } from '@/features/ui/components/TextNeon/TextNeon'
import { SwitchTheme } from '@/features/ui/components/SwitchTheme/SwitchTheme'
import { ColorModeContext } from '@/assets/theme'
import { fetchBottles } from '@/features/bottle/BottleSlice'
import { ManageModal } from '@/features/bottle'
import { fetchIngredients } from '@/features/ingredient/IngredientSlice'
import Loader from '@/features/ui/loader/loader'

const Home: FC = () => {
  const [isOpenManageModal, setIsOpenManageModal] = useState(false)
  const { setMode } = useContext(ColorModeContext)
  const theme = useTheme()
  const dispatch = useAppDispatch()
  const { listCocktails, listCocktailsStatus } = useAppSelector(state => state.cocktail)
  const { listBottles, listBottlesStatus } = useAppSelector(state => state.bottle)
  const { listIngredients, listIngredientsStatus } = useAppSelector(state => state.ingredient)

  const handleManageModal = useCallback(() => {
    setIsOpenManageModal(!isOpenManageModal)
  }, [isOpenManageModal])

  const openBottleModal = useCallback(() => {
    handleManageModal()
    dispatch(fetchBottles())
    dispatch(fetchIngredients())
  }, [dispatch, handleManageModal])

  useEffect(() => {
    dispatch(fetchAvailableCocktails())
  }, [dispatch])

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
          <Button variant="contained" onClick={openBottleModal} sx={{ mb: 5 }}>
              Manage
          </Button>
      </Stack>
      <ManageModal
        bottles={listBottles}
        listBottlesStatus={listBottlesStatus}
        ingredients={listIngredients}
        listIngredientsStatus={listIngredientsStatus}
        isModalOpen={isOpenManageModal}
        onCloseModal={handleManageModal}
      />
    </Container>
  )
}

export default Home
