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
import styled from '@emotion/styled'
import { LocalBar, NoDrinks } from '@mui/icons-material'

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

  const BoxDeleteButton = styled(Box)`
    display: flex;
    flex-direction: column;
    justify-content: end;
    .delete-ingredient {
      color: red;
      :hover {
        cursor: pointer;
      }
    }
    position: relative;
    top: -15px;
    left: -15px;
    float: right;
    height: 0;
  `

  return (
    <Grid item xs={12} sm={12} md={6} key={`card_ingredient_${index}`}>
      <Card sx={{ height: 100, display: 'flex', padding: 2, ':hover': { cursor: 'pointer' } }} onClick={onClick}>
        <Box sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
          <Typography component="div" variant="h5" paddingBottom={1} sx={{ display: 'flex', alignItems: 'center' }}>
            <div style={{ height: 25, width: 25, marginRight: 10 }} >{isAlcohol ? <LocalBar /> : <NoDrinks />}</div><TextNeon text={name?.toUpperCase() ?? ''} type={1} style={{ fontSize: 25 }} />
          </Typography>
          <Typography component="div">
            Degré d&apos;alcool: {alcoholDegree}%
          </Typography>
        </Box>
      </Card>
      <BoxDeleteButton>
        <DeleteIcon
          // eslint-disable-next-line @typescript-eslint/no-misused-promises
          onClick={handleDelete}
          className='delete-ingredient'
        />
      </BoxDeleteButton>
    </Grid>
  )
}

export { CardIngredient }
