import React, { useCallback, type FC } from 'react'
import { Box, Card, Grid, Typography } from '@mui/material'
import { type ICardIngredientData } from './types'
import { TextNeon } from '@/features/ui/components/TextNeon/TextNeon'
import DeleteIcon from '@mui/icons-material/Delete'
import { useAppDispatch } from '@/app/hooks'
import { showNotification } from '@/features/notification/notificationSlice'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { AxiosError } from 'axios'
import { deleteIngredient } from '@/features/ingredient/IngredientSlice'
import { Slug } from '@/app/shared/types'

interface CardIngredientProps {
  data: ICardIngredientData
  index: number
  onClick: () => void
}

const CardIngredient: FC<CardIngredientProps> = ({ data, index, onClick }) => {
  const { name, isAlcohol, alcoholDegree } = data

  const dispatch = useAppDispatch()

  const handleDelete = useCallback(async () => {
    try {
      data.id && await dispatch(deleteIngredient(data.id)).unwrap()
      dispatch(showNotification({
        title: 'Ingrédient supprimé avec succès.',
        type: 'success'
      }))
    } catch (e: AxiosError | any) {
      console.log('e', e.response.data.slug)
      if (e.response.data.slug === Slug.ErrIngredientUsed) {
        dispatch(showNotification({
          title: 'Erreur lors de la suppression de l\'ingrédient, cet ingrédient est utilisé dans un cocktail.',
          type: 'error'
        }))
      } else {
        dispatch(showNotification({
          title: 'Erreur lors de la suppression de l\'ingrédient.',
          type: 'error'
        }))
      }
    }
  }, [dispatch, data.id])

  return (
    <Grid item xs={12} sm={12} md={6} key={`card_${index}`}>
      <Card sx={{ height: 140, display: 'flex', padding: 2, ':hover': { cursor: 'pointer' } }} onClick={onClick}>
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <Typography component="div" variant="h5" paddingBottom={1}>
            <TextNeon text={name?.toUpperCase() ?? ''} type={1} style={{ fontSize: 25 }} />
          </Typography>
          <Typography component="div" variant="subtitle1" paddingBottom={1}>
            {isAlcohol ? 'Alcoolisé' : 'Non alcoolisé'}
          </Typography>
          <Typography component="div">
            Degré d&apos;alcool: {alcoholDegree}%
          </Typography>
        </Box>
      </Card>
      <DeleteIcon
        // eslint-disable-next-line @typescript-eslint/no-misused-promises
        onClick={handleDelete}
        sx={{ color: 'red', position: 'relative', top: '-40px', right: '15px', float: 'right', ':hover': { cursor: 'pointer' } }}
      />
    </Grid>
  )
}

export { CardIngredient }
