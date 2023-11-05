import React, { useMemo } from 'react'
import { type IFormCocktail } from '@/features/cocktail/types'
import { Grid } from '@mui/material'
import { useFormikContext } from 'formik'
import { textVolume } from '@/features/cocktail/utils'

const FooterListIngredients = () => {
  const { values } = useFormikContext<IFormCocktail>()

  const totalVolume = useMemo(() => {
    let total = 0
    values.ingredients.forEach(({ volume }) => {
      total += volume
    })
    return +total.toFixed(1)
  }, [values.ingredients])

  return (
    <>
      <Grid container justifyContent="flex-end">
        <b>Total : {textVolume(totalVolume)}</b>
      </Grid>
    </>
  )
}

export default FooterListIngredients
