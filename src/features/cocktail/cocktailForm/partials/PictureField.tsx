import React, { type FC } from 'react'
import { Box, CardMedia, Grid } from '@mui/material'
import { useFormikContext } from 'formik'
import { type IFormCocktail } from '@/features/cocktail/types'
import { env } from '@/env'

const PictureField: FC = () => {
  const { values } = useFormikContext<IFormCocktail>()

  return (
    <Grid container mb={3} pt={3}>
        <Box sx={{ display: 'flex', flexDirection: 'column', minWidth: 120, border: '1px solid #ccc', borderRadius: 2, padding: 2 }}>
          <CardMedia
            component="img"
            sx={{ height: 200, marginLeft: 'auto', marginRight: 'auto', width: 'auto' }}
            image={`${env.REACT_APP_API_URL}${values.picture}`}
            alt="Live from space album cover"
          />
        </Box>
    </Grid>
  )
}

export default PictureField
