import React, { useCallback, useMemo } from 'react'
import { type IFormCocktail } from '@/features/cocktail/types'
import { textPercentage, textVolume } from '@/features/cocktail/utils'
import { Grid, Slider, Tooltip, Typography } from '@mui/material'
import { useFormikContext } from 'formik'
import InfoIcon from '@mui/icons-material/Info'

const AlcoholLevel = () => {
  const { values, setFieldValue } = useFormikContext<IFormCocktail>()

  const noAlcohol = useMemo(() => values.ingredients.every((ingredient) => !ingredient.isAlcohol), [values.ingredients])

  const marksAlcoholLevel = useMemo(() => {
    return [
      values.alcoholMinLevel !== 0 && {
        value: 0,
        label: 'min 0 %'
      },
      {
        value: values.alcoholMinLevel,
        label: textPercentage(values.alcoholMinLevel)
      },
      {
        value: values.alcoholLevel,
        label: textPercentage(values.alcoholLevel)
      },
      {
        value: values.alcoholMaxLevel,
        label: textPercentage(values.alcoholMaxLevel)
      },
      values.alcoholMaxLevel !== 100 && {
        value: 100,
        label: 'max 100 %'
      }
    ]
  }, [values.alcoholMinLevel, values.alcoholLevel, values.alcoholMaxLevel])

  const handleChangeAlcoholLevel = useCallback((event: any, value: number | number[]) => {
    const [min, , max] = value as number[]
    setFieldValue('alcoholMinLevel', min)
    // setFieldValue('alcoholLevel', current)
    setFieldValue('alcoholMaxLevel', max)
  }, [setFieldValue])

  return (
    <Grid item xs={6} textAlign="center" sx={{ ml: 2, mr: 2, mb: 5 }}>
      <Typography variant="subtitle1" sx={{ mb: 2, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1 }}>
        Volume d&rsquo;alcool
        <Tooltip title="Le volume d&rsquo;alcool est le pourcentage de l&rsquo;alcool dans le verre, vous pouvez ajuster le pourcentage minimum et maximum pour que les consomateurs puissent choisir le volume d&rsquo;alcool qu'il souhaite tout en gardant un cocktail buvable">
          <InfoIcon />
        </Tooltip>
      </Typography>
      {noAlcohol && (
        <Typography variant="subtitle1" mb={3}>
          Cocktail sans alcool
        </Typography>
      )}
      <Slider
        disabled={noAlcohol}
        id="glassVolume"
        name="glassVolume"
        orientation="horizontal"
        getAriaValueText={textVolume}
        valueLabelDisplay="auto"
        marks={marksAlcoholLevel as any}
        sx={{ maxWidth: 400, mb: 5 }}
        min={0}
        max={100}
        onChange={handleChangeAlcoholLevel}
        value={[values.alcoholMinLevel, values.alcoholLevel, values.alcoholMaxLevel]}
      />
    </Grid>
  )
}

export default AlcoholLevel
