import React, { type FC } from 'react'
import { Grid } from '@mui/material'
import { type IFormCocktail } from '@/features/cocktail/types'
import { useFormikContext } from 'formik'
import { LocalBar, NoDrinks } from '@mui/icons-material'

interface IsAlcoolColumnProps {
  index: number
}

const IsAlcoolColumn: FC<IsAlcoolColumnProps> = ({
  index
}) => {
  const formik = useFormikContext<IFormCocktail>()

  return (
    <Grid item sx={{ minWidth: 40 }}>
      {formik.values.ingredients[index].isAlcohol ? <LocalBar /> : <NoDrinks />}
    </Grid>
  )
}

export default IsAlcoolColumn
