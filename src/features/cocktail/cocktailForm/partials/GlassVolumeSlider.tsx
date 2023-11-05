import React from 'react'
import { marksVolume } from '@/features/cocktail/constant'
import { type IFormCocktail } from '@/features/cocktail/types'
import { textVolume } from '@/features/cocktail/utils'
import { Grid, Slider, Typography } from '@mui/material'
import { useFormikContext } from 'formik'

const GlassVolumeSlider = () => {
  const { values, setFieldValue } = useFormikContext<IFormCocktail>()

  const handleChangeGlassVolume = (event: any, value: number | number[]) => {
    const currentGlassVolume = values.glassVolume
    const newGlassVolume = Number(Number(value).toFixed(1))
    setFieldValue('glassVolume', newGlassVolume)
    values.ingredients.forEach((ingredient, index) => {
      // TODO faire avec le pourcentage alcoholLevel et les proportion des ingredients pour ne pas perdre en precision
      setFieldValue(`ingredients[${index}].volume`, Number(((ingredient.volume / currentGlassVolume) * newGlassVolume).toFixed(1)))
    })
  }

  return (
    <Grid item xs={6} textAlign="center" sx={{ ml: 2, mr: 2 }}>
      <Typography variant="subtitle1" mb={3}>
          Volume du verre
      </Typography>
      <Slider
        id="glassVolume"
        name="glassVolume"
        orientation="horizontal"
        getAriaValueText={textVolume}
        valueLabelDisplay="auto"
        marks={marksVolume}
        sx={{ maxWidth: 400, mb: 5 }}
        min={20}
        max={50}
        onChange={handleChangeGlassVolume}
        value={values.glassVolume}
      />
    </Grid>
  )
}

export default GlassVolumeSlider
