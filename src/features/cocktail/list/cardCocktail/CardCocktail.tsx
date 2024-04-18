import React, { type FC } from 'react'
import { Box, Card, Grid, Typography, CardMedia } from '@mui/material'
import { type ICardCocktailData } from '@/features/cocktail/list/cardCocktail/types'
import { TextNeon } from '@/features/ui/components/TextNeon/TextNeon'

interface CardCocktailProps {
  data: ICardCocktailData
  index: number
  onClick: () => void
}

const CardCocktail: FC<CardCocktailProps> = ({ data, index, onClick }) => {
  const { cover, title, subTitle, description } = data

  return (
    <Grid item xs={12} sm={12} md={6} key={`card_${index}`} onClick={onClick}>
      <Card sx={{ height: 230, display: 'flex', padding: 2 }}>
        <Box>
          <div style={{ height: 200, width: 120, marginRight: 10 }}>
            <CardMedia
              component="img"
              sx={{ borderRadius: 2, height: '-webkit-fill-available' }}
              image={cover}
              alt="Live from space album cover"
            />
          </div>
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <Typography component="div" variant="h5" paddingBottom={1}>
            <TextNeon text={title?.toUpperCase() ?? ''} type={1} style={{ fontSize: 25 }} />
          </Typography>
          <Typography component="div" variant="subtitle1" paddingBottom={1}>
            {subTitle}
          </Typography>
          <Typography component="div">
            {description}
          </Typography>
        </Box>
      </Card>
    </Grid>
  )
}

export { CardCocktail }
