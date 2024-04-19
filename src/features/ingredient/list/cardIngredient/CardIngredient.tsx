import React, { type FC } from 'react'
import { Box, Card, Grid, Typography } from '@mui/material'
import { type ICardIngredientData } from './types'
import { TextNeon } from '@/features/ui/components/TextNeon/TextNeon'

interface CardIngredientProps {
  data: ICardIngredientData
  index: number
  onClick: () => void
}

const CardIngredient: FC<CardIngredientProps> = ({ data, index, onClick }) => {
  const { name, isAlcohol, alcoholDegree } = data

  return (
    <Grid item xs={12} sm={12} md={6} key={`card_${index}`} onClick={onClick}>
      <Card sx={{ height: 140, display: 'flex', padding: 2 }}>
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
    </Grid>
  )
}

export { CardIngredient }
